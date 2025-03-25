'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Données pour les statistiques
const stats = [
  { number: '5K+', label: 'Participants', icon: '👥' },
  { number: '$1M+', label: 'Prize Pool', icon: '💰' },
  { number: '72h', label: 'Hacking', icon: '⏱️' },
  { number: '100+', label: 'Countries', icon: '🌎' },
];

// Données pour les fonctionnalités du hackathon
const features = [
  {
    title: 'Global Talent',
    description: 'Connect with thousands of developers, designers, and innovators from across the globe.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    delay: 0,
  },
  {
    title: 'Cutting-Edge Tech',
    description: 'Explore and build using the latest breakthrough technologies like AI, blockchain, XR and more.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    delay: 0.1,
  },
  {
    title: 'Industry Mentors',
    description: 'Get guidance and feedback from top engineers, designers and product leaders from leading companies.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13C17.7699 3.58317 19.0078 5.17775 19.0078 7.005C19.0078 8.83225 17.7699 10.4268 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    delay: 0.2,
  },
  {
    title: 'Life-Changing Prizes',
    description: 'Win your share of our $1M+ prize pool including cash, investments, job offers and more.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 6H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 12H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    delay: 0.3,
  },
];

// FAQ data
const faqItems = [
  {
    question: "Who can participate?",
    answer: "Anyone from any background, skill level, or location can join! Whether you're a seasoned developer, designer, or new to tech - all are welcome."
  },
  {
    question: "Do I need a team?",
    answer: "You can register solo and we'll help match you with teammates, or you can form your own team of up to 4 people before or during the event."
  },
  {
    question: "What can I build?",
    answer: "Anything tech-related! We'll have specific prize tracks and themes, but you're free to innovate in any direction that excites you."
  },
  {
    question: "How does judging work?",
    answer: "Projects will be evaluated on innovation, technical complexity, design, functionality, and potential impact by our panel of industry experts."
  }
];

// Données fixes pré-calculées pour les particules
const particlesData = [
  { width: 3.5, height: 3.2, left: 25, top: 35, duration: 3.5, delay: 0.2, yMovement: -10 },
  { width: 2.8, height: 1.9, left: 75, top: 15, duration: 4.2, delay: 1.5, yMovement: -8 },
  { width: 1.5, height: 2.3, left: 45, top: 65, duration: 3.7, delay: 2.8, yMovement: -12 },
  { width: 2.2, height: 2.7, left: 85, top: 42, duration: 2.8, delay: 0.7, yMovement: -7 },
  { width: 1.3, height: 3.8, left: 15, top: 78, duration: 4.5, delay: 3.5, yMovement: -9 },
  { width: 2.9, height: 2.1, left: 55, top: 25, duration: 3.2, delay: 1.2, yMovement: -11 },
  { width: 3.7, height: 1.8, left: 32, top: 52, duration: 3.8, delay: 0.8, yMovement: -6 },
  { width: 1.8, height: 3.5, left: 68, top: 88, duration: 2.6, delay: 2.3, yMovement: -10 },
  { width: 2.5, height: 2.2, left: 92, top: 12, duration: 3.9, delay: 1.7, yMovement: -8 },
  { width: 3.3, height: 2.6, left: 12, top: 45, duration: 4.8, delay: 0.5, yMovement: -13 },
  { width: 2.1, height: 3.1, left: 48, top: 72, duration: 3.3, delay: 2.1, yMovement: -9 },
  { width: 3.8, height: 1.5, left: 82, top: 34, duration: 2.9, delay: 3.2, yMovement: -7 },
  { width: 1.2, height: 2.8, left: 36, top: 92, duration: 4.1, delay: 1.9, yMovement: -11 },
  { width: 2.7, height: 3.3, left: 72, top: 58, duration: 3.6, delay: 0.3, yMovement: -8 },
  { width: 3.1, height: 2.5, left: 22, top: 18, duration: 2.7, delay: 2.5, yMovement: -10 },
  { width: 1.7, height: 3.4, left: 58, top: 82, duration: 4.3, delay: 1.1, yMovement: -12 },
  { width: 2.6, height: 2.3, left: 88, top: 28, duration: 3.1, delay: 2.9, yMovement: -7 },
  { width: 3.2, height: 1.6, left: 42, top: 62, duration: 3.4, delay: 0.9, yMovement: -9 },
  { width: 1.9, height: 2.9, left: 65, top: 22, duration: 4.6, delay: 2.7, yMovement: -11 },
  { width: 2.4, height: 3.7, left: 18, top: 48, duration: 3.0, delay: 1.6, yMovement: -8 }
];

// Autour de la ligne 280, je vais ajuster l'élément de code pour mieux exploiter l'espace vertical
                {/* Logo/Illustration centrale avec meilleure utilisation de l'espace vertical */}
                <div className="flex flex-col items-center justify-center gap-3 px-6 py-8 h-full">
                  <div className="text-8xl gradient-text font-bold opacity-80 drop-shadow-glow mb-2">
                    &lt;/&gt;
                  </div>
                  <div className="text-accent-blue-light text-lg text-center font-mono">
                    <motion.span
                      animate={{
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      Build. Create. Innovate.
                    </motion.span>
                  </div>
                </div>
                
                {/* Code abstrait en arrière-plan sur toute la hauteur */}
                <div className="absolute inset-0 opacity-10 flex items-center justify-center overflow-hidden text-xs">
                  <motion.pre 
                    className="text-accent-blue-light h-full w-full flex items-center justify-center"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      filter: [
                        'brightness(0.8) blur(0.5px)', 
                        'brightness(1.2) blur(0px)', 
                        'brightness(0.8) blur(0.5px)'
                      ]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {`function hackathon() {
  const ideas = generateInnovation();
  const impact = buildSolution(ideas);
  const future = transformTech(impact);
  return future;
}

// Join us and code the future
hackathon();`}
                  </motion.pre>
                </div>

// Autour de la ligne 330, je vais supprimer ce bloc qui n'est pas utilisé et qui cause des erreurs
// Supprimer ce bloc:
// <motion.div 
//   className="absolute -bottom-6 -right-6 glass rounded-lg shadow-lg border border-white/10 overflow-hidden"
//   initial={{ opacity: 0, scale: 0.8 }}
//   animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
//   transition={{ duration: 0.5, delay: 0.6 }}
//   whileHover={{ 
//     scale: 1.05,
//     boxShadow: "0 0 15px rgba(138, 218, 255, 0.3)"
//   }}
// >

// Ajouter des étincelles aux coins des cartes (effet de soudure)
// Créer un composant SparkEffect
const SparkEffect = () => {
  const sparkRef = useRef<HTMLDivElement>(null);
  const [sparks, setSparks] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (sparkRef.current) {
        const width = sparkRef.current.offsetWidth;
        const height = sparkRef.current.offsetHeight;
        
        // Générer une nouvelle étincelle aléatoire
        const newSpark = {
          id: Date.now(),
          style: {
            left: `${Math.random() * width}px`,
            top: `${Math.random() * height}px`,
            opacity: Math.random() * 0.7 + 0.3,
            animationDuration: `${Math.random() * 0.5 + 0.5}s`
          }
        };
        
        // Ajouter la nouvelle étincelle et supprimer les anciennes
        setSparks(prev => [...prev, newSpark].slice(-15));
      }
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div ref={sparkRef} className="spark-container">
      {sparks.map(spark => (
        <div key={spark.id} className="spark" style={spark.style} />
      ))}
      <div className="corner-spark top-left"></div>
      <div className="corner-spark top-right"></div>
      <div className="corner-spark bottom-right"></div>
      <div className="corner-spark bottom-left"></div>
    </div>
  );
};

// Define proper type interfaces
interface Stat {
  number: string;
  label: string;
  icon: string;
}

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

// Mise à jour du rendu des statistiques pour ajouter les étincelles
const StatCard = ({ stat, index }: { stat: Stat; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  
  return (
    <motion.div 
      ref={ref}
      className="relative overflow-hidden bg-zinc-900 p-6 rounded-lg card-border-animation"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <SparkEffect />
      <div className="corner-highlight top-left"></div>
      <div className="corner-highlight top-right"></div>
      <div className="corner-highlight bottom-right"></div>
      <div className="corner-highlight bottom-left"></div>
      <div className="text-2xl sm:text-4xl font-bold mb-2">{stat.number}</div>
      <div className="text-zinc-400">{stat.label}</div>
    </motion.div>
  );
};

// Définir les variants pour les animations des fonctionnalités
const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Replace any with proper types
const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  
  return (
    <motion.div
      ref={ref}
      key={index}
      variants={featureVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className="relative overflow-hidden bg-zinc-900 p-6 rounded-lg card-border-animation"
    >
      <SparkEffect />
      <div className="corner-highlight top-left"></div>
      <div className="corner-highlight top-right"></div>
      <div className="corner-highlight bottom-right"></div>
      <div className="corner-highlight bottom-left"></div>
      <div className="text-xl font-bold mb-2">{feature.title}</div>
      <div className="text-zinc-400">{feature.description}</div>
    </motion.div>
  );
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  // Gérer le clic sur un item FAQ
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-24 bg-background overflow-hidden grid-bg"
    >
      {/* Elements décoratifs */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue to-transparent opacity-30"></div>
      
      {/* Cercles décoratifs flottants avec effet de glow */}
      <motion.div 
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent-blue/5 blur-3xl"
        animate={{ 
          y: [0, 50, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent-blue/10 blur-3xl"
        animate={{ 
          y: [0, -30, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      {/* Élément de glow dynamique qui suit le scroll */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full max-w-screen-xl mx-auto relative">
          <motion.div 
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(20,136,252,0.15) 0%, rgba(138,218,255,0.05) 50%, transparent 70%)",
              left: "30%",
              top: "30%",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
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
              className="inline-block mb-3 relative"
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
                About the Event
              </span>
            </motion.div>
            
            {/* Titre avec "HACKATHONS" plus délicat et animé */}
            <div className="mb-20 relative">
              <h3 className="text-4xl md:text-6xl font-bold text-white mb-4 px-4 sm:px-0">
                Redefining
              </h3>
              <div className="relative overflow-hidden px-4 sm:px-0">
                {/* Animation subtile de pulsation */}
                <motion.div 
                  className="absolute -inset-x-2 -inset-y-1 opacity-40 rounded-lg"
                  style={{ 
                    background: 'linear-gradient(90deg, rgba(20,136,252,0.1) 0%, rgba(138,218,255,0.3) 50%, rgba(20,136,252,0.1) 100%)' 
                  }}
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [0.98, 1.02, 0.98],
                    filter: ['blur(8px)', 'blur(12px)', 'blur(8px)']
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <h2 className="relative text-4xl sm:text-5xl md:text-7xl font-black tracking-wide">
                  <motion.span 
                    className="inline-block bg-gradient-to-r from-[#1488fc] via-[#8adaff] to-[#1488fc] bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ['0% center', '100% center', '0% center'],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    HACKATHONS
                  </motion.span>
                </h2>
                
                {/* Ligne décorative sous le titre */}
                <motion.div 
                  className="h-[2px] mt-4 rounded-full mx-auto w-[60%]"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #8adaff, transparent)'
                  }}
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                    width: ['40%', '60%', '40%']
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse"
                  }}
                />
              </div>
            </div>
            
            <motion.p 
              className="text-xl text-muted-light max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              This isn&apos;t just another hackathon. It&apos;s a global movement bringing together 
              the world&apos;s most innovative minds to solve real-world problems through code.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Statistiques avec animation et interaction au survol */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-24">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
        
        {/* Contenu principal avec mise en page améliorée */}
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Colonne de gauche: Image/Illustration (5 colonnes) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative md:col-span-5"
          >
            <div className="aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden gradient-border p-1 border-glow">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-accent-blue/5 to-black/30 flex items-center justify-center relative">
                {/* Logo/Illustration centrale avec meilleure utilisation de l'espace vertical */}
                <div className="flex flex-col items-center justify-center gap-3 px-6 py-8 h-full">
                  <div className="text-8xl gradient-text font-bold opacity-80 drop-shadow-glow mb-2">
                    &lt;/&gt;
                  </div>
                  <div className="text-accent-blue-light text-lg text-center font-mono">
                    <motion.span
                      animate={{
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      Build. Create. Innovate.
                    </motion.span>
                  </div>
                </div>
                
                {/* Code abstrait en arrière-plan sur toute la hauteur */}
                <div className="absolute inset-0 opacity-10 flex items-center justify-center overflow-hidden text-xs">
                  <motion.pre 
                    className="text-accent-blue-light h-full w-full flex items-center justify-center"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      filter: [
                        'brightness(0.8) blur(0.5px)', 
                        'brightness(1.2) blur(0px)', 
                        'brightness(0.8) blur(0.5px)'
                      ]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {`function hackathon() {
  const ideas = generateInnovation();
  const impact = buildSolution(ideas);
  const future = transformTech(impact);
  return future;
}

// Join us and code the future
hackathon();`}
                  </motion.pre>
                </div>
                
                {/* Particules en arrière-plan */}
                <div className="absolute inset-0 pointer-events-none">
                  {particlesData.map((particle, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-accent-blue"
                      style={{
                        width: particle.width + "px",
                        height: particle.height + "px",
                        left: particle.left + "%",
                        top: particle.top + "%",
                      }}
                      animate={{
                        y: [0, particle.yMovement, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Badge flottant avec animation */}
            <motion.div 
              className="absolute -bottom-6 -right-6 glass rounded-lg shadow-lg border border-white/10 overflow-hidden max-w-[90%] sm:max-w-none right-0 bottom-0 sm:-bottom-6 sm:-right-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 15px rgba(138, 218, 255, 0.3)"
              }}
            >
              <div className="relative">
                <SparkEffect />
                <div className="card-border-animation">
                  <div className="corner-highlight top-left"></div>
                  <div className="corner-highlight top-right"></div>
                  <div className="corner-highlight bottom-right"></div>
                  <div className="corner-highlight bottom-left"></div>
                </div>
              </div>
            
              {/* Liseré lumineux animé */}
              <motion.div 
                className="absolute h-1 bg-gradient-to-r from-transparent via-accent-blue-light to-transparent"
                style={{ width: '100%', top: 0, left: 0 }}
                animate={{
                  left: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Contenu horizontal */}
              <div className="py-2 px-3 sm:px-4 flex items-center justify-center gap-1 sm:gap-2 flex-wrap text-xs sm:text-base">
                <span className="text-accent-blue-light font-medium">Powered by</span>
                <span className="gradient-text font-bold text-base sm:text-lg">Bolt.new</span>
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 0px 0px rgba(136, 58, 234, 0)",
                      "0 0 10px 2px rgba(136, 58, 234, 0.8)",
                      "0 0 5px 1px rgba(0, 191, 255, 0.5)",
                      "0 0 0px 0px rgba(136, 58, 234, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                  className="h-2 w-2 rounded-full bg-accent-purple"
                />
              </div>
              
              {/* Liseré lumineux animé (bas) avec deux couleurs */}
              <motion.div 
                className="absolute h-1 bg-gradient-to-r from-transparent via-[#ff8a3d] via-30% via-accent-blue-light via-70% to-transparent"
                style={{ width: '100%', bottom: 0, right: 0 }}
                animate={{
                  right: ['100%', '-100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1
                }}
              />
            </motion.div>
          </motion.div>
          
          {/* Colonne de droite: Texte et fonctionnalités (7 colonnes) */}
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h3 className="text-3xl font-bold mb-6 text-white">The Ultimate Coding Challenge</h3>
              <p className="text-lg text-muted-light mb-6">
                Whether you&apos;re a seasoned developer, a creative designer, or just starting your 
                tech journey, this hackathon is your platform to innovate, learn, and connect 
                with the global tech community.
              </p>
              <p className="text-lg text-muted-light">
                Over the course of 72 hours, you&apos;ll collaborate with talented individuals from 
                around the world, receive mentorship from industry experts, and compete for a 
                share of our massive prize pool.
              </p>
            </motion.div>
            
            {/* Fonctionnalités en grille */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            <p className="text-muted-light max-w-2xl mx-auto">
              Everything you need to know about the world&apos;s largest hackathon
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <motion.div 
                key={index}
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className={`w-full text-left p-5 rounded-${expandedFaq === index ? 't-' : ''}lg flex justify-between items-center transition-all duration-300 ${
                    expandedFaq === index 
                    ? 'bg-accent-blue/20 text-white border-accent-blue/40' 
                    : 'bg-white/5 text-muted-light hover:bg-white/10 border-white/10'
                  } border`}
                >
                  <span className="font-medium text-lg">{item.question}</span>
                  <span className="text-xl">
                    {expandedFaq === index ? '−' : '+'}
                  </span>
                </button>
                
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 bg-accent-blue/10 rounded-b-lg border-x border-b border-accent-blue/40 text-white">
                        <p className="text-white/80">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 