import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "../components/layout";

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-neutral-950 overflow-hidden">
      {/* Abstract 3D Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-neutral-950/30 z-10" />{" "}
        {/* Overlay for text readability if needed */}
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
          alt="Abstract 3D Background"
          className="w-full h-full object-cover grayscale opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-transparent to-neutral-950" />
      </div>

      <Container className="relative z-10 w-full h-full flex flex-col justify-center">
        <motion.div style={{ y, opacity }} className="w-full">
          {/* Main Typography Layer */}
          <div className="relative z-20 mix-blend-difference">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] leading-none font-bold tracking-tighter text-white/90 text-center md:text-left"
              style={{
                fontFamily: "'Inter', sans-serif",
                textShadow: "0 15px 40px rgba(0,0,0,0.8)",
              }}>
              CREATIVE
            </motion.h1>

            {/* Gradient Bar Intersecting Text */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-4 md:h-6 w-full md:w-2/3 bg-gradient-to-r from-teal-500 via-orange-400 to-orange-600 origin-left mt-[-2vw] md:mt-[-4vw] relative z-[-1] opacity-90"
            />

            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] leading-none font-bold tracking-tighter text-white/90 text-center md:text-right mt-2 md:mt-[-2vw]"
              style={{
                fontFamily: "'Inter', sans-serif",
                textShadow: "0 15px 40px rgba(0,0,0,0.8)",
              }}>
              MINIMALIST
            </motion.h1>
          </div>

          {/* Bottom Philosophy Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-4 gap-8 items-end border-t border-white/10 pt-8">
            <div className="col-span-1">
              <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">
                Our Philosophy
              </span>
            </div>
            <div className="col-span-1 md:col-span-3">
              <p className="text-base md:text-lg text-neutral-300 font-light leading-relaxed max-w-3xl ml-auto text-right md:text-left">
                We believe that simplicity is the ultimate sophistication. Our
                minimalist design philosophy revolves around stripping away the
                clutter to reveal the essence of your vision. Through carefully
                curated elements, clean lines, and subtle textures, we create
                spaces and products that exude timeless elegance and
                functionality.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
