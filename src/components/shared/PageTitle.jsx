"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/styles/animations";

export default function PageTitle({ title, description, children }) {
  return (
    <motion.div {...fadeInUp} className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-2">
        {title}
      </h1>
      {description && (
        <p className="text-on-surface-variant text-base">{description}</p>
      )}
      {children}
    </motion.div>
  );
}
