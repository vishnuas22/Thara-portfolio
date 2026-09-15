import Lenis from 'lenis';

const TOTAL_FRAMES = 240;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { alpha: false });
const loaderTrack = document.getElementById('loader');
const loaderProgress = document.getElementById('loader-progress');

// Image cache array
const frames = new Array(TOTAL_FRAMES);
let loadedCount = 0;
let currentFrame = 0;
let targetFrame = 0;
let lastRenderedFrame = -1;
let isFirstFrameDrawn = false;

// Format frame URL with 4-digit zero-padded index (frame_0001.jpg to frame_0240.jpg)
function getFrameUrl(index) {
  const paddedIndex = String(index + 1).padStart(4, '0');
  return `/frames/frame_${paddedIndex}.jpg`;
}

// Find nearest loaded frame if current target frame is still decoding
function getBestAvailableFrame(index) {
  if (frames[index] && frames[index].complete && frames[index].naturalWidth !== 0) {
    return frames[index];
  }

  // Search backward
  for (let i = index - 1; i >= 0; i--) {
    if (frames[i] && frames[i].complete && frames[i].naturalWidth !== 0) {
      return frames[i];
    }
  }

  // Search forward
  for (let i = index + 1; i < TOTAL_FRAMES; i++) {
    if (frames[i] && frames[i].complete && frames[i].naturalWidth !== 0) {
      return frames[i];
    }
  }

  return null;
}

// Draw image covering the entire canvas while preserving aspect ratio
function renderImage(img) {
  if (!img) return;

  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;

  if (iw === 0 || ih === 0) return;

  const hRatio = cw / iw;
  const vRatio = ch / ih;
  const ratio = Math.max(hRatio, vRatio);

  const nw = Math.ceil(iw * ratio);
  const nh = Math.ceil(ih * ratio);
  const nx = Math.floor((cw - nw) / 2);
  const ny = Math.floor((ch - nh) / 2);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, iw, ih, nx, ny, nw, nh);
}

// Render specified frame index
function drawFrame(index) {
  const img = getBestAvailableFrame(index);
  if (img) {
    renderImage(img);
  }
}

// Resize canvas to match display viewport and device pixel ratio
function handleResize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  // Redraw current frame upon resize
  drawFrame(Math.round(currentFrame));
}

// Initialize smooth momentum scrolling via Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.0,
  touchMultiplier: 1.8,
  infinite: false,
});

// Calculate target frame from scroll progress
function updateTargetFromScroll() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollY = window.scrollY;
  const progress = maxScroll > 0 ? Math.max(0, Math.min(1, scrollY / maxScroll)) : 0;
  targetFrame = progress * (TOTAL_FRAMES - 1);
}

lenis.on('scroll', () => {
  updateTargetFromScroll();
});

window.addEventListener('scroll', updateTargetFromScroll, { passive: true });
window.addEventListener('resize', handleResize, { passive: true });

// Animation render loop with exponential lerp damping for buttery smooth scrubbing
function animate(time) {
  lenis.raf(time);

  // Dual-damping: combine Lenis inertia with subtle canvas interpolation
  const delta = targetFrame - currentFrame;
  if (Math.abs(delta) > 0.0005) {
    currentFrame += delta * 0.12;
  } else {
    currentFrame = targetFrame;
  }

  const frameToRender = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrame)));
  if (frameToRender !== lastRenderedFrame) {
    drawFrame(frameToRender);
    lastRenderedFrame = frameToRender;
  }

  requestAnimationFrame(animate);
}

// Asynchronous progressive preloading pipeline
async function preloadFrames() {
  // 1. Immediately load & render frame 0 so the canvas is never empty
  const firstImg = new Image();
  firstImg.src = getFrameUrl(0);
  frames[0] = firstImg;

  try {
    await firstImg.decode();
  } catch {
    // If decode fails or browser loads synchronously
    await new Promise((resolve) => {
      firstImg.onload = resolve;
      firstImg.onerror = resolve;
    });
  }

  loadedCount++;
  if (!isFirstFrameDrawn) {
    handleResize();
    drawFrame(0);
    isFirstFrameDrawn = true;
  }

  // 2. Load remaining frames with a controlled concurrency pool
  const CONCURRENCY = 16;
  let nextIndex = 1;

  async function loadWorker() {
    while (nextIndex < TOTAL_FRAMES) {
      const idx = nextIndex++;
      const img = new Image();
      img.src = getFrameUrl(idx);
      frames[idx] = img;

      try {
        await img.decode();
      } catch {
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }

      loadedCount++;
      const percent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      if (loaderProgress) {
        loaderProgress.style.width = `${percent}%`;
      }

      // If user hasn't scrolled, keep frame 0 displayed
      if (!isFirstFrameDrawn) {
        drawFrame(0);
        isFirstFrameDrawn = true;
      }
    }
  }

  const workers = [];
  for (let i = 0; i < CONCURRENCY; i++) {
    workers.push(loadWorker());
  }

  await Promise.all(workers);

  // Smoothly dissolve loader once all assets are ready
  if (loaderTrack) {
    loaderTrack.classList.add('loaded');
    setTimeout(() => {
      loaderTrack.remove();
    }, 1000);
  }
}

// Initial setup
handleResize();
requestAnimationFrame(animate);
preloadFrames();
