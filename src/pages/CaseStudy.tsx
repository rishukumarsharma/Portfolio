import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../components/layout';
import { H1, H2, H3, Body, Caption } from '../components/ui';
import { ParallaxImage } from '../components/ui/ParallaxImage';
import { CountUpMetric } from '../components/ui/CountUpMetric';
import { FloatingBackButton } from '../components/ui/FloatingBackButton';
import { ProjectNavigation } from '../components/ui/ProjectNavigation';
import { SectionReveal } from '../components/ui/SectionReveal';
import projectsData from '../data/projects.json';

interface CaseStudyProject {
    id: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    year: string;
    metrics?: Record<string, string>;
    caseStudy?: {
        challenge: string;
        solution: string;
        impact: string;
        images?: string[];
        testimonial?: {
            quote: string;
            author: string;
            role: string;
        };
    };
}

export const CaseStudy = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const projects = projectsData as unknown as CaseStudyProject[];
    const project = projects.find((p) => p.id === projectId);

    if (!project) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <div className="text-center">
                    <H2 className="mb-4">Project Not Found</H2>
                    <Body muted>The project you're looking for doesn't exist.</Body>
                </div>
            </div>
        );
    }

    const { caseStudy } = project;

    return (
        <div className="bg-neutral-950">
            <FloatingBackButton />

            {/* Hero Section */}
            <ParallaxImage
                alt={project.title}
                className="h-screen"
                speed={0.5}
            >
                <Container className="h-full flex flex-col justify-end pb-24">
                    {/* Tags with stagger */}
                    <motion.div
                        className="flex flex-wrap gap-3 mb-6"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.3,
                                },
                            },
                        }}
                    >
                        {project.tags.slice(0, 4).map((tag) => (
                            <motion.span
                                key={tag}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.8 },
                                    visible: { opacity: 1, scale: 1 },
                                }}
                                className="px-4 py-2 text-sm font-medium bg-neutral-800/80 backdrop-blur-sm text-neutral-200 rounded-full border border-neutral-700"
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* Title with reveal */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                    >
                        <H1 className="mb-4">{project.title}</H1>
                        <Body size="lg" className="text-neutral-300 max-w-3xl">
                            {project.description}
                        </Body>
                    </motion.div>

                    {/* Metrics Cards */}
                    {project.metrics && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                            {Object.entries(project.metrics).slice(0, 4).map(([key, value], index) => (
                                <CountUpMetric
                                    key={key}
                                    value={value}
                                    label={key.replace(/([A-Z])/g, ' $1').trim()}
                                    delay={0.8 + index * 0.1}
                                    className="p-6 bg-neutral-900/60 backdrop-blur-sm rounded-xl border border-neutral-800"
                                />
                            ))}
                        </div>
                    )}
                </Container>
            </ParallaxImage>

            {/* Overview Section */}
            {caseStudy && (
                <section className="py-24 bg-neutral-900">
                    <Container>
                        <div className="max-w-4xl mx-auto">
                            <SectionReveal animation="fadeUp">
                                <Caption label accent className="mb-4 block">
                                    Overview
                                </Caption>
                                <H2 className="mb-16">Project Context</H2>
                            </SectionReveal>

                            <div className="grid md:grid-cols-2 gap-12">
                                <SectionReveal animation="fadeUp" delay={0.1}>
                                    <div>
                                        <H3 className="text-2xl mb-4">The Challenge</H3>
                                        <Body className="text-neutral-300">{caseStudy.challenge}</Body>
                                    </div>
                                </SectionReveal>

                                <SectionReveal animation="fadeUp" delay={0.2}>
                                    <div>
                                        <H3 className="text-2xl mb-4">The Solution</H3>
                                        <Body className="text-neutral-300">{caseStudy.solution}</Body>
                                    </div>
                                </SectionReveal>
                            </div>

                            {/* Role & Timeline */}
                            <div className="grid md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-neutral-800">
                                <SectionReveal animation="fadeUp" delay={0.3}>
                                    <div>
                                        <Caption className="mb-2 text-neutral-500">My Role</Caption>
                                        <Body className="text-neutral-200">
                                            Lead UX Designer
                                        </Body>
                                    </div>
                                </SectionReveal>

                                <SectionReveal animation="fadeUp" delay={0.4}>
                                    <div>
                                        <Caption className="mb-2 text-neutral-500">Timeline</Caption>
                                        <Body className="text-neutral-200">{project.year}</Body>
                                    </div>
                                </SectionReveal>

                                <SectionReveal animation="fadeUp" delay={0.5}>
                                    <div>
                                        <Caption className="mb-2 text-neutral-500">Category</Caption>
                                        <Body className="text-neutral-200">{project.category}</Body>
                                    </div>
                                </SectionReveal>
                            </div>
                        </div>
                    </Container>
                </section>
            )}

            {/* Process Section */}
            <section className="py-24 bg-neutral-950">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <SectionReveal animation="fadeUp">
                            <Caption label accent className="mb-4 block">
                                Process
                            </Caption>
                            <H2 className="mb-16">Design Process</H2>
                        </SectionReveal>

                        {/* Research Insights */}
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            {[
                                { icon: '🔍', title: 'Research', desc: 'User interviews and competitive analysis' },
                                { icon: '✏️', title: 'Ideation', desc: 'Wireframing and rapid prototyping' },
                                { icon: '🎨', title: 'Design', desc: 'High-fidelity mockups and testing' },
                            ].map((item, index) => (
                                <SectionReveal key={item.title} animation="fadeUp" delay={index * 0.1}>
                                    <motion.div
                                        className="p-6 bg-neutral-900 rounded-xl border border-neutral-800"
                                        whileHover={{ y: -4, borderColor: 'rgba(217, 70, 239, 0.5)' }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="text-4xl mb-4">{item.icon}</div>
                                        <H3 className="text-xl mb-2">{item.title}</H3>
                                        <Body size="sm" muted>{item.desc}</Body>
                                    </motion.div>
                                </SectionReveal>
                            ))}
                        </div>

                        {/* Wireframes Gallery */}
                        {caseStudy?.images && caseStudy.images.length > 0 && (
                            <div className="grid md:grid-cols-2 gap-6">
                                {caseStudy.images.map((_image, index) => (
                                    <SectionReveal key={index} animation="scale" delay={index * 0.1}>
                                        <div className="aspect-video bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800">
                                            <div className="w-full h-full flex items-center justify-center text-neutral-600">
                                                Image {index + 1}
                                            </div>
                                        </div>
                                    </SectionReveal>
                                ))}
                            </div>
                        )}
                    </div>
                </Container>
            </section>

            {/* Solution Section */}
            <section className="py-24 bg-neutral-900">
                <Container>
                    <div className="max-w-6xl mx-auto">
                        <SectionReveal animation="fadeUp">
                            <Caption label accent className="mb-4 block">
                                Solution
                            </Caption>
                            <H2 className="mb-16">Final Design</H2>
                        </SectionReveal>

                        {/* High-fidelity Mockups */}
                        <div className="space-y-12">
                            <SectionReveal animation="fadeUp">
                                <div className="aspect-[16/9] bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl overflow-hidden border border-neutral-700 flex items-center justify-center">
                                    <Caption className="text-neutral-600">High-Fidelity Mockup</Caption>
                                </div>
                            </SectionReveal>

                            {/* Design System Components */}
                            <SectionReveal animation="fadeUp" delay={0.2}>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="aspect-square bg-neutral-800 rounded-xl border border-neutral-700 flex items-center justify-center"
                                        >
                                            <Caption className="text-neutral-600">Component {i}</Caption>
                                        </div>
                                    ))}
                                </div>
                            </SectionReveal>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Impact Section */}
            {caseStudy && (
                <section className="py-24 bg-neutral-950">
                    <Container>
                        <div className="max-w-4xl mx-auto">
                            <SectionReveal animation="fadeUp">
                                <Caption label accent className="mb-4 block">
                                    Impact
                                </Caption>
                                <H2 className="mb-16">Results & Learnings</H2>
                            </SectionReveal>

                            {/* Impact Statement */}
                            <SectionReveal animation="fadeUp" delay={0.1}>
                                <div className="p-8 bg-neutral-900 rounded-2xl border border-neutral-800 mb-12">
                                    <Body size="lg" className="text-neutral-200">
                                        {caseStudy.impact}
                                    </Body>
                                </div>
                            </SectionReveal>

                            {/* Testimonial */}
                            {caseStudy.testimonial && (
                                <SectionReveal animation="fadeUp" delay={0.2}>
                                    <div className="p-8 bg-gradient-to-br from-accent-500/10 to-transparent rounded-2xl border border-accent-500/20">
                                        <div className="text-4xl text-accent-400 mb-4">"</div>
                                        <Body size="lg" className="text-neutral-200 mb-6 italic">
                                            {caseStudy.testimonial.quote}
                                        </Body>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-neutral-800 rounded-full" />
                                            <div>
                                                <Caption className="text-neutral-200 font-medium">
                                                    {caseStudy.testimonial.author}
                                                </Caption>
                                                <Caption size="sm" className="text-neutral-500">
                                                    {caseStudy.testimonial.role}
                                                </Caption>
                                            </div>
                                        </div>
                                    </div>
                                </SectionReveal>
                            )}

                            {/* Key Learnings */}
                            <SectionReveal animation="fadeUp" delay={0.3}>
                                <div className="mt-12">
                                    <H3 className="text-2xl mb-6">Key Takeaways</H3>
                                    <div className="space-y-4">
                                        {[
                                            'User research is critical for understanding real pain points',
                                            'Iterative design leads to better solutions',
                                            'Collaboration with stakeholders ensures alignment',
                                        ].map((learning, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex items-start gap-3"
                                            >
                                                <div className="w-6 h-6 mt-1 bg-accent-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <div className="w-2 h-2 bg-accent-400 rounded-full" />
                                                </div>
                                                <Body className="text-neutral-300">{learning}</Body>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </SectionReveal>
                        </div>
                    </Container>
                </section>
            )}

            {/* Project Navigation */}
            <section className="py-24 bg-neutral-900">
                <Container>
                    <SectionReveal animation="fadeUp">
                        <ProjectNavigation currentProject={project} allProjects={projects} />
                    </SectionReveal>
                </Container>
            </section>
        </div>
    );
};

export default CaseStudy;
