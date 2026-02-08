import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { clsx } from "clsx";
import Container from "./Container";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const prevLocationRef = useRef(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    if (prevLocationRef.current !== location.pathname) {
      prevLocationRef.current = location.pathname;
      queueMicrotask(() => setIsMobileMenuOpen(false));
    }
  }, [location.pathname]);

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-neutral-950/90 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6",
      )}>
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tighter text-white mix-blend-difference z-50">
            RK.
          </Link>

          {/* Desktop Navigation - Minimalist */}
          <div className="hidden md:flex items-center gap-12">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA Button - Minimalist Link */}
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("/#contact");
              }}
              className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-neutral-300 transition-colors">
              Let's Talk
              <MdArrowOutward className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button - Minimalist Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-8 h-4 flex flex-col justify-between z-50"
            aria-label="Toggle menu">
            <span
              className={clsx(
                "w-full h-[2px] bg-white transition-all duration-300",
                isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : "",
              )}
            />
            <span
              className={clsx(
                "w-full h-[2px] bg-white transition-all duration-300",
                isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : "",
              )}
            />
          </button>
        </nav>
      </Container>

      {/* Mobile Menu - Minimalist Full Screen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-neutral-950 z-40 flex items-center justify-center">
            <Container>
              <ul className="flex flex-col items-center space-y-8">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className="text-4xl font-bold tracking-tighter text-white hover:text-neutral-400 transition-colors">
                      {item.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}>
                  <a
                    href="/#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("/#contact");
                    }}
                    className="inline-flex items-center gap-2 mt-8 text-xl font-medium text-white/70">
                    Let's Talk
                    <MdArrowOutward className="w-5 h-5" />
                  </a>
                </motion.li>
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
