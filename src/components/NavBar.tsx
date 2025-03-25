'use client';

import { useState, useEffect, useRef } from 'react';
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

// Composant NavBar avec un design futuriste et interactif amélioré
export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Effet pour détecter le scroll et changer l'apparence de la navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
      
      // Détection de la section active basée sur la position de scroll
      const sections = ['home', 'about', 'prizes', 'sponsors', 'judges', 'register'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Fermer le menu mobile quand on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Fermer le menu mobile quand on clique sur un lien
  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Liste des liens de navigation
  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Prizes', href: '#prizes', id: 'prizes' },
    { name: 'Sponsors', href: '#sponsors', id: 'sponsors' },
    { name: 'Judges', href: '#judges', id: 'judges' },
    { name: 'Register', href: '#register', id: 'register' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass py-2 backdrop-blur-md border-b border-white/5' : 'py-4'
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
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="font-heading">HACKATHON</span>
            <span className="text-accent-blue-light drop-shadow-glow">.DEV</span>
          </motion.span>
        </Link>
        
        {/* Navigation desktop */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-2">
            {navLinks.map((link) => (
              <li key={link.id}>
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
                  
                  {/* Indicateur de section active */}
                  {activeSection === link.id && (
                    <motion.span
                      className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-accent-blue to-accent-blue-light w-full rounded-full shadow-glow"
                      layoutId="activeSection"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Bouton Register amélioré */}
        <Link 
          href="#register" 
          className="relative overflow-hidden group px-6 py-2 rounded-md text-white font-bold transition-all"
        >
          {/* Fond du bouton avec effet de glow */}
          <span className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-blue-light rounded-md opacity-90 group-hover:opacity-100 transition-opacity duration-300"></span>
          
          {/* Effet de brillance au hover */}
          <span className="absolute inset-0 w-full h-full shine-effect opacity-0 group-hover:opacity-100"></span>
          
          {/* Animation de pulse autour du bouton */}
          <span className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent-blue to-accent-blue-light blur-md group-hover:animate-pulse"></span>
          </span>
          
          <span className="relative z-10">Register Now</span>
        </Link>
      </div>
      
      {/* Bouton menu mobile amélioré */}
      <motion.button
        className="md:hidden absolute top-4 right-4 z-50 w-10 h-10 flex flex-col items-center justify-center"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle Menu"
      >
        <motion.div
          className="w-8 h-[2px] bg-white mb-1.5"
          animate={{ 
            rotate: mobileMenuOpen ? 45 : 0,
            y: mobileMenuOpen ? 8 : 0,
            backgroundColor: mobileMenuOpen ? "#8adaff" : "#ffffff" 
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="w-8 h-[2px] bg-white mb-1.5"
          animate={{ 
            opacity: mobileMenuOpen ? 0 : 1,
            width: mobileMenuOpen ? 0 : 32
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="w-8 h-[2px] bg-white"
          animate={{ 
            rotate: mobileMenuOpen ? -45 : 0,
            y: mobileMenuOpen ? -8 : 0,
            backgroundColor: mobileMenuOpen ? "#8adaff" : "#ffffff"
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
      
      {/* Menu mobile complet avec animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            className="fixed inset-0 z-40 glass backdrop-blur-lg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center h-full">
              <nav className="max-w-md w-full">
                <ul className="flex flex-col items-center space-y-6 p-8">
                  {navLinks.map((link, index) => (
                    <motion.li 
                      key={link.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="w-full"
                    >
                      <Link 
                        href={link.href}
                        onClick={handleMobileLinkClick}
                        className={`block text-center text-xl p-4 rounded-lg ${
                          activeSection === link.id
                            ? 'bg-accent-blue/20 text-accent-blue-light border border-accent-blue/30 shadow-sm shadow-accent-blue/20'
                            : 'text-white hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                  
                  {/* Bouton Register dans le menu mobile */}
                  <motion.li
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: navLinks.length * 0.1, duration: 0.3 }}
                    className="w-full mt-6"
                  >
                    <Link 
                      href="#register" 
                      onClick={handleMobileLinkClick}
                      className="block w-full p-4 text-center bg-gradient-to-r from-accent-blue to-accent-blue-light text-white font-bold rounded-lg shadow-md"
                    >
                      Register Now
                    </Link>
                  </motion.li>
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
} 