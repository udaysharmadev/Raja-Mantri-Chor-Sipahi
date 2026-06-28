import React from 'react';
import { motion } from 'motion/react';

interface RoundIndicatorProps {
  current: number;
  total: number;
}

export const RoundIndicator: React.FC<RoundIndicatorProps> = ({ current, total }) => {
  const isUnlimited = total === 999;
  const progress = isUnlimited ? 100 : (current / total) * 100;

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-30">
      <div className="bg-black/50 backdrop-blur-md rounded-full px-6 py-2 border border-white/10 mb-2">
        <span className="text-white/80 font-bold uppercase tracking-widest text-sm">
          Round {current} {isUnlimited ? '' : `of ${total}`}
        </span>
      </div>
      
      {!isUnlimited && (
        <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[var(--color-royal-gold)] to-[var(--color-emerald)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      )}
    </div>
  );
};
