'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';

// Données des prix
const prizes = [
  {
    title: "Grand Prize",
    amount: "$500,000",
    description: "The ultimate recognition for the most innovative and impactful project, including funding, mentorship, and global exposure.",
    features: [
      "Direct investment opportunity",
      "1-year mentorship from industry leaders",
      "Global media coverage",
      "Exclusive access to partner accelerators"
    ],
    color: "from-[#1488fc] to-[#8adaff]",
    delay: 0,
    highlight: true,
    emoji: "🏆"
  },
  {
    title: "Runner-Up",
    amount: "$250,000",
    description: "For the second place project that demonstrates exceptional innovation and execution.",
    features: [
      "Seed funding",
      "6-month mentorship program",
      "Partner showcase opportunities",
      "Technical resource credits"
    ],
    color: "from-[#8adaff] to-[#1488fc]",
    delay: 0.1,
    highlight: false,
    emoji: "🥈"
  },
  {
    title: "Category Winners",
    amount: "$50,000 each",
    description: "Excellence awards for top projects in specialized technology categories.",
    features: [
      "AI & Machine Learning",
      "Web3 & Blockchain",
      "AR/VR/XR",
      "Climate Tech",
      "Health Tech"
    ],
    color: "from-[#1488fc] to-[#8adaff]",
    delay: 0.2,
    highlight: false,
    emoji: "🌟"
  },
  {
    title: "Community Choice",
    amount: "$100,000",
    description: "Voted by the global developer community for the most beloved innovation.",
    features: [
      "Public recognition",
      "Featured in partner platforms",
      "User testing opportunities",
      "Community support package"
    ],
    color: "from-[#8adaff] to-[#1488fc]",
    delay: 0.3,
    highlight: false,
    emoji: "❤️"
  }
];

// Générer des données de particules fixes pour éviter les problèmes de rendu
const generateParticleData = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    width: Math.random() * 4 + 2,
    height: Math.random() * 4 + 2,
    left: Math.random() * 100,
    yMovement: -(Math.random() * 100 + 50),
    xMovement: Math.random() * 60 - 30,
    duration: 1 + Math.random()
  }));
};

// Données pré-calculées pour les particules
const particlesData = generateParticleData(10);

// Données fixes pour les particules flottantes
const floatingParticlesData = [
  { width: 10.29, height: 9.19, left: 92.82, top: 65.44, yMovement: -25, xMovement: -5, duration: 8.2, delay: 0.5 },
  { width: 9.02, height: 9.12, left: 27.20, top: 19.06, yMovement: -35, xMovement: 7, duration: 6.8, delay: 1.2 },
  { width: 9.43, height: 5.93, left: 73.58, top: 64.95, yMovement: -28, xMovement: -8, duration: 7.5, delay: 2.8 },
  { width: 6.23, height: 4.45, left: 38.82, top: 67.31, yMovement: -40, xMovement: 3, duration: 9.1, delay: 0.9 },
  { width: 8.82, height: 8.62, left: 42.23, top: 50.97, yMovement: -22, xMovement: -6, duration: 8.7, delay: 3.5 },
  { width: 4.21, height: 10.44, left: 71.79, top: 31.99, yMovement: -30, xMovement: 10, duration: 7.3, delay: 1.8 },
  { width: 5.02, height: 8.38, left: 69.87, top: 3.63, yMovement: -25, xMovement: -2, duration: 8.4, delay: 2.5 },
  { width: 8.65, height: 10.60, left: 28.82, top: 21.05, yMovement: -38, xMovement: 5, duration: 6.2, delay: 0.3 },
  { width: 8.07, height: 9.91, left: 82.70, top: 5.08, yMovement: -32, xMovement: -9, duration: 9.5, delay: 4.2 },
  { width: 5.58, height: 7.22, left: 90.57, top: 30.17, yMovement: -28, xMovement: 8, duration: 7.8, delay: 1.5 },
  { width: 3.25, height: 4.25, left: 3.93, top: 17.91, yMovement: -20, xMovement: -4, duration: 6.5, delay: 3.2 },
  { width: 5.43, height: 5.25, left: 54.87, top: 92.23, yMovement: -35, xMovement: 2, duration: 8.3, delay: 2.1 },
  { width: 7.97, height: 6.72, left: 22.89, top: 90.53, yMovement: -26, xMovement: -7, duration: 7.1, delay: 0.7 },
  { width: 5.57, height: 9.24, left: 37.85, top: 6.32, yMovement: -33, xMovement: 9, duration: 8.9, delay: 3.8 },
  { width: 9.48, height: 3.24, left: 56.61, top: 9.12, yMovement: -22, xMovement: -3, duration: 6.3, delay: 2.4 }
];

