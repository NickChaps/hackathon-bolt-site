'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FuturisticTerminal from './FuturisticTerminal';

export default function RegisterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // État pour le formulaire
  const [formState, setFormState] = useState({
    email: '',
    name: '',
    submitted: false,
    loading: false,
  });
  
  // Gestion de soumission du formulaire (pour la compatibilité avec le terminal)
  const handleSubmit = (data: { name: string, email: string }) => {
    setFormState({
      name: data.name,
      email: data.email,
      loading: false,
      submitted: true
    });

    // Scroll vers le composant de succès avec une animation douce après un court délai
    setTimeout(() => {
      if (successRef.current) {
        successRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 500);
  };
  
  // Animation du code binaire en arrière-plan
  const BinaryBackground = () => {
    // Données fixes pré-calculées pour éviter les problèmes d'hydratation
    const columnsConfig = Array(20).fill(0).map((_, index) => ({
      delay: [2, 3.5, 1, 4, 2.5, 3, 1.5, 5, 2.8, 3.2, 4.5, 1.8, 3.7, 2.3, 4.2, 1.2, 3.9, 2.7, 3.3, 1.7][index % 20],
      duration: [15, 18, 12, 20, 14, 16, 22, 13, 19, 17, 21, 15, 23, 14, 16, 18, 20, 13, 17, 19][index % 20],
      values: Array(30).fill(0).map((_, j) => j % 2 === 0 ? 1 : 0) // Alternance simple de 1 et 0
    }));

    return (
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="binary-rain w-full h-full">
          {columnsConfig.map((column, i) => (
            <motion.div
              key={i}
              className="binary-column absolute top-0 text-xs text-accent-blue-light font-mono opacity-50"
              style={{
                left: `${i * 5}%`,
                transform: 'translateY(-100%)'
              }}
              animate={{
                y: ['0%', '100%']
              }}
              transition={{
                y: {
                  duration: column.duration,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: column.delay
                }
              }}
            >
              {column.values.map((value, j) => (
                <div key={j} className="my-1">
                  {value}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <section 
      id="register" 
      ref={sectionRef}
      className="relative py-24 bg-background overflow-hidden"
    >
      {/* Ligne décorative */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue to-transparent opacity-30"></div>
      
      {/* Animation d'arrière-plan */}
      <BinaryBackground />
      
      {/* Conteneur principal */}
      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm uppercase tracking-wider text-accent-blue mb-2">Join Us</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Access Terminal</h3>
            <p className="text-lg text-muted-light">
              Connect to our secure registration system to claim your spot in the world&apos;s largest hackathon.
              Complete authentication to join innovators from around the globe.
            </p>
          </motion.div>
        </div>
        
        {/* Terminal d'inscription principal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden shadow-[0_10px_50px_rgba(20,136,252,0.1)]">
            {/* Onglets pour différents profils */}
            <Tabs defaultValue="hacker" className="mb-8">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="hacker">Hacker</TabsTrigger>
                <TabsTrigger value="mentor">Mentor</TabsTrigger>
                <TabsTrigger value="sponsor">Sponsor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="hacker" className="space-y-6">
                <div className="space-y-2 mb-6">
                  <h4 className="text-xl font-bold text-white">Join as a Participant</h4>
                  <p className="text-muted-light">
                    Ready to code, design, innovate and compete for over $1M in prizes?
                  </p>
                </div>
                
                {!formState.submitted ? (
                  <div className="min-h-[450px]">
                    <FuturisticTerminal onSubmit={handleSubmit} />
                  </div>
                ) : (
                  <div className="py-10 text-center" ref={successRef}>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue-light">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">Registration Successful!</h4>
                      <p className="text-muted-light mb-6">
                        We&apos;ve sent confirmation details to your email. Get ready for an amazing hackathon experience!
                      </p>
                      <button
                        onClick={() => setFormState({ name: '', email: '', submitted: false, loading: false })}
                        className="text-accent-blue hover:underline"
                      >
                        Register another participant
                      </button>
                    </motion.div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="mentor" className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-white">Join as a Mentor</h4>
                  <p className="text-muted-light">
                    Share your expertise and guide the next generation of innovators.
                  </p>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="w-full py-4 border border-accent-blue rounded-lg font-medium text-white hover:bg-accent-blue/5 transition-colors">
                      Apply as a Mentor
                    </button>
                  </DialogTrigger>
                  <DialogContent className="glass border-white/10">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-white">Mentor Application</DialogTitle>
                      <DialogDescription className="text-muted-light">
                        Complete your mentor application to share your skills with participants.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-white/80 mb-4">
                        We&apos;re looking for experienced professionals to mentor hackathon teams.
                        Please email your resume and areas of expertise to:
                      </p>
                      <p className="text-accent-blue-light font-mono text-center py-3 bg-white/5 rounded-lg">
                        mentors@hackathon.dev
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </TabsContent>
              
              <TabsContent value="sponsor" className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-white">Join as a Sponsor</h4>
                  <p className="text-muted-light">
                    Support innovation and connect with top global talent.
                  </p>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="w-full py-4 border border-accent-blue rounded-lg font-medium text-white hover:bg-accent-blue/5 transition-colors">
                      Sponsorship Information
                    </button>
                  </DialogTrigger>
                  <DialogContent className="glass border-white/10">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-white">Sponsorship Packages</DialogTitle>
                      <DialogDescription className="text-muted-light">
                        Explore our sponsorship opportunities and benefits.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-white/80 mb-4">
                        For detailed information about sponsorship tiers, benefits, and custom packages,
                        please contact our partnerships team:
                      </p>
                      <p className="text-accent-blue-light font-mono text-center py-3 bg-white/5 rounded-lg">
                        sponsors@hackathon.dev
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </TabsContent>
            </Tabs>
            
            {/* Informations importantes en bas de carte */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <h5 className="text-lg font-bold text-white mb-3">Important Dates</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-accent-blue-light">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-muted-light text-sm">Registration Deadline</p>
                    <p className="text-white font-medium">TBD</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-accent-blue-light">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-muted-light text-sm">Hackathon Duration</p>
                    <p className="text-white font-medium">72 Hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Informations supplémentaires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-3xl mx-auto mt-12 text-center"
        >
          <p className="text-muted mb-4">
            Have questions? Check our <a href="#" className="text-accent-blue hover:underline">FAQ</a> or 
            contact us at <a href="mailto:info@hackathon.dev" className="text-accent-blue hover:underline">info@hackathon.dev</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
} 