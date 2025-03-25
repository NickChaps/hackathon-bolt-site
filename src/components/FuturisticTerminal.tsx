'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types pour notre terminal
interface TerminalHistoryItem {
  isCommand: boolean;
  content: string;
  id: number;
}

interface UserData {
  name: string;
  email: string;
  [key: string]: string;
}

type RegistrationStep = 'welcome' | 'name' | 'email' | 'confirm' | 'completed';

interface FuturisticTerminalProps {
  onSubmit: (data: UserData) => void;
}

const FuturisticTerminal: React.FC<FuturisticTerminalProps> = ({ onSubmit }) => {
  // État pour l'entrée actuelle
  const [input, setInput] = useState('');
  // Historique des commandes et réponses
  const [history, setHistory] = useState<TerminalHistoryItem[]>([
    { 
      isCommand: false, 
      content: "// HACKATHON.DEV SECURE REGISTRATION TERMINAL v2.0",
      id: 0 
    },
    { 
      isCommand: false, 
      content: "// INITIALIZING CONNECTION...",
      id: 1 
    },
    { 
      isCommand: false, 
      content: "// ACCESS GRANTED",
      id: 2 
    },
    { 
      isCommand: false, 
      content: "Welcome to the World's Largest Hackathon registration system. Type 'start' to begin registration or 'help' for commands.",
      id: 3 
    }
  ]);
  
  // Étape actuelle de l'inscription
  const [registrationStep, setRegistrationStep] = useState<RegistrationStep>('welcome');
  // Données utilisateur collectées
  const [userData, setUserData] = useState<UserData>({ name: '', email: '' });
  // Si le terminal est en train de "traiter"
  const [processing, setProcessing] = useState(false);
  // Commandes disponibles selon le contexte
  const [availableCommands, setAvailableCommands] = useState<string[]>(['start', 'help', 'clear']);
  // ID auto-incrémenté pour les éléments d'historique
  const [nextId, setNextId] = useState(4);
  // Pour les suggestions d'auto-complétion
  const [suggestion, setSuggestion] = useState('');
  // Référence à l'entrée pour le focus automatique
  const inputRef = useRef<HTMLInputElement>(null);
  // Référence au conteneur d'historique pour le défilement automatique
  const historyContainerRef = useRef<HTMLDivElement>(null);
  // Pour suivre si c'est le premier rendu
  const isInitialRender = useRef(true);
  
  // Animation de scan
  const [scanning, setScanning] = useState(false);
  // Animation de particules
  const [particleEffect, setParticleEffect] = useState(false);
  
  // Pour le clignotement du curseur
  const [cursorVisible, setCursorVisible] = useState(true);
  
  // Effet pour le clignotement du curseur
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    
    return () => clearInterval(interval);
  }, []);
  
  // Défiler vers le bas à chaque mise à jour de l'historique
  useEffect(() => {
    if (historyContainerRef.current) {
      historyContainerRef.current.scrollTop = historyContainerRef.current.scrollHeight;
    }
  }, [history]);
  
  // Focus automatique sur l'entrée
  useEffect(() => {
    // Ne pas exécuter focus() lors du premier rendu pour éviter le défilement automatique
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    
    inputRef.current?.focus();
  }, [processing]);
  
  // Auto-complétion
  useEffect(() => {
    if (input.length > 0 && !processing) {
      const matchingCommand = availableCommands.find(cmd => 
        cmd.startsWith(input.toLowerCase()) && cmd !== input.toLowerCase()
      );
      
      if (matchingCommand) {
        setSuggestion(matchingCommand.substring(input.length));
      } else {
        setSuggestion('');
      }
    } else {
      setSuggestion('');
    }
  }, [input, availableCommands, processing]);
  
  // Mettre à jour les commandes disponibles selon l'étape
  useEffect(() => {
    switch (registrationStep) {
      case 'welcome':
        setAvailableCommands(['start', 'help', 'clear']);
        break;
      case 'name':
      case 'email':
        setAvailableCommands(['help', 'clear', 'restart', 'back']);
        break;
      case 'confirm':
        setAvailableCommands(['confirm', 'edit', 'restart', 'help', 'clear']);
        break;
      case 'completed':
        setAvailableCommands(['restart', 'help', 'clear']);
        break;
    }
  }, [registrationStep]);
  
  // Animation de frappe pour les réponses système
  const addSystemResponse = useCallback((content: string) => {
    setProcessing(true);
    
    // Diviser le contenu en caractères
    const chars = content.split('');
    let tempContent = '';
    let tempHistory = [...history];
    const responseId = nextId;
    
    // Ajouter une entrée vide
    tempHistory = [...tempHistory, { isCommand: false, content: '', id: responseId }];
    setHistory(tempHistory);
    setNextId(prev => prev + 1);
    
    // Animer la frappe
    let i = 0;
    const interval = setInterval(() => {
      if (i < chars.length) {
        tempContent += chars[i];
        setHistory(prev => 
          prev.map(item => 
            item.id === responseId 
              ? { ...item, content: tempContent } 
              : item
          )
        );
        i++;
      } else {
        clearInterval(interval);
        setProcessing(false);
      }
    }, 15);
  }, [history, nextId]);
  
  // Gérer les commandes
  const processCommand = useCallback((cmd: string) => {
    const command = cmd.trim().toLowerCase();
    
    // Ajouter la commande à l'historique
    setHistory(prev => [...prev, { isCommand: true, content: cmd, id: nextId }]);
    setNextId(prev => prev + 1);
    
    // Animation de scan pour certaines commandes
    if (['start', 'confirm'].includes(command)) {
      setScanning(true);
      setTimeout(() => setScanning(false), 2000);
    }
    
    // Animation de particules pour le traitement
    if (['start', 'confirm', 'submit'].includes(command)) {
      setParticleEffect(true);
      setTimeout(() => setParticleEffect(false), 3000);
    }
    
    // Traiter les commandes selon l'étape
    switch (registrationStep) {
      case 'welcome':
        if (command === 'start') {
          setTimeout(() => {
            addSystemResponse("Initiating secure registration protocol...");
            setTimeout(() => {
              addSystemResponse("Please enter your full name:");
              setRegistrationStep('name');
            }, 1500);
          }, 1000);
        } else if (command === 'help') {
          addSystemResponse("Available commands: 'start' - Begin registration, 'clear' - Clear terminal, 'help' - Show commands");
        } else if (command === 'clear') {
          setHistory([
            { isCommand: false, content: "// TERMINAL CLEARED", id: nextId + 1 },
            { isCommand: false, content: "Type 'start' to begin registration or 'help' for commands.", id: nextId + 2 }
          ]);
          setNextId(prev => prev + 3);
        } else {
          addSystemResponse(`Command not recognized: '${cmd}'. Type 'help' for available commands.`);
        }
        break;
        
      case 'name':
        if (command === 'help' || command === 'clear' || command === 'restart' || command === 'back') {
          handleUtilityCommands(command);
        } else if (cmd.trim().length > 0) {
          // Accepter n'importe quel texte comme nom
          setUserData(prev => ({ ...prev, name: cmd }));
          addSystemResponse(`Name registered: ${cmd}`);
          
          setTimeout(() => {
            addSystemResponse("Please enter your email address:");
            setRegistrationStep('email');
          }, 1500);
        }
        break;
        
      case 'email':
        if (command === 'help' || command === 'clear' || command === 'restart' || command === 'back') {
          handleUtilityCommands(command);
        } else if (isValidEmail(cmd)) {
          setUserData(prev => ({ ...prev, email: cmd }));
          addSystemResponse(`Email validated: ${cmd}`);
          
          setTimeout(() => {
            addSystemResponse("Please review your information:");
            setTimeout(() => {
              addSystemResponse(`Name: ${userData.name}`);
              setTimeout(() => {
                addSystemResponse(`Email: ${cmd}`);
                setTimeout(() => {
                  addSystemResponse("Type 'confirm' to complete registration or 'edit' to modify.");
                  setRegistrationStep('confirm');
                }, 700);
              }, 700);
            }, 700);
          }, 1500);
        } else {
          addSystemResponse(`ERROR: Invalid email format. Please enter a valid email address.`);
        }
        break;
        
      case 'confirm':
        if (command === 'confirm') {
          addSystemResponse("Processing registration...");
          
          setTimeout(() => {
            setScanning(true);
            setTimeout(() => {
              setScanning(false);
              addSystemResponse("Registration successful! Welcome to the World's Largest Hackathon!");
              setTimeout(() => {
                addSystemResponse("A confirmation has been sent to your email address.");
                addSystemResponse("Type 'restart' to register another participant or any key to exit.");
                setRegistrationStep('completed');
                // Appeler le callback de soumission
                onSubmit(userData);
              }, 1500);
            }, 2000);
          }, 1500);
        } else if (command === 'edit') {
          addSystemResponse("Which field would you like to edit? Type 'name' or 'email'");
          setAvailableCommands(['name', 'email', 'help', 'clear']);
        } else if (command === 'name' && availableCommands.includes('name')) {
          addSystemResponse("Please enter your full name again:");
          setRegistrationStep('name');
        } else if (command === 'email' && availableCommands.includes('email')) {
          addSystemResponse("Please enter your email address again:");
          setRegistrationStep('email');
        } else if (command === 'help' || command === 'clear' || command === 'restart') {
          handleUtilityCommands(command);
        } else {
          addSystemResponse(`Command not recognized: '${cmd}'. Type 'help' for available commands.`);
        }
        break;
        
      case 'completed':
        if (command === 'restart') {
          setRegistrationStep('welcome');
          setUserData({ name: '', email: '' });
          setHistory([
            { isCommand: false, content: "// TERMINAL RESET", id: nextId + 1 },
            { isCommand: false, content: "Type 'start' to begin registration or 'help' for commands.", id: nextId + 2 }
          ]);
          setNextId(prev => prev + 3);
        } else if (command === 'help' || command === 'clear') {
          handleUtilityCommands(command);
        } else {
          addSystemResponse("Session ended. Refresh to start again.");
        }
        break;
    }
  }, [registrationStep, userData, nextId, addSystemResponse, availableCommands, onSubmit]);
  
  // Gestionnaire des commandes utilitaires communes
  const handleUtilityCommands = (command: string) => {
    if (command === 'help') {
      let helpText = "Available commands: ";
      switch (registrationStep) {
        case 'welcome':
          helpText += "'start' - Begin registration, 'clear' - Clear terminal";
          break;
        case 'name':
        case 'email':
          helpText += "'back' - Go back, 'restart' - Start over, 'clear' - Clear terminal";
          break;
        case 'confirm':
          helpText += "'confirm' - Complete registration, 'edit' - Modify information, 'restart' - Start over";
          break;
        case 'completed':
          helpText += "'restart' - Register another participant, 'clear' - Clear terminal";
          break;
      }
      addSystemResponse(helpText);
    } else if (command === 'clear') {
      setHistory([
        { isCommand: false, content: "// TERMINAL CLEARED", id: nextId + 1 },
        { isCommand: false, content: "Current step: " + registrationStep, id: nextId + 2 }
      ]);
      setNextId(prev => prev + 3);
    } else if (command === 'restart') {
      setRegistrationStep('welcome');
      setUserData({ name: '', email: '' });
      setHistory([
        { isCommand: false, content: "// REGISTRATION RESET", id: nextId + 1 },
        { isCommand: false, content: "Type 'start' to begin registration or 'help' for commands.", id: nextId + 2 }
      ]);
      setNextId(prev => prev + 3);
    } else if (command === 'back') {
      if (registrationStep === 'email') {
        setRegistrationStep('name');
        addSystemResponse("Returning to previous step.");
        setTimeout(() => {
          addSystemResponse("Please enter your full name:");
        }, 500);
      } else {
        addSystemResponse("Cannot go back from current step.");
      }
    }
  };
  
  // Validation de l'email
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  // Gérer les entrées clavier
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (processing) return;
    
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      processCommand(input);
      setInput('');
      setSuggestion('');
    } else if (e.key === 'Tab' && suggestion) {
      e.preventDefault();
      setInput(input + suggestion);
      setSuggestion('');
    }
  };
  
  // Composant pour les particules
  const ParticleEffect = () => {
    return (
      <AnimatePresence>
        {particleEffect && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 50 }).map((_, index) => (
              <motion.div
                key={`particle-${index}`}
                className="absolute w-1 h-1 bg-accent-blue-light rounded-full"
                initial={{ 
                  opacity: 0,
                  x: Math.random() * 400 - 200 + 200, 
                  y: Math.random() * 400 - 200 + 200
                }}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  x: Math.random() * 800 - 400 + 200,
                  y: Math.random() * 800 - 400 + 200
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2,
                  ease: "easeInOut" 
                }}
                exit={{ opacity: 0 }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    );
  };
  
  return (
    <div className="relative w-full h-full min-h-[400px] bg-black/30 rounded-lg border border-white/10 font-mono text-accent-blue-light p-4 overflow-hidden">
      {/* Effet de scan */}
      <AnimatePresence>
        {scanning && (
          <motion.div 
            className="absolute left-0 w-full h-1 bg-accent-blue-light opacity-70 z-10 blur-[2px]"
            initial={{ top: 0 }}
            animate={{ top: '100%' }}
            transition={{ duration: 2, ease: "linear" }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      
      {/* Lignes de grille */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>
      
      {/* Effet de particules */}
      <ParticleEffect />
      
      {/* Conteneur d'historique */}
      <div 
        ref={historyContainerRef}
        className="w-full h-[calc(100%-40px)] overflow-y-auto overflow-x-hidden mb-2 scrollbar-terminal"
      >
        {history.map((item) => (
          <div key={item.id} className={`mb-1 leading-relaxed ${item.isCommand ? 'text-white' : ''}`}>
            {item.isCommand && <span className="text-muted-light">{'> '}</span>}
            {item.content}
          </div>
        ))}
      </div>
      
      {/* Zone de saisie */}
      <div className="relative flex items-center">
        <span className="text-muted-light mr-2">{'>'}</span>
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none outline-none text-white font-mono"
            disabled={processing}
          />
          {suggestion && (
            <span className="absolute left-0 text-white/20 pointer-events-none" style={{ marginLeft: `${input.length}ch` }}>
              {suggestion}
            </span>
          )}
        </div>
        <span 
          className={`h-5 w-2 bg-accent-blue-light ml-1 ${cursorVisible && !processing ? 'opacity-100' : 'opacity-0'}`}
        ></span>
      </div>
      
      {/* Barre de statut */}
      <div className="absolute bottom-0 left-0 w-full py-1 px-4 text-xs text-muted-light border-t border-white/10 flex justify-between">
        <span>HACKATHON.DEV:~$ {registrationStep}</span>
        <span className={processing ? 'text-accent-blue animate-pulse' : ''}>
          {processing ? 'PROCESSING...' : 'READY'}
        </span>
      </div>
    </div>
  );
};

export default FuturisticTerminal; 