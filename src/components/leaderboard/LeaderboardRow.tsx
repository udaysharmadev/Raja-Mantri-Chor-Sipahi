import React from 'react';
import { Player, Role } from '../../types';
import { ROLE_INFO } from '../../constants';
import { Avatar } from '../common/Avatar';
import { NumberRoll } from '../animations/NumberRoll';
import { motion } from 'motion/react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface LeaderboardRowProps {
  player: Player;
  position: number;
  previousPosition: number;
  pointsEarned: number;
  isMe: boolean;
}

export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ 
  player, 
  position, 
  previousPosition, 
  pointsEarned,
  isMe 
}) => {
  const roleInfo = player.role ? ROLE_INFO[player.role as Role] : null;
  
  const rankChanged = previousPosition - position; // + implies moved up (e.g. 3 to 1)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      className={`relative flex items-center p-4 mb-3 rounded-2xl glass transition-all ${
        isMe ? 'border-2 border-[var(--color-royal-gold)] shadow-[0_0_20px_rgba(255,215,0,0.2)] bg-white/20' : 'border border-white/10'
      }`}
    >
      {/* Position & Rank Change */}
      <div className="flex flex-col items-center justify-center w-12 mr-4">
        <span className="text-2xl font-display font-bold text-white/80">#{position}</span>
        <div className="flex items-center text-[10px] font-bold mt-1">
          {rankChanged > 0 && <span className="text-green-400 flex items-center"><ArrowUp size={12} />{rankChanged}</span>}
          {rankChanged < 0 && <span className="text-red-400 flex items-center"><ArrowDown size={12} />{Math.abs(rankChanged)}</span>}
          {rankChanged === 0 && <span className="text-white/30 flex items-center"><Minus size={12} /></span>}
        </div>
      </div>

      <Avatar emoji={player.avatar} size="md" className="mr-4" />

      {/* Name & Role */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <h3 className="font-bold text-lg text-white truncate mr-2">{player.name}</h3>
          {isMe && <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white font-medium">You</span>}
        </div>
        {roleInfo && (
          <div className="text-xs font-medium tracking-wide" style={{ color: roleInfo.color }}>
            {roleInfo.name}
          </div>
        )}
      </div>

      {/* Score */}
      <div className="flex flex-col items-end ml-4">
        <div className="text-2xl font-display font-bold text-white">
          <NumberRoll value={player.score} />
        </div>
        {pointsEarned > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-bold text-green-400"
          >
            +{pointsEarned}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
