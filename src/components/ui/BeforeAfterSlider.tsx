import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Caption } from "./Typography";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  caption?: string;
}

export const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  caption,
}: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handleMove(e.clientX);
    },
    [handleMove],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove],
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleTouchMove, handleMouseUp]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="my-16"
    >
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl shadow-2xl cursor-col-resize select-none"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* After Image (Full) */}
        <img
          src={afterImage}
          alt="After"
          className="w-full aspect-video object-cover"
          draggable={false}
        />

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt="Before"
            className="w-full aspect-video object-cover"
            draggable={false}
          />
        </div>

        {/* Before Label */}
        <div
          className="absolute top-4 left-4 px-3 py-1.5 bg-neutral-900/80 backdrop-blur-sm rounded-lg border border-neutral-700"
          style={{
            opacity: sliderPosition > 20 ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          <Caption className="text-neutral-200 font-medium">Before</Caption>
        </div>

        {/* After Label */}
        <div
          className="absolute top-4 right-4 px-3 py-1.5 bg-neutral-900/80 backdrop-blur-sm rounded-lg border border-neutral-700"
          style={{
            opacity: sliderPosition < 80 ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          <Caption className="text-accent-400 font-medium">After</Caption>
        </div>

        {/* Slider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-col-resize border-4 border-neutral-900">
            <svg
              className="w-6 h-6 text-neutral-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
        </div>
      </div>

      {caption && (
        <Caption className="text-center text-neutral-400 mt-4">
          {caption}
        </Caption>
      )}
    </motion.div>
  );
};

BeforeAfterSlider.displayName = "BeforeAfterSlider";

export default BeforeAfterSlider;
