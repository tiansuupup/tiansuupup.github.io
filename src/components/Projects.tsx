import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from './ProjectCard';

// ─── Shared type (used by ProjectCard too) ─────────────────────────────────────

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

// ─── Filter categories ────────────────────────────────────────────────────────

const FILTERS = ['All', 'Unity', 'Unreal', 'Web'] as const;
type Filter = (typeof FILTERS)[number];

function matchesFilter(project: ProjectItem, filter: Filter): boolean {
  if (filter === 'All') return true;
  return project.tags.some((t) => t.toLowerCase().includes(filter.toLowerCase()));
}

// ─── FilterPill ───────────────────────────────────────────────────────────────

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

// ─── Projects ─────────────────────────────────────────────────────────────────

export interface ProjectsProps {
  projects: ProjectItem[];
}

export function Projects({ projects }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const filtered = useMemo(
    () => projects.filter((p) => matchesFilter(p, activeFilter)),
    [projects, activeFilter],
  );

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-10" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <FilterPill
            key={f}
            label={f}
            active={activeFilter === f}
            onClick={() => setActiveFilter(f)}
          />
        ))}

        {/* Result count */}
        <span className="ml-auto font-mono text-[11px] text-gray-600">
          {filtered.length}&nbsp;
          <span className="text-gray-700">project{filtered.length !== 1 ? 's' : ''}</span>
        </span>
      </div>

      {/* Cards grid */}
      <motion.div
        layout
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center font-mono text-sm text-gray-600 py-16"
            >
              // no projects match this filter
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
