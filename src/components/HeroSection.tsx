'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, MeshDistortMaterial, Environment } from '@react-three/drei';
import gsap from 'gsap';

// Importer nos nouveaux composants
import CircuitBackground from './CircuitBackground';
import { HolographicEffect, HolographicInterface } from './HolographicEffect';

// Composant globe 3D amélioré
function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texturePath = '/images/world-map-dots.svg';
  const texture = useTexture(texturePath);
  
  // Animation de rotation plus fluide avec effet de respiration
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
      
      // Effet de pulsation légère
      const pulseFactor = Math.sin(state.clock.elapsedTime * 0.3) * 0.03;
      meshRef.current.scale.set(1 + pulseFactor, 1 + pulseFactor, 1 + pulseFactor);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <MeshDistortMaterial
        map={texture}
        color="#1488fc"
        emissive="#8adaff"
        emissiveIntensity={0.7}
        transparent
        opacity={0.9}
        distort={0.2} // Léger effet de distortion
        speed={2} // Vitesse de l'animation de distortion
      />
      
      {/* Halo lumineux autour du globe */}
      <mesh position={[0, 0, -0.1]} scale={1.15}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial 
          color="#8adaff" 
          opacity={0.1} 
          transparent 
          side={THREE.BackSide} 
        />
      </mesh>
    </mesh>
  );
}

// Composant section Hero principale
export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Valeurs de parallaxe basées sur le scroll
  const titleY = useTransform(scrollY, [0, 800], [0, 200]);
  const subtitleY = useTransform(scrollY, [0, 800], [0, 100]);
  const buttonOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Gestion du mouvement de la souris pour effet parallaxe
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Animation des textes avec variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.8,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      }
    },
  };

  // Animation du badge avec effet de rebond
  const badge = {
    initial: { scale: 0 },
    animate: { 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 1.4
      }
    }
  };

  return (
    <section 
      id="home" 
      className="relative w-full h-screen overflow-hidden bg-background flex flex-col items-center justify-center"
    >
      {/* Background effet avec canvas THREE.js */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <CircuitBackground />
          <Globe />
          <HolographicInterface />
          <HolographicEffect />
          <Environment preset="night" />
        </Canvas>
      </div>
      
      {/* Overlay de bruit pour texture */}
      <div className="noise absolute inset-0 z-10 opacity-30"></div>
      
      {/* Gradient de couleur animé */}
      <div 
        className="absolute inset-0 z-5 opacity-30"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, rgba(138, 218, 255, 0.2), rgba(20, 136, 252, 0.1), transparent)`,
          transition: 'background 0.3s ease-out'
        }}
      ></div>
      
      {/* Contenu Hero */}
      <div className="container relative z-20 mx-auto px-4 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-5xl mx-auto"
          style={{
            transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Badge avec animation */}
          <motion.div 
            variants={badge}
            initial="initial"
            animate="animate"
            className="mb-6 inline-block"
          >
            <span className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-white font-title border border-white/10 shadow-lg shadow-accent-blue/20">
              <span className="text-accent-blue-light">Virtual</span> • Date TBD
            </span>
          </motion.div>
          
          {/* Titre principal avec effet glitch */}
          <motion.h1 
            variants={item}
            className="text-4xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight glitch"
            style={{ y: titleY }}
          >
            THE WORLD'S <span className="gradient-text">LARGEST</span><br />
            <span className="text-accent-blue">HACKATHON</span>
          </motion.h1>
          
          {/* Sous-titre */}
          <motion.p 
            variants={item}
            className="text-lg md:text-xl text-muted-light mb-8 max-w-3xl mx-auto"
            style={{ y: subtitleY }}
          >
            Join thousands of hackers, designers and innovators from around the globe 
            to build the future of technology and compete for over $1M+ in prizes.
          </motion.p>
          
          {/* Boutons d'action */}
          <motion.div 
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ opacity: buttonOpacity }}
          >
            <a 
              href="#register" 
              className="relative group px-8 py-4 bg-accent-blue text-white font-bold rounded-lg overflow-hidden hover:shadow-[0_0_25px_rgba(20,136,252,0.7)] transition-all duration-300 z-0"
            >
              <span className="relative z-10">Register Now</span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent-blue to-accent-blue-light transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out z-0"></span>
              
              {/* Effet de particules au survol */}
              <span className="absolute -top-10 left-0 w-full h-20 bg-accent-blue-light opacity-0 group-hover:opacity-20 blur-xl transform translate-y-10 group-hover:translate-y-0 transition-all duration-700"></span>
            </a>
            
            <a 
              href="#about" 
              className="px-8 py-4 border border-white/20 text-white hover:bg-white/10 hover:border-accent-blue/50 transition-all rounded-lg backdrop-blur-sm"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Overlay de dégradé bas de page pour transition douce */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-20"></div>
      
      {/* Scroll indicator amélioré */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut" 
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-glow">
          <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="#8adaff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </section>
  );
} 