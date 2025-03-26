'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Données fixes pour les particules du logo
const logoParticles = [
  { left: 40.45, top: 25.03, xMovement: 4, yMovement: 3, delay: 0.1 },
  { left: 94.39, top: 50.50, xMovement: -3, yMovement: 5, delay: 0.3 },
  { left: 69.03, top: 47.03, xMovement: 2, yMovement: -4, delay: 0.2 },
  { left: 21.13, top: 15.09, xMovement: -2, yMovement: -2, delay: 0.4 },
  { left: 20.97, top: 19.10, xMovement: 5, yMovement: -1, delay: 0.15 },
  { left: 34.67, top: 76.34, xMovement: -4, yMovement: 2, delay: 0.25 },
];

// Liste des liens de navigation
const navLinks = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Prizes', href: '#prizes', id: 'prizes' },
  { name: 'Sponsors', href: '#sponsors', id: 'sponsors' },
  { name: 'Judges', href: '#judges', id: 'judges' },
  { name: 'Register', href: '#register', id: 'register' },
];

// Composant NavBar avec un design futuriste et interactif amélioré
export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [linkClicked, setLinkClicked] = useState(false);
  
  // Refs pour les éléments de navigation
  const navRefs = useRef<Array<HTMLLIElement | null>>([]);
  const lastActiveSection = useRef(activeSection);
  const scrollPosition = useRef(0);

  // Fonction pour détecter la section active
  const detectActiveSection = useCallback(() => {
    const currentScrollY = window.scrollY;
    const sections = [...navLinks].reverse().map(link => link.id);
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element && currentScrollY >= element.offsetTop - 100) {
        lastActiveSection.current = section;
        return section;
      }
    }
    
    // Toujours retourner lastActiveSection si aucune section n'est trouvée
    // au lieu de revenir à 'home' par défaut
    return lastActiveSection.current;
  }, []);

  // Effet pour détecter le scroll et changer l'apparence de la navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      
      // Ne pas mettre à jour la section active si le menu mobile est ouvert
      if (!mobileMenuOpen) {
        // Utiliser la fonction pour détecter la section active
        const newActiveSection = detectActiveSection();
        setActiveSection(newActiveSection);
      }
    };

    // Appliquer dès le chargement
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [detectActiveSection, mobileMenuOpen]);
  
  // Mettre à jour la section active lorsque le menu mobile s'ouvre
  useEffect(() => {
    if (mobileMenuOpen) {
      // Stocker la section active actuelle quand on ouvre le menu
      const currentActiveSection = detectActiveSection();
      setActiveSection(currentActiveSection);
      
      // Stocker la position de défilement actuelle
      scrollPosition.current = window.scrollY;
      
      // Désactiver le défilement tout en conservant la position visuelle
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = '100%';
    } else if (document.body.style.position === 'fixed') {
      // Restaurer le défilement et la position seulement si on était en position fixed
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restaurer la position de défilement UNIQUEMENT si aucun lien n'a été cliqué
      if (!linkClicked) {
        window.scrollTo(0, scrollPosition.current);
      }
      
      // Réinitialiser l'état de clic sur lien
      setLinkClicked(false);
      
      // Réappliquer la section active après fermeture du menu
      const currentActiveSection = detectActiveSection();
      setActiveSection(currentActiveSection);
    }
    
    return () => {
      // Nettoyage en cas de démontage du composant
      if (document.body.style.position === 'fixed') {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
      }
    };
  }, [mobileMenuOpen, detectActiveSection, linkClicked]);
  
  // Fermer le menu mobile quand on clique sur un lien
  const handleMobileLinkClick = (linkId: string) => {
    // Définir la section active immédiatement pour un feedback visuel instantané
    setActiveSection(linkId);
    lastActiveSection.current = linkId;
    
    // Indiquer qu'un lien a été cliqué
    setLinkClicked(true);
    
    // Fermer le menu avec un court délai pour permettre aux animations de se terminer
    // et aux états de se mettre à jour correctement
    setTimeout(() => {
      setMobileMenuOpen(false);
    }, 50);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled 
          ? 'glass md:py-2 py-4 backdrop-blur-md border-b border-white/5' 
          : 'py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo avec animation améliorée */}
        <Link href="#home" className="flex items-center group relative z-10">
          <div className="relative">
            <motion.div
              className="bg-gradient-to-r from-accent-blue to-accent-blue-light w-10 h-10 rounded-md mr-2 flex items-center justify-center overflow-hidden"
              whileHover={{ 
                rotate: 180,
                boxShadow: "0 0 15px rgba(138, 218, 255, 0.5)",
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-6 h-6 bg-background rounded-sm"
                whileHover={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
              
              {/* Particules autour du logo au hover */}
              <motion.div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              >
                {logoParticles.map((particle, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${particle.left}%`,
                      top: `${particle.top}%`,
                    }}
                    animate={{
                      x: [0, particle.xMovement],
                      y: [0, particle.yMovement],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: particle.delay,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
          
          <motion.span 
            className="text-white font-bold text-lg tracking-wider"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.span 
              className="font-heading relative inline-block"
              initial={{ opacity: 1 }}
              whileHover="glitchIntense"
            >
              <span className="relative z-10">HACKATHON</span>
              {/* Effet de glitch permanent léger */}
              <motion.div
                className="absolute inset-0 z-0"
                animate={{
                  opacity: [0, 0.3, 0, 0.2, 0, 0.1, 0],
                  x: [0, -1, 1, 0, 1, -1, 0],
                  y: [0, 0.5, -0.5, 0, -0.3, 0.3, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                <span className="absolute text-[#ff2a6d]/30 left-[0.5px] top-[-0.3px]">HACKATHON</span>
                <span className="absolute text-[#05d9e8]/30 left-[-0.7px] top-[0.3px]">HACKATHON</span>
              </motion.div>
              
              {/* Effet de glitch intense au survol */}
              <motion.div
                className="absolute inset-0 opacity-0 z-0"
                variants={{
                  glitchIntense: {
                    opacity: [0, 1, 0, 1, 0, 1, 0],
                    x: [0, -2, 3, -1, 2, -1, 0],
                    y: [0, 1, -1, 1, 0, -1, 0],
                    transition: {
                      duration: 0.4,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }
                }}
              >
                <span className="absolute text-[#ff2a6d] left-[0.5px] top-[-0.5px]">HACKATHON</span>
                <span className="absolute text-[#05d9e8] left-[-1px] top-[0.5px]">HACKATHON</span>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent-blue-light"
                animate={{
                  scaleX: [0, 1, 1, 0],
                  opacity: [0, 1, 1, 0],
                  left: [0, 0, 0, '100%']
                }}
                transition={{
                  times: [0, 0.4, 0.6, 1],
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
            </motion.span>
            <span className="text-accent-blue-light drop-shadow-glow">.DEV</span>
          </motion.span>
        </Link>
        
        {/* Navigation desktop */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-2 relative">
            {navLinks.map((link, index) => (
              <li 
                key={link.id} 
                ref={(el) => { navRefs.current[index] = el; }}
                className="relative"
              >
                <Link 
                  href={link.href}
                  className={`relative px-4 py-2 rounded-md transition-colors duration-300 group ${
                    activeSection === link.id
                      ? 'text-accent-blue-light'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  
                  {/* Effet de hover avec fond subtil */}
                  <motion.span
                    className="absolute inset-0 bg-white/5 rounded-md -z-0"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </li>
            ))}
            
            {/* Liseré bleu animé sous le lien actif */}
            <motion.div
              className="absolute h-[2px] bg-gradient-to-r from-accent-blue to-accent-blue-light rounded-full -bottom-1 shadow-[0_0_8px_rgba(20,136,252,0.7)]"
              layoutId="navIndicator"
              transition={{ 
                type: 'spring', 
                stiffness: 380, 
                damping: 30 
              }}
              style={{
                width: navRefs.current[navLinks.findIndex(link => link.id === activeSection)]?.offsetWidth || 0,
                left: (() => {
                  const activeIndex = navLinks.findIndex(link => link.id === activeSection);
                  if (activeIndex === -1) return 0;
                  
                  const activeElement = navRefs.current[activeIndex];
                  if (!activeElement) return 0;
                  
                  // Calculer la position absolue par rapport au parent (ul)
                  return activeElement.offsetLeft;
                })()
              }}
            />
          </ul>
        </nav>
        
        {/* Bouton Register amélioré - masqué sur mobile */}
        <div className="hidden md:block">
          <Link 
            href="#register" 
            className="relative overflow-hidden group px-6 py-2 rounded-md text-white font-bold transition-all"
          >
            {/* Fond du bouton avec effet de glow */}
            <span className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-blue-light rounded-md opacity-90 group-hover:opacity-100 transition-opacity duration-300"></span>
            
            {/* Effet de brillance au hover avec un effet organique */}
            <motion.div
              className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 overflow-hidden rounded-md"
            >
              {/* Points de lumière animés qui se déplacent organiquement */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{ 
                    background: 'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)',
                    width: `${20 + i * 5}px`,
                    height: `${20 + i * 5}px`,
                    filter: 'blur(4px)',
                    x: `${10 + i * 20}%`,
                    y: `${30 + (i % 3) * 10}%`,
                  }}
                  animate={{
                    x: [
                      `${10 + i * 20}%`, 
                      `${30 + (i % 4) * 15}%`, 
                      `${5 + (i % 3) * 25}%`, 
                      `${10 + i * 20}%`
                    ],
                    y: [
                      `${30 + (i % 3) * 10}%`, 
                      `${50 - (i % 4) * 10}%`, 
                      `${20 + (i % 2) * 20}%`, 
                      `${30 + (i % 3) * 10}%`
                    ],
                    opacity: [0.3, 0.7, 0.5, 0.3],
                    scale: [1, 1.2, 0.9, 1],
                  }}
                  transition={{
                    duration: 4 + i,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
              ))}
            </motion.div>
            
            {/* Animation de pulse autour du bouton - effet organique */}
            <span className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <motion.div 
                className="absolute inset-0 rounded-lg"
                style={{ 
                  background: 'radial-gradient(circle at center, rgba(138,218,255,0.7) 0%, rgba(20,136,252,0.3) 50%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [0.98, 1.02, 0.98],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </span>
            
            <span className="relative z-10">Register Now</span>
          </Link>
        </div>
      </div>
      
      {/* Bouton menu mobile avec animation par classes conditionnelles - simplifié avec position fixe */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 w-10 h-10 flex flex-col items-center justify-center"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
      >
        <span className={`w-8 h-[2px] bg-white mb-1.5 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[6px] bg-accent-blue-light' : ''}`}></span>
        <span className={`w-8 h-[2px] bg-white mb-1.5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`w-8 h-[2px] bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[6px] bg-accent-blue-light' : ''}`}></span>
      </button>
      
      {/* Menu mobile avec Framer Motion pour une meilleure animation */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-45 md:hidden bg-background/95 backdrop-blur-xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-full h-full flex items-center justify-center px-4">
              <motion.nav 
                className="w-full max-w-md" 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <ul className="flex flex-col items-center space-y-6 p-8 pt-20">
                  {navLinks.map((link, index) => (
                    <motion.li 
                      key={link.id}
                      className="w-full"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                    >
                      <Link 
                        href={link.href}
                        onClick={() => handleMobileLinkClick(link.id)}
                        className={`block text-center text-xl p-4 rounded-lg ${
                          activeSection === link.id
                            ? 'bg-accent-blue/20 text-accent-blue-light border border-accent-blue/30 shadow-sm shadow-accent-blue/20'
                            : 'text-white hover:bg-white/5 border border-transparent'
                        } ${link.id === 'register' ? 'bg-gradient-to-r from-accent-blue to-accent-blue-light text-white font-bold shadow-md' : ''}`}
                      >
                        {link.id === 'register' ? 'Register Now' : link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
} 