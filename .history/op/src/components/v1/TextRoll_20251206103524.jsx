// Enhanced TextRoll.jsx
import React from "react";
import { motion } from "framer-motion";

const TextRoll = ({ 
  children, 
  className = "", 
  center = false,
  stagger = 0.035,
  hoverColor = "",
  trigger = "hover", // "hover" or "inView"
  ...props 
}) => {
  const letters = children.split("");
  const middleIndex = (letters.length - 1) / 2;
  
  return (
    <motion.span
      initial="initial"
      whileHover={trigger === "hover" ? "hovered" : undefined}
      whileInView={trigger === "inView" ? "hovered" : undefined}
      viewport={{ once: true }}
      className={`relative block overflow-hidden ${className}`}
      style={{ lineHeight: 0.93 }}
      {...props}
    >
      {/* Original text layer */}
      <div className="relative">
        {letters.map((letter, i) => {
          const delay = center
            ? stagger * Math.abs(i - middleIndex)
            : stagger * i;

          return (
            <motion.span
              key={`original-${i}`}
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" }
              }}
              transition={{ 
                ease: "easeInOut", 
                duration: 0.3,
                delay 
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          );
        })}
      </div>

      {/* Hover text layer */}
      <div className="absolute inset-0">
        {letters.map((letter, i) => {
          const delay = center
            ? stagger * Math.abs(i - middleIndex)
            : stagger * i;

          return (
            <motion.span
              key={`hover-${i}`}
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 }
              }}
              transition={{ 
                ease: "easeInOut", 
                duration: 0.3,
                delay 
              }}
              className={`inline-block ${hoverColor}`}
            >
              {letter}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

export default TextRoll;