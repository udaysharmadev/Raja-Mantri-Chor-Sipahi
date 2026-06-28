import React from 'react';
import { Role } from '../../types';
import { Button } from '../common/Button';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { motion } from 'motion/react';

interface MantriRevealProps {
  myRole: Role | null;
  onReveal: () => void;
}

export const MantriReveal: React.FC<MantriRevealProps> = ({ myRole, onReveal }) => {
  if (myRole === Role.Mantri) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-8 glass rounded-3xl max-w-md mx-auto text-center"
      >
        <h2 className="text-3xl font-display font-bold text-white mb-2">You are the Mantri!</h2>
        <p className="text-white/70 mb-8">Reveal yourself to the Raja and find the Chor.</p>
        <Button 
          size="lg" 
          onClick={onReveal}
          className="w-full bg-[var(--color-emerald)] text-white hover:bg-green-500 shadow-[0_0_20px_rgba(46,204,113,0.4)]"
        >
          "Main Hoon!" (Reveal)
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <LoadingSpinner size="lg" />
      <h3 className="mt-8 text-2xl font-display font-bold text-white">Waiting for Mantri...</h3>
      <p className="text-white/50 mt-2">The Mantri is revealing themselves to the Raja.</p>
    </div>
  );
};
