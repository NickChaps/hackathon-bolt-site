'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Données fixes pré-calculées pour les particules
const particlePositions = [
  { left: 25, top: 35, xMovement: 3, yMovement: -2, delay: 0.1 },
  { left: 75, top: 15, xMovement: -4, yMovement: -3, delay: 0.3 },
  { left: 45, top: 65, xMovement: 2, yMovement: -4, delay: 0.2 },
  { left: 85, top: 42, xMovement: -3, yMovement: -1, delay: 0.4 }
];

// Positions fixes pour les particules de fond
const backgroundStars = [
  { top: 91.88, left: 11.00 },
  { top: 53.31, left: 12.05 },
  { top: 3.00, left: 66.54 }
];

// Données fixes pour les étoiles filantes
const shootingStars = [
  { 
    startTop: 0, endTop: 100, 
    startLeft: 62.49, endLeft: 99.47,
    duration: 2.5, repeatDelay: 3.2 
  },
  { 
    startTop: 0, endTop: 100, 
    startLeft: 7.70, endLeft: 83.12,
    duration: 3.1, repeatDelay: 4.5 
  },
  { 
    startTop: 0, endTop: 100, 
    startLeft: 23.41, endLeft: 60.23,
    duration: 2.8, repeatDelay: 5.7 
  }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  // Fonction pour gérer l'inscription à la newsletter
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.includes('@')) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };
  
  // Liens de navigation
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Prizes', href: '#prizes' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'Judges', href: '#judges' },
    { name: 'Register', href: '#register' }
  ];
  
  // Liens légaux et de support
  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Code of Conduct', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Contact', href: '#' }
  ];
  
  // Réseaux sociaux
  const socialLinks = [
    { 
      name: 'X', 
      href: '#',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.2833 10.1224L21.9691 1H20.1555L13.5409 8.92593L8.27119 1H1L9.14671 13.3041L1 23H2.81358L9.88908 14.5004L15.5133 23H22.7845L14.2829 10.1224H14.2833ZM10.7312 13.4307L9.89374 12.1853L3.6018 2.76033H7.2141L12.2233 10.2466L13.0612 11.4921L19.6476 21.3498H16.0349L10.7312 13.4311V13.4307Z"/>
        </svg>
      ) 
    },
    { 
      name: 'GitHub', 
      href: '#',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.521 21.278 9.521 21.016C9.521 20.781 9.512 20.082 9.508 19.232C6.726 19.86 6.139 17.863 6.139 17.863C5.685 16.751 5.029 16.449 5.029 16.449C4.121 15.797 5.098 15.81 5.098 15.81C6.101 15.883 6.629 16.872 6.629 16.872C7.521 18.39 8.97 17.911 9.539 17.658C9.631 17.007 9.889 16.529 10.175 16.25C7.955 15.969 5.619 15.121 5.619 11.312C5.619 10.193 6.02 9.284 6.65 8.579C6.546 8.329 6.194 7.338 6.747 6.008C6.747 6.008 7.587 5.742 9.496 6.99C10.3 6.769 11.15 6.658 12 6.654C12.85 6.658 13.699 6.769 14.504 6.99C16.413 5.742 17.251 6.008 17.251 6.008C17.805 7.338 17.452 8.329 17.349 8.579C17.979 9.284 18.379 10.193 18.379 11.312C18.379 15.131 16.039 15.966 13.813 16.242C14.172 16.586 14.492 17.265 14.492 18.305C14.492 19.798 14.479 20.684 14.479 21.016C14.479 21.281 14.659 21.587 15.167 21.488C19.138 20.163 22 16.417 22 12C22 6.477 17.523 2 12 2Z"/>
        </svg>
      ) 
    },
    { 
      name: 'Discord', 
      href: '#',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.3176 4.69869C18.7717 3.98248 17.0939 3.45965 15.3018 3.17383C15.2815 3.17383 15.2612 3.18346 15.2511 3.20273C15.0468 3.56582 14.8121 4.03529 14.6484 4.40804C12.7252 4.14113 10.8122 4.14113 8.9296 4.40804C8.76588 4.02567 8.52093 3.56582 8.31659 3.20273C8.30653 3.18346 8.28631 3.17383 8.26609 3.17383C6.47397 3.45965 4.79625 3.98248 3.25028 4.69869C3.24023 4.69869 3.23016 4.70831 3.22012 4.71792C0.469277 8.89473 -0.280506 12.9625 0.0883685 16.9816C0.0883685 17.0009 0.0984297 17.0202 0.118534 17.0297C2.15625 18.5521 4.12618 19.4588 6.06586 20.0683C6.08608 20.0779 6.10629 20.0683 6.11635 20.0491C6.56786 19.4205 6.97005 18.7595 7.31139 18.0695C7.32145 18.0502 7.31139 18.0213 7.2912 18.0115C6.66721 17.7735 6.07595 17.4873 5.50488 17.1625C5.48469 17.153 5.48469 17.1242 5.4948 17.1144C5.59525 17.0394 5.69568 16.9624 5.79614 16.8854C5.80623 16.8758 5.82644 16.8758 5.84666 16.8854C9.70568 18.67 13.9162 18.67 17.7346 16.8854C17.7548 16.8758 17.7751 16.8758 17.7852 16.8854C17.8856 16.9624 17.9861 17.0394 18.0865 17.1144C18.0966 17.1242 18.0966 17.153 18.0764 17.1625C17.5054 17.4968 16.9139 17.7735 16.29 18.0115C16.2698 18.0213 16.2598 18.0597 16.2698 18.0695C16.6214 18.7595 17.0235 19.4205 17.4649 20.0491C17.4749 20.0683 17.4951 20.0779 17.5154 20.0683C19.465 19.4588 21.435 18.5521 23.4727 17.0297C23.4929 17.0202 23.5029 17.0009 23.5029 16.9816C23.9448 12.3144 22.7591 8.28556 20.3378 4.71792C20.3277 4.70831 20.3176 4.69869 20.3176 4.69869ZM7.88245 14.3887C6.71646 14.3887 5.75698 13.3252 5.75698 12.0296C5.75698 10.7339 6.69627 9.67038 7.88245 9.67038C9.0789 9.67038 10.018 10.7435 10.0079 12.0296C10.0079 13.3252 9.06882 14.3887 7.88245 14.3887ZM15.7343 14.3887C14.5683 14.3887 13.6088 13.3252 13.6088 12.0296C13.6088 10.7339 14.5481 9.67038 15.7343 9.67038C16.9308 9.67038 17.8699 10.7435 17.8598 12.0296C17.8598 13.3252 16.9308 14.3887 15.7343 14.3887Z"/>
        </svg>
      ) 
    },
    { 
      name: 'LinkedIn', 
      href: '#',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.4701 2.00002H3.53006C2.70006 2.00002 2.01006 2.69002 2.01006 3.52002V20.5C2.01006 21.33 2.70006 22.02 3.53006 22.02H20.4701C21.3001 22.02 22.0001 21.33 22.0001 20.5V3.52002C22.0001 2.69002 21.3001 2.00002 20.4701 2.00002ZM8.09006 18.74H5.09006V9.85002H8.09006V18.74ZM6.59006 8.48002C5.59006 8.48002 4.79006 7.67002 4.79006 6.68002C4.79006 5.69002 5.59006 4.88002 6.59006 4.88002C7.58006 4.88002 8.39006 5.69002 8.39006 6.68002C8.39006 7.67002 7.59006 8.48002 6.59006 8.48002ZM18.9101 18.74H15.9101V14.17C15.9101 13.02 15.8901 11.52 14.2901 11.52C12.6701 11.52 12.4201 12.79 12.4201 14.11V18.74H9.42006V9.85002H12.3001V11.17H12.3401C12.7501 10.43 13.7101 9.65002 15.1601 9.65002C18.1801 9.65002 18.9001 11.73 18.9001 14.4V18.74H18.9101Z"/>
        </svg>
      ) 
    }
  ];
  
  return (
    <footer className="relative bg-background pt-16 pb-8 overflow-hidden">
      {/* Ligne décorative */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue to-transparent opacity-30"></div>
      
      {/* Circuit imprimé holographique au lieu de l'effet de grille 3D */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Fond de circuit */}
        <div className="absolute inset-0 opacity-5 circuit-pattern"></div>
        
        {/* Lignes horizontales */}
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={`h-${i}`}
            className="absolute left-0 right-0 h-[1px] bg-accent-blue/20"
            style={{ top: `${15 + i * 15}%` }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              boxShadow: ['0 0 0px transparent', '0 0 3px rgba(138, 218, 255, 0.3)', '0 0 0px transparent']
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Lignes verticales */}
        {[...Array(7)].map((_, i) => (
          <motion.div 
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-[1px] bg-accent-blue/20"
            style={{ left: `${10 + i * 12}%` }}
            animate={{
              opacity: [0.1, 0.25, 0.1],
              boxShadow: ['0 0 0px transparent', '0 0 2px rgba(138, 218, 255, 0.2)', '0 0 0px transparent']
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
        
        {/* Noeuds du circuit */}
        {[...Array(12)].map((_, i) => {
          const top = 10 + Math.floor(i / 4) * 30;
          const left = 15 + (i % 4) * 25;
          
          return (
            <motion.div 
              key={`node-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-accent-blue/30"
              style={{ top: `${top}%`, left: `${left}%` }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                boxShadow: ['0 0 2px rgba(138, 218, 255, 0.3)', '0 0 8px rgba(138, 218, 255, 0.5)', '0 0 2px rgba(138, 218, 255, 0.3)']
              }}
              transition={{
                duration: 2 + (i % 4),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            />
          );
        })}
      </div>
      
      {/* Éléments décoratifs */}
      <motion.div 
        className="absolute left-[5%] top-[15%] w-32 h-32 rounded-full bg-accent-blue/5 blur-3xl"
        animate={{ 
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.2, 1] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute right-[10%] bottom-[20%] w-32 h-32 rounded-full bg-accent-blue/10 blur-3xl"
        animate={{ 
          opacity: [0.1, 0.4, 0.1],
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Logo et info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 group">
              <motion.div 
                className="bg-gradient-to-r from-accent-blue to-accent-blue-light w-10 h-10 rounded-md flex items-center justify-center relative overflow-hidden"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-6 h-6 bg-background rounded-sm z-10"></div>
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                >
                  {particlePositions.map((particle, i) => (
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
              <motion.span 
                className="text-white font-bold text-xl tracking-wider"
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
            </div>
            
            <p className="text-muted-light text-md leading-relaxed">
              The world&apos;s largest virtual hackathon bringing together developers, 
              designers, and innovators from across the globe to build the future of technology.
            </p>
            
            <div className="flex items-center space-x-4">
              {socialLinks.map((link, i) => (
                <motion.a 
                  key={i}
                  href={link.href}
                  aria-label={link.name}
                  className="p-2.5 bg-white/5 rounded-full transition-all text-white/60 hover:text-accent-blue-light hover:bg-accent-blue/20 border border-transparent hover:border-accent-blue/30"
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 5px 15px rgba(20, 136, 252, 0.3)" 
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {link.icon}
                  <span className="sr-only">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Liens de navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 md:mt-0"
          >
            <div className="mb-5">
              <h4 className="text-white font-bold text-lg">Navigation</h4>
            </div>
            <ul className="space-y-3">
              {navLinks.map((link, i) => (
                <motion.li 
                  key={i}
                  whileHover={{ x: 8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  onHoverStart={() => setActiveSection(i)}
                  onHoverEnd={() => setActiveSection(null)}
                >
                  <Link 
                    href={link.href}
                    className="text-muted-light hover:text-accent-blue-light transition-colors flex items-center group"
                  >
                    <motion.span
                      animate={{ 
                        width: activeSection === i ? 12 : 5,
                        backgroundColor: activeSection === i ? "#8adaff" : "#737373" 
                      }}
                      className="w-5 h-[2px] bg-muted inline-block mr-2"
                    />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Liens légaux */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 md:mt-0"
          >
            <div className="mb-5">
              <h4 className="text-white font-bold text-lg">Resources</h4>
            </div>
            <ul className="space-y-3">
              {legalLinks.map((link, i) => (
                <motion.li 
                  key={i}
                  whileHover={{ x: 8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  onHoverStart={() => setActiveSection(i + 100)}
                  onHoverEnd={() => setActiveSection(null)}
                >
                  <Link 
                    href={link.href}
                    className="text-muted-light hover:text-accent-blue-light transition-colors flex items-center"
                  >
                    <motion.span
                      animate={{ 
                        width: activeSection === i + 100 ? 12 : 5,
                        backgroundColor: activeSection === i + 100 ? "#8adaff" : "#737373" 
                      }}
                      className="w-5 h-[2px] bg-muted inline-block mr-2"
                    />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 md:mt-0"
          >
            <div className="mb-5">
              <h4 className="text-white font-bold text-lg">Subscribe</h4>
            </div>
            <p className="text-muted-light text-md mb-4">
              Get the latest updates about the hackathon directly to your inbox.
            </p>
            
            <div className="relative">
              <AnimatePresence>
                {subscribed ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute inset-0 bg-background flex items-center justify-center"
                  >
                    <div className="text-center">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="text-accent-blue-light text-3xl mb-2"
                      >
                        ✓
                      </motion.div>
                      <p className="text-accent-blue-light">Thanks for subscribing!</p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-l-md text-white text-sm focus:border-accent-blue/50 focus:outline-none focus:bg-white/10 transition-all"
                      required
                    />
                    <button
                      type="submit"
                      className="relative overflow-hidden bg-gradient-to-r from-accent-blue to-accent-blue-light text-white px-4 py-3 rounded-r-md hover:shadow-lg hover:shadow-accent-blue/20 transition-all group"
                    >
                      {/* Effet de brillance au hover */}
                      <span className="absolute inset-0 w-full h-full shine-effect opacity-0 group-hover:opacity-100"></span>
                      
                      <motion.svg
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="relative z-10"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      >
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </motion.svg>
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
            
            {/* Badges de sécurité */}
            <div className="flex items-center space-x-3 mt-4">
              <div className="text-xs text-muted flex items-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8H12.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                No spam
              </div>
              <div className="text-xs text-muted flex items-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12L11 15L16 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Unsubscribe anytime
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Crédits en bas de page avec effet de halo */}
        <motion.div 
          className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="absolute w-full h-[1px] -top-[1px] bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent"></div>
          
          <p className="text-muted text-sm">
            &copy; {currentYear} Hackathon.dev. All rights reserved.
          </p>
          
          <div className="flex flex-wrap gap-6 justify-center items-center">
            <motion.span 
              className="text-muted text-sm flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              Built with Passion
            </motion.span>
            <motion.span 
              className="text-muted text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-muted">Powered by</span> <a href="https://bolt.new" className="text-accent-blue-light hover:underline drop-shadow-glow">Bolt.new</a>
            </motion.span>
          </div>
        </motion.div>
      </div>
      
      {/* Circuit électronique avec impulsions au lieu des étoiles filantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Chemins de circuit */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path 
            d="M10,20 L30,20 L30,40 L60,40 L60,80 L90,80" 
            stroke="rgba(77, 162, 255, 0.5)" 
            strokeWidth="0.2" 
            fill="none"
          />
          <path 
            d="M5,50 L20,50 L20,70 L50,70 L50,30 L80,30 L80,10" 
            stroke="rgba(77, 162, 255, 0.5)" 
            strokeWidth="0.2" 
            fill="none"
          />
          <path 
            d="M15,80 L40,80 L40,60 L75,60 L75,90" 
            stroke="rgba(77, 162, 255, 0.5)" 
            strokeWidth="0.2" 
            fill="none"
          />
        </svg>
        
        {/* Impulsions électriques se déplaçant le long des circuits */}
        {shootingStars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(138, 218, 255, 0.8) 0%, rgba(20, 136, 252, 0.3) 70%, transparent 100%)",
              boxShadow: "0 0 10px rgba(138, 218, 255, 0.8)",
              top: `${star.startTop}%`,
              left: `${star.startLeft}%`,
            }}
            animate={{
              top: [`${star.startTop}%`, `${star.endTop}%`],
              left: [`${star.startLeft}%`, `${star.endLeft}%`],
              scale: [0.5, 1.5, 0.5],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              repeatDelay: star.repeatDelay,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Points de soudure clignotants aux intersections */}
        <motion.div
          className="absolute w-1 h-1 rounded-full bg-accent-blue-light"
          style={{ top: "40%", left: "30%" }}
          animate={{ 
            opacity: [0.3, 1, 0.3],
            boxShadow: [
              "0 0 2px rgba(138, 218, 255, 0.3)", 
              "0 0 8px rgba(138, 218, 255, 0.8)", 
              "0 0 2px rgba(138, 218, 255, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute w-1 h-1 rounded-full bg-accent-blue-light"
          style={{ top: "70%", left: "50%" }}
          animate={{ 
            opacity: [0.3, 1, 0.3],
            boxShadow: [
              "0 0 2px rgba(138, 218, 255, 0.3)", 
              "0 0 8px rgba(138, 218, 255, 0.8)", 
              "0 0 2px rgba(138, 218, 255, 0.3)"
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        
        <motion.div
          className="absolute w-1 h-1 rounded-full bg-accent-blue-light"
          style={{ top: "30%", left: "80%" }}
          animate={{ 
            opacity: [0.3, 1, 0.3],
            boxShadow: [
              "0 0 2px rgba(138, 218, 255, 0.3)", 
              "0 0 8px rgba(138, 218, 255, 0.8)", 
              "0 0 2px rgba(138, 218, 255, 0.3)"
            ]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Effet holographique en balayage */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-blue/5 to-transparent"
          animate={{
            left: ["-100%", "100%"],
            opacity: [0, 0.15, 0],
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            repeatDelay: 5, 
            ease: "easeInOut" 
          }}
        />
      </div>
      
      {/* Particules statiques de l'arrière plan */}
      <div className="absolute inset-0 pointer-events-none">
        {backgroundStars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
            }}
          />
        ))}
      </div>
    </footer>
  );
} 