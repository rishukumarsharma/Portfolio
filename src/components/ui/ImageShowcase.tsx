import { motion } from "framer-motion";

interface ImageShowcaseProps {
  images: string[];
  projectTitle: string;
}

export const ImageShowcase = ({ images, projectTitle }: ImageShowcaseProps) => {
  return (
    <motion.div
      className="py-12 md:py-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-50 mb-8">
        Product Showcase
      </h2>

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
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <img
              src={image}
              alt={`${projectTitle} - View ${index + 1}`}
              loading="lazy"
              className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-500"
            />

            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

ImageShowcase.displayName = "ImageShowcase";

export default ImageShowcase;
