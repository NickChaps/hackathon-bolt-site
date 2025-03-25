'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { HolographicEffect } from './HolographicEffect';

interface PrizeFeature {
  id: string;
  title: string;
  amount: string;
  description: string;
  features: string[];
}

// Données des prix
const prizes: PrizeFeature[] = [
  {
    id: 'grand',
    title: 'Grand Prize',
    amount: '$500,000',
    description: 'For the overall winning project that demonstrates exceptional innovation, technical excellence, and potential for impact.',
    features: [
      'Direct investment opportunity',
      'Mentorship from industry leaders',
      'Global publicity package',
      'Office space for 1 year'
    ]
  },
  {
    id: 'runner',
    title: 'Runner-Up',
    amount: '$250,000',
    description: 'For the second place project that shows outstanding merit and potential.',
    features: [
      'Seed funding',
      'Mentorship program',
      'Media exposure',
      'Cloud credits package'
    ]
  },
  {
    id: 'category',
    title: 'Category Winners',
    amount: '$50,000 each',
    description: 'For top projects in specialized categories including AI, blockchain, sustainability, and health tech.',
    features: [
      'Category recognition',
      'Industry connections',
      'Specialized resources',
      'Showcase opportunities'
    ]
  },
  {
    id: 'community',
    title: 'Community Choice',
    amount: '$100,000',
    description: 'Voted by the community for the project with the most compelling vision and presentation.',
    features: [
      'Community backing',
      'User testing resources',
      'Marketing support',
      'Dedicated advisor'
    ]
  }
];

