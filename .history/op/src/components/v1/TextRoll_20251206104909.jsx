// TextRoll.jsx
import React from "react";
import { motion } from "framer-motion";

const TextRoll = ({ children, className = "", center = false }) => {
  const STAGGER = 0.0035;
  
  const text = String(children || "");
  const letters = text.split("");
  
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={`relative inline-block overflow-hidden leading-none ${className}`} // leading-none added
      style={{ lineHeight: 1 }}
    >
      {/* Original text */}
      <div className="leading-none"> {/* Added leading-none */}
        {letters.map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={i}
              variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block leading-none" // Added leading-none
              style={{ lineHeight: 1 }}
            >
              {l}
            </motion.span>
          );
        })}
      </div>

      {/* Hovered text */}
      <div className="absolute inset-0 leading-none"> {/* Added leading-none */}
        {letters.map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={i + "-hover"}
              variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block leading-none" // Added leading-none
              style={{ lineHeight: 1 }}
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