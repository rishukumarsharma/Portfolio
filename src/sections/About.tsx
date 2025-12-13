import { motion } from 'framer-motion';
import { Container } from '../components/layout';
import { ScrollReveal } from '../components/animations';

const skills = [
    { category: 'Design', items: ['UX Design', 'UI Design', 'Design Systems', 'Prototyping'] },
    { category: 'Development', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'] },
    { category: 'Tools', items: ['Figma', 'Framer', 'VS Code', 'Git'] },
];

const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' },
    { value: '30+', label: 'Happy Clients' },
    { value: '3', label: 'Design Awards' },
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
                                Crafting digital experiences with purpose
                            </h2>
                        </ScrollReveal>

                        <ScrollReveal animation="fadeUp" delay={0.2}>
                            <p className="text-body-lg text-neutral-400 mb-6">
                                I'm a product designer and developer with a passion for creating
                                beautiful, functional digital experiences. With over 5 years of
                                experience, I specialize in bridging the gap between design and
                                development.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal animation="fadeUp" delay={0.3}>
                            <p className="text-body-md text-neutral-400 mb-8">
                                My approach combines strategic thinking with creative execution,
                                ensuring every project delivers both aesthetic appeal and tangible
                                results. I believe in user-centered design that solves real problems
                                while pushing creative boundaries.
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
                                {/* Placeholder for profile image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-neutral-900" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-neutral-500">Profile Image</span>
                                </div>
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
