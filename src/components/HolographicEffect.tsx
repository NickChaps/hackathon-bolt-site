'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type HolographicEffectProps = {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  onOpen?: () => void;
  isOpen?: boolean;
  revealContent?: React.ReactNode;
  id?: string;
};

export const HolographicEffect = ({
  children,
  className = '',
  active = true,
  onOpen,
  isOpen = false,
  revealContent,
  id,
}: HolographicEffectProps) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Capturer les dimensions initiales de la carte pour maintenir la taille
  useEffect(() => {
    if (containerRef.current && !isOpen) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, [isOpen]);

  // Effet de suivi du curseur avec reflet holographique
  useEffect(() => {
    if (!active || isOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculer la position relative de la souris (0 à 1)
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMouseX(x);
      setMouseY(y);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [active, isOpen]);

  const handleClick = () => {
    if (onOpen && !isOpen) {
      onOpen();
    }
  };

  // Définition constante pour le borderRadius
  const borderRadius = "0.5rem";

  // Effet de bordure holographique amélioré
  const HolographicBorder = () => {
    return (
      <motion.div
        className="absolute inset-0 rounded-lg z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered || isOpen ? 1 : 0.3,
        }}
        transition={{ duration: 0.3 }}
        style={{ borderRadius }}
      >
        <div className="absolute inset-0 border border-[#4da2ff33] rounded-lg" style={{ borderRadius }} />
        <div 
          className="absolute inset-0 border-2 border-[#4da2ff22] rounded-lg" 
          style={{ 
            boxShadow: '0 0 15px rgba(77, 162, 255, 0.2)',
            borderRadius
          }} 
        />
        
        {/* Effet de reflet holographique */}
        <motion.div
          className="absolute inset-0 z-0 rounded-lg overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${mouseX * 100}% ${mouseY * 100}%, rgba(77, 162, 255, 0.15), transparent 80%)`,
            mixBlendMode: 'screen',
            borderRadius
          }}
          animate={{
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Lignes d'effet holographique avec coins arrondis */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#4da2ff] to-transparent opacity-40" style={{ borderRadius: `${borderRadius} ${borderRadius} 0 0` }} />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#4da2ff] to-transparent opacity-40" style={{ borderRadius: `0 0 ${borderRadius} ${borderRadius}` }} />
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#4da2ff] to-transparent opacity-40" style={{ borderRadius: `${borderRadius} 0 0 ${borderRadius}` }} />
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#4da2ff] to-transparent opacity-40" style={{ borderRadius: `0 ${borderRadius} ${borderRadius} 0` }} />
      </motion.div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className={`relative ${className} rounded-lg overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      id={id}
      style={{
        minHeight: dimensions.height > 0 ? `${dimensions.height}px` : 'auto',
        height: '100%',
        borderRadius,
        overflow: 'hidden'
      }}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            className="relative w-full h-full rounded-lg overflow-hidden"
            style={{
              transform: 'translateZ(0)', // Optimisation des performances
              borderRadius,
              overflow: 'hidden'
            }}
            key={`card-front-${id}`}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <HolographicBorder />
            
            {/* Effet de reflet principal */}
            <motion.div
              className="absolute inset-0 z-0 pointer-events-none rounded-lg overflow-hidden"
              style={{
                backgroundImage: `
                  linear-gradient(
                    105deg,
                    transparent 0%,
                    transparent 40%,
                    rgba(77, 162, 255, ${isHovered ? 0.1 : 0.05}) 45%,
                    rgba(77, 162, 255, ${isHovered ? 0.15 : 0.08}) 50%,
                    rgba(77, 162, 255, ${isHovered ? 0.1 : 0.05}) 55%,
                    transparent 60%,
                    transparent 100%
                  )
                `,
                backgroundPosition: `${(mouseX * 100)}% ${(mouseY * 100)}%`,
                backgroundSize: '200% 200%',
                backgroundRepeat: 'no-repeat',
                borderRadius
              }}
              animate={{
                opacity: isHovered ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Effet de scintillement */}
            <motion.div
              className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay rounded-lg overflow-hidden"
              style={{
                backgroundImage: `
                  radial-gradient(
                    circle at ${mouseX * 100}% ${mouseY * 100}%,
                    rgba(255, 255, 255, 0.1) 0%,
                    transparent 50%
                  )
                `,
                backgroundSize: '200% 200%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius
              }}
              animate={{
                opacity: isHovered ? [0.5, 0.8, 0.5] : 0,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="relative z-10 h-full rounded-lg overflow-hidden" style={{ borderRadius }}>
              {children}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="relative w-full h-full rounded-lg overflow-hidden"
            key={`card-back-${id}`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              minHeight: dimensions.height > 0 ? `${dimensions.height}px` : 'auto',
              borderRadius,
              overflow: 'hidden'
            }}
          >
            <HolographicBorder />
            <div className="relative z-10 h-full rounded-lg overflow-hidden" style={{ borderRadius }}>
              {revealContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HolographicEffect; 