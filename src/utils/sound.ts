// Subtle, high-end machined audio feedback synthesized using the Web Audio API
// Inspired by Teenage Engineering, Apple Taptic acoustics, and Braun tactile haptics

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
  }

  // 1. Tactile Micro-Tap: Subtle mechanical keycap tap (for general buttons)
  public click() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(740, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch {}
  }

  // 2. Champagne Harmonic Glint: Dual-frequency luxury metallic tone (for success/confirm)
  public chime() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Note 1: E6 (1318 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(1318, now);
      gain1.gain.setValueAtTime(0.04, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.23);

      // Note 2: G#6 (1661 Hz) slight offset
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1661, now + 0.04);
      gain2.gain.setValueAtTime(0.03, now + 0.04);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.04);
      osc2.stop(now + 0.29);
    } catch {}
  }

  // 3. Magnetic Relay Latch: Solid mechanical clamp (for Kanban drops, stage moves)
  public latch() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Initial mechanical click transient
      const oscClick = ctx.createOscillator();
      const gainClick = ctx.createGain();
      oscClick.type = 'square';
      oscClick.frequency.setValueAtTime(920, now);
      oscClick.frequency.exponentialRampToValueAtTime(300, now + 0.015);
      gainClick.gain.setValueAtTime(0.02, now);
      gainClick.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
      oscClick.connect(gainClick);
      gainClick.connect(ctx.destination);
      oscClick.start(now);
      oscClick.stop(now + 0.02);

      // Low magnetic punch
      const oscBass = ctx.createOscillator();
      const gainBass = ctx.createGain();
      oscBass.type = 'sine';
      oscBass.frequency.setValueAtTime(260, now + 0.01);
      oscBass.frequency.exponentialRampToValueAtTime(75, now + 0.07);
      gainBass.gain.setValueAtTime(0.06, now + 0.01);
      gainBass.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      oscBass.connect(gainBass);
      gainBass.connect(ctx.destination);
      oscBass.start(now + 0.01);
      oscBass.stop(now + 0.075);
    } catch {}
  }

  // 4. Milled Sapphire Glass: Resonant crystalline tap (for modal dialogs & drawers)
  public glass() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(2100, now);
      osc.frequency.exponentialRampToValueAtTime(1950, now + 0.12);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch {}
  }

  // 5. Camera Shutter: Dual micro-click (for OCR scanning, PDF export, downloads)
  public shutter() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Click 1
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(1200, now);
      osc1.frequency.exponentialRampToValueAtTime(400, now + 0.012);
      gain1.gain.setValueAtTime(0.035, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.012);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.015);

      // Click 2 (30ms later)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1500, now + 0.03);
      osc2.frequency.exponentialRampToValueAtTime(500, now + 0.045);
      gain2.gain.setValueAtTime(0.035, now + 0.03);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.03);
      osc2.stop(now + 0.05);
    } catch {}
  }

  // 6. Liquid Bubble Pop: Upward pitch bubble chirp (for variable pills, tag add, chip select)
  public pop() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(980, now + 0.04);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }

  // 7. Pneumatic Whisper: Filtered soft air slide (for modal dismiss, sidebar collapse)
  public whisper() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.06);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.065);
    } catch {}
  }

  // 8. Crystalline AI Sparkle: Ascending 3-note micro-arpeggio (for AI suggestions & match score)
  public sparkle() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Note 1: C6 (1046 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1046, now);
      gain1.gain.setValueAtTime(0.025, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.13);

      // Note 2: E6 (1318 Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1318, now + 0.035);
      gain2.gain.setValueAtTime(0.025, now + 0.035);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.035);
      osc2.stop(now + 0.17);

      // Note 3: A6 (1760 Hz)
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(1760, now + 0.07);
      gain3.gain.setValueAtTime(0.03, now + 0.07);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc3.connect(gain3);
      gain3.connect(ctx.destination);
      osc3.start(now + 0.07);
      osc3.stop(now + 0.23);
    } catch {}
  }

  // 9. Low Warp Sweep: Warm frequency glide (for tab navigation & route transitions)
  public warp() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.05);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {}
  }

  // 10. Paper Rustle: Crisp parchment flip (for Resume Viewer document mode & OCR stream toggle)
  public paper() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.04);
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.045);
    } catch {}
  }

  // 11. Rhodes Metallic Bell: Warm studio bell (for teammate pings & notifications)
  public bell() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
    } catch {}
  }

  // 12. Laser Radar Ping: High-speed engineering query blip (for search & matrix compare)
  public laser() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(850, now + 0.03);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    } catch {}
  }
}

export const sound = new SoundEngine();
