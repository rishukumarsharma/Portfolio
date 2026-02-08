import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { Container } from "../components/layout";
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
  behanceUrl?: string;
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
  const allProjects = projectsData as unknown as Project[];

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((project) => project.category === activeCategory);

  return (
    <section id="work" className="py-32 bg-neutral-950">
      <Container>
        {/* Minimalist Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <ScrollReveal animation="fadeUp">
            <h2
              className="text-[10vw] md:text-[6vw] leading-none font-bold tracking-tighter text-neutral-100"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              SELECTED
              <br />
              WORK
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.1}>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-sm md:text-base transition-colors duration-300 ${
                    activeCategory === category
                      ? "text-white border-b border-white"
                      : "text-neutral-500 hover:text-neutral-300"
                  }`}>
                  {category}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Projects Grid - Minimalist List/Grid Hybrid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={index % 2 === 1 ? "md:mt-24" : ""}>
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
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (project.behanceUrl) {
      window.open(project.behanceUrl, "_blank");
    } else {
      navigate(`/case-study/${project.id}`);
    }
  };

  return (
    <div
      className="group cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 mb-6">
        <motion.div
          className="absolute inset-0 bg-neutral-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.4 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />

        {/* Simple Arrow Overlay */}
        <div className="absolute top-4 right-4 p-2 bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <MdArrowOutward className="w-5 h-5" />
        </div>
      </div>

      {/* Minimalist Info */}
      <div className="flex flex-col gap-1 border-t border-neutral-800 pt-4">
        <div className="flex justify-between items-baseline">
          <h3 className="text-2xl font-bold text-neutral-100 group-hover:text-neutral-400 transition-colors">
            {project.title}
          </h3>
          <span className="text-sm font-mono text-neutral-500">
            {project.year}
          </span>
        </div>
        <p className="text-neutral-500 text-sm">
          {project.category} — {project.tags[0]}
        </p>
      </div>
    </div>
  );
};

export default Work;
