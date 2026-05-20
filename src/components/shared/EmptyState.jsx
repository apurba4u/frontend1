"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/styles/animations";

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <motion.div
      {...fadeInUp}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-on-surface-variant" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-on-surface mb-2">{title}</h3>
      {description && (
        <p className="text-on-surface-variant text-sm max-w-sm mb-6">
          {description}
        </p>
      )}
      {action && action}
    </motion.div>
  );
}
