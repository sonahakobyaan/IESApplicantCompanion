"use client";

import { motion } from "framer-motion";

export function Button({
  children,
  onClick,
  secondary = false,
  small = false,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  small?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <motion.button
      type={type}
      className={`button ${secondary ? "button-secondary" : ""} ${small ? "button-small" : ""}`}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 24 }}
    >
      {children}
    </motion.button>
  );
}
