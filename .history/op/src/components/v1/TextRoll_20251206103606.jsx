// Enhanced TextRoll.jsx
import React from "react";
import { motion } from "framer-motion";

const TextRoll = ({ children, className = "", center = false }) => {
  // Convert children to string if it's not already
  const textContent = React.useMemo(() => {
    if (typeof children === "string") return children;
    if (typeof children === "number") return children.toString();
    if (React.isValidElement(children)) {
      // Try to get text from React element
      console.warn("TextRoll: children should be a string, not a React element");
      return "";
    }
    return String(children || ""); // Fallback
  }, [children]);

  const letters = textContent.split("");
  
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={`relative block overflow-hidden ${className}`}
      style={{ lineHeight: 0.93 }}
    >
      {/* Original text */}
      <div>
        {letters.map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
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
        {letters.map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
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

export default TextRoll;