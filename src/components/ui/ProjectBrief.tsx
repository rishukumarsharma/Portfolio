import { motion } from "framer-motion";
import { H3, Caption } from "./Typography";

interface ProjectBriefProps {
  problem: string;
  solution: string;
  impact: string;
}

export const ProjectBrief = ({
  problem,
  solution,
  impact,
}: ProjectBriefProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="my-16 p-8 md:p-10 bg-gradient-to-br from-accent-500/10 via-neutral-900 to-neutral-900 rounded-2xl border border-accent-500/20 shadow-xl">
      <Caption className="text-accent-400 uppercase tracking-wider mb-6 block">
        TL;DR
      </Caption>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Problem */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <H3 className="text-lg text-neutral-200">Problem</H3>
          </div>
          <p className="text-neutral-300 text-sm leading-relaxed">{problem}</p>
        </div>

        {/* Solution */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <H3 className="text-lg text-neutral-200">Solution</H3>
          </div>
          <p className="text-neutral-300 text-sm leading-relaxed">{solution}</p>
        </div>

        {/* Impact */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <H3 className="text-lg text-neutral-200">Impact</H3>
          </div>
          <p className="text-accent-400 font-semibold text-lg leading-relaxed">
            {impact}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

ProjectBrief.displayName = "ProjectBrief";

export default ProjectBrief;
