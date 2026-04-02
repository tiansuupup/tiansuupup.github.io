import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ProjectItem } from './Projects';

// ─── Cover gradient derived from primary tag ───────────────────────────────────

function getCoverStyle(tags: string[]): { gradient: string; accentColor: string } {
  const first = tags[0]?.toLowerCase() ?? '';
  if (first.includes('unity'))
    return { gradient: 'linear-gradient(135deg, #020d1f 0%, #051d3d 60%, #0a3060 100%)', accentColor: '#00FFD1' };
  if (first.includes('unreal'))
    return { gradient: 'linear-gradient(135deg, #150008 0%, #2d0012 60%, #4d0020 100%)', accentColor: '#FF2E97' };
  if (first.includes('web') || first.includes('three'))
    return { gradient: 'linear-gradient(135deg, #0f0c00 0%, #1f1800 60%, #332800 100%)', accentColor: '#FFD700' };
  // Default: cyan/dark
  return { gradient: 'linear-gradient(135deg, #040c0a 0%, #061f18 60%, #083328 100%)', accentColor: '#00FFD1' };
}

// ─── Cover decoration: animated scan lines + icon ─────────────────────────────

function CoverDecoration({ tags, accentColor }: { tags: string[]; accentColor: string }) {
  const icon = tags[0]?.toLowerCase().includes('unity') ? '⬡'
    : tags[0]?.toLowerCase().includes('unreal') ? '◈'
    : tags[0]?.toLowerCase().includes('web') ? '◎'
    : '◇';

  return (
    <>
      {/* Scan-line overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,transparent 1px,transparent 3px)' }}
        aria-hidden="true"
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: `linear-gradient(${accentColor} 1px,transparent 1px),linear-gradient(90deg,${accentColor} 1px,transparent 1px)`, backgroundSize: '32px 32px' }}
        aria-hidden="true"
      />
      {/* Central icon */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <span className="text-5xl opacity-15" style={{ color: accentColor, fontFamily: 'monospace' }}>
          {icon}
        </span>
      </div>
      {/* Corner accent */}
      <div className="absolute top-3 right-3 pointer-events-none" aria-hidden="true">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor, boxShadow: `0 0 6px ${accentColor}` }} />
      </div>
    </>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────

export interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const { gradient, accentColor } = getCoverStyle(project.tags);

  const formattedDate = (() => {
    const [year, month] = project.date.split('-');
    const monthName = month
      ? new Date(Number(year), Number(month) - 1).toLocaleString('en', { month: 'short' })
      : '';
    return monthName ? `${monthName} ${year}` : year;
  })();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      layout
      className="group relative flex flex-col rounded-xl overflow-hidden border border-white/5 bg-bg-surface cursor-pointer"
      style={{
        boxShadow: hovered
          ? `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}33`
          : '0 2px 12px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* ── Cover image area ── */}
      <a href={`/projects/${project.id}`} className="block relative h-44 overflow-hidden" aria-label={project.title}>
        <div className="absolute inset-0" style={{ background: gradient }} />
        <CoverDecoration tags={project.tags} accentColor={accentColor} />

        {/* Hover overlay — slides up from bottom */}
        <motion.div
          className="absolute inset-x-0 bottom-0 px-4 py-4"
          style={{ background: `linear-gradient(to top, rgba(10,10,15,0.97) 0%, rgba(10,10,15,0.85) 60%, transparent 100%)` }}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: hovered ? '0%' : '100%', opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">{project.description}</p>
        </motion.div>
      </a>

      {/* ── Card footer ── */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        {/* Title + date */}
        <div className="flex items-start justify-between gap-2">
          <a
            href={`/projects/${project.id}`}
            className="font-display text-base font-bold text-white hover:underline leading-snug"
            style={{ textDecorationColor: accentColor }}
          >
            {project.title}
          </a>
          <span className="font-mono text-[10px] text-gray-600 whitespace-nowrap pt-0.5">{formattedDate}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-1.5 py-0.5 rounded"
              style={{ color: accentColor, backgroundColor: `${accentColor}14`, border: `1px solid ${accentColor}30` }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links row */}
        <div className="flex gap-3 mt-auto pt-2 border-t border-white/5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-gray-500 hover:text-white transition-colors duration-200 flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] transition-colors duration-200 flex items-center gap-1 ml-auto"
              style={{ color: accentColor }}
              onClick={(e) => e.stopPropagation()}
            >
              Live Demo
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          )}
          <a
            href={`/projects/${project.id}`}
            className="font-mono text-[11px] text-gray-600 hover:text-gray-300 transition-colors duration-200 flex items-center gap-1"
            style={!project.demo ? { marginLeft: 'auto' } : {}}
          >
            Read more →
          </a>
        </div>
      </div>
    </motion.article>
  );
}
