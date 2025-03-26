'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger,
  DialogTitle,
  DialogHeader
} from '@/components/ui/dialog';

// Données pour les juges
const judges = [
  {
    id: 1,
    name: "Dr. Elizabeth Chen",
    title: "AI Research Lead",
    company: "Future Labs",
    bio: "Leading researcher in artificial intelligence with over 15 years of experience in developing breakthrough machine learning algorithms.",
    expertise: ["Artificial Intelligence", "Neural Networks", "Robotics"],
    socialLinks: {
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 2,
    name: "Raj Patel",
    title: "CTO",
    company: "TechGrowth Ventures",
    bio: "Serial entrepreneur and investor who has founded three successful tech startups and now helps early-stage founders scale their innovations.",
    expertise: ["Entrepreneurship", "Venture Capital", "Product Strategy"],
    socialLinks: {
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 3,
    name: "Maya Johnson",
    title: "Head of Engineering",
    company: "GlobalConnect",
    bio: "Engineering leader who scaled tech infrastructure for one of the fastest growing platforms in Web3, supporting millions of daily users.",
    expertise: ["Scalability", "Infrastructure", "Web3"],
    socialLinks: {
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 4,
    name: "Alex Winters",
    title: "Design Director",
    company: "InnovateUX",
    bio: "Award-winning designer focused on creating intuitive and accessible user experiences across multiple platforms and devices.",
    expertise: ["UX/UI Design", "Accessibility", "Design Systems"],
    socialLinks: {
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 5,
    name: "Dr. Sophia Kim",
    title: "Quantum Computing Lead",
    company: "QuantumTech",
    bio: "Pioneering researcher bridging the gap between theoretical quantum physics and practical quantum computing applications.",
    expertise: ["Quantum Computing", "Algorithms", "Information Theory"],
    socialLinks: {
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 6,
    name: "Marcus Thompson",
    title: "Open Source Advocate",
    company: "CodeCollective",
    bio: "Passionate developer community builder who has contributed to major open source projects and mentored hundreds of early-career engineers.",
    expertise: ["Open Source", "Community Building", "Developer Advocacy"],
    socialLinks: {
      twitter: "#",
      linkedin: "#"
    }
  }
];

export default function JudgesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeJudge, setActiveJudge] = useState<number | null>(null);
  
  return (
    <section 
      id="judges" 
      ref={sectionRef}
      className="relative py-24 bg-background overflow-hidden"
    >
      {/* Ligne décorative */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue to-transparent opacity-30"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grille décorative */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full grid grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border-l border-white/10 h-full"></div>
            ))}
          </div>
          <div className="h-full w-full grid grid-rows-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border-t border-white/10 w-full"></div>
            ))}
          </div>
        </div>
        
        {/* Formes géométriques flottantes */}
        <motion.div 
          className="absolute top-20 left-[15%] w-32 h-32 opacity-10"
          initial={{ opacity: 0, y: 20, rotate: 0 }}
          animate={isInView ? { opacity: 0.1, y: 0, rotate: 45 } : { opacity: 0, y: 20, rotate: 0 }}
          transition={{ duration: 1 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="url(#blueGradient)" />
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1488fc" />
                <stop offset="100%" stopColor="#8adaff" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-20 right-[15%] w-24 h-24 opacity-10"
          initial={{ opacity: 0, y: -20, rotate: 0 }}
          animate={isInView ? { opacity: 0.1, y: 0, rotate: -30 } : { opacity: 0, y: -20, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="url(#blueGradient2)" />
            <defs>
              <linearGradient id="blueGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8adaff" />
                <stop offset="100%" stopColor="#1488fc" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm uppercase tracking-wider text-accent-blue mb-2">Expert Panel</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Meet The Judges</h3>
            <p className="text-lg text-muted-light">
              Our prestigious panel of judges brings together industry leaders, innovators, 
              and experts who will evaluate your projects and provide valuable feedback.
            </p>
          </motion.div>
        </div>
        
        {/* Grille des juges */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {judges.map((judge) => (
            <motion.div
              key={judge.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div 
                    className="glass rounded-2xl p-6 border border-white/10 cursor-pointer group transition-all duration-300 hover:border-accent-blue/30 hover:shadow-[0_0_30px_rgba(20,136,252,0.1)]"
                    onClick={() => setActiveJudge(judge.id)}
                  >
                    <div className="flex flex-col">
                      {/* Photo de profil (placeholder) */}
                      <div className="w-32 h-32 rounded-xl bg-white/5 mx-auto mb-6 overflow-hidden gradient-border">
                        <div className="w-full h-full flex items-center justify-center bg-accent-blue/20">
                          <span className="text-4xl font-bold text-accent-blue-light">{judge.name.charAt(0)}</span>
                        </div>
                      </div>
                      
                      {/* Informations */}
                      <div className="text-center">
                        <h4 className="text-xl font-bold text-white mb-1 group-hover:text-accent-blue-light transition-colors duration-300">{judge.name}</h4>
                        <p className="text-muted-light mb-2">{judge.title}</p>
                        <p className="text-accent-blue">{judge.company}</p>
                      </div>
                      
                      {/* Indicateur "tap pour plus" */}
                      <div className="mt-4 text-center text-xs text-muted opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="md:hidden">Tap for details</span>
                        <span className="hidden md:inline">Click for details</span>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                
                <DialogContent className="glass border-white/10 p-6 max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-white">{judge.name}</DialogTitle>
                    <p className="text-accent-blue-light">{judge.title} at {judge.company}</p>
                  </DialogHeader>
                  
                  <p className="text-sm text-muted-light mt-4">{judge.bio}</p>
                  
                  <div className="mt-4">
                    <h5 className="text-xs uppercase tracking-wider text-muted mb-2">Expertise</h5>
                    <div className="flex flex-wrap gap-2">
                      {judge.expertise.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-white/5 rounded-full text-xs text-accent-blue-light"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <a 
                      href={judge.socialLinks.twitter}
                      className="p-2 bg-white/5 rounded-full hover:bg-accent-blue/20 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
                      </svg>
                    </a>
                    <a 
                      href={judge.socialLinks.linkedin}
                      className="p-2 bg-white/5 rounded-full hover:bg-accent-blue/20 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Note en bas de page */}
        <motion.p
          className="text-center text-muted mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Additional industry experts will be announced in the coming weeks.
          Follow us on social media for the latest updates.
        </motion.p>
      </div>
    </section>
  );
} 