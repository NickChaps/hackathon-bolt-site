'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Structure de données pour les niveaux de sponsoring
const sponsorshipTiers = [
  {
    name: "Diamond",
    sponsors: [
      { id: 1, name: "TechCorp" },
      { id: 2, name: "Future Labs" },
      { id: 3, name: "Innovatech" },
    ],
    color: "from-[#8adaff] to-[#1488fc]"
  },
  {
    name: "Platinum",
    sponsors: [
      { id: 4, name: "NextGen" },
      { id: 5, name: "Quantum Solutions" },
      { id: 6, name: "ByteWorks" },
      { id: 7, name: "DreamBuild" },
    ],
    color: "from-[#1488fc] to-[#8adaff]"
  },
  {
    name: "Gold",
    sponsors: [
      { id: 8, name: "CodeMasters" },
      { id: 9, name: "Digital Empire" },
      { id: 10, name: "CloudSphere" },
      { id: 11, name: "DevFlow" },
      { id: 12, name: "PulseAI" },
      { id: 13, name: "HackBase" },
    ],
    color: "from-[#8adaff] to-[#1488fc]"
  }
];

export default function SponsorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <section 
      id="sponsors" 
      ref={sectionRef}
      className="relative py-24 bg-background overflow-hidden"
    >
      {/* Ligne décorative */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue to-transparent opacity-30"></div>
      
      {/* Cercles décoratifs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 right-[5%] w-96 h-96 rounded-full bg-accent-blue/5 blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 left-[5%] w-96 h-96 rounded-full bg-accent-blue/10 blur-[100px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm uppercase tracking-wider text-accent-blue mb-2">Our Partners</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Sponsors</h3>
            <p className="text-lg text-muted-light">
              We're proud to partner with these industry leaders who make this hackathon possible 
              and provide incredible opportunities for participants.
            </p>
          </motion.div>
        </div>
        
        {/* Tiers de sponsoring */}
        <div className="space-y-16">
          {sponsorshipTiers.map((tier, index) => (
            <div key={index} className="space-y-6">
              {/* Nom du tier */}
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`h-0.5 w-12 bg-gradient-to-r ${tier.color}`}></div>
                <h4 className="text-xl font-bold text-white">{tier.name} Sponsors</h4>
                <div className={`h-0.5 flex-grow bg-gradient-to-r ${tier.color} opacity-20`}></div>
              </motion.div>
              
              {/* Liste des sponsors */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {tier.sponsors.map((sponsor) => (
                  <motion.div 
                    key={sponsor.id}
                    variants={childVariants}
                    className="glass rounded-xl p-6 aspect-square flex flex-col items-center justify-center group hover:border-accent-blue/30 transition-all duration-300 border border-white/10"
                  >
                    {/* Logo placeholder */}
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-accent-blue-light">{sponsor.name.charAt(0)}</span>
                    </div>
                    
                    {/* Nom du sponsor */}
                    <p className="text-center font-medium text-white">{sponsor.name}</p>
                    
                    {/* Effet de survol */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
        
        {/* Appel à l'action pour devenir sponsor */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="glass inline-block p-8 rounded-2xl border border-white/10">
            <h4 className="text-2xl font-bold mb-4 text-white">Become a Sponsor</h4>
            <p className="text-muted-light mb-6 max-w-2xl">
              Join these innovative companies in supporting the next generation of technology. 
              Sponsorship packages include brand visibility, recruiting opportunities, and direct 
              access to top global talent.
            </p>
            <a 
              href="mailto:sponsors@hackathon.dev" 
              className="px-8 py-3 gradient-border rounded-full text-white inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(20,136,252,0.3)] transition-all duration-300"
            >
              <span>Contact Us</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 