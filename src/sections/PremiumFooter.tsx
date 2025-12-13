import { motion } from 'framer-motion';
import { Container } from '../components/layout';
import { Caption } from '../components/ui';

export const PremiumFooter = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'LinkedIn', icon: 'in', href: 'https://linkedin.com' },
        { name: 'Behance', icon: 'be', href: 'https://behance.net' },
        { name: 'Dribbble', icon: 'dr', href: 'https://dribbble.com' },
        { name: 'GitHub', icon: 'gh', href: 'https://github.com' },
    ];

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="py-12 bg-neutral-950 border-t border-neutral-900"
        >
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Left: Copyright */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-center md:text-left"
                    >
                        <Caption className="text-neutral-500">
                            © {currentYear} All rights reserved
                        </Caption>
                        <Caption size="sm" className="text-neutral-600 mt-1">
                            Made with <span className="text-accent-400">React</span> & <span className="text-accent-400">Framer Motion</span>
                        </Caption>
                    </motion.div>

                    {/* Right: Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-4"
                    >
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center bg-neutral-900 border border-neutral-800 rounded-lg hover:border-accent-500 hover:bg-neutral-800 transition-all duration-200 group"
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                                whileHover={{ y: -4 }}
                                aria-label={social.name}
                            >
                                <Caption className="text-neutral-400 group-hover:text-accent-400 transition-colors font-bold">
                                    {social.icon}
                                </Caption>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </Container>
        </motion.footer>
    );
};

export default PremiumFooter;
