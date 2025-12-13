import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/layout';
import { Button, Input, Textarea } from '../components/ui';
import { ScrollReveal } from '../components/animations';

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

const contactInfo = [
    {
        label: 'Email',
        value: 'hello@example.com',
        href: 'mailto:hello@example.com',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
            </svg>
        ),
    },
    {
        label: 'Location',
        value: 'San Francisco, CA',
        href: null,
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        ),
    },
    {
        label: 'Availability',
        value: 'Open for freelance',
        href: null,
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
    },
];

export const Contact = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <section id="contact" className="py-32 bg-neutral-950">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left Column - Info */}
                    <div>
                        <ScrollReveal animation="fadeUp">
                            <span className="inline-block text-sm font-medium text-accent-400 uppercase tracking-wider mb-4">
                                Get in Touch
                            </span>
                        </ScrollReveal>

                        <ScrollReveal animation="fadeUp" delay={0.1}>
                            <h2 className="text-display-sm md:text-display-md font-bold text-neutral-50 mb-6">
                                Let's work together
                            </h2>
                        </ScrollReveal>

                        <ScrollReveal animation="fadeUp" delay={0.2}>
                            <p className="text-body-lg text-neutral-400 mb-12">
                                Have a project in mind? I'd love to hear about it. Send me a message
                                and let's create something amazing together.
                            </p>
                        </ScrollReveal>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            {contactInfo.map((item, index) => (
                                <ScrollReveal key={item.label} animation="fadeUp" delay={0.3 + index * 0.1}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 flex items-center justify-center bg-neutral-800 rounded-xl text-accent-400">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="text-sm text-neutral-500 mb-1">{item.label}</div>
                                            {item.href ? (
                                                <a
                                                    href={item.href}
                                                    className="text-neutral-100 hover:text-accent-400 transition-colors"
                                                >
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <span className="text-neutral-100">{item.value}</span>
                                            )}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <ScrollReveal animation="fadeLeft" delay={0.2}>
                        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-neutral-800 p-8">
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center h-full py-12 text-center"
                                >
                                    <div className="w-16 h-16 flex items-center justify-center bg-success-500/20 rounded-full text-success-500 mb-6">
                                        <svg
                                            className="w-8 h-8"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-neutral-50 mb-2">
                                        Message Sent!
                                    </h3>
                                    <p className="text-neutral-400">
                                        Thanks for reaching out. I'll get back to you soon.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <Input
                                        label="Name"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        error={errors.name}
                                    />

                                    <Input
                                        label="Email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                    />

                                    <Textarea
                                        label="Message"
                                        name="message"
                                        placeholder="Tell me about your project..."
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        error={errors.message}
                                    />

                                    <Button type="submit" fullWidth size="lg" isLoading={isSubmitting}>
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </ScrollReveal>
                </div>
            </Container>
        </section>
    );
};

export default Contact;
