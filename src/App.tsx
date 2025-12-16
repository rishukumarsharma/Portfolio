import * as React from 'react';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Header, Footer } from './components/layout';
import { Hero, About, Work, Contact } from './sections';
import { generateSEO, generatePersonSchema, injectStructuredData } from './utils/seo';

// Lazy load route components for code-splitting
const ComponentsDemo = lazy(() => import('./sections/ComponentsDemo'));
const PremiumPortfolio = lazy(() => import('./sections/PremiumPortfolio'));
const ProjectsShowcase = lazy(() => import('./sections/ProjectsShowcase'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));

// Home page with all sections
const HomePage = () => (
  <div>
    <div id="home" className="scroll-mt-20">
      <Hero />
    </div>

    <div id="about" className="scroll-mt-20">
      <About />
    </div>

    <div id="work" className="scroll-mt-20">
      <Work />
    </div>

    <div id="contact" className="scroll-mt-20">
      <Contact />
    </div>
  </div>
);

// Layout wrapper to conditionally render header/footer
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isPremiumPage = location.pathname === '/premium';

  return (
    <div className="app">
      {!isPremiumPage && <Header />}
      <main>{children}</main>
      {!isPremiumPage && <Footer />}
    </div>
  );
};

const App = () => {
  const helmetContext = {};
  const seo = generateSEO({
    title: 'Rishu Kumar Sharma',
    description:
      'A creative portfolio showcasing design and development work. Explore projects, learn about my process, and get in touch.',
  });

  // Inject structured data for Person schema
  React.useEffect(() => {
    const cleanup = injectStructuredData(generatePersonSchema());
    return cleanup;
  }, []);

  return (
    <HelmetProvider context={helmetContext}>
      <Helmet>
        <title>{seo.title}</title>
        {seo.meta.map((metaTag, index) => (
          <meta key={index} {...metaTag} />
        ))}
        {seo.link.map((linkTag, index) => (
          <link key={index} {...linkTag} />
        ))}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <Router>
        <Layout>
          <Suspense
            fallback={
              <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <div className="text-neutral-500">Loading...</div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/demo" element={<ComponentsDemo />} />
              <Route path="/premium" element={<PremiumPortfolio />} />
              <Route path="/projects" element={<ProjectsShowcase />} />
              <Route path="/case-study/:projectId" element={<CaseStudy />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </HelmetProvider>
  );
};

export default App;