export default function PrizesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activePrize, setActivePrize] = useState<number | null>(null);
  
  // Animation variants pour les cartes
  const cardVariants = {
    inactive: {
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    active: {
      scale: 1.03,
      y: -5,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };
  
  return (
    <section 
      id="prizes" 
      ref={sectionRef}
      className="relative py-24 bg-background overflow-hidden grid-bg"
    >
      {/* Effet de ligne décorative */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue to-transparent opacity-30"></div>
      
      {/* Élément de glow dynamique */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full max-w-screen-xl mx-auto relative">
          <motion.div 
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(20,136,252,0.15) 0%, rgba(138,218,255,0.05) 50%, transparent 70%)",
              right: "10%",
              top: "20%",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
      
      {/* Formes décoratives - hexagones avec animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-[5%] w-32 h-32 opacity-20"
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
          animate={isInView ? { opacity: 0.2, scale: 1, rotate: 45 } : { opacity: 0, scale: 0.5, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-glow">
            <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" fill="url(#hexGradient)" />
            <defs>
              <linearGradient id="hexGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1488fc" />
                <stop offset="1" stopColor="#8adaff" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 right-[10%] w-48 h-48 opacity-10"
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
          animate={isInView ? { opacity: 0.2, scale: 1, rotate: -30 } : { opacity: 0, scale: 0.5, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-glow">
            <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" fill="url(#hexGradient2)" />
            <defs>
              <linearGradient id="hexGradient2" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8adaff" />
                <stop offset="1" stopColor="#1488fc" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
        
        {/* Particules flottantes */}
        {floatingParticlesData.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent-blue/50 drop-shadow-glow"
            style={{
              width: particle.width + "px",
              height: particle.height + "px",
              left: particle.left + "%",
              top: particle.top + "%",
            }}
            animate={{
              y: [0, particle.yMovement],
              x: [0, particle.xMovement],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête de section avec animation avancée */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-3"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20, 
                delay: 0.2 
              }}
            >
              <span className="bg-accent-blue/10 backdrop-blur-md px-5 py-2 rounded-full text-accent-blue-light font-title text-sm uppercase tracking-wider border border-accent-blue/20 shadow-sm shadow-accent-blue/20">
                Rewards
              </span>
            </motion.div>
            
            <motion.h3 
              className="text-4xl md:text-6xl font-bold mb-6 relative inline-block"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <span className="gradient-text drop-shadow-glow">$1M+ Prize Pool</span>
              {/* Animation de pluie d'argent flottant */}
              <motion.div
                className="absolute -top-2 -right-2 text-2xl"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                💰
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-2 text-2xl"
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                💎
              </motion.div>
            </motion.h3>
            
            <motion.p 
              className="text-xl text-muted-light max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              We're offering life-changing prizes to recognize and accelerate the most innovative 
              projects created during our hackathon.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Grille des prix avec effet 3D et animations au hover */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
          {prizes.map((prize, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.1 + prize.delay }}
              className={`${prize.highlight ? 'lg:col-span-2 md:row-span-2' : ''}`}
              onMouseEnter={() => setActivePrize(index)}
              onMouseLeave={() => setActivePrize(null)}
              variants={cardVariants}
              animate={activePrize === index ? 'active' : 'inactive'}
            >
              <Card className={`h-full overflow-hidden glass relative group transition-all duration-300 transform-gpu will-change-transform ${
                prize.highlight ? 'border-accent-blue/30' : 'border-white/10'
              } ${activePrize === index ? 'border-accent-blue/70 shadow-lg shadow-accent-blue/20' : 'hover:border-accent-blue/30'}`}>
                <div className="h-full flex flex-col relative z-10">
                  {/* Bannière décorative */}
                  <div className={`h-2 w-full bg-gradient-to-r ${prize.color}`}></div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    {/* En-tête de carte avec emoji */}
                    <div className="mb-6 flex items-center">
                      <motion.div 
                        className="text-3xl mr-3"
                        animate={activePrize === index ? { 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, 0]
                        } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {prize.emoji}
                      </motion.div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1 group-hover:text-accent-blue-light transition-colors duration-300">{prize.title}</h4>
                        <div className="bg-white/5 w-fit px-4 py-1 rounded-full border border-white/10 group-hover:border-accent-blue/30 transition-colors duration-300">
                          <span className="text-2xl font-heading text-accent-blue-light drop-shadow-glow">{prize.amount}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-muted-light mb-6 flex-grow group-hover:text-white/80 transition-colors duration-300">
                      {prize.description}
                    </p>
                    
                    {/* Liste des caractéristiques avec animation */}
                    <ul className="space-y-3">
                      {prize.features.map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-center gap-3 text-sm group/item"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ duration: 0.3, delay: 0.5 + prize.delay + (idx * 0.1) }}
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${prize.color} group-hover/item:shadow-sm group-hover/item:shadow-accent-blue/50`}></div>
                          <span className="text-white/70 group-hover/item:text-white transition-colors duration-300">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Effet de brillance au hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  animate={activePrize === index ? { opacity: 0.2 } : { opacity: 0 }}
                />
                
                {/* Effet de particules au hover */}
                <AnimatePresence>
                  {activePrize === index && (
                    <>
                      {particlesData.map((particle, i) => (
                        <motion.div
                          key={`particle-${index}-${i}`}
                          className="absolute rounded-full bg-accent-blue/70"
                          style={{
                            width: particle.width + "px",
                            height: particle.height + "px",
                            left: particle.left + "%",
                            bottom: -10,
                          }}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ 
                            y: particle.yMovement,
                            x: particle.xMovement,
                            opacity: [0, 1, 0]
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: particle.duration }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Appel à l'action amélioré */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a 
            href="#register" 
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-blue-light rounded-full text-white font-bold relative overflow-hidden group"
          >
            {/* Effet de brillance */}
            <span className="absolute inset-0 w-full h-full shine-effect opacity-0 group-hover:opacity-100"></span>
            
            {/* Animation de pulse autour du bouton */}
            <span className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-blue to-accent-blue-light blur-md animate-pulse"></span>
            </span>
            
            <span className="relative z-10 text-lg">Compete for the Prizes</span>
            <motion.svg 
              width="22" 
              height="22" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </a>
          <motion.div
            className="mt-6 text-accent-blue-light/70"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 }}
          >
            Submission deadline: <span className="font-semibold text-accent-blue-light">TBD</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 