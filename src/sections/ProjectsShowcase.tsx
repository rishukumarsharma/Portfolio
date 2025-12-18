import { Container } from "../components/layout";
import { ProjectGrid, H1, H2, Body, Caption } from "../components/ui";
import { SectionReveal } from "../components/ui/SectionReveal";

export const ProjectsShowcase = () => {
  return (
    <div className="min-h-screen bg-neutral-950 py-24">
      <Container>
        {/* Header Section */}
        <div className="text-center mb-16">
          <SectionReveal animation="fadeUp">
            <Caption label accent className="mb-4 block">
              Portfolio
            </Caption>
          </SectionReveal>

          <SectionReveal animation="fadeUp" delay={0.1}>
            <H1 className="mb-6">Selected Work</H1>
          </SectionReveal>

          <SectionReveal animation="fadeUp" delay={0.2}>
            <Body size="lg" muted maxWidth="lg" className="mx-auto">
              A collection of projects that showcase my approach to solving
              complex design challenges through research, iteration, and
              user-centered thinking.
            </Body>
          </SectionReveal>
        </div>

        {/* Project Grid with Bento Layout */}
        <SectionReveal animation="scale" delay={0.3}>
          <ProjectGrid layout="bento" showFilters={true} />
        </SectionReveal>

        {/* CTA Section */}
        <SectionReveal animation="fadeUp" delay={0.5}>
          <div className="mt-24 text-center">
            <H2 className="mb-6">Interested in working together?</H2>
            <Body muted className="mb-8">
              Let's discuss how I can help bring your product vision to life.
            </Body>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-accent-500/30 transition-all duration-200">
              Get in Touch
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </SectionReveal>
      </Container>
    </div>
  );
};

export default ProjectsShowcase;
