import { FaLinkedin, FaGithub, FaDribbble, FaTwitter } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import Container from "./Container";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const footerLinks: FooterLink[] = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: <FaLinkedin className="w-5 h-5" />,
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: <FaGithub className="w-5 h-5" />,
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com",
    icon: <FaDribbble className="w-5 h-5" />,
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: <FaTwitter className="w-5 h-5" />,
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-neutral-950 pt-24 pb-12">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          {/* Minimalist Brand Statement */}
          <div className="max-w-xl">
            <a
              href="/"
              className="text-3xl font-bold tracking-tighter text-white mb-8 block">
              RK.
            </a>
            <h3 className="text-2xl md:text-4xl font-light text-neutral-300 leading-tight mb-8">
              Designing exceptional digital experiences that blend creativity
              with functionality.
            </h3>
            <a
              href="mailto:rishu3826@gmail.com"
              className="inline-flex items-center gap-2 text-white border-b border-white pb-1 hover:text-neutral-300 hover:border-neutral-300 transition-colors">
              rishu3826@gmail.com <MdArrowOutward />
            </a>
          </div>

          {/* Simple Grid Nav */}
          <div className="flex gap-16">
            <div>
              <span className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-6 block">
                Menu
              </span>
              <ul className="space-y-4">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className="text-neutral-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-6 block">
                Socials
              </span>
              <ul className="space-y-4">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Minimalist Bottom Bar */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600 uppercase tracking-widest">
          <p>© {currentYear} Rishu Kumar Sharma</p>
          <p>All Rights Reserved</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
