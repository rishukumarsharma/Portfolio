import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../components/layout";
import { Card } from "../components/ui";
import { ScrollReveal } from "../components/animations";
import projectsData from "../data/projects.json";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  tags: string[];
  category: string;
  year: string;
  featured: boolean;
  color: string;
  imageShowcase?: string[];
}

const categories = [
  "All",
  "Web Design",
  "Mobile App",
  "Web Application",
  "Branding",
];

export const Work = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  // Cast to unknown first to handle the type difference
  const allProjects = projectsData as unknown as Project[];

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((project) => project.category === activeCategory);

  return (
    <section id="work" className="py-32 bg-neutral-900">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <ScrollReveal animation="fadeUp">
            <span className="inline-block text-sm font-medium text-accent-400 uppercase tracking-wider mb-4">
              Selected Work
            </span>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.1}>
            <h2 className="text-display-sm md:text-display-md font-bold text-neutral-50 mb-6">
              Projects I'm proud of
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.2}>
            <p className="text-body-lg text-neutral-400">
              A selection of my recent work spanning product design, web
              development, and brand identity projects.
            </p>
          </ScrollReveal>
        </div>

        {/* Category Filter */}
        <ScrollReveal animation="fadeUp" delay={0.3}>
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-accent-500 text-white"
                    : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/case-study/${project.id}`);
  };

  return (
    <Card
      hover={false}
      padding="none"
      className="group overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-16/10 overflow-hidden bg-neutral-800">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Project thumbnail image */}
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Subtle gradient overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `linear-gradient(135deg, ${project.color}80, transparent)`,
            }}
          />
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-neutral-950/60 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="px-6 py-3 bg-white text-neutral-950 rounded-full font-medium text-sm flex items-center gap-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            View Project
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
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl font-semibold text-neutral-50 group-hover:text-accent-400 transition-colors">
            {project.title}
          </h3>
          <span className="text-sm text-neutral-500 shrink-0">
            {project.year}
          </span>
        </div>

        <p className="text-sm text-neutral-400 mb-4">{project.subtitle}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs text-neutral-400 bg-neutral-800 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Work;
