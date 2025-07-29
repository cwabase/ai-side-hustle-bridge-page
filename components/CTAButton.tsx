
import React from 'react';
import { motion } from 'framer-motion';

interface CTAButtonProps {
    href: string;
    text: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({ href, text }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-brand-secondary text-white font-bold text-xl md:text-2xl py-5 px-12 rounded-full shadow-lg shadow-green-500/30"
      whileHover={{ 
        scale: 1.05, 
        boxShadow: "0px 10px 30px rgba(16, 185, 129, 0.4)" 
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="animate-pulse-glow rounded-full"
      >
        {text} &rarr;
      </motion.div>
    </motion.a>
  );
};
