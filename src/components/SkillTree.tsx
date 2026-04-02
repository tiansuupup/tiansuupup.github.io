import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  id: string;
  label: string;
  tag: string;
  color: string;
  skills: Skill[];
}

const SKILL_DATA: SkillCategory[] = [
  {
    id: 'programming',
    label: '编程能力',
    tag: 'PRG',
    color: '#00FFD1',
    skills: [
      { name: 'C#', level: 90 },
      { name: 'Lua', level: 90 },
      { name: 'C++', level: 50 },
      { name: 'Python', level: 75 },
    ],
  },
  {
    id: 'engines',
    label: '游戏引擎',
    tag: 'ENG',
    color: '#FF2E97',
    skills: [
      { name: 'Unity', level: 90 },
      { name: 'Roblox Studio', level: 90 },
      { name: '虚幻引擎', level: 60 },
    ],
  },
  {
    id: 'design',
    label: '策划与系统',
    tag: 'SYS',
    color: '#FFD700',
    skills: [
      { name: '策划案', level: 90 },
      { name: '玩法设计', level: 85 },
      { name: '行为树', level: 88 },
    ],
  },
  {
    id: 'creative',
    label: '扩展能力',
    tag: 'XRT',
    color: '#00FFD1',
    skills: [
      { name: 'XR 开发', level: 60 },
      { name: '3D 建模', level: 70 },
      { name: '2D 美术', level: 40 },
    ],
  },
];

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
  const segments = 20;
  const filledSegments = Math.round((skill.level / 100) * segments);

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

      <div className="flex gap-0.5 h-2" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100}>
        {Array.from({ length: segments }).map((_, i) => {
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
                      boxShadow: filled && hovered ? `0 0 4px ${color}99` : 'none',
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

export function SkillTree() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <div
      ref={ref}
      className="relative bg-bg-surface border border-white/5 rounded-lg overflow-hidden"
      style={{ boxShadow: '0 0 0 1px rgba(0,255,209,0.06), inset 0 0 40px rgba(0,0,0,0.4)' }}
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-black/30">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-pink animate-pulse" />
          <span className="font-mono text-xs text-gray-500 tracking-widest">技能矩阵</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] text-gray-700">编号</span>
          <span className="font-mono text-xs font-bold text-neon-gold">TL</span>
        </div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, transparent 1px, transparent 3px)',
        }}
        aria-hidden="true"
      />

      <div className="p-5">
        {SKILL_DATA.map((cat, i) => (
          <CategoryBlock key={cat.id} category={cat} isInView={isInView} catIndex={i} />
        ))}
      </div>

      <div className="px-4 py-2 border-t border-white/5 bg-black/20 flex items-center justify-between">
        <span className="font-mono text-[10px] text-gray-700">状态：运行中</span>
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
