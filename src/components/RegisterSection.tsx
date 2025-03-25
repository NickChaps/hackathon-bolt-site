'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RegisterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // État pour le formulaire
  const [formState, setFormState] = useState({
    email: '',
    name: '',
    submitted: false,
    loading: false,
  });
  
  // Gestion de soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ ...formState, loading: true });
    
    // Simulation de soumission du formulaire
    setTimeout(() => {
      setFormState({
        ...formState,
        submitted: true,
        loading: false
      });
    }, 1500);
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
            <h3 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Register Now</h3>
            <p className="text-lg text-muted-light">
              Secure your spot in the world's largest hackathon and prepare to build 
              something extraordinary with innovators from around the globe.
            </p>
          </motion.div>
        </div>
        
        {/* Carte d'inscription principale */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden shadow-[0_10px_50px_rgba(20,136,252,0.1)]">
            {/* Onglets pour différents profils */}
            <Tabs defaultValue="hacker" className="mb-8">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="hacker">Hacker</TabsTrigger>
                <TabsTrigger value="mentor">Mentor</TabsTrigger>
                <TabsTrigger value="sponsor">Sponsor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="hacker" className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-white">Join as a Participant</h4>
                  <p className="text-muted-light">
                    Ready to code, design, innovate and compete for over $1M in prizes?
                  </p>
                </div>
                
                {!formState.submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/30 transition"
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/30 transition"
                        placeholder="yourname@example.com"
                      />
                    </div>
                    
                    <div className="flex items-center mt-4">
                      <input
                        id="terms"
                        type="checkbox"
                        required
                        className="w-4 h-4 border-white/20 rounded focus:ring-accent-blue"
                      />
                      <label htmlFor="terms" className="ml-2 text-sm text-muted-light">
                        I agree to the <a href="#" className="text-accent-blue hover:underline">Terms & Conditions</a>
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={formState.loading}
                      className="w-full py-4 bg-gradient-to-r from-accent-blue to-accent-blue-light rounded-lg font-bold text-white shadow-lg hover:shadow-accent-blue/20 hover:translate-y-[-2px] transition-all duration-300 relative overflow-hidden group"
                    >
                      {formState.loading ? (
                        <span>Processing...</span>
                      ) : (
                        <>
                          <span className="relative z-10">Register Now</span>
                          <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="py-10 text-center">
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
                        We've sent confirmation details to your email. Get ready for an amazing hackathon experience!
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
                        We're looking for experienced professionals to mentor hackathon teams.
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
          
          <div className="flex justify-center gap-4">
            <a href="#" className="text-muted-light hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 3.01006C22.0424 3.68553 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 22.6608 4.40277 23 3.01006Z"/>
              </svg>
            </a>
            <a href="#" className="text-muted-light hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2ZM4 12.0039C4 7.58314 7.57905 4.0041 12 4.0041C16.421 4.0041 20 7.58314 20 12.0039C20 16.4248 16.421 20.0039 12 20.0039C7.57905 20.0039 4 16.4248 4 12.0039ZM8.5 8C8.77614 8 9 8.22386 9 8.5V14.5C9 14.7761 8.77614 15 8.5 15C8.22386 15 8 14.7761 8 14.5V8.5C8 8.22386 8.22386 8 8.5 8ZM12.5 8C12.7761 8 13 8.22386 13 8.5V14.5C13 14.7761 12.7761 15 12.5 15C12.2239 15 12 14.7761 12 14.5V8.5C12 8.22386 12.2239 8 12.5 8ZM16.5 8C16.7761 8 17 8.22386 17 8.5V14.5C17 14.7761 16.7761 15 16.5 15C16.2239 15 16 14.7761 16 14.5V8.5C16 8.22386 16.2239 8 16.5 8Z"/>
              </svg>
            </a>
            <a href="#" className="text-muted-light hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2ZM12.8461 8C12.8461 7.82538 12.9022 7.65562 13.0071 7.5176C13.112 7.37958 13.2606 7.28024 13.4303 7.23401C13.6 7.18778 13.7817 7.1973 13.9457 7.26125C14.1097 7.3252 14.2476 7.44033 14.3385 7.58753C14.4294 7.73473 14.4679 7.90747 14.4483 8.07688C14.4286 8.24629 14.3518 8.40381 14.2302 8.5248C14.1085 8.64579 13.9486 8.7235 13.7777 8.74359C13.6068 8.76368 13.4345 8.7252 13.2846 8.63461V10.3462H14.7231C14.9376 10.3462 15.1432 10.4319 15.2971 10.5858C15.451 10.7397 15.5366 10.9454 15.5366 11.16C15.5366 11.3746 15.451 11.5802 15.2971 11.7341C15.1432 11.888 14.9376 11.9737 14.7231 11.9737H13.2846V14.3636C13.2852 14.8649 13.444 15.3512 13.7384 15.7486C14.0327 16.1459 14.4463 16.4328 14.9192 16.5687C15.4196 16.7131 15.9184 16.4855 16.0636 15.9815C16.2087 15.4774 15.9764 14.9867 15.4759 14.8423C15.3613 14.8094 15.2604 14.7434 15.1854 14.6533C15.1103 14.5631 15.0646 14.4528 15.0539 14.3365C15.0433 14.2202 15.0681 14.1033 15.1254 14.001C15.1827 13.8988 15.2699 13.8159 15.376 13.7625C15.4821 13.7092 15.602 13.6878 15.7196 13.7009C15.8373 13.714 15.9479 13.7612 16.0378 13.8367C16.1277 13.9122 16.1928 14.0128 16.2254 14.1271C16.618 15.6384 15.384 17.0546 13.8883 16.6575C13.0901 16.4323 12.392 15.9501 11.8937 15.2833C11.3954 14.6165 11.125 13.8003 11.124 12.9614V11.9736H10.5C10.2854 11.9736 10.0798 11.888 9.92589 11.7341C9.77198 11.5802 9.68635 11.3746 9.68635 11.16C9.68635 10.9454 9.77198 10.7397 9.92589 10.5858C10.0798 10.4319 10.2854 10.3462 10.5 10.3462H11.124V8.5H10.5C10.2854 8.5 10.0798 8.41437 9.92589 8.26046C9.77198 8.10655 9.68635 7.90094 9.68635 7.68634C9.68635 7.47174 9.77198 7.26613 9.92589 7.11222C10.0798 6.9583 10.2854 6.87268 10.5 6.87268H12.1154C12.3299 6.87268 12.5355 6.9583 12.6895 7.11222C12.8434 7.26613 12.929 7.47174 12.929 7.68634C12.929 7.90094 12.8434 8.10655 12.6895 8.26046C12.5355 8.41437 12.3299 8.5 12.1154 8.5H12.0461V8.63461C12.0461 8.70767 12.0461 8.77884 12.0461 8.8519V8.5H12.0115C12.0115 8.33076 12.0115 8.16153 12.0115 8H12.8461V8Z"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 