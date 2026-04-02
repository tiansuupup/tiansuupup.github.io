import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from './ProjectCard';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  cover?: string;
  date: string;
  github?: string;
  demo?: string;
  featured: boolean;
}

const FILTERS = ['全部', 'Unity', '虚幻', 'Roblox', '策划', 'XR'] as const;
type Filter = (typeof FILTERS)[number];

function matchesFilter(project: ProjectItem, filter: Filter): boolean {
  if (filter === '全部') return true;
  if (filter === '虚幻') return project.tags.some((tag) => tag.toLowerCase().includes('unreal'));
  if (filter === '策划') return project.tags.some((tag) => ['design', 'narrative', 'card game', 'serious game', 'moba'].includes(tag.toLowerCase()));
  return project.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()));
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      className="relative font-mono text-xs px-4 py-1.5 rounded transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
      style={{
        color: active ? '#0a0a0f' : '#6b7280',
        backgroundColor: active ? '#00FFD1' : 'transparent',
        border: `1px solid ${active ? '#00FFD1' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: active ? '0 0 12px rgba(0,255,209,0.35)' : 'none',
      }}
    >
      {active && (
        <motion.span
          layoutId="filter-pill-bg"
          className="absolute inset-0 rounded"
          style={{ backgroundColor: '#00FFD1' }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}

export interface ProjectsProps {
  projects: ProjectItem[];
}

export function Projects({ projects }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>('全部');

  const filtered = useMemo(
    () => projects.filter((project) => matchesFilter(project, activeFilter)),
    [projects, activeFilter],
  );

  return (
    <div>
      <div className="w-[56%] max-w-3xl mx-auto mb-10 rounded-xl overflow-hidden border border-white/8 bg-bg-surface/70" style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
        <div className="aspect-video bg-black">
          <iframe
            src="https://player.bilibili.com/player.html?isOutside=true&aid=113876427349530&bvid=BV1oGfBYsErH&cid=28030339516&p=1&autoplay=0"
            className="w-full h-full"
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            title="作品集合集视频"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-10" role="group" aria-label="项目筛选">
        {FILTERS.map((filter) => (
          <FilterPill
            key={filter}
            label={filter}
            active={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          />
        ))}

        <span className="ml-auto font-mono text-[11px] text-gray-600">
          {filtered.length}&nbsp;
          <span className="text-gray-700">个项目</span>
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.length > 0 ? (
            filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))
          ) : (
            <p className="col-span-full text-center font-mono text-sm text-gray-600 py-16">
              // 当前筛选下没有项目
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
