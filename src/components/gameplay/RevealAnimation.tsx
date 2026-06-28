import React, { useEffect, useState } from 'react';
import { Player, GuessResult, Role } from '../../types';
import { ROLE_INFO, SCORING } from '../../constants';
import { Avatar } from '../common/Avatar';
import { motion } from 'motion/react';
import { useSound } from '../../hooks/useSound';

interface RevealAnimationProps {
  players: Record<string, Player>;
  guess: GuessResult | null;
  myId: string;
}

export const RevealAnimation: React.FC<RevealAnimationProps> = ({ players, guess, myId }) => {
  const { play } = useSound();
  const [showScores, setShowScores] = useState(false);

  useEffect(() => {
    if (guess) {
      play(guess.correct ? 'correct' : 'wrong');
      const timer = setTimeout(() => {
        setShowScores(true);
      }, 2500); // Wait for cards to flip and outcome to be read
      return () => clearTimeout(timer);
    }
  }, [guess, play]);

  if (!guess) return null;

  const playerArray = Object.values(players);
  const mantri = playerArray.find(p => p.role === Role.Mantri);
  const guessed = players[guess.guessedId];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Title / Outcome */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl font-bold text-white/70 mb-2">
          Mantri guessed {guessed?.name} was the Chor
        </h2>
        
        {guess.correct ? (
          <h1 className="text-5xl font-display font-bold text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.5)]">
            Correct!
          </h1>
        ) : (
          <h1 className="text-5xl font-display font-bold text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]">
            Wrong!
          </h1>
        )}
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl px-4">
        {playerArray.map((p, i) => {
          const roleInfo = ROLE_INFO[p.role as Role];
          const isGuessed = p.id === guess.guessedId;
          const isMantri = p.role === Role.Mantri;
          
          let points = 0;
          if (p.role) {
            points = guess.correct ? SCORING[p.role].correct : SCORING[p.role].wrong;
          }

          let cardBorder = 'border-white/10';
          if (isGuessed) {
            cardBorder = guess.correct ? 'border-green-500' : 'border-red-500';
          }

          return (
            <motion.div
              key={p.id}
              initial={{ rotateY: 180, opacity: 0, scale: 0.8 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2, type: 'spring', damping: 15 }}
              onAnimationStart={() => setTimeout(() => play('flip'), i * 200)}
              className={`relative flex flex-col items-center p-6 rounded-2xl glass ${cardBorder} ${isGuessed ? (guess.correct ? 'shadow-[0_0_30px_rgba(74,222,128,0.3)]' : 'shadow-[0_0_30px_rgba(239,68,68,0.3)]') : ''}`}
            >
              {/* Highlight Guessed Player */}
              {isGuessed && (
                <div className={`absolute -top-3 px-3 py-1 rounded-full text-xs font-bold ${guess.correct ? 'bg-green-500 text-slate-900' : 'bg-red-500 text-white'}`}>
                  {guess.correct ? 'CAUGHT!' : 'WRONG PERSON'}
                </div>
              )}
              
              {isMantri && (
                <div className="absolute -top-3 px-3 py-1 rounded-full bg-[var(--color-emerald)] text-white text-xs font-bold">
                  GUESSED
                </div>
              )}

              <Avatar emoji={p.avatar} size="lg" className="mb-4" />
              <h3 className="font-bold text-xl text-white truncate w-full text-center">{p.name}</h3>
              {p.id === myId && <span className="text-xs text-white/50">(You)</span>}
              
              <div 
                className="w-full mt-4 py-2 text-center rounded-xl font-bold"
                style={{ backgroundColor: roleInfo?.color, color: p.role === Role.Raja ? '#000' : '#fff' }}
              >
                {roleInfo?.name}
              </div>

              {/* Points Reveal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showScores ? 1 : 0, y: showScores ? 0 : 20 }}
                className="mt-4 text-3xl font-display font-bold text-white drop-shadow-md"
              >
                +{points}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
