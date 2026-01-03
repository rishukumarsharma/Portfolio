import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../utils/cn";

interface ParallaxImageProps {
  src?: string;
  alt: string;
  className?: string;
  speed?: number;
  overlay?: boolean;
  children?: React.ReactNode;
}

export const ParallaxImage = ({
  src,
  alt,
  className,
  speed = 0.5,
  overlay = true,
  children,
}: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent-500/20 via-neutral-900 to-neutral-950" />
        )}
      </motion.div>

      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
      )}

      {children && <div className="relative z-10 h-full">{children}</div>}
    </div>
  );
};

export default ParallaxImage;
