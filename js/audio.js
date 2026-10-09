/**
 * Tamada Companion - Web Audio API Sound Synthesizer Engine
 * Generates realistic procedural audio: Glass clinks, Horn fanfares, and Panduri folk acoustic tones.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isPanduriPlaying = false;
    this.panduriInterval = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Realistic Crystal Wine Glass Clink
  playGlassClink() {
    this.initContext();
    const now = this.ctx.currentTime;

    // Primary bell tone (high frequency sine wave)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(2450, now);
    gain1.gain.setValueAtTime(0.4, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    // Subtle metallic overtone
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(4900, now);
    gain2.gain.setValueAtTime(0.15, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(this.ctx.destination);
    gain2.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.8);
    osc2.stop(now + 0.8);
  }

  // Traditional Georgian Horn (Kantsi) Fanfare
  playHornFanfare() {
    this.initContext();
    const now = this.ctx.currentTime;
    const notes = [220, 277.18, 329.63, 440]; // A Major triad chord sweep

    notes.forEach((freq, index) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + (index * 0.12);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.01, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);

      // Lowpass filter for warm brass sound
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1200;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 1.2);
    });
  }

  // "Gaumarjos!" Georgian Polyphonic Choral Chord
  playGaumarjosChord() {
    this.initContext();
    const now = this.ctx.currentTime;
    // Traditional 3-part fifths harmony (Root, Fifth, Octave)
    const chord = [293.66, 440.00, 587.33]; // D, A, D

    chord.forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 2.5);
    });
  }

  // Toggle Gentle Panduri Plucked String Background Atmosphere
  togglePanduriAmbiance(onStateChange) {
    this.initContext();

    if (this.isPanduriPlaying) {
      clearInterval(this.panduriInterval);
      this.isPanduriPlaying = false;
      if (onStateChange) onStateChange(false);
    } else {
      this.isPanduriPlaying = true;
      if (onStateChange) onStateChange(true);

      const scale = [220, 246.94, 277.18, 329.63, 370.00, 440]; // Traditional Georgian folk scale
      let step = 0;

      this.panduriInterval = setInterval(() => {
        if (!this.isPanduriPlaying) return;
        const now = this.ctx.currentTime;
        const freq = scale[step % scale.length];
        step++;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.6);
      }, 450);
    }
  }
}

export const audioEngine = new SoundEngine();
