import React, { useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

const CircularText = ({
  text = 'Circular Text Animation • ',
  spinDuration = 20,
  onHover = 'speedUp',
  className = '',
  showArrow = true, // New prop for arrow
  arrowSize = 'text-xl', // Customizable arrow size
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  const getRotationTransition = (duration, from, loop = true) => ({
    from,
    to: from + 360,
    ease: 'linear',
    duration,
    type: 'tween',
    repeat: loop ? Infinity : 0,
  });

  const getTransition = (duration, from) => ({
    rotate: getRotationTransition(duration, from),
    scale: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
    },
  });

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  }, [spinDuration, text, onHover, controls, rotation]);

  const handleHoverStart = () => {
    const start = rotation.get();

    if (!onHover) return;

    let transitionConfig;
    let scaleVal = 1;

    switch (onHover) {
      case 'slowDown':
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case 'speedUp':
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case 'pause':
        transitionConfig = {
          rotate: { type: 'spring', damping: 20, stiffness: 300 },
          scale: { type: 'spring', damping: 20, stiffness: 300 },
        };
        break;
      case 'goBonkers':
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig,
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  };

  return (
    <div className="flex min-h-[400px] items-center justify-center rounded-lg">
      <motion.div
        className={`relative m-0 mx-auto h-[160px] w-[160px] origin-center cursor-pointer rounded-full text-center font-black text-white ${className}`}
        style={{ rotate: rotation }}
        initial={{ rotate: 0 }}
        animate={controls}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        {letters.map((letter, i) => {
          const rotationDeg = (360 / letters.length) * i;
          const factor = Math.PI / letters.length;
          const x = factor * i;
          const y = factor * i;
          const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

          return (
            <span
              key={i}
              className="absolute  inset-0 inline-block text-xl transition-all duration-500 ease-out"
              style={{ 
                transform: transform,
                WebkitTransform: transform
              }}
            >
              {letter}
            </span>
          );
        })}
        
        {/* Center Arrow */}
        {showArrow && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Arrow icon with hover animation */}
              <motion.div
                className={`${arrowSize} text-white`}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-full w-full"
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z" />
                </svg>
              </motion.div>
              
              {/* Optional: Glow effect around arrow */}
              <div className="absolute inset-0 rounded-full bg-white/10 blur-md -z-10 scale-75"></div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CircularText;