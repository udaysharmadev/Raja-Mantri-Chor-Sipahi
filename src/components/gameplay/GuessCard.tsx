import React, { useState } from 'react';
import { Player, Role } from '../../types';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { motion } from 'motion/react';

interface GuessCardProps {
  players: Record<string, Player>;
  myRole: Role | null;
  onGuess: (guessedId: string) => void;
}

export const GuessCard: React.FC<GuessCardProps> = ({ players, myRole, onGuess }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Mantri must guess who is the Chor.
  // Raja and Mantri are known. Only Sipahi and Chor are left to guess from.
  const unknownPlayers = Object.values(players).filter(p => p.role !== Role.Raja && p.role !== Role.Mantri);

  if (myRole === Role.Mantri) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
        <h2 className="text-3xl font-display font-bold text-white mb-2 text-center">Find the Chor</h2>
        <p className="text-white/70 mb-8 text-center">Select who you think is the Chor.</p>

        <div className="grid grid-cols-2 gap-6 w-full mb-8">
          {unknownPlayers.map(p => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedId(p.id)}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer transition-all ${
                selectedId === p.id 
                  ? 'bg-white/20 border-2 border-[var(--color-crimson)] shadow-[0_0_30px_rgba(220,20,60,0.3)]' 
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              <Avatar emoji={p.avatar} size="lg" className="mb-4" />
              <span className="font-bold text-xl text-white">{p.name}</span>
            </motion.div>
          ))}
        </div>

        <Button 
          size="lg" 
          disabled={!selectedId}
          onClick={() => selectedId && onGuess(selectedId)}
          className="w-full max-w-xs"
        >
          Confirm Guess
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto p-8 glass rounded-3xl">
      <h2 className="text-3xl font-display font-bold text-[var(--color-emerald)] mb-4">Mantri is thinking...</h2>
      <p className="text-white/80 text-lg">The Mantri is trying to find the Chor.</p>
      
      {myRole === Role.Chor && (
        <div className="mt-8 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200">
          <p className="font-bold">Act natural!</p>
          <p className="text-sm">Don't let the Mantri catch you.</p>
        </div>
      )}
      
      {myRole === Role.Sipahi && (
        <div className="mt-8 p-4 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-200">
          <p className="font-bold">Stay calm.</p>
          <p className="text-sm">Hope the Mantri doesn't pick you by mistake.</p>
        </div>
      )}
    </div>
  );
};
