import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ParticleBackground } from './ParticleBackground';

// ─── Typewriter ────────────────────────────────────────────────────────────────

const ROLES = [
  'Game Developer',
  'Creative Coder',
  'Unity Expert',
  'Unreal Explorer',
  'Pixel Artist',
];

function TypewriterText() {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];

    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        // Still typing
        timeout = setTimeout(
          () => setDisplayText(currentRole.slice(0, displayText.length + 1)),
          85,
        );
      } else {
        // Finished typing — pause, then start deleting
        timeout = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      if (displayText.length > 0) {
        // Still deleting
        timeout = setTimeout(
          () => setDisplayText(displayText.slice(0, -1)),
          45,
        );
      } else {
        // Finished deleting — move to next role
        setIsDeleting(false);
        setRoleIndex((i) => (i + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, roleIndex, isDeleting]);

  return (
    <span aria-label={ROLES[roleIndex]}>
      <span className="text-neon-cyan">{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
        className="inline-block ml-0.5 text-neon-pink"
        aria-hidden="true"
      >
        |
      </motion.span>
    </span>
  );
}

// ─── Framer Motion variants ────────────────────────────────────────────────────

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.4,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Hero ──────────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-dark"
    >
      {/* Canvas particle layer */}
      <ParticleBackground />

      {/* Subtle radial glow behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,255,209,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Pre-title label */}
        <motion.p
          variants={fadeUp}
          className="font-mono text-xs md:text-sm text-neon-pink tracking-[0.3em] uppercase mb-6"
        >
          // Portfolio
        </motion.p>

        {/* Name with glitch effect */}
        <motion.div variants={fadeUp} className="mb-6">
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight">
            <span
              className="glitch text-white"
              data-text="Your Name"
            >
              Your Name
            </span>
          </h1>
        </motion.div>

        {/* Typewriter subtitle */}
        <motion.div
          variants={fadeUp}
          className="font-mono text-lg sm:text-xl md:text-2xl mb-10 h-8 flex items-center"
        >
          <span className="text-gray-500 mr-2">&gt;&nbsp;</span>
          <TypewriterText />
        </motion.div>

        {/* CTA button */}
        <motion.div variants={fadeUp}>
          <motion.a
            href="#projects"
            className="inline-block font-mono text-sm px-8 py-3 border border-neon-cyan text-neon-cyan rounded transition-colors duration-300"
            whileHover={{
              scale: 1.04,
              boxShadow: '0 0 16px rgba(0,255,209,0.5), 0 0 40px rgba(0,255,209,0.2)',
              backgroundColor: 'rgba(0,255,209,0.08)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            [ View My Work ]
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator arrow — bottom center */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="font-mono text-xs text-gray-600 tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <svg
            className="w-5 h-5 text-neon-cyan opacity-60"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
