import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdWorkOutline,
  MdCheckCircleOutline,
  MdBusiness,
  MdStarOutline,
  MdClose,
  MdDownload,
} from "react-icons/md";
import { Container } from "../components/layout";
import { ScrollReveal } from "../components/animations";
import profileData from "../data/profile.json";
import skillsData from "../data/skills.json";

// Convert skills data to array format
const skills = [
  {
    category: skillsData.designTools.category,
    items: skillsData.designTools.items.slice(0, 7),
  },
  {
    category: skillsData.designExpertise.category,
    items: skillsData.designExpertise.items.slice(0, 7),
  },
];

const stats = [
  {
    value: `${profileData.stats.experience}`,
    label: "Years Experience",
    icon: <MdWorkOutline className="w-6 h-6" />,
  },
  {
    value: `${profileData.stats.projects}`,
    label: "Projects Completed",
    icon: <MdCheckCircleOutline className="w-6 h-6" />,
  },
  {
    value: `${profileData.stats.companies}`,
    label: "Companies",
    icon: <MdBusiness className="w-6 h-6" />,
  },
  {
    value: `${profileData.stats.satisfaction}`,
    label: "Client Satisfaction",
    icon: <MdStarOutline className="w-6 h-6" />,
  },
];

export const About = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const resumeUrl = "/images/Rishu-kumar-sharma-UI-UX-Designer.pdf";

  return (
    <>
      <section
        id="about"
        className="py-32 bg-neutral-950 relative overflow-hidden">
        <Container>
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
            {/* Left Column - Image & Quick Info */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <ScrollReveal animation="fadeUp">
                <div className="relative aspect-[3/4] w-full max-w-xs mx-auto md:mx-0 overflow-hidden bg-neutral-900 mb-8 grayscale hover:grayscale-0 transition-all duration-700">
                  <img
                    src={profileData.profileImage}
                    alt={profileData.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fadeUp" delay={0.1}>
                <div className="hidden md:block">
                  <button
                    onClick={() => setIsResumeOpen(true)}
                    className="group flex items-center gap-3 text-white text-sm font-medium tracking-wide hover:text-neutral-400 transition-colors">
                    <span className="h-[1px] w-8 bg-white group-hover:w-12 transition-all"></span>
                    DOWNLOAD RESUME
                  </button>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column - Biography & Stats */}
            <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col justify-between">
              <div>
                <ScrollReveal animation="fadeUp" delay={0.2}>
                  <h2
                    className="text-[12vw] md:text-[8vw] leading-none font-bold tracking-tighter text-neutral-100 mb-12 mix-blend-difference"
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    ABOUT
                  </h2>
                </ScrollReveal>

                <ScrollReveal animation="fadeUp" delay={0.3}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <div>
                      <h3 className="text-xl md:text-2xl font-light text-neutral-200 mb-6 leading-relaxed">
                        {profileData.summary}
                      </h3>
                      <p className="text-neutral-500 leading-relaxed">
                        Based in {profileData.location}, I specialize in
                        creating user-centered designs that solve real problems
                        while delivering measurable business value. My approach
                        combines thorough UX research with modern design
                        practices.
                      </p>
                    </div>

                    {/* Skills as minimal text block */}
                    <div className="flex flex-col justify-end">
                      <div className="border-t border-neutral-800 pt-6">
                        <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest block mb-4">
                          Core Competencies
                        </span>
                        <p className="text-neutral-400 leading-relaxed text-sm">
                          {skills.flatMap((s) => s.items).join("  •  ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Stats Row - Minimalist */}
              <ScrollReveal animation="fadeUp" delay={0.4}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-neutral-800 pt-8">
                  {stats.map((stat) => (
                    <div key={stat.label} className="group">
                      <div
                        className="text-3xl lg:text-4xl font-bold text-neutral-100 mb-1 font-mono"
                        style={{ fontFamily: "'Inter', sans-serif" }}>
                        {stat.value}
                      </div>
                      <div className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest group-hover:text-neutral-400 transition-colors">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Mobile Resume Button */}
              <div className="mt-12 md:hidden">
                <button
                  onClick={() => setIsResumeOpen(true)}
                  className="w-full py-4 border border-neutral-800 text-white text-sm font-bold tracking-widest hover:bg-neutral-900 transition-colors">
                  DOWNLOAD RESUME
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/90 backdrop-blur-md p-4 md:p-8"
            onClick={() => setIsResumeOpen(false)}>
            {/* Overlay Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl h-[85vh] bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}>
              {/* Toolbar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900">
                <h3 className="text-neutral-200 font-medium tracking-wide">
                  Resume Preview
                </h3>
                <div className="flex items-center gap-4">
                  <a
                    href={resumeUrl}
                    download="Rishu-kumar-sharma-UI-UX-Designer.pdf"
                    className="flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors rounded-sm"
                    onClick={(e) => e.stopPropagation()}>
                    <MdDownload className="w-4 h-4" />
                    Download PDF
                  </a>
                  <button
                    onClick={() => setIsResumeOpen(false)}
                    className="p-2 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-neutral-800">
                    <MdClose className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 bg-neutral-800 w-full h-full relative">
                <iframe
                  src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full"
                  title="Resume Preview"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default About;
