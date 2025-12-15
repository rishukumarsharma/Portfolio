import { motion } from 'framer-motion';
import { OptimizedImage } from './OptimizedImage';

interface CaseStudyImageProps {
    src: string;
    caption?: string;
    className?: string;
}

export const CaseStudyImage = ({
    src,
    caption,
    className = ''
}: CaseStudyImageProps) => {
    return (
        <motion.div
            className={`w-full my-16 ${className}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
                <OptimizedImage
                    src={src}
                    alt={caption || 'Case study image'}
                    className="w-full aspect-[16/9]"
                />
            </div>
            {caption && (
                <p className="text-center text-gray-400 mt-4 text-sm">{caption}</p>
            )}
        </motion.div>
    );
};

CaseStudyImage.displayName = 'CaseStudyImage';

export default CaseStudyImage;
