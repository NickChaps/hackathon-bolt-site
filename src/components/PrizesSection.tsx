'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
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
      // Animation de chargement
      const loadingTimer = setTimeout(() => {
        setHologramReady(true);
      }, 2500);
      
      // Animation complète
      const initTimer = setTimeout(() => {
        setInitialized(true);
      }, 3000);
      
      return () => {
        clearTimeout(loadingTimer);
        clearTimeout(initTimer);
      };
    }, []);
    
    return (
      <div className="flex flex-col h-full w-full p-6 text-white relative overflow-hidden">
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

        {/* Écran de chargement holographique */}
        <motion.div 
          className="absolute inset-0 bg-black z-20 flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: initialized ? 0 : 1,
            y: initialized ? -20 : 0
          }}
          transition={{ duration: 0.5 }}
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
                  transition={{ duration: 2.5, ease: "linear" }}
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
              transition={{ duration: 0.3 }}
            >
              HOLOGRAM STABILIZED
            </motion.div>
          )}
        </motion.div>
        
        {/* Scan line animée */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-15"
          initial={{ opacity: 0 }}
          animate={{ opacity: initialized ? 0.3 : 0 }}
          transition={{ delay: 1 }}
        >
          <motion.div 
            className="h-[1px] w-full bg-accent-blue-light/70"
            style={{ 
              boxShadow: "0 0 10px rgba(138, 218, 255, 0.8)",
              position: "absolute" 
            }}
            animate={{ top: ["-5%", "105%"] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "linear",
              repeatDelay: 1
            }}
          />
        </motion.div>
        
        {/* Effet de pixellisation holographique */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: "linear-gradient(45deg, rgba(77, 162, 255, 0.05) 25%, transparent 25%, transparent 50%, rgba(77, 162, 255, 0.05) 50%, rgba(77, 162, 255, 0.05) 75%, transparent 75%, transparent)",
            backgroundSize: "4px 4px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: initialized ? 0.3 : 0 }}
          transition={{ duration: 0.7 }}
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

    return (
      <div 
        className="flex flex-col h-full w-full p-6 text-white relative overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Effet de particules au survol - réduit */}
        {hovered && (
          <motion.div className="absolute inset-0 pointer-events-none z-0">
            {Array.from({ length: 3 }).map((_, idx) => ( // Réduit de 5 à 3 particules
              <motion.div
                key={`hover-particle-${idx}`}
                className="absolute w-1 h-1 rounded-full bg-accent-blue"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  boxShadow: "0 0 3px rgba(77, 162, 255, 0.6)", // Réduit l'intensité
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.6, 0], // Réduit l'opacité max
                  scale: [0, 0.8, 0], // Réduit la taille max
                  x: [0, (Math.random() - 0.5) * 20], // Réduit le mouvement
                  y: [0, (Math.random() - 0.5) * 20], 
                }}
                transition={{ 
                  duration: 0.8 + Math.random(), // Réduit la durée
                  repeat: Infinity,
                  delay: idx * 0.3,
                }}
              />
            ))}
          </motion.div>
        )}
        
        {/* Contenu avec animation au survol - plus subtil */}
        <motion.div 
          animate={{ 
            y: hovered ? -1 : 0, // Réduit le mouvement vertical
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          className="relative z-10"
        >
          <motion.div 
            className="text-accent-blue text-xl font-bold mb-1"
            animate={{
              textShadow: hovered ? "0 0 6px rgba(77, 162, 255, 0.5)" : "none" // Réduit l'effet de lueur
            }}
          >
            {prize.title}
          </motion.div>
          
          <motion.div 
            className="text-3xl font-black mb-4"
            animate={{
              scale: hovered ? 1.02 : 1, // Réduit l'effet de scale
              transition: { duration: 0.2 }
            }}
          >
            {prize.amount}
          </motion.div>
          
          <p className="text-sm text-gray-300 mb-6 line-clamp-2">
            {prize.description}
          </p>
          
          <motion.button
            className="w-full py-2 bg-accent-blue/20 border border-accent-blue/50 rounded-md text-accent-blue hover:bg-accent-blue/30 transition-colors relative overflow-hidden group"
            whileHover={{ 
              scale: 1.02, // Réduit l'effet de scale
              boxShadow: "0 0 10px rgba(77, 162, 255, 0.2)" // Réduit l'effet de lueur
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">View Details</span>
          </motion.button>
        </motion.div>
        
        {/* Effet d'éclat au survol - plus subtil */}
        {hovered && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-blue/5 to-transparent z-0" // Réduit l'opacité
            initial={{ opacity: 0, left: "-100%" }}
            animate={{ opacity: 1, left: "100%" }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        )}
        
        {/* Effets visuels de base */}
        <div className="prize-card-shine opacity-50"></div> {/* Réduit l'opacité */}
        <div className="holographic-grid opacity-30"></div> {/* Réduit l'opacité */}
        <div className="data-stream opacity-30"></div> {/* Réduit l'opacité */}
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
              className="relative"
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