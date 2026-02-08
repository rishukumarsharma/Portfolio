import { useState } from "react";
import { motion } from "framer-motion";
import {
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineLocationOn,
  MdCheckCircle,
} from "react-icons/md";
import { Container } from "../components/layout";
import { Button } from "../components/ui";
import { ScrollReveal } from "../components/animations";
import profileData from "../data/profile.json";

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
    label: "Email",
    value: profileData.contact.email,
    href: `mailto:${profileData.contact.email}`,
    icon: <MdOutlineEmail className="w-5 h-5" />,
  },
  {
    label: "Phone",
    value: profileData.contact.phone,
    href: `tel:${profileData.contact.phone}`,
    icon: <MdOutlinePhone className="w-5 h-5" />,
  },
  {
    label: "Location",
    value: profileData.location,
    href: null,
    icon: <MdOutlineLocationOn className="w-5 h-5" />,
  },
];

export const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    );
    const mailtoLink = `mailto:${profileData.contact.email}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      className="py-32 bg-neutral-950 border-t border-neutral-900">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          {/* Left Column - Minimalist Info */}
          <div>
            <ScrollReveal animation="fadeUp">
              <h2
                className="text-[10vw] lg:text-[6vw] leading-none font-bold tracking-tighter text-neutral-100 mb-12"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                GET IN
                <br />
                TOUCH
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={0.1}>
              <p className="text-xl md:text-2xl text-neutral-400 font-light mb-16 max-w-lg leading-relaxed">
                Have a project in mind? Let's collaborate to build something
                exceptional.
              </p>
            </ScrollReveal>

            {/* Contact Info - Minimalist List */}
            <div className="space-y-8">
              {contactInfo.map((item, index) => (
                <ScrollReveal
                  key={item.label}
                  animation="fadeUp"
                  delay={0.2 + index * 0.1}>
                  <div className="group">
                    <span className="block text-sm text-neutral-500 mb-1 uppercase tracking-wider">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-2xl md:text-3xl text-neutral-200 hover:text-white transition-colors font-medium">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-2xl md:text-3xl text-neutral-200 font-medium">
                        {item.value}
                      </span>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right Column - Minimalist Form */}
          <ScrollReveal animation="fadeLeft" delay={0.2}>
            <div className="mt-8 lg:mt-24">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 border border-neutral-800 bg-neutral-900/30 text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-green-500/10 rounded-full text-green-500 mb-6">
                    <MdCheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-100 mb-2">
                    Message Sent
                  </h3>
                  <p className="text-neutral-400">
                    Thank you. We'll be in touch shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  {/* Flushed Inputs for Minimalist Look */}
                  <div className="space-y-1">
                    <label
                      htmlFor="name"
                      className="block text-sm text-neutral-500 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-transparent border-b border-neutral-800 py-4 text-xl text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-neutral-500 transition-colors"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="email"
                      className="block text-sm text-neutral-500 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-transparent border-b border-neutral-800 py-4 text-xl text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-neutral-500 transition-colors"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="message"
                      className="block text-sm text-neutral-500 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      className="w-full bg-transparent border-b border-neutral-800 py-4 text-xl text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-neutral-500 transition-colors resize-none"
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-8">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto rounded-none bg-white text-black hover:bg-neutral-200 border-0 uppercase tracking-wider font-semibold px-12 py-4"
                      isLoading={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
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
