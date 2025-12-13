import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingLabelInput } from '../components/ui/FloatingLabelInput';
import { H2, Body, Caption } from '../components/ui';
import { Container } from '../components/layout';
import { SectionReveal } from '../components/ui/SectionReveal';

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export const PremiumContact = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call (replace with EmailJS or Formspree)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSuccess(true);

        // Reset form after success
        setTimeout(() => {
            setFormData({ name: '', email: '', message: '' });
            setIsSuccess(false);
        }, 5000);
    };

    const contactOptions = [
        {
            icon: '📧',
            label: 'Email',
            value: 'hello@example.com',
            href: 'mailto:hello@example.com',
        },
        {
            icon: '💼',
            label: 'LinkedIn',
            value: 'Connect with me',
            href: 'https://linkedin.com',
        },
        {
            icon: '🎨',
            label: 'Behance',
            value: 'View portfolio',
            href: 'https://behance.net',
        },
        {
            icon: '📅',
            label: 'Schedule Call',
            value: 'Book a meeting',
            href: 'https://calendly.com',
        },
    ];

    return (
        <section id="contact" className="py-24 bg-neutral-950 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-neutral-950" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-3xl" />

            <Container className="relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <SectionReveal animation="fadeUp">
                            <Caption label accent className="mb-4 block">
                                Get in Touch
                            </Caption>
                        </SectionReveal>

                        <SectionReveal animation="fadeUp" delay={0.1}>
                            <H2 className="mb-6">Let's Work Together</H2>
                        </SectionReveal>

                        <SectionReveal animation="fadeUp" delay={0.2}>
                            <Body size="lg" muted className="max-w-2xl mx-auto">
                                Have a project in mind? I'd love to hear about it. Send me a message
                                and I'll get back to you as soon as possible.
                            </Body>
                        </SectionReveal>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <SectionReveal animation="fadeUp" delay={0.3}>
                            <div className="relative">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <FloatingLabelInput
                                        id="name"
                                        label="Your Name"
                                        value={formData.name}
                                        onChange={(value: string) => {
                                            setFormData({ ...formData, name: value });
                                            if (errors.name) setErrors({ ...errors, name: undefined });
                                        }}
                                        error={errors.name}
                                        required
                                    />

                                    <FloatingLabelInput
                                        id="email"
                                        label="Email Address"
                                        type="email"
                                        value={formData.email}
                                        onChange={(value: string) => {
                                            setFormData({ ...formData, email: value });
                                            if (errors.email) setErrors({ ...errors, email: undefined });
                                        }}
                                        error={errors.email}
                                        required
                                    />

                                    <FloatingLabelInput
                                        id="message"
                                        label="Your Message"
                                        type="textarea"
                                        rows={6}
                                        value={formData.message}
                                        onChange={(value: string) => {
                                            setFormData({ ...formData, message: value });
                                            if (errors.message) setErrors({ ...errors, message: undefined });
                                        }}
                                        error={errors.message}
                                        required
                                    />

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting || isSuccess}
                                        className="w-full px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                                        whileHover={!isSubmitting && !isSuccess ? { scale: 1.02 } : {}}
                                        whileTap={!isSubmitting && !isSuccess ? { scale: 0.98 } : {}}
                                    >
                                        {/* Button background shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                        <span className="relative flex items-center justify-center gap-2">
                                            {isSubmitting ? (
                                                <>
                                                    <svg
                                                        className="animate-spin h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        />
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        />
                                                    </svg>
                                                    Sending...
                                                </>
                                            ) : isSuccess ? (
                                                <>
                                                    <motion.svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </motion.svg>
                                                    Message Sent!
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                        />
                                                    </svg>
                                                </>
                                            )}
                                        </span>
                                    </motion.button>
                                </form>

                                {/* Success celebration animation */}
                                <AnimatePresence>
                                    {isSuccess && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="absolute inset-0 flex items-center justify-center bg-neutral-900/95 backdrop-blur-sm rounded-2xl"
                                        >
                                            <div className="text-center">
                                                <motion.div
                                                    className="text-6xl mb-4"
                                                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    🎉
                                                </motion.div>
                                                <H2 className="text-2xl mb-2">Thank You!</H2>
                                                <Body muted>I'll get back to you soon.</Body>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </SectionReveal>

                        {/* Contact Options */}
                        <SectionReveal animation="fadeUp" delay={0.4}>
                            <div className="space-y-6">
                                <div>
                                    <Caption className="mb-4 text-neutral-400">Other Ways to Connect</Caption>
                                    <div className="space-y-3">
                                        {contactOptions.map((option, index) => (
                                            <motion.a
                                                key={option.label}
                                                href={option.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block p-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-accent-500/50 transition-all duration-200 group"
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 }}
                                                whileHover={{ x: 4 }}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="text-3xl">{option.icon}</div>
                                                    <div className="flex-1">
                                                        <Caption className="text-neutral-300 font-medium mb-1">
                                                            {option.label}
                                                        </Caption>
                                                        <Body size="sm" className="text-neutral-500 group-hover:text-accent-400 transition-colors">
                                                            {option.value}
                                                        </Body>
                                                    </div>
                                                    <svg
                                                        className="w-5 h-5 text-neutral-600 group-hover:text-accent-400 transition-colors"
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
                                                </div>
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>

                                {/* Download Resume */}
                                <div className="pt-6">
                                    <Caption className="mb-4 text-neutral-400">Resources</Caption>
                                    <motion.button
                                        onClick={() => {
                                            // Trigger download animation
                                            console.log('Download resume');
                                        }}
                                        className="w-full p-4 bg-gradient-to-r from-accent-500/10 to-accent-600/10 border border-accent-500/30 rounded-xl hover:border-accent-500 transition-all duration-200 group"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="text-3xl">📄</div>
                                                <div className="text-left">
                                                    <Caption className="text-accent-400 font-medium mb-1">
                                                        Resume / CV
                                                    </Caption>
                                                    <Body size="sm" className="text-neutral-500">
                                                        Download PDF (245 KB)
                                                    </Body>
                                                </div>
                                            </div>
                                            <motion.svg
                                                className="w-5 h-5 text-accent-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                whileHover={{ y: 2 }}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                />
                                            </motion.svg>
                                        </div>
                                    </motion.button>
                                </div>
                            </div>
                        </SectionReveal>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default PremiumContact;
