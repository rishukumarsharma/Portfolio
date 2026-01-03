import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";

interface Project {
  id: string;
  title: string;
  category: string;
}

interface ProjectNavigationProps {
  currentProject: Project;
  allProjects: Project[];
  className?: string;
}

export const ProjectNavigation = ({
  currentProject,
  allProjects,
  className,
}: ProjectNavigationProps) => {
  const navigate = useNavigate();
  const currentIndex = allProjects.findIndex((p) => p.id === currentProject.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  const handleNavigation = (projectId: string) => {
    navigate(`/case-study/${projectId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)}>
      {/* Previous Project */}
      {prevProject ? (
        <motion.button
          onClick={() => handleNavigation(prevProject.id)}
          className="group relative p-8 bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-accent-500/50 transition-all duration-300 text-left overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous Project
            </div>
            <h3 className="text-xl font-semibold text-neutral-50 group-hover:text-accent-400 transition-colors">
              {prevProject.title}
            </h3>
            <p className="text-sm text-neutral-400 mt-2">
              {prevProject.category}
            </p>
          </div>
        </motion.button>
      ) : (
        <div />
      )}

      {/* Next Project */}
      {nextProject ? (
        <motion.button
          onClick={() => handleNavigation(nextProject.id)}
          className="group relative p-8 bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-accent-500/50 transition-all duration-300 text-right overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-accent-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center justify-end gap-2 text-sm text-neutral-500 mb-3">
              Next Project
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-neutral-50 group-hover:text-accent-400 transition-colors">
              {nextProject.title}
            </h3>
            <p className="text-sm text-neutral-400 mt-2">
              {nextProject.category}
            </p>
          </div>
        </motion.button>
      ) : (
        <div />
      )}
    </div>
  );
};

export default ProjectNavigation;
