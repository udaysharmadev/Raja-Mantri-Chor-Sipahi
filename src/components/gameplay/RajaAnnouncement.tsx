import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Role } from '../../types';
import { useSound } from '../../hooks/useSound';

interface RajaAnnouncementProps {
  isVisible: boolean;
  myRole: Role | null;
  onComplete: () => void;
}

export const RajaAnnouncement: React.FC<RajaAnnouncementProps> = ({ isVisible, myRole, onComplete }) => {
  const { play } = useSound();
  
  useEffect(() => {
    if (isVisible) {
      play('win'); // majestic sound
      const timer = setTimeout(() => {
        onComplete();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete, play]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          {myRole === Role.Raja ? (
            <motion.div
              initial={{ scale: 0.5, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-white/70 uppercase tracking-widest mb-4">You ask:</h2>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-[var(--color-royal-gold)] drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]">
                "Mera Mantri<br/>Kaun Hai?"
              </h1>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.5, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-white/70 uppercase tracking-widest mb-4">The Raja asks:</h2>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-[var(--color-royal-gold)] drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                "Mera Mantri Kaun Hai?"
              </h1>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
