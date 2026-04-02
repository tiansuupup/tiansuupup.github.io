import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ParticleBackground } from './ParticleBackground';

const ROLES = [
  '主策划',
  '主程序',
  '技术策划',
  'UGC 玩法策划',
  '独立游戏制作人',
  'Unity 讲师',
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
        timeout = setTimeout(
          () => setDisplayText(currentRole.slice(0, displayText.length + 1)),
          85,
        );
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else if (displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 45);
    } else {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
      timeout = setTimeout(() => {}, 0);
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

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-dark"
    >
      <ParticleBackground />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,255,209,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={fadeUp}
          className="font-mono text-xs md:text-sm text-neon-pink tracking-[0.3em] uppercase mb-6"
        >
          // 游戏开发者作品集
        </motion.p>

        <motion.div variants={fadeUp} className="mb-6">
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight">
            <span
              className="glitch text-white"
              data-text="tiansuupup"
            >
              tiansuupup
            </span>
          </h1>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="max-w-3xl text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed mb-6"
        >
          我叫李天粟，是一名拥有多年游戏开发经验的开发者，曾担任主策划、主程序、技术策划、玩法设计师、关卡策划与 Unity 讲师，也有数据可视化与社区运营相关经历。
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="font-mono text-lg sm:text-xl md:text-2xl mb-10 h-8 flex items-center"
        >
          <span className="text-gray-500 mr-2">&gt;&nbsp;</span>
          <TypewriterText />
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
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
            [ 查看作品 ]
          </motion.a>
          <motion.a
            href="/resume/Tiansu_Li_CV.pdf"
            className="inline-block font-mono text-sm px-8 py-3 border border-white/10 text-gray-300 rounded transition-colors duration-300"
            whileHover={{
              scale: 1.04,
              borderColor: 'rgba(255,255,255,0.25)',
              backgroundColor: 'rgba(255,255,255,0.04)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            [ 下载简历 ]
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="font-mono text-xs text-gray-600 tracking-widest">向下滚动</span>
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
