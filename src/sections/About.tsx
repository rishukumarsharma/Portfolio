import { motion } from 'framer-motion';
import { Container } from '../components/layout';
import { ScrollReveal } from '../components/animations';
import profileData from '../data/profile.json';
import skillsData from '../data/skills.json';

// Convert skills data to array format
const skills = [
    { category: skillsData.designTools.category, items: skillsData.designTools.items.slice(0, 7) },
    { category: skillsData.designExpertise.category, items: skillsData.designExpertise.items.slice(0, 7) },
    { category: skillsData.uxMethods.category, items: skillsData.uxMethods.items.slice(0, 8) },
    { category: skillsData.productKnowledge.category, items: skillsData.productKnowledge.items },
];

const stats = [
    { value: `${profileData.stats.experience}`, label: 'Years Experience' },
    { value: `${profileData.stats.projects}`, label: 'Projects Completed' },
    { value: `${profileData.stats.companies}`, label: 'Companies' },
    { value: `${profileData.stats.satisfaction}`, label: 'Client Satisfaction' },
];

export const About = () => {
    return (
        <section id="about" className="py-32 bg-neutral-950">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left Column - Content */}
                    <div>
                        <ScrollReveal animation="fadeUp">
                            <span className="inline-block text-sm font-medium text-accent-400 uppercase tracking-wider mb-4">
                                About Me
                            </span>
                        </ScrollReveal>

                        <ScrollReveal animation="fadeUp" delay={0.1}>
                            <h2 className="text-display-sm md:text-display-md font-bold text-neutral-50 mb-6">
                                {profileData.name}
                            </h2>
                        </ScrollReveal>

                        <ScrollReveal animation="fadeUp" delay={0.2}>
                            <p className="text-body-lg text-neutral-400 mb-6">
                                {profileData.summary}
                            </p>
                        </ScrollReveal>

                        <ScrollReveal animation="fadeUp" delay={0.3}>
                            <p className="text-body-md text-neutral-400 mb-8">
                                Based in {profileData.location}, I specialize in creating user-centered designs
                                that solve real problems while delivering measurable business value. My approach
                                combines thorough UX research with modern design practices to create products
                                that users love.
                            </p>
                        </ScrollReveal>

                        {/* Skills */}
                        <div className="space-y-6">
                            {skills.map((skillGroup, index) => (
                                <ScrollReveal key={skillGroup.category} animation="fadeUp" delay={0.4 + index * 0.1}>
                                    <div>
                                        <h4 className="text-sm font-semibold text-neutral-300 mb-3">
                                            {skillGroup.category}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {skillGroup.items.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-3 py-1.5 text-sm text-neutral-300 bg-neutral-800/50 rounded-full border border-neutral-700/50"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Image & Stats */}
                    <div className="relative">
                        <ScrollReveal animation="fadeLeft" delay={0.2}>
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-800">
                                <img
                                    src={profileData.profileImage}
                                    alt={profileData.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </ScrollReveal>

                        {/* Stats overlay */}
                        <ScrollReveal animation="fadeUp" delay={0.4}>
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                {stats.map((stat) => (
                                    <motion.div
                                        key={stat.label}
                                        className="p-6 bg-neutral-900/80 backdrop-blur-sm rounded-xl border border-neutral-800"
                                        whileHover={{ y: -4 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="text-3xl font-bold text-accent-400 mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-neutral-400">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default About;
