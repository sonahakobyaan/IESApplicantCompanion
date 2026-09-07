"use client";

import { motion, useReducedMotion } from "framer-motion";

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className="page-intro"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? { duration: 0.01 }
          : { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }
      }
    >
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </motion.div>
  );
}
