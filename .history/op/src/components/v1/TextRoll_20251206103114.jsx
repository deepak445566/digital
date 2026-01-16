import React from "react";
import { motion } from "framer-motion";

const STAGGER = 0.035;

const TextRoll = ({ children, className = "", center = false, delay = 0 }) => {
  return (
    <motion.span
      initial="initial"
      animate="animate"
      whileHover="hovered"
      className={`relative block overflow-hidden ${className}`}
      style={{ lineHeight: 0.93 }}
      variants={{
        initial: { opacity: 0, y: 50 },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.8,
            delay: delay,
            ease: "easeOut" 
          }
        }
      }}
    >
      {/* Original text */}
      <div>
        {children.split("").map((l, i) => {
          const staggerDelay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={i}
              variants={{ 
                initial: { y: 0 }, 
                hovered: { y: "-100%" } 
              }}
              transition={{ 
                ease: "easeInOut", 
                delay: staggerDelay,
                duration: 0.3
              }}
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
          const staggerDelay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={i + "-hover"}
              variants={{ 
                initial: { y: "100%" }, 
                hovered: { y: 0 } 
              }}
              transition={{ 
                ease: "easeInOut", 
                delay: staggerDelay,
                duration: 0.3
              }}
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

export default TextRoll;