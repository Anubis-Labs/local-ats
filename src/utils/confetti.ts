import confetti from 'canvas-confetti';

/**
 * 1. CANDIDATE HIRED / OFFER EXTENDED CANNON
 * Dual cannons blasting from bottom-left and bottom-right in champagne gold, emerald, and sky blue.
 */
export const fireHiredConfetti = () => {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#8A6D3B', '#d4c5a9', '#10B981', '#059669', '#38BDF8', '#F59E0B'];

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };
  frame();
};

/**
 * 2. EXECUTIVE APPROVAL & ENGINEERING STAMP PULSE
 * A golden concentric ring burst with high initial velocity.
 */
export const fireStampPulse = (x = 0.5, y = 0.5) => {
  confetti({
    particleCount: 40,
    spread: 360,
    startVelocity: 25,
    origin: { x, y },
    colors: ['#8A6D3B', '#d4c5a9', '#F59E0B', '#FFFFFF'],
    shapes: ['circle', 'square'],
    scalar: 0.9,
    ticks: 120
  });
};

/**
 * 3. PROJECT ROSTER COMPLETE / RFP EXPORT FIREWORKS
 * Cascading multi-point firework bursts across the viewport.
 */
export const fireFireworks = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  const fire = (particleRatio: number, opts: confetti.Options) => {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  };

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#8A6D3B', '#d4c5a9', '#10B981']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#0284C7', '#38BDF8', '#FFFFFF']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#F59E0B', '#8A6D3B', '#10B981']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#d4c5a9', '#FFFFFF']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#10B981', '#34D399']
  });
};

/**
 * 4. TASK COMPLETION / MICRO-SUCCESS SPARKLE
 */
export const fireMicroSparkles = (x = 0.5, y = 0.5) => {
  confetti({
    particleCount: 18,
    spread: 70,
    startVelocity: 18,
    origin: { x, y },
    colors: ['#10B981', '#34D399', '#d4c5a9'],
    scalar: 0.7,
    ticks: 80
  });
};

/**
 * 5. DUPLICATE FUSION / PROFILE MERGE SHIMMER
 */
export const fireMergeShimmer = (x = 0.5, y = 0.5) => {
  confetti({
    particleCount: 35,
    spread: 180,
    startVelocity: 20,
    origin: { x, y },
    colors: ['#8A6D3B', '#d4c5a9', '#6366F1', '#818CF8'],
    scalar: 0.85,
    ticks: 100
  });
};
