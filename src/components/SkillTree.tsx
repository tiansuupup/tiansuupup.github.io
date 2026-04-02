import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  id: string;
  label: string;     // display name
  tag: string;       // HUD-style tag e.g. "PRG"
  color: string;
  skills: Skill[];
}

const SKILL_DATA: SkillCategory[] = [
  {
    id: 'programming',
    label: 'Programming',
    tag: 'PRG',
    color: '#00FFD1',
    skills: [
      { name: 'C#',         level: 88 },
      { name: 'C++',        level: 80 },
      { name: 'TypeScript', level: 75 },
      { name: 'Python',     level: 62 },
    ],
  },
  {
    id: 'engines',
    label: 'Game Engines',
    tag: 'ENG',
    color: '#FF2E97',
    skills: [
      { name: 'Unity',         level: 93 },
      { name: 'Unreal Engine', level: 80 },
      { name: 'Godot',         level: 58 },
    ],
  },
  {
    id: 'web',
    label: 'Web & Creative',
    tag: 'WEB',
    color: '#FFD700',
    skills: [
      { name: 'React / Astro', level: 72 },
      { name: 'Three.js',      level: 65 },
      { name: 'GLSL Shaders',  level: 55 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    tag: 'SYS',
    color: '#00FFD1',
    skills: [
      { name: 'Git / GitHub', level: 88 },
      { name: 'Blender',      level: 62 },
      { name: 'Photoshop',    level: 70 },
    ],
  },
];

// ─── SkillBar ──────────────────────────────────────────────────────────────────

function SkillBar({
  skill,
  color,
  isInView,
  index,
}: {
  skill: Skill;
  color: string;
  isInView: boolean;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const SEGMENTS = 20;
  const filledSegments = Math.round((skill.level / 100) * SEGMENTS);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 + 0.2 }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span
          className="font-mono text-xs transition-colors duration-200"
          style={{ color: hovered ? color : '#9ca3af' }}
        >
          {skill.name}
        </span>
        <motion.span
          className="font-mono text-xs font-bold tabular-nums"
          style={{ color }}
          animate={{ opacity: hovered ? 1 : 0.45 }}
          transition={{ duration: 0.15 }}
        >
          {skill.level}
          <span className="text-gray-600 font-normal">%</span>
        </motion.span>
      </div>

      {/* Segmented progress bar */}
      <div className="flex gap-0.5 h-2" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100}>
        {Array.from({ length: SEGMENTS }).map((_, i) => {
          const filled = i < filledSegments;
          return (
            <motion.div
              key={i}
              className="flex-1 rounded-[1px]"
              style={{
                backgroundColor: filled ? color : 'rgba(255,255,255,0.06)',
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={
                isInView
                  ? {
                      opacity: filled ? (hovered ? 1 : 0.75) : 1,
                      scaleY: 1,
                      boxShadow:
                        filled && hovered
                          ? `0 0 4px ${color}99`
                          : 'none',
                    }
                  : { opacity: 0, scaleY: 0 }
              }
              transition={{
                duration: 0.3,
                delay: isInView ? i * 0.025 + index * 0.06 : 0,
                ease: 'easeOut',
              }}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── SkillCategory block ───────────────────────────────────────────────────────

function CategoryBlock({
  category,
  isInView,
  catIndex,
}: {
  category: SkillCategory;
  isInView: boolean;
  catIndex: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: catIndex * 0.12 }}
      className="mb-6 last:mb-0"
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-3">
        <span
          className="font-mono text-[10px] font-bold tracking-widest px-1.5 py-0.5 rounded"
          style={{
            color: category.color,
            backgroundColor: `${category.color}18`,
            border: `1px solid ${category.color}40`,
          }}
        >
          {category.tag}
        </span>
        <span className="font-mono text-xs text-gray-500 tracking-wider uppercase">
          {category.label}
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: `${category.color}22` }} />
      </div>

      {/* Skills list */}
      <div className="space-y-3 pl-1">
        {category.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            color={category.color}
            isInView={isInView}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── SkillTree (exported island) ──────────────────────────────────────────────

export function SkillTree() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <div
      ref={ref}
      className="relative bg-bg-surface border border-white/5 rounded-lg overflow-hidden"
      style={{ boxShadow: '0 0 0 1px rgba(0,255,209,0.06), inset 0 0 40px rgba(0,0,0,0.4)' }}
    >
      {/* HUD header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-black/30">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-pink animate-pulse" />
          <span className="font-mono text-xs text-gray-500 tracking-widest">CHAR_STATS.EXE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] text-gray-700">LVL</span>
          <span className="font-mono text-xs font-bold text-neon-gold">99</span>
        </div>
      </div>

      {/* Corner scan-line decoration */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, transparent 1px, transparent 3px)',
        }}
        aria-hidden="true"
      />

      {/* Skills */}
      <div className="p-5">
        {SKILL_DATA.map((cat, i) => (
          <CategoryBlock key={cat.id} category={cat} isInView={isInView} catIndex={i} />
        ))}
      </div>

      {/* Bottom status bar */}
      <div className="px-4 py-2 border-t border-white/5 bg-black/20 flex items-center justify-between">
        <span className="font-mono text-[10px] text-gray-700">STATUS: ACTIVE</span>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full bg-neon-cyan"
              animate={{ height: ['4px', `${6 + i * 2}px`, '4px'] }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                delay: i * 0.12,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
