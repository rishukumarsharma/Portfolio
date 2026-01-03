import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";
import projectsData from "../../data/projects.json";
import { OptimizedImage } from "./OptimizedImage";
import { getProjectPlaceholder } from "../../utils/placeholders";

type Category = "All" | "SaaS" | "CRM" | "Landing Page";

interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  description: string;
  tags: string[];
  behanceUrl?: string;
  featured: boolean;
  year: string;
  imageShowcase?: string[];
  metrics?: Record<string, string>;
}

export interface ProjectGridProps {
  className?: string;
  showFilters?: boolean;
  initialCategory?: Category;
  layout?: "grid" | "masonry" | "bento";
}

const categories: Category[] = ["All", "SaaS", "CRM", "Landing Page"];

// Bento grid layout - assigns different sizes to create visual variety
const getBentoClass = (index: number): string => {
  const patterns = [
    "col-span-2 row-span-2", // Large
    "col-span-1 row-span-1", // Small
    "col-span-1 row-span-2", // Tall
    "col-span-2 row-span-1", // Wide
    "col-span-1 row-span-1", // Small
    "col-span-1 row-span-1", // Small
  ];
  return patterns[index % patterns.length];
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
};

export const ProjectGrid = ({
  className,
  showFilters = true,
  initialCategory = "All",
  layout = "bento",
}: ProjectGridProps) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] =
    useState<Category>(initialCategory);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects = projectsData as unknown as Project[];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const getLayoutClass = () => {
    switch (layout) {
      case "masonry":
        return "columns-1 md:columns-2 lg:columns-3 gap-6";
      case "bento":
        return "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4";
      default:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Filter Buttons */}
      {showFilters && (
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
                activeCategory === category
                  ? "bg-accent-500 text-white shadow-lg shadow-accent-500/30"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100",
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
              {category !== "All" && (
                <span className="ml-2 opacity-60">
                  ({projects.filter((p) => p.category === category).length})
                </span>
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* Project Grid */}
      <motion.div
        className={getLayoutClass()}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className={cn(
                "relative group overflow-hidden rounded-2xl bg-neutral-900 cursor-pointer",
                layout === "bento" && getBentoClass(index),
                layout === "masonry" && "break-inside-avoid mb-6",
              )}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => navigate(`/case-study/${project.id}`)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <motion.div
                  className="w-full h-full overflow-hidden"
                  animate={{
                    scale: hoveredProject === project.id ? 1.1 : 1,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                >
                  <OptimizedImage
                    src={
                      project.thumbnail ||
                      getProjectPlaceholder(project.category)
                    }
                    alt={project.title}
                    className="w-full h-full"
                  />
                </motion.div>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 text-xs font-medium bg-accent-500 text-white rounded-full">
                    Featured
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6">
                {/* Tags - Show on hover */}
                <motion.div
                  className="mb-3 flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: hoveredProject === project.id ? 1 : 0,
                    y: hoveredProject === project.id ? 0 : 10,
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs text-neutral-300 bg-neutral-800/80 backdrop-blur-sm rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-neutral-50 mb-2 group-hover:text-accent-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description - Show on hover */}
                <motion.p
                  className="text-sm text-neutral-400 mb-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: hoveredProject === project.id ? 1 : 0,
                    height: hoveredProject === project.id ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {project.description}
                </motion.p>

                {/* Metrics - Show on hover */}
                {project.metrics && (
                  <motion.div
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                      y: hoveredProject === project.id ? 0 : 10,
                    }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                  >
                    {Object.entries(project.metrics)
                      .slice(0, 2)
                      .map(([key, value]) => (
                        <div key={key} className="flex items-center gap-1">
                          <span className="text-xs text-neutral-500">
                            {key.replace(/([A-Z])/g, " $1").trim()}:
                          </span>
                          <span className="text-sm font-semibold text-accent-400">
                            {value}
                          </span>
                        </div>
                      ))}
                  </motion.div>
                )}

                {/* Category & Year */}
                <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
              </div>

              {/* Hover Overlay with CTA */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  pointerEvents:
                    hoveredProject === project.id ? "auto" : "none",
                }}
              >
                <motion.div
                  className="px-6 py-3 bg-white text-neutral-950 rounded-full font-medium flex items-center gap-2"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{
                    scale: hoveredProject === project.id ? 1 : 0.9,
                    opacity: hoveredProject === project.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  View Case Study
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-neutral-400 text-lg">
            No projects found in this category.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectGrid;
