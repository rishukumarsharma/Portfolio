import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";

interface FloatingBackButtonProps {
  to?: string;
  label?: string;
  className?: string;
}

export const FloatingBackButton = ({
  to = "/projects",
  label = "Back to Work",
  className,
}: FloatingBackButtonProps) => {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      onClick={() => navigate(to)}
      className={cn(
        "fixed left-8 top-24 z-40 px-4 py-2 bg-neutral-800/80 backdrop-blur-md",
        "text-sm text-neutral-300 rounded-full border border-neutral-700",
        "hover:bg-neutral-700 hover:text-neutral-50 hover:border-neutral-600",
        "transition-all duration-200 flex items-center gap-2",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {label}
    </motion.button>
  );
};

export default FloatingBackButton;
