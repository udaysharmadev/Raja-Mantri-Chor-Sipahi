import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CountdownProps {
  seconds: number;
}

export const Countdown: React.FC<CountdownProps> = ({ seconds }) => {
  return (
    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-2xl">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={seconds}
          initial={{ scale: 0.5, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 1.5, opacity: 0, y: -20 }}
          transition={{ duration: 0.4, type: 'spring' }}
          className="text-7xl font-display font-bold text-[var(--color-royal-gold)] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
        >
          {seconds}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
