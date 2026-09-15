// Web Audio API Synthesized Micro-Sound Engine (Zero Assets, Zero Weight)
let audioCtx = null;
let isAudioMuted = true; // Default muted for non-intrusive luxury UX

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function initAudioEngine() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('thara_audio_enabled');
    isAudioMuted = saved !== 'true';
  }
}

export function toggleAudio() {
  isAudioMuted = !isAudioMuted;
  if (typeof window !== 'undefined') {
    localStorage.setItem('thara_audio_enabled', String(!isAudioMuted));
  }
  if (!isAudioMuted) {
    playClick(1000, 0.04);
  }
  return !isAudioMuted;
}

export function getAudioState() {
  return !isAudioMuted;
}

// Gentle mechanical click for buttons
export function playClick(freq = 900, duration = 0.035) {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Graceful fallback if AudioContext is blocked
  }
}

// Subtle micro-tick for timeline scrub
let lastTickTime = 0;
export function playScrubTick() {
  if (isAudioMuted) return;
  const now = performance.now();
  if (now - lastTickTime < 60) return; // Throttle to prevent audio overload
  lastTickTime = now;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.015);

    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.015);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.015);
  } catch {}
}

// Cinema mode transition sound
export function playCinemaChime(entering = true) {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const startFreq = entering ? 320 : 640;
    const endFreq = entering ? 640 : 320;

    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  } catch {}
}
