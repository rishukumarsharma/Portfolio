import { motion } from "framer-motion";
import { useState } from "react";
import { H3, Caption, Body } from "./Typography";

interface ProcessImage {
  url: string;
  caption: string;
  category: "Wireframes" | "Flows" | "Sketches" | "Research";
}

interface ProcessGalleryProps {
  images: ProcessImage[];
}

const categoryColors = {
  Wireframes: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
  Flows: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
  Sketches: "from-orange-500/20 to-orange-500/5 border-orange-500/30",
  Research: "from-green-500/20 to-green-500/5 border-green-500/30",
};

export const ProcessGallery = ({ images }: ProcessGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="my-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`group relative overflow-hidden rounded-xl border bg-gradient-to-br ${
              categoryColors[image.category]
            } cursor-pointer`}
            onClick={() => setSelectedImage(index)}>
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-10">
              <Caption className="px-3 py-1.5 bg-neutral-900/80 backdrop-blur-sm rounded-lg text-neutral-200 font-medium">
                {image.category}
              </Caption>
            </div>

            {/* Image */}
            <div className="aspect-video overflow-hidden">
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Caption Overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent p-6">
              <Body size="sm" className="text-neutral-200">
                {image.caption}
              </Body>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-white text-sm font-medium">
                Click to view
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}>
          <div className="max-w-6xl w-full">
            <div className="relative">
              <img
                src={images[selectedImage].url}
                alt={images[selectedImage].caption}
                className="w-full rounded-xl shadow-2xl"
              />
              <div className="mt-6 text-center">
                <Caption className="text-accent-400 mb-2">
                  {images[selectedImage].category}
                </Caption>
                <H3 className="text-neutral-200">
                  {images[selectedImage].caption}
                </H3>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-neutral-300 hover:bg-neutral-700 transition-colors">
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

ProcessGallery.displayName = "ProcessGallery";

export default ProcessGallery;
