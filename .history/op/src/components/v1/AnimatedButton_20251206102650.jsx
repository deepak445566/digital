import React from "react";
import { motion } from "framer-motion";

const STAGGER = 0.035;

// TextRoll Animation
const TextRoll = ({ children, className = "", center = false }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={`relative block overflow-hidden ${className}`}
      style={{ lineHeight: 0.93 }}
    >
      {/* Original text */}
      <div>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={i}
              variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
            >
              {l}
            </motion.span>
          );
        })}
      </div>

      {/* Hovered text */}
      <div className="absolute inset-0">
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={i + "-hover"}
              variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
            >
              {l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

// Animated Button
const AnimatedButton = ({ text  }) => {
  return (
    <button >
      <TextRoll
        className="text-md font-semibold uppercase tracking-wider"
        center
      >
        {text}
      </TextRoll>
    </button>
  );
};

export default AnimatedButton;
