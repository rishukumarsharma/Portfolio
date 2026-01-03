import { useState } from "react";
import { Container } from "../components/layout";
import {
  AnimatedButton,
  ProjectCard,
  SectionReveal,
  GradientBlur,
  GradientBackground,
  H1,
  H2,
  H3,
  Body,
  Caption,
} from "../components/ui";

// Sample project data for demo
const sampleProjects = [
  {
    id: "1",
    title: "E-Commerce Redesign",
    subtitle: "UX/UI Design • Web Development",
    tags: ["React", "TypeScript", "Tailwind"],
    year: "2024",
    category: "Web Design",
    accentColor: "#8B5CF6",
  },
  {
    id: "2",
    title: "Mobile Banking App",
    subtitle: "Product Design • iOS & Android",
    tags: ["Figma", "React Native", "Fintech"],
    year: "2024",
    category: "Mobile App",
    accentColor: "#10B981",
  },
  {
    id: "3",
    title: "SaaS Dashboard",
    subtitle: "Design System • Data Viz",
    tags: ["Dashboard", "D3.js", "Analytics"],
    year: "2023",
    category: "Web App",
    accentColor: "#F59E0B",
  },
];

export const ComponentsDemo = () => {
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleLoadingDemo = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Hero with Gradient Background */}
      <GradientBackground className="min-h-[60vh] flex items-center">
        <Container>
          <SectionReveal animation="fadeUp">
            <Caption label accent className="mb-4 block">
              Component Library Demo
            </Caption>
          </SectionReveal>

          <SectionReveal animation="fadeUp" delay={0.1}>
            <H1 className="mb-6">
              Beautiful, Reusable
              <br />
              <span className="text-gradient">Components</span>
            </H1>
          </SectionReveal>

          <SectionReveal animation="fadeUp" delay={0.2}>
            <Body size="lg" muted maxWidth="lg" className="mb-8">
              A collection of animated, accessible, and customizable components
              built with React, TypeScript, Tailwind CSS, and Framer Motion.
            </Body>
          </SectionReveal>

          <SectionReveal animation="fadeUp" delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <AnimatedButton variant="primary" size="lg">
                Get Started
              </AnimatedButton>
              <AnimatedButton variant="outline" size="lg">
                View Source
              </AnimatedButton>
            </div>
          </SectionReveal>
        </Container>
      </GradientBackground>

      {/* Animated Buttons Section */}
      <section className="py-24 bg-neutral-900">
        <Container>
          <SectionReveal animation="fadeUp">
            <Caption label accent className="mb-4 block">
              Buttons
            </Caption>
            <H2 className="mb-4">AnimatedButton</H2>
            <Body muted maxWidth="lg" className="mb-12">
              Spring-based hover and tap animations with multiple variants,
              sizes, and loading states.
            </Body>
          </SectionReveal>

          {/* Button Variants */}
          <SectionReveal animation="fadeUp" delay={0.1}>
            <H3 className="mb-6 text-lg">Variants</H3>
            <div className="flex flex-wrap gap-4 mb-12">
              <AnimatedButton variant="primary">Primary</AnimatedButton>
              <AnimatedButton variant="secondary">Secondary</AnimatedButton>
              <AnimatedButton variant="ghost">Ghost</AnimatedButton>
              <AnimatedButton variant="outline">Outline</AnimatedButton>
              <AnimatedButton variant="glow">Glow</AnimatedButton>
            </div>
          </SectionReveal>

          {/* Button Sizes */}
          <SectionReveal animation="fadeUp" delay={0.2}>
            <H3 className="mb-6 text-lg">Sizes</H3>
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <AnimatedButton size="sm">Small</AnimatedButton>
              <AnimatedButton size="md">Medium</AnimatedButton>
              <AnimatedButton size="lg">Large</AnimatedButton>
              <AnimatedButton size="xl">Extra Large</AnimatedButton>
            </div>
          </SectionReveal>

          {/* Button States */}
          <SectionReveal animation="fadeUp" delay={0.3}>
            <H3 className="mb-6 text-lg">States & Icons</H3>
            <div className="flex flex-wrap items-center gap-4">
              <AnimatedButton
                isLoading={buttonLoading}
                onClick={handleLoadingDemo}
              >
                {buttonLoading ? "Loading..." : "Click for Loading"}
              </AnimatedButton>
              <AnimatedButton disabled>Disabled</AnimatedButton>
              <AnimatedButton
                leftIcon={
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                }
              >
                With Icon
              </AnimatedButton>
              <AnimatedButton
                variant="glow"
                rightIcon={
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
                }
              >
                Let's Go
              </AnimatedButton>
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* Project Cards Section */}
      <section className="py-24 bg-neutral-950">
        <Container>
          <SectionReveal animation="fadeUp">
            <Caption label accent className="mb-4 block">
              Cards
            </Caption>
            <H2 className="mb-4">ProjectCard</H2>
            <Body muted maxWidth="lg" className="mb-12">
              Hover-animated cards with image preview, lift effect, and smooth
              micro-interactions.
            </Body>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleProjects.map((project, index) => (
              <SectionReveal
                key={project.id}
                animation="fadeUp"
                delay={0.1 * index}
              >
                <ProjectCard
                  title={project.title}
                  subtitle={project.subtitle}
                  tags={project.tags}
                  year={project.year}
                  category={project.category}
                  accentColor={project.accentColor}
                  onClick={() => console.log("Clicked:", project.title)}
                />
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Section Reveal Demo */}
      <section className="py-24 bg-neutral-900 overflow-hidden">
        <Container>
          <SectionReveal animation="fadeUp">
            <Caption label accent className="mb-4 block">
              Animations
            </Caption>
            <H2 className="mb-4">SectionReveal</H2>
            <Body muted maxWidth="lg" className="mb-12">
              Viewport-triggered animations with multiple animation types.
              Scroll down to see them in action.
            </Body>
          </SectionReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(
              [
                "fadeUp",
                "fadeDown",
                "fadeLeft",
                "fadeRight",
                "scale",
                "blur",
                "slideUp",
                "rotate",
              ] as const
            ).map((animation, index) => (
              <SectionReveal
                key={animation}
                animation={animation}
                delay={index * 0.1}
                once={false}
              >
                <div className="p-6 bg-neutral-800 rounded-xl border border-neutral-700 text-center">
                  <Caption className="text-neutral-400 mb-2 block">
                    {animation}
                  </Caption>
                  <div className="w-12 h-12 mx-auto bg-accent-500/20 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-accent-500 rounded" />
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Gradient Blur Demo */}
      <section className="py-24 bg-neutral-950 relative overflow-hidden">
        {/* Background blurs */}
        <GradientBlur
          color="#d946ef"
          position="top-left"
          size="lg"
          opacity={15}
        />
        <GradientBlur
          color="#3b82f6"
          position="bottom-right"
          size="md"
          opacity={10}
        />

        <Container className="relative z-10">
          <SectionReveal animation="fadeUp">
            <Caption label accent className="mb-4 block">
              Decorative
            </Caption>
            <H2 className="mb-4">GradientBlur</H2>
            <Body muted maxWidth="lg" className="mb-12">
              Animated gradient orbs for beautiful background aesthetics.
              Customize colors, size, position, and animation.
            </Body>
          </SectionReveal>

          <SectionReveal animation="scale" delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { color: "#d946ef", label: "Accent" },
                { color: "#3b82f6", label: "Blue" },
                { color: "#10b981", label: "Green" },
                { color: "#f59e0b", label: "Orange" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="relative h-32 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800"
                >
                  <GradientBlur
                    color={item.color}
                    position="center"
                    size="sm"
                    opacity={40}
                    blur={60}
                    animate={false}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Caption>{item.label}</Caption>
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* Typography Demo */}
      <section className="py-24 bg-neutral-900">
        <Container>
          <SectionReveal animation="fadeUp">
            <Caption label accent className="mb-4 block">
              Text
            </Caption>
            <H2 className="mb-4">Typography</H2>
            <Body muted maxWidth="lg" className="mb-12">
              Consistent typography components with gradient support,
              animations, and semantic HTML.
            </Body>
          </SectionReveal>

          <div className="space-y-8">
            <SectionReveal animation="fadeUp" delay={0.1}>
              <div className="p-6 bg-neutral-800/50 rounded-xl border border-neutral-700">
                <Caption className="mb-4 block text-neutral-500">
                  H1 - Display Heading
                </Caption>
                <H1>The quick brown fox</H1>
              </div>
            </SectionReveal>

            <SectionReveal animation="fadeUp" delay={0.15}>
              <div className="p-6 bg-neutral-800/50 rounded-xl border border-neutral-700">
                <Caption className="mb-4 block text-neutral-500">
                  H2 - Section Heading
                </Caption>
                <H2>The quick brown fox jumps</H2>
              </div>
            </SectionReveal>

            <SectionReveal animation="fadeUp" delay={0.2}>
              <div className="p-6 bg-neutral-800/50 rounded-xl border border-neutral-700">
                <Caption className="mb-4 block text-neutral-500">
                  H3 - Subsection Heading
                </Caption>
                <H3>The quick brown fox jumps over the lazy dog</H3>
              </div>
            </SectionReveal>

            <SectionReveal animation="fadeUp" delay={0.25}>
              <div className="p-6 bg-neutral-800/50 rounded-xl border border-neutral-700">
                <Caption className="mb-4 block text-neutral-500">
                  H1 with Gradient
                </Caption>
                <H1 gradient>Gradient Text Effect</H1>
              </div>
            </SectionReveal>

            <SectionReveal animation="fadeUp" delay={0.3}>
              <div className="p-6 bg-neutral-800/50 rounded-xl border border-neutral-700">
                <Caption className="mb-4 block text-neutral-500">
                  Body Text
                </Caption>
                <Body size="lg" className="mb-2">
                  Large body text for emphasis
                </Body>
                <Body className="mb-2">Regular body text for content</Body>
                <Body size="sm" muted>
                  Small muted text for secondary info
                </Body>
              </div>
            </SectionReveal>

            <SectionReveal animation="fadeUp" delay={0.35}>
              <div className="p-6 bg-neutral-800/50 rounded-xl border border-neutral-700">
                <Caption className="mb-4 block text-neutral-500">
                  Caption & Labels
                </Caption>
                <div className="flex flex-wrap gap-4">
                  <Caption>Regular Caption</Caption>
                  <Caption accent>Accent Caption</Caption>
                  <Caption label>Label Style</Caption>
                  <Caption label accent>
                    Accent Label
                  </Caption>
                </div>
              </div>
            </SectionReveal>
          </div>
        </Container>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-neutral-950">
        <Container>
          <SectionReveal animation="scale">
            <div className="text-center max-w-2xl mx-auto">
              <H2 className="mb-6">Ready to Build?</H2>
              <Body muted className="mb-8">
                These components are fully customizable and ready to use in your
                projects. Start building beautiful interfaces today.
              </Body>
              <div className="flex flex-wrap justify-center gap-4">
                <AnimatedButton variant="primary" size="lg">
                  View Documentation
                </AnimatedButton>
                <AnimatedButton variant="ghost" size="lg">
                  Back to Home
                </AnimatedButton>
              </div>
            </div>
          </SectionReveal>
        </Container>
      </section>
    </div>
  );
};

export default ComponentsDemo;