export default function PrizesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const [openCardId, setOpenCardId] = useState<string | null>(null);

  // Animation de l'apparition des sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  // Animation des particules
  const Particles = () => {
    const [particles, setParticles] = useState<Array<{
      id: number;
      x: number;
      y: number;
      opacity: number;
      scale: number;
      duration: number;
      delay: number;
      color: string;
    }>>([]);
    
    // Utiliser useEffect pour générer les particules uniquement côté client
    useEffect(() => {
      // Générer des couleurs holographiques
      const colors = ['#4da2ff', '#8adaff', '#2a85ff', '#0057ff'];
      // Générer les particules une fois que le composant est monté côté client
      const generatedParticles = Array.from({ length: 40 }).map((_, index) => ({
        id: index,
        x: Math.random() * 100,
        y: 100 + Math.random() * 20,
        opacity: 0.2 + Math.random() * 0.5,
        scale: Math.random() * 0.8 + 0.3,
        duration: 5 + Math.random() * 15,
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
      
      setParticles(generatedParticles);
    }, []);
    
    // Rendu initial sans particules pour éviter les erreurs d'hydratation
    if (particles.length === 0) {
      return <div className="absolute inset-0 pointer-events-none overflow-hidden" />;
    }
    
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Particules améliorées avec effets lumineux */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${particle.scale * 6}px`,
              height: `${particle.scale * 6}px`,
              background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
              boxShadow: `0 0 ${particle.scale * 10}px ${particle.color}`,
              filter: "blur(1px)",
            }}
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              opacity: 0,
            }}
            animate={{
              y: "-20%",
              opacity: [0, particle.opacity, 0],
              scale: [particle.scale * 0.5, particle.scale * 1.5, particle.scale],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Vagues d'énergie horizontales */}
        {Array.from({ length: 5 }).map((_, idx) => (
          <motion.div
            key={`wave-${idx}`}
            className="absolute h-[1px] w-full left-0"
            style={{
              top: `${20 + idx * 15}%`,
              background: `linear-gradient(90deg, transparent, ${particles[0]?.color || '#4da2ff'}, transparent)`,
              boxShadow: `0 0 8px ${particles[0]?.color || '#4da2ff'}`,
            }}
            animate={{
              opacity: [0, 0.7, 0],
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: 8 + idx * 2,
              repeat: Infinity,
              delay: idx * 3,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Rayons verticaux */}
        {Array.from({ length: 3 }).map((_, idx) => (
          <motion.div
            key={`ray-${idx}`}
            className="absolute w-[1px] h-full"
            style={{
              left: `${20 + idx * 30}%`,
              background: `linear-gradient(to bottom, transparent, ${particles[0]?.color || '#4da2ff'}, transparent)`,
              boxShadow: `0 0 8px ${particles[0]?.color || '#4da2ff'}`,
            }}
            animate={{
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: idx * 2 + 1,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Effet de balayage horizontal */}
        <motion.div
          className="absolute top-0 left-0 h-full w-[100px] bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent"
          animate={{
            left: ["-10%", "110%"],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeInOut",
          }}
        />
      </div>
    );
  };

  // Contenu détaillé de la carte déployée avec animation améliorée
  const DetailedPrizeCard = ({ prize }: { prize: PrizeFeature }) => {
    const [initialized, setInitialized] = useState(false);
    const [hologramReady, setHologramReady] = useState(false);
    
    useEffect(() => {
      // Animation de chargement plus longue et plus progressive
      const loadingTimer = setTimeout(() => {
        setHologramReady(true);
      }, 1500); // Réduit de 2500ms à 1500ms
      
      // Animation complète plus progressive
      const initTimer = setTimeout(() => {
        setInitialized(true);
      }, 2000); // Réduit de 3000ms à 2000ms
      
      return () => {
        clearTimeout(loadingTimer);
        clearTimeout(initTimer);
      };
    }, []);
    
    return (
      <div className="flex flex-col h-full w-full p-6 text-white relative overflow-hidden min-h-[350px]">
        {/* Bouton de fermeture fixe */}
        <motion.button
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-accent-blue/20 border border-accent-blue/50 flex items-center justify-center hover:bg-accent-blue/30 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setOpenCardId(null);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-accent-blue text-lg">&times;</span>
        </motion.button>

        {/* Écran de chargement holographique modifié pour être moins flashy */}
        <motion.div 
          className="absolute inset-0 bg-black/80 z-20 flex flex-col items-center justify-center backdrop-blur-sm"
          initial={{ opacity: 0.9 }}
          animate={{ 
            opacity: initialized ? 0 : 0.9,
            y: initialized ? -20 : 0
          }}
          transition={{ duration: 0.8 }} // Transition plus longue
        >
          {!hologramReady ? (
            <>
              {/* Phase d'initialisation */}
              <motion.div 
                className="text-accent-blue text-lg font-mono tracking-wider"
                animate={{ 
                  opacity: [0.7, 1, 0.7],
                  textShadow: ["0 0 5px rgba(77, 162, 255, 0.5)", "0 0 15px rgba(77, 162, 255, 0.8)", "0 0 5px rgba(77, 162, 255, 0.5)"]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                INITIALIZING HOLOGRAM
              </motion.div>
              <motion.div 
                className="w-64 h-2 bg-gray-800 mt-4 overflow-hidden rounded-full"
              >
                <motion.div 
                  className="h-full bg-accent-blue"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "linear" }} // Plus rapide que l'original
                />
              </motion.div>
            </>
          ) : (
            /* Phase de stabilisation, après le chargement initial */
            <motion.div 
              className="text-accent-blue-light text-md font-mono tracking-wider"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                textShadow: "0 0 15px rgba(138, 218, 255, 0.8)"
              }}
              transition={{ duration: 0.5 }} // Légèrement plus longue
            >
              HOLOGRAM STABILIZED
            </motion.div>
          )}
        </motion.div>
        
        {/* Réduction de l'opacité de la scan line */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-15"
          initial={{ opacity: 0 }}
          animate={{ opacity: initialized ? 0.2 : 0 }} // Réduit de 0.3 à 0.2
          transition={{ delay: 0.8, duration: 0.7 }} // Plus lent et délai réduit
        >
          <motion.div 
            className="h-[1px] w-full bg-accent-blue-light/50" // Réduction de l'opacité
            style={{ 
              boxShadow: "0 0 8px rgba(138, 218, 255, 0.6)", // Réduction de l'intensité
              position: "absolute" 
            }}
            animate={{ top: ["-5%", "105%"] }}
            transition={{ 
              duration: 3, // Plus lent (2 → 3)
              repeat: Infinity, 
              ease: "linear",
              repeatDelay: 1.5
            }}
          />
        </motion.div>
        
        {/* Effet de pixellisation holographique adouci */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: "linear-gradient(45deg, rgba(77, 162, 255, 0.03) 25%, transparent 25%, transparent 50%, rgba(77, 162, 255, 0.03) 50%, rgba(77, 162, 255, 0.03) 75%, transparent 75%, transparent)", // Réduction de l'opacité
            backgroundSize: "4px 4px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: initialized ? 0.2 : 0 }} // Réduit de 0.3 à 0.2
          transition={{ duration: 1.2 }} // Plus lent (0.7 → 1.2)
        />
        
        {/* Contenu principal avec animation d'apparition */}
        <motion.div 
          className="relative z-10 h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: initialized ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-accent-blue text-xl font-bold mb-1 relative">
            {prize.title}
            <motion.div 
              className="absolute -left-2 top-1/2 w-4 h-0.5 bg-accent-blue" 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: initialized ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
          </div>
          
          <motion.div 
            className="text-3xl font-black mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: initialized ? 1 : 0, 
              y: initialized ? 0 : 10 
            }}
            transition={{ duration: 0.3 }}
          >
            {prize.amount}
          </motion.div>
          
          <motion.p 
            className="text-sm text-gray-300 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: initialized ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            {prize.description}
          </motion.p>
          
          <motion.div className="space-y-4">
            <motion.h4 
              className="text-accent-blue text-sm font-bold mb-2 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: initialized ? 1 : 0 }}
            >
              <motion.span 
                className="inline-block mr-2"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                ✦
              </motion.span>
              INCLUDES:
            </motion.h4>
            <ul className="space-y-2">
              {prize.features.map((feature: string, idx: number) => (
                <motion.li 
                  key={idx}
                  className="flex items-center gap-2 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: initialized ? 1 : 0, 
                    x: initialized ? 0 : -10 
                  }}
                  transition={{ delay: initialized ? 0.15 * idx : 0 }}
                >
                  <motion.span 
                    className="text-accent-blue"
                    animate={{ 
                      opacity: [1, 0.5, 1],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: idx * 0.5
                    }}
                  >
                    •
                  </motion.span> 
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    );
  };

  // Contenu résumé de la carte non déployée avec animation améliorée
  const SummaryPrizeCard = ({ prize }: { prize: PrizeFeature }) => {
    const [hovered, setHovered] = useState(false);
    // Référence pour éviter des recalculs constants
    const particlesRef = useRef<Array<{
      x: number;
      y: number;
      delay: number;
      duration: number;
    }>>([]);

    // Générer les positions des particules une seule fois au montage
    useEffect(() => {
      particlesRef.current = Array.from({ length: 3 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 0.8 + Math.random() * 0.6
      }));
    }, []);

    // Icônes pour chaque type de prix
    const prizeIcons = {
      grand: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.8 8.6L23 9.3L17.5 14.4L19 21.5L12 18L5 21.5L6.5 14.4L1 9.3L8.2 8.6L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      runner: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      category: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.9 13.5H4.1C2.6 13.5 2 14.6 2 16V21.5H4V18H20V21.5H22V16C22 14.6 21.4 13.5 19.9 13.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 10.5C14.7614 10.5 17 8.26142 17 5.5C17 2.73858 14.7614 0.5 12 0.5C9.23858 0.5 7 2.73858 7 5.5C7 8.26142 9.23858 10.5 12 10.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      community: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 3.13C17.7699 3.58317 19.0078 5.17775 19.0078 7.005C19.0078 8.83225 17.7699 10.4268 16 10.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    };

    return (
      <div 
        className="flex flex-col h-full w-full p-6 text-white relative overflow-hidden min-h-[350px] justify-center items-center rounded-lg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ willChange: 'transform, opacity', borderRadius: "0.5rem" }}
      >
        {/* Particules pré-calculées pour éviter les saccades */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-0 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ borderRadius: "0.5rem", overflow: "hidden" }}
        >
          {particlesRef.current.map((particle, idx) => (
            <motion.div
              key={`hover-particle-${idx}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                top: `${particle.y}%`,
                left: `${particle.x}%`,
                backgroundColor: '#4da2ff',
                boxShadow: "0 0 4px rgba(77, 162, 255, 0.6)",
                willChange: 'transform, opacity'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={hovered ? { 
                scale: [0, 1, 0],
                opacity: [0, 0.7, 0],
                x: [0, idx % 2 === 0 ? 15 : -15], 
                y: [0, idx % 3 === 0 ? -10 : -20]
              } : { scale: 0, opacity: 0 }}
              transition={hovered ? { 
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeOut"
              } : { duration: 0.2 }}
            />
          ))}
        </motion.div>
        
        {/* Cercle central lumineux optimisé */}
        <motion.div 
          className="mb-8 rounded-full bg-gradient-to-r from-[#1488fc]/20 to-[#8adaff]/10 w-20 h-20 flex items-center justify-center border border-accent-blue/30"
          style={{ willChange: 'transform, box-shadow' }}
          animate={{ 
            boxShadow: hovered 
              ? "0 0 30px rgba(77, 162, 255, 0.3)" 
              : "0 0 15px rgba(77, 162, 255, 0.1)",
            scale: hovered ? 1.05 : 1
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div 
            className="text-accent-blue"
            style={{ willChange: 'transform' }}
            animate={{ 
              textShadow: hovered 
                ? "0 0 10px rgba(138, 218, 255, 0.8)" 
                : "0 0 5px rgba(138, 218, 255, 0.4)"
            }}
            whileHover={{ rotate: [0, 5, -5, 0] }}
            transition={{
              textShadow: { duration: 0.3 },
              rotate: { duration: 0.6, ease: "easeInOut" }
            }}
          >
            {prizeIcons[prize.id as keyof typeof prizeIcons]}
          </motion.div>
        </motion.div>
        
        {/* Contenu avec animation au survol optimisée */}
        <motion.div 
          className="flex flex-col items-center text-center z-10 relative w-full"
          style={{ willChange: 'transform' }}
          animate={{ 
            y: hovered ? -2 : 0
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.div 
            className="text-accent-blue text-lg font-bold mb-2"
            animate={{
              textShadow: hovered ? "0 0 8px rgba(77, 162, 255, 0.6)" : "none"
            }}
            transition={{ duration: 0.2 }}
          >
            {prize.title}
          </motion.div>
          
          <motion.div 
            className="text-3xl font-black mb-6"
            style={{ willChange: 'transform' }}
            animate={{
              scale: hovered ? 1.05 : 1,
              textShadow: hovered ? "0 0 10px rgba(255, 255, 255, 0.3)" : "none"
            }}
            transition={{ duration: 0.2 }}
          >
            {prize.amount}
          </motion.div>
          
          <motion.button
            className="w-full py-2 bg-accent-blue/20 border border-accent-blue/50 rounded-md text-accent-blue hover:bg-accent-blue/30 transition-colors relative overflow-hidden group"
            style={{ willChange: 'transform, box-shadow', borderRadius: "0.375rem" }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 15px rgba(77, 162, 255, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">View Details</span>
            
            {/* Animation de particule sur le bouton simplifiée */}
            <motion.div 
              className="absolute inset-0 pointer-events-none rounded-md"
              style={{
                backgroundSize: '200% 100%',
                backgroundPosition: 'left center',
                willChange: 'transform, background-position',
                borderRadius: "0.375rem"
              }}
              animate={hovered ? {
                backgroundPosition: ['left center', 'right center'],
                background: "linear-gradient(90deg, transparent 0%, rgba(77, 162, 255, 0.2) 50%, transparent 100%)"
              } : {
                background: "transparent"
              }}
              transition={hovered ? {
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              } : { duration: 0.2 }}
            />
          </motion.button>
        </motion.div>
        
        {/* Effet d'éclat au survol optimisé */}
        <AnimatePresence>
          {hovered && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-blue/10 to-transparent z-0 rounded-lg"
              initial={{ opacity: 0, left: "-100%" }}
              animate={{ opacity: 1, left: "100%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ willChange: 'transform, opacity', borderRadius: "0.5rem", overflow: "hidden" }}
            />
          )}
        </AnimatePresence>
        
        {/* Effets visuels de base */}
        <div className="prize-card-shine opacity-50 rounded-lg"></div>
        <div className="holographic-grid opacity-30 rounded-lg"></div>
        <div className="data-stream opacity-30 rounded-lg"></div>
      </div>
    );
  };

  return (
    <section 
      id="prizes" 
      ref={sectionRef} 
      className="relative min-h-screen bg-black py-20 overflow-hidden"
    >
      <Particles />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-white">
            <span className="text-accent-blue">$1,000,000+</span> in Prizes
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            We&apos;re rewarding innovation with substantial prizes that can help you take your project to the next level. From grand prizes to category awards, there are multiple opportunities to win.
          </p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {prizes.map((prize) => (
            <motion.div
              key={prize.id}
              className="relative h-full"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6 }}
            >
              {openCardId === prize.id ? (
                <HolographicEffect 
                  isOpen={true}
                  revealContent={<DetailedPrizeCard prize={prize} />}
                >
                  <SummaryPrizeCard prize={prize} />
                </HolographicEffect>
              ) : (
                <HolographicEffect
                  active={true}
                  onOpen={() => setOpenCardId(prize.id)}
                >
                  <SummaryPrizeCard prize={prize} />
                </HolographicEffect>
              )}
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-gray-400 text-sm">
            Additional prizes and sponsor awards will be announced closer to the event.
            <br />
            <span className="text-accent-blue">All participants</span> will receive exclusive digital assets and platform credits.
          </p>
          
          <div className="relative z-50">
            <motion.a
              href="#register"
              className="inline-block mt-8 px-8 py-3 bg-gradient-to-r from-[#1488fc]/60 to-[#8adaff]/40 text-white font-bold rounded-full transition-all overflow-hidden relative group"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 25px 5px rgba(20, 136, 252, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              style={{ 
                zIndex: 50, 
                backdropFilter: "blur(5px)",
                border: "1px solid rgba(138, 218, 255, 0.2)"
              }}
            >
              <span className="relative z-10 text-white text-shadow-sm">Register Now to Compete</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#1488fc]/20 via-[#8adaff]/30 to-[#1488fc]/20"
                initial={{ x: "-100%", opacity: 0.3 }}
                animate={{ x: "100%", opacity: 0.3 }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "linear"
                }}
                style={{ filter: "blur(8px)" }}
              />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 