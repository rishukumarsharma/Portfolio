import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "../components/layout";
import {
  H1,
  H2,
  H3,
  Body,
  Caption,
  ImageShowcase,
  ProjectBrief,
  BeforeAfterSlider,
  ProcessGallery,
} from "../components/ui";
import { ParallaxImage } from "../components/ui/ParallaxImage";
import { CountUpMetric } from "../components/ui/CountUpMetric";
import { FloatingBackButton } from "../components/ui/FloatingBackButton";
import { ProjectNavigation } from "../components/ui/ProjectNavigation";
import { SectionReveal } from "../components/ui/SectionReveal";
import projectsData from "../data/projects.json";

interface CaseStudyProject {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  description: string;
  tags: string[];
  year: string;
  color?: string;
  imageShowcase?: string[];
  heroImage?: string;
  brief?: {
    problem: string;
    solution: string;
    impact: string;
  };
  beforeAfter?: {
    before: string;
    after: string;
    caption?: string;
  };
  processImages?: Array<{
    url: string;
    caption: string;
    category: "Wireframes" | "Flows" | "Sketches" | "Research";
  }>;
  metrics?: Record<string, string>;
  caseStudy?: {
    overview?: {
      role: string;
      timeline: string;
      team?: string;
      deliverables?: string[];
    };
    challenge: string;
    problemDetails?: {
      keyIssues?: string[];
      whyItMatters?: string;
      userPainPoints?: string[];
    };
    users?: {
      primaryUsers?: string;
      constraints?: string[];
    };
    process?: {
      research?: string;
      keyInsights?: string[];
      designDecisions?: Array<{
        decision: string;
        rationale: string;
        tradeoff: string;
      }>;
    };
    solution: string;
    solutionDetails?: {
      coreFeatures?: string[];
      designSystem?: string;
      technicalOptimizations?: string;
      technicalImplementation?: string;
      accessibilityFeatures?: string;
      aiExplainability?: string;
    };
    impact: string;
    testimonial?: {
      quote: string;
      author: string;
      role: string;
    };
    learnings?: {
      whatWorked?: string[];
      whatIWouldImprove?: string[];
    };
    images?: string[];
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
      <ParallaxImage alt={project.title} className="h-screen" speed={0.5}>
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
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
          >
            <H1 className="mb-4">{project.title}</H1>
            {project.subtitle && (
              <Body size="lg" className="text-accent-400 mb-4">
                {project.subtitle}
              </Body>
            )}
            <Body size="lg" className="text-neutral-300 max-w-3xl">
              {project.description}
            </Body>
          </motion.div>

          {/* Metrics Cards */}
          {project.metrics && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {Object.entries(project.metrics)
                .slice(0, 4)
                .map(([key, value], index) => (
                  <CountUpMetric
                    key={key}
                    value={value}
                    label={key}
                    delay={0.8 + index * 0.1}
                    className="p-6 bg-neutral-900/60 backdrop-blur-sm rounded-xl border border-neutral-800"
                  />
                ))}
            </div>
          )}
        </Container>
      </ParallaxImage>

      {/* Project Brief (TL;DR) */}
      {project.brief && (
        <section className="py-12 bg-neutral-950">
          <Container>
            <ProjectBrief
              problem={project.brief.problem}
              solution={project.brief.solution}
              impact={project.brief.impact}
            />
          </Container>
        </section>
      )}

      {/* Project Overview Section */}
      {caseStudy?.overview && (
        <section className="py-24 bg-neutral-900">
          <Container>
            <div className="max-w-4xl mx-auto">
              <SectionReveal animation="fadeUp">
                <Caption label accent className="mb-4 block">
                  Project Overview
                </Caption>
                <H2 className="mb-16">Role & Context</H2>
              </SectionReveal>

              <div className="grid md:grid-cols-3 gap-8">
                <SectionReveal animation="fadeUp" delay={0.1}>
                  <div>
                    <Caption className="mb-2 text-neutral-500">My Role</Caption>
                    <Body className="text-neutral-200">
                      {caseStudy.overview.role}
                    </Body>
                  </div>
                </SectionReveal>

                <SectionReveal animation="fadeUp" delay={0.2}>
                  <div>
                    <Caption className="mb-2 text-neutral-500">
                      Timeline
                    </Caption>
                    <Body className="text-neutral-200">
                      {caseStudy.overview.timeline}
                    </Body>
                  </div>
                </SectionReveal>

                <SectionReveal animation="fadeUp" delay={0.3}>
                  <div>
                    <Caption className="mb-2 text-neutral-500">
                      Category
                    </Caption>
                    <Body className="text-neutral-200">{project.category}</Body>
                  </div>
                </SectionReveal>
              </div>

              {caseStudy.overview.team && (
                <SectionReveal animation="fadeUp" delay={0.4}>
                  <div className="mt-8 p-6 bg-neutral-800/50 rounded-xl border border-neutral-700">
                    <Caption className="mb-2 text-neutral-500">Team</Caption>
                    <Body className="text-neutral-200">
                      {caseStudy.overview.team}
                    </Body>
                  </div>
                </SectionReveal>
              )}

              {caseStudy.overview.deliverables &&
                caseStudy.overview.deliverables.length > 0 && (
                  <SectionReveal animation="fadeUp" delay={0.5}>
                    <div className="mt-8">
                      <Caption className="mb-4 text-neutral-500">
                        Key Deliverables
                      </Caption>
                      <div className="flex flex-wrap gap-2">
                        {caseStudy.overview.deliverables.map((deliverable) => (
                          <span
                            key={deliverable}
                            className="px-3 py-1.5 text-sm bg-neutral-800 text-neutral-300 rounded-lg border border-neutral-700"
                          >
                            {deliverable}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SectionReveal>
                )}
            </div>
          </Container>
        </section>
      )}

      {/* Problem Section */}
      {caseStudy && (
        <section className="py-24 bg-neutral-950">
          <Container>
            <div className="max-w-4xl mx-auto">
              <SectionReveal animation="fadeUp">
                <Caption label accent className="mb-4 block">
                  The Problem
                </Caption>
                <H2 className="mb-16">Understanding the Challenge</H2>
              </SectionReveal>

              <SectionReveal animation="fadeUp" delay={0.1}>
                <div className="mb-12">
                  <H3 className="text-2xl mb-4">The Challenge</H3>
                  <Body size="lg" className="text-neutral-300 leading-relaxed">
                    {caseStudy.challenge}
                  </Body>
                </div>
              </SectionReveal>

              {caseStudy.problemDetails?.keyIssues &&
                caseStudy.problemDetails.keyIssues.length > 0 && (
                  <SectionReveal animation="fadeUp" delay={0.2}>
                    <div className="mb-12">
                      <H3 className="text-2xl mb-6">Key Issues Identified</H3>
                      <div className="space-y-4">
                        {caseStudy.problemDetails.keyIssues.map(
                          (issue, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3 p-4 bg-neutral-900/50 rounded-lg border border-neutral-800"
                            >
                              <div className="w-6 h-6 mt-1 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <div className="w-2 h-2 bg-red-400 rounded-full" />
                              </div>
                              <Body className="text-neutral-300">{issue}</Body>
                            </motion.div>
                          ),
                        )}
                      </div>
                    </div>
                  </SectionReveal>
                )}

              {caseStudy.problemDetails?.whyItMatters && (
                <SectionReveal animation="fadeUp" delay={0.3}>
                  <div className="mb-12 p-6 bg-gradient-to-br from-accent-500/10 to-transparent rounded-2xl border border-accent-500/20">
                    <H3 className="text-xl mb-4 text-accent-400">
                      Why It Mattered
                    </H3>
                    <Body className="text-neutral-200 leading-relaxed">
                      {caseStudy.problemDetails.whyItMatters}
                    </Body>
                  </div>
                </SectionReveal>
              )}

              {caseStudy.problemDetails?.userPainPoints &&
                caseStudy.problemDetails.userPainPoints.length > 0 && (
                  <SectionReveal animation="fadeUp" delay={0.4}>
                    <div>
                      <H3 className="text-2xl mb-6">User Pain Points</H3>
                      <div className="space-y-3">
                        {caseStudy.problemDetails.userPainPoints.map(
                          (painPoint, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.05 }}
                              className="p-4 bg-neutral-900/70 rounded-lg border-l-4 border-accent-500"
                            >
                              <Body
                                size="sm"
                                className="text-neutral-300 italic"
                              >
                                "{painPoint}"
                              </Body>
                            </motion.div>
                          ),
                        )}
                      </div>
                    </div>
                  </SectionReveal>
                )}
            </div>
          </Container>
        </section>
      )}

      {/* Before/After Comparison */}
      {project.beforeAfter && (
        <section className="py-24 bg-neutral-900">
          <Container>
            <div className="max-w-5xl mx-auto">
              <SectionReveal animation="fadeUp">
                <Caption label accent className="mb-4 block text-center">
                  Transformation
                </Caption>
                <H2 className="mb-12 text-center">Before & After</H2>
              </SectionReveal>

              <SectionReveal animation="scale" delay={0.2}>
                <BeforeAfterSlider
                  beforeImage={project.beforeAfter.before}
                  afterImage={project.beforeAfter.after}
                  caption={project.beforeAfter.caption}
                />
              </SectionReveal>
            </div>
          </Container>
        </section>
      )}

      {/* Users & Constraints Section */}
      {caseStudy?.users && (
        <section className="py-24 bg-neutral-900">
          <Container>
            <div className="max-w-4xl mx-auto">
              <SectionReveal animation="fadeUp">
                <Caption label accent className="mb-4 block">
                  Context
                </Caption>
                <H2 className="mb-16">Users & Constraints</H2>
              </SectionReveal>

              {caseStudy.users.primaryUsers && (
                <SectionReveal animation="fadeUp" delay={0.1}>
                  <div className="mb-8">
                    <H3 className="text-2xl mb-4">Primary Users</H3>
                    <Body className="text-neutral-300 leading-relaxed">
                      {caseStudy.users.primaryUsers}
                    </Body>
                  </div>
                </SectionReveal>
              )}

              {caseStudy.users.constraints &&
                caseStudy.users.constraints.length > 0 && (
                  <SectionReveal animation="fadeUp" delay={0.2}>
                    <div>
                      <H3 className="text-2xl mb-6">Key Constraints</H3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {caseStudy.users.constraints.map(
                          (constraint, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.95 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.05 }}
                              className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700"
                            >
                              <Body size="sm" className="text-neutral-300">
                                {constraint}
                              </Body>
                            </motion.div>
                          ),
                        )}
                      </div>
                    </div>
                  </SectionReveal>
                )}
            </div>
          </Container>
        </section>
      )}

      {/* Process Section */}
      {caseStudy?.process && (
        <section className="py-24 bg-neutral-950">
          <Container>
            <div className="max-w-4xl mx-auto">
              <SectionReveal animation="fadeUp">
                <Caption label accent className="mb-4 block">
                  Methodology
                </Caption>
                <H2 className="mb-16">Design Process</H2>
              </SectionReveal>

              {caseStudy.process.research && (
                <SectionReveal animation="fadeUp" delay={0.1}>
                  <div className="mb-12">
                    <H3 className="text-2xl mb-4">Research & Discovery</H3>
                    <Body className="text-neutral-300 leading-relaxed">
                      {caseStudy.process.research}
                    </Body>
                  </div>
                </SectionReveal>
              )}

              {caseStudy.process.keyInsights &&
                caseStudy.process.keyInsights.length > 0 && (
                  <SectionReveal animation="fadeUp" delay={0.2}>
                    <div className="mb-12">
                      <H3 className="text-2xl mb-6">Key Insights</H3>
                      <div className="space-y-3">
                        {caseStudy.process.keyInsights.map((insight, index) => (
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
                            <Body className="text-neutral-300">{insight}</Body>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </SectionReveal>
                )}

              {caseStudy.process.designDecisions &&
                caseStudy.process.designDecisions.length > 0 && (
                  <SectionReveal animation="fadeUp" delay={0.3}>
                    <div>
                      <H3 className="text-2xl mb-6">Key Design Decisions</H3>
                      <div className="space-y-6">
                        {caseStudy.process.designDecisions.map(
                          (decision, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                              className="p-6 bg-neutral-900/70 rounded-xl border border-neutral-800"
                            >
                              <H3 className="text-lg text-accent-400 mb-3">
                                {decision.decision}
                              </H3>
                              <div className="space-y-3">
                                <div>
                                  <Caption className="text-neutral-500 mb-1">
                                    Rationale:
                                  </Caption>
                                  <Body size="sm" className="text-neutral-300">
                                    {decision.rationale}
                                  </Body>
                                </div>
                                <div>
                                  <Caption className="text-neutral-500 mb-1">
                                    Trade-off:
                                  </Caption>
                                  <Body size="sm" className="text-neutral-400">
                                    {decision.tradeoff}
                                  </Body>
                                </div>
                              </div>
                            </motion.div>
                          ),
                        )}
                      </div>
                    </div>
                  </SectionReveal>
                )}
            </div>
          </Container>
        </section>
      )}

      {/* Process Visuals */}
      {project.processImages && project.processImages.length > 0 && (
        <section className="py-24 bg-neutral-900">
          <Container>
            <div className="max-w-6xl mx-auto">
              <SectionReveal animation="fadeUp">
                <Caption label accent className="mb-4 block">
                  Design Artifacts
                </Caption>
                <H2 className="mb-12">Process Visuals</H2>
              </SectionReveal>

              <SectionReveal animation="fadeUp" delay={0.2}>
                <ProcessGallery images={project.processImages} />
              </SectionReveal>
            </div>
          </Container>
        </section>
      )}

      {/* Solution Section */}
      {caseStudy && (
        <section className="py-24 bg-neutral-900">
          <Container>
            <div className="max-w-4xl mx-auto">
              <SectionReveal animation="fadeUp">
                <Caption label accent className="mb-4 block">
                  The Solution
                </Caption>
                <H2 className="mb-16">Design Solution</H2>
              </SectionReveal>

              <SectionReveal animation="fadeUp" delay={0.1}>
                <div className="mb-12">
                  <Body size="lg" className="text-neutral-200 leading-relaxed">
                    {caseStudy.solution}
                  </Body>
                </div>
              </SectionReveal>

              {caseStudy.solutionDetails?.coreFeatures &&
                caseStudy.solutionDetails.coreFeatures.length > 0 && (
                  <SectionReveal animation="fadeUp" delay={0.2}>
                    <div className="mb-12">
                      <H3 className="text-2xl mb-6">Core Features</H3>
                      <div className="space-y-4">
                        {caseStudy.solutionDetails.coreFeatures.map(
                          (feature, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-start gap-3 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700"
                            >
                              <div className="w-6 h-6 mt-1 bg-accent-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                ✓
                              </div>
                              <Body size="sm" className="text-neutral-300">
                                {feature}
                              </Body>
                            </motion.div>
                          ),
                        )}
                      </div>
                    </div>
                  </SectionReveal>
                )}

              {/* Additional solution details */}
              <div className="space-y-8">
                {caseStudy.solutionDetails?.designSystem && (
                  <SectionReveal animation="fadeUp" delay={0.3}>
                    <div className="p-6 bg-neutral-800/30 rounded-xl border border-neutral-700">
                      <H3 className="text-lg mb-3">Design System</H3>
                      <Body size="sm" className="text-neutral-300">
                        {caseStudy.solutionDetails.designSystem}
                      </Body>
                    </div>
                  </SectionReveal>
                )}

                {caseStudy.solutionDetails?.technicalOptimizations && (
                  <SectionReveal animation="fadeUp" delay={0.35}>
                    <div className="p-6 bg-neutral-800/30 rounded-xl border border-neutral-700">
                      <H3 className="text-lg mb-3">Technical Optimizations</H3>
                      <Body size="sm" className="text-neutral-300">
                        {caseStudy.solutionDetails.technicalOptimizations}
                      </Body>
                    </div>
                  </SectionReveal>
                )}

                {caseStudy.solutionDetails?.accessibilityFeatures && (
                  <SectionReveal animation="fadeUp" delay={0.4}>
                    <div className="p-6 bg-neutral-800/30 rounded-xl border border-neutral-700">
                      <H3 className="text-lg mb-3">Accessibility Features</H3>
                      <Body size="sm" className="text-neutral-300">
                        {caseStudy.solutionDetails.accessibilityFeatures}
                      </Body>
                    </div>
                  </SectionReveal>
                )}

                {caseStudy.solutionDetails?.aiExplainability && (
                  <SectionReveal animation="fadeUp" delay={0.45}>
                    <div className="p-6 bg-neutral-800/30 rounded-xl border border-neutral-700">
                      <H3 className="text-lg mb-3">AI Explainability</H3>
                      <Body size="sm" className="text-neutral-300">
                        {caseStudy.solutionDetails.aiExplainability}
                      </Body>
                    </div>
                  </SectionReveal>
                )}

                {caseStudy.solutionDetails?.technicalImplementation && (
                  <SectionReveal animation="fadeUp" delay={0.5}>
                    <div className="p-6 bg-neutral-800/30 rounded-xl border border-neutral-700">
                      <H3 className="text-lg mb-3">Technical Implementation</H3>
                      <Body size="sm" className="text-neutral-300">
                        {caseStudy.solutionDetails.technicalImplementation}
                      </Body>
                    </div>
                  </SectionReveal>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Product Showcase Section */}
      {project.imageShowcase && project.imageShowcase.length > 0 && (
        <section className="py-24 bg-neutral-900">
          <Container>
            <div className="max-w-4xl mx-auto">
              <SectionReveal animation="fadeUp">
                <ImageShowcase
                  images={project.imageShowcase}
                  projectTitle={project.title}
                />
              </SectionReveal>
            </div>
          </Container>
        </section>
      )}

      {/* Impact Section */}
      {caseStudy && (
        <section className="py-24 bg-neutral-950">
          <Container>
            <div className="max-w-4xl mx-auto">
              <SectionReveal animation="fadeUp">
                <Caption label accent className="mb-4 block">
                  Results
                </Caption>
                <H2 className="mb-16">Impact & Outcome</H2>
              </SectionReveal>

              <SectionReveal animation="fadeUp" delay={0.1}>
                <div className="p-8 bg-gradient-to-br from-accent-500/10 to-transparent rounded-2xl border border-accent-500/20 mb-12">
                  <Body size="lg" className="text-neutral-200 leading-relaxed">
                    {caseStudy.impact}
                  </Body>
                </div>
              </SectionReveal>

              {caseStudy.testimonial && (
                <SectionReveal animation="fadeUp" delay={0.2}>
                  <div className="p-8 bg-neutral-900/70 rounded-2xl border border-neutral-800">
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
            </div>
          </Container>
        </section>
      )}

      {/* Learnings Section */}
      {caseStudy?.learnings && (
        <section className="py-24 bg-neutral-900">
          <Container>
            <div className="max-w-4xl mx-auto">
              <SectionReveal animation="fadeUp">
                <Caption label accent className="mb-4 block">
                  Reflection
                </Caption>
                <H2 className="mb-16">Learnings & Takeaways</H2>
              </SectionReveal>

              <div className="grid md:grid-cols-2 gap-8">
                {caseStudy.learnings.whatWorked &&
                  caseStudy.learnings.whatWorked.length > 0 && (
                    <SectionReveal animation="fadeUp" delay={0.1}>
                      <div>
                        <H3 className="text-2xl mb-6 text-green-400">
                          What Worked Well
                        </H3>
                        <div className="space-y-4">
                          {caseStudy.learnings.whatWorked.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <div className="w-6 h-6 mt-1 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <div className="w-2 h-2 bg-green-400 rounded-full" />
                              </div>
                              <Body size="sm" className="text-neutral-300">
                                {item}
                              </Body>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </SectionReveal>
                  )}

                {caseStudy.learnings.whatIWouldImprove &&
                  caseStudy.learnings.whatIWouldImprove.length > 0 && (
                    <SectionReveal animation="fadeUp" delay={0.2}>
                      <div>
                        <H3 className="text-2xl mb-6 text-orange-400">
                          What I'd Improve
                        </H3>
                        <div className="space-y-4">
                          {caseStudy.learnings.whatIWouldImprove.map(
                            (item, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-3"
                              >
                                <div className="w-6 h-6 mt-1 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                                </div>
                                <Body size="sm" className="text-neutral-300">
                                  {item}
                                </Body>
                              </motion.div>
                            ),
                          )}
                        </div>
                      </div>
                    </SectionReveal>
                  )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Project Navigation */}
      <section className="py-24 bg-neutral-950">
        <Container>
          <SectionReveal animation="fadeUp">
            <ProjectNavigation
              currentProject={project}
              allProjects={projects}
            />
          </SectionReveal>
        </Container>
      </section>
    </div>
  );
};

export default CaseStudy;
