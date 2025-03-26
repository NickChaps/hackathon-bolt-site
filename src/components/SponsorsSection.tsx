'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Types pour les sponsors et catégories
interface Sponsor {
  id: number;
  name: string;
  size: number;
  description: string;
  category: string;
  connections: number[];
}

interface Category {
  id: string;
  name: string;
  color: string;
}

interface Position {
  x: number;
  y: number;
  vx?: number;
  vy?: number;
}

// Structure de données pour l'écosystème de sponsors
const sponsorNetwork = {
  nodes: [
    { 
      id: 1, 
      name: "TechCorp", 
      size: 1.5, 
      description: "Leading AI infrastructure provider",
      category: "infrastructure",
      connections: [2, 5, 7] 
    },
    { 
      id: 2, 
      name: "Future Labs", 
      size: 1.4,
      description: "Quantum computing research and solutions",
      category: "quantum",
      connections: [1, 3, 8]
    },
    { 
      id: 3, 
      name: "Innovatech", 
      size: 1.45,
      description: "Cloud-native platform innovations",
      category: "cloud",
      connections: [2, 4, 6]
    },
    { 
      id: 4, 
      name: "NextGen", 
      size: 1.2,
      description: "Next generation development frameworks",
      category: "development",
      connections: [3, 7, 9]
    },
    { 
      id: 5, 
      name: "Quantum Solutions", 
      size: 1.3,
      description: "Enterprise quantum applications",
      category: "quantum",
      connections: [1, 10, 12]
    },
    { 
      id: 6, 
      name: "ByteWorks", 
      size: 1.15,
      description: "Performance optimization specialists",
      category: "development",
      connections: [3, 10, 13]
    },
    { 
      id: 7, 
      name: "DreamBuild", 
      size: 1.25,
      description: "Visual design and UI toolkits",
      category: "design",
      connections: [1, 4, 11]
    },
    { 
      id: 8, 
      name: "CodeMasters", 
      size: 1.1,
      description: "Developer platform and education",
      category: "development",
      connections: [2, 9]
    },
    { 
      id: 9, 
      name: "Digital Empire", 
      size: 1.15,
      description: "Digital marketing automation",
      category: "marketing",
      connections: [4, 8, 13]
    },
    { 
      id: 10, 
      name: "CloudSphere", 
      size: 1.2,
      description: "Edge computing solutions",
      category: "cloud", 
      connections: [5, 6, 12]
    },
    { 
      id: 11, 
      name: "DevFlow", 
      size: 1.1,
      description: "DevOps and CI/CD tooling",
      category: "development",
      connections: [7, 13]
    },
    { 
      id: 12, 
      name: "PulseAI", 
      size: 1.25,
      description: "Real-time analytics and ML ops",
      category: "infrastructure",
      connections: [5, 10] 
    },
    { 
      id: 13, 
      name: "HackBase", 
      size: 1.0,
      description: "Developer community platform",
      category: "community",
      connections: [6, 9, 11] 
    }
  ] as Sponsor[],
  // Catégories pour regroupement visuel et couleurs - Palette plus vibrante
  categories: [
    { id: "infrastructure", name: "Infrastructure", color: "#3F84E5" },
    { id: "quantum", name: "Quantum Computing", color: "#B14AED" },
    { id: "cloud", name: "Cloud Services", color: "#19D3F3" },
    { id: "development", name: "Development", color: "#44CF6C" },
    { id: "design", name: "Design & UI", color: "#FF6B6B" },
    { id: "marketing", name: "Marketing", color: "#FFA94D" },
    { id: "community", name: "Community", color: "#36F1CD" }
  ] as Category[]
};

// Types pour les props des composants
interface SponsorNodeProps {
  sponsor: Sponsor;
  position: Position;
  isActive: boolean;
  onClick: () => void;
  categoryColor: string;
}

// Composant pour les nœuds sponsors dans le réseau - Badges circulaires au lieu de cartes
const SponsorNode: React.FC<SponsorNodeProps> = ({ 
  sponsor, 
  position, 
  isActive, 
  onClick, 
  categoryColor 
}) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const scale = sponsor.size || 1;
  // Taille de base du badge en pixels, réduite sur mobile
  const badgeSize = isMobile 
    ? 40 * scale 
    : 56 * scale;
  
  // Afficher le nom au survol et quand actif
  const [isHovered, setIsHovered] = useState(false);
  const showName = isActive || isHovered;
  
  // Animation subtile indépendante qui ne perturbe pas le layout
  const pulseAnimation = {
    scale: [1, 1.03, 1],
    opacity: [0.92, 1, 0.92],
  };
  
  // Animation plus lente et subtile
  const pulseTransition = {
    duration: 4 + (sponsor.id % 3), // Légère variation par badge
    repeat: Infinity,
    ease: "easeInOut",
  };
  
  return (
    <motion.div 
      className="absolute cursor-pointer flex items-center justify-center"
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`, 
        zIndex: isActive || isHovered ? 30 : sponsor.id,
        transform: 'translate(-50%, -50%)' // Centrer le badge sur la position
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: isActive ? scale * 1.1 : scale,
        x: isActive ? 0 : [-(2 + sponsor.id % 4), (2 + sponsor.id % 3), -(2 + sponsor.id % 4)],
        y: isActive ? 0 : [(2 + sponsor.id % 3), -(3 + sponsor.id % 2), (2 + sponsor.id % 3)]
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        scale: { duration: 0.4 },
        x: { 
          duration: 12 + (sponsor.id % 7), 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: sponsor.id * 0.5 
        },
        y: { 
          duration: 10 + (sponsor.id % 6), 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: sponsor.id * 0.3 
        }
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: scale * 1.1 }}
    >
      {/* Badge circulaire avec initiale */}
      <motion.div 
        className="relative rounded-full flex items-center justify-center overflow-hidden group shadow-lg"
        style={{ 
          width: `${badgeSize}px`,
          height: `${badgeSize}px`,
          background: `radial-gradient(circle, ${categoryColor}30 0%, ${categoryColor}10 70%)`,
          border: `2px solid ${categoryColor}`,
          boxShadow: isActive || isHovered
            ? `0 0 15px ${categoryColor}, 0 0 20px rgba(0, 0, 0, 0.3)` 
            : `0 0 5px ${categoryColor}40, 0 0 10px rgba(0, 0, 0, 0.2)`
        }}
        // Animation de pulsation légère
        animate={isActive ? {} : pulseAnimation}
        transition={pulseTransition}
      >
        {/* Initiale au centre */}
        <span className="text-xl font-bold" style={{ 
          color: isActive || isHovered ? categoryColor : `${categoryColor}90`,
          filter: isActive || isHovered ? 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' : 'none',
          fontSize: `${Math.max(isMobile ? 16 : 20, isMobile ? 12 : 16 * scale)}px`
        }}>
          {sponsor.name.charAt(0)}
        </span>
        
        {/* Aura pulsante autour du badge */}
        <motion.div 
          className="absolute inset-0 rounded-full"
          animate={{ 
            boxShadow: isActive || isHovered
              ? `0 0 20px ${categoryColor}60`
              : `0 0 15px ${categoryColor}20`
          }}
          transition={{ 
            duration: 0.3
          }}
        />
      </motion.div>
      
      {/* Nom du sponsor flottant sous le badge - masqué sur mobile si pas actif */}
      {(!isMobile || isActive) && (
        <motion.div 
          className="absolute mt-1 bg-black/60 backdrop-blur-sm rounded-md px-3 py-1 text-center"
          style={{
            top: '100%',
            left: '50%',
            translateX: '-50%',
            minWidth: `${badgeSize * 1.8}px`,
            border: `1px solid ${categoryColor}80`,
            boxShadow: `0 4px 12px -2px rgba(0, 0, 0, 0.5), 0 0 5px ${categoryColor}40`,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ 
            opacity: showName ? 1 : 0,
            y: showName ? 5 : 0,
            scale: showName ? 1 : 0.9
          }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-white text-sm font-medium whitespace-nowrap">{sponsor.name}</p>
          <p className="text-xs" style={{ color: categoryColor }}>
            {sponsorNetwork.categories.find(c => c.id === sponsor.category)?.name}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

interface ConnectionLineProps {
  startPos: Position;
  endPos: Position;
  isActive: boolean;
  color: string;
}

// Composant pour les lignes de connexion avec courbes de Bézier
const ConnectionLine: React.FC<ConnectionLineProps> = ({ startPos, endPos, isActive, color }) => {
  const pathRef = useRef<SVGPathElement>(null);
  
  // Calculer une courbe de Bézier pour une connexion plus élégante
  const midX = (startPos.x + endPos.x) / 2;
  const midY = (startPos.y + endPos.y) / 2;
  
  // Ajouter une courbure basée sur la distance
  const distance = Math.sqrt(Math.pow(endPos.x - startPos.x, 2) + Math.pow(endPos.y - startPos.y, 2));
  const curveFactor = Math.min(15, distance / 3);
  
  // Calculer un point de contrôle décalé pour la courbe
  const controlPoint = {
    x: midX + (Math.random() - 0.5) * curveFactor,
    y: midY + (Math.random() - 0.5) * curveFactor
  };
  
  // Chemin de la courbe de Bézier
  const path = `M ${startPos.x} ${startPos.y} Q ${controlPoint.x} ${controlPoint.y}, ${endPos.x} ${endPos.y}`;
  const pathId = `path-${startPos.x.toFixed(1)}-${startPos.y.toFixed(1)}-${endPos.x.toFixed(1)}-${endPos.y.toFixed(1)}`;
  
  return (
    <svg 
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ overflow: 'visible' }}
    >
      <motion.path
        ref={pathRef}
        id={pathId}
        d={path}
        stroke={color}
        strokeWidth={isActive ? 1.5 : 0.5}
        strokeOpacity={isActive ? 0.8 : 0.15}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ 
          pathLength: 1,
          strokeOpacity: isActive ? 0.8 : 0.15,
          strokeWidth: isActive ? 1.5 : 0.5
        }}
        transition={{ 
          pathLength: { duration: 1.5, ease: "easeInOut" },
          strokeOpacity: { duration: 0.3 }
        }}
      />
      
      {/* Particule animée le long de la ligne */}
      {isActive && (
        <motion.circle 
          r={2}
          fill="#ffffff"
          filter={`drop-shadow(0 0 2px ${color})`}
          initial={{ offset: 0 }}
          animate={{ 
            offset: [0, 1],
            scale: [1, 1.5, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear" 
          }}
        >
          <mpath href={`#${pathId}`} />
        </motion.circle>
      )}
    </svg>
  );
};

interface SponsorDetailCardProps {
  sponsor: Sponsor;
  category: Category;
  position: Position;
  onClose: () => void;
}

// Carte détaillée d'un sponsor, visuellement reliée au badge
const SponsorDetailCard: React.FC<SponsorDetailCardProps> = ({ 
  sponsor, 
  category, 
  position,
  onClose 
}) => {
  // Utilisation d'un state pour détecter si on est sur mobile
  const [isMobile, setIsMobile] = useState(false);
  
  // Détecter si on est sur mobile avec un effet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Position adaptative selon la taille d'écran
  const cardPosition = isMobile 
    ? {
        // Sur mobile, carte centrée en bas de l'écran
        x: 50,
        y: 75
      }
    : {
        // Sur desktop, carte décalée par rapport au badge
        x: position.x > 50 ? position.x - 20 : position.x + 20,
        y: position.y > 50 ? position.y - 15 : position.y + 15
      };
  
  return (
    <>
      {/* Ligne reliant le badge à la carte détaillée - masquée sur mobile */}
      {!isMobile && (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
          <motion.path
            d={`M ${position.x} ${position.y} L ${cardPosition.x} ${cardPosition.y}`}
            stroke={category.color}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </svg>
      )}
      
      <motion.div 
        className={`glass p-6 rounded-xl shadow-glow z-20 ${
          isMobile ? 'fixed bottom-4 left-4 right-4 w-auto' : 'absolute'
        }`}
        style={isMobile ? {
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: `${category.color}50`,
          boxShadow: `0 10px 25px -5px ${category.color}40`
        } : { 
          left: `${cardPosition.x}%`,
          top: `${cardPosition.y}%`,
          transform: 'translate(-50%, -50%)',
          width: '280px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: `${category.color}50`,
          boxShadow: `0 10px 25px -5px ${category.color}40`
        }}
        initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, scale: 0.9 }}
        animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1 }}
        exit={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="flex items-center gap-4 mb-4">
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold"
            style={{ 
              background: `linear-gradient(135deg, ${category.color}30, ${category.color}10)`,
              border: `2px solid ${category.color}`,
              color: category.color
            }}
          >
            {sponsor.name.charAt(0)}
          </div>
          <div>
            <h4 className="text-xl font-bold text-white">{sponsor.name}</h4>
            <p className="text-sm" style={{ color: category.color }}>{category.name}</p>
          </div>
        </div>
        
        <p className="text-muted-light mb-4">{sponsor.description}</p>
        
        <div className="flex justify-between">
          <button className="px-4 py-2 rounded-md bg-white/5 hover:bg-white/10 text-white transition-colors text-sm">
            Learn More
          </button>
          <button 
            className="px-4 py-2 rounded-md text-white transition-colors text-sm"
            style={{ 
              backgroundColor: `${category.color}20`,
              color: category.color 
            }}
          >
            Visit Website
          </button>
        </div>
      </motion.div>
    </>
  );
};

// Effet de particules en arrière-plan
const ParticleEffect = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
  }>>([]);
  
  // Générer les particules uniquement côté client pour éviter les erreurs d'hydratation
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: sponsorNetwork.categories[i % sponsorNetwork.categories.length].color,
    }));
    
    setParticles(newParticles);
  }, []);
  
  if (particles.length === 0) {
    // Rendu côté serveur ou initial sans particules
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;
  }
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute w-1 h-1 rounded-full opacity-30"
          style={{
            top: `${particle.y}%`,
            left: `${particle.x}%`,
            backgroundColor: particle.color,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};

interface NetworkGraphProps {
  isVisible: boolean;
}

// Composant principal NetworkGraph avec positions fixes (sans simulation continue)
const NetworkGraph: React.FC<NetworkGraphProps> = ({ isVisible }) => {
  const [selectedSponsor, setSelectedSponsor] = useState<number | null>(null);
  const [positions, setPositions] = useState<Record<number, Position>>({});
  const [isPositioned, setIsPositioned] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Calculer les positions une seule fois au chargement
  useEffect(() => {
    // Si les positions sont déjà calculées, ne rien faire
    if (isPositioned) return;
    
    // Distribution uniforme en cercle
    const nodeCount = sponsorNetwork.nodes.length;
    const fixedPositions: Record<number, Position> = {};
    
    // Répartir les sponsors en cercle avec légère randomisation
    sponsorNetwork.nodes.forEach((sponsor, index) => {
      // Positionner en cercle en ajoutant un léger bruit
      const angle = (index / nodeCount) * Math.PI * 2;
      
      // Trier les nœuds par catégorie pour le positionnement
      const categoryIndex = sponsorNetwork.categories.findIndex(c => c.id === sponsor.category);
      
      // Sur mobile, on réduit le rayon pour que tout tienne dans l'écran
      const radiusFactor = isMobile
        ? 0.5 + (categoryIndex / sponsorNetwork.categories.length) * 0.3
        : 0.7 + (categoryIndex / sponsorNetwork.categories.length) * 0.3;
      
      // Rayon adapté à la taille du badge et au type d'appareil
      const radius = isMobile
        ? 35 * radiusFactor + Math.random() * 5
        : 25 * radiusFactor + Math.random() * 5;
      
      fixedPositions[sponsor.id] = { 
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius
      };
    });
    
    // Appliquer un seul pas de répulsion pour éviter les chevauchements
    // Sans simulation continue
    const adjustedPositions = resolveOverlaps(fixedPositions);
    
    // Enregistrer les positions et marquer comme positionné
    setPositions(adjustedPositions);
    setIsPositioned(true);
  }, [isVisible, isPositioned, isMobile]);
  
  // Fonction pour résoudre les chevauchements en une seule étape
  const resolveOverlaps = (initialPos: Record<number, Position>): Record<number, Position> => {
    const positions = { ...initialPos };
    const MIN_DISTANCE = 12;
    
    // Distance entre deux positions
    const distance = (pos1: Position, pos2: Position) => {
      return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
    };
    
    // Passer sur chaque paire une seule fois et ajuster si nécessaire
    for (let i = 0; i < 10; i++) { // Limite à 10 itérations maximum
      let overlapsFixed = 0;
      
      sponsorNetwork.nodes.forEach((sponsor1, idx1) => {
        const pos1 = positions[sponsor1.id];
        
        sponsorNetwork.nodes.forEach((sponsor2, idx2) => {
          if (idx1 >= idx2) return; // Éviter les doublons et auto-comparaisons
          
          const pos2 = positions[sponsor2.id];
          const dist = distance(pos1, pos2);
          
          if (dist < MIN_DISTANCE) {
            // Calculer le vecteur direction
            const dx = pos2.x - pos1.x;
            const dy = pos2.y - pos1.y;
            const len = dist || 0.001; // Éviter division par zéro
            
            // Normaliser
            const nx = dx / len;
            const ny = dy / len;
            
            // Calculer déplacement
            const moveAmount = (MIN_DISTANCE - dist) / 2 + 0.5;
            
            // Déplacer en directions opposées
            positions[sponsor1.id] = {
              x: Math.min(85, Math.max(15, pos1.x - nx * moveAmount)),
              y: Math.min(85, Math.max(15, pos1.y - ny * moveAmount))
            };
            
            positions[sponsor2.id] = {
              x: Math.min(85, Math.max(15, pos2.x + nx * moveAmount)),
              y: Math.min(85, Math.max(15, pos2.y + ny * moveAmount))
            };
            
            overlapsFixed++;
          }
        });
      });
      
      // Si plus de chevauchement, on arrête
      if (overlapsFixed === 0) break;
    }
    
    return positions;
  };
  
  // Reste inchangé... (getters pour catégories, couleurs, etc.)
  const getCategoryForSponsor = (sponsorId: number): Category | null => {
    const sponsor = sponsorNetwork.nodes.find(s => s.id === sponsorId);
    if (!sponsor) return null;
    
    const category = sponsorNetwork.categories.find(c => c.id === sponsor.category);
    return category || null;
  };
  
  const getConnectionColor = (sponsorId1: number, sponsorId2: number): string => {
    const category1 = getCategoryForSponsor(sponsorId1);
    const category2 = getCategoryForSponsor(sponsorId2);
    
    if (!category1 || !category2) return 'rgba(255, 255, 255, 0.2)';
    
    // Créer un gradient entre les deux couleurs
    return `url(#gradient-${sponsorId1}-${sponsorId2})`;
  };
  
  // Générer tous les gradients pour les connexions
  const renderGradients = () => {
    const gradients: React.ReactNode[] = [];
    
    sponsorNetwork.nodes.forEach(sponsor => {
      const sourceCategory = getCategoryForSponsor(sponsor.id);
      
      sponsor.connections.forEach(targetId => {
        if (targetId > sponsor.id) { // Éviter les doublons
          const targetCategory = getCategoryForSponsor(targetId);
          
          if (sourceCategory && targetCategory) {
            gradients.push(
              <linearGradient 
                key={`gradient-${sponsor.id}-${targetId}`} 
                id={`gradient-${sponsor.id}-${targetId}`}
                x1="0%" y1="0%" x2="100%" y2="0%"
              >
                <stop offset="0%" stopColor={sourceCategory.color} stopOpacity="0.6" />
                <stop offset="100%" stopColor={targetCategory.color} stopOpacity="0.6" />
              </linearGradient>
            );
          }
        }
      });
    });
    
    return gradients;
  };
  
  // Rendu des connexions entre sponsors
  const renderConnections = () => {
    const connections: React.ReactNode[] = [];
    
    sponsorNetwork.nodes.forEach(sponsor => {
      sponsor.connections.forEach(targetId => {
        // Éviter les doublons en ne rendant que les connexions où source.id < target.id
        if (targetId > sponsor.id) {
          const sourcePos = positions[sponsor.id];
          const targetPos = positions[targetId];
          
          if (sourcePos && targetPos) {
            connections.push(
              <ConnectionLine 
                key={`connection-${sponsor.id}-${targetId}`}
                startPos={sourcePos}
                endPos={targetPos}
                isActive={selectedSponsor === sponsor.id || selectedSponsor === targetId}
                color={getConnectionColor(sponsor.id, targetId)}
              />
            );
          }
        }
      });
    });
    
    return connections;
  };
  
  // Si aucune position n'est encore calculée, afficher un indicateur de chargement
  const hasPositions = Object.keys(positions).length > 0;
  
  // Réajuster les positions en cas de redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      // Réinitialiser les positions si la taille de l'écran change significativement
      const isMobileNow = window.innerWidth < 768;
      if (isMobileNow !== isMobile) {
        setIsPositioned(false);
      }
      
      if (containerRef.current) {
        // Removed setDimensions call
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);
  
  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] mt-10 mb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Particules d'arrière-plan */}
      <ParticleEffect />
      
      {/* Définitions SVG pour les gradients */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          {renderGradients()}
        </defs>
      </svg>
      
      {/* Afficher un indicateur de chargement si nécessaire */}
      {isVisible && !hasPositions && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-accent-blue text-lg">Chargement de l&apos;écosystème...</div>
        </div>
      )}
      
      {/* Connexions entre sponsors */}
      {hasPositions && renderConnections()}
      
      {/* Nœuds des sponsors */}
      {hasPositions && sponsorNetwork.nodes.map(sponsor => {
        const position = positions[sponsor.id];
        const category = getCategoryForSponsor(sponsor.id);
        
        if (!position || !category) return null;
        
        return (
          <SponsorNode 
            key={`sponsor-${sponsor.id}`}
            sponsor={sponsor}
            position={position}
            isActive={selectedSponsor === sponsor.id}
            onClick={() => setSelectedSponsor(selectedSponsor === sponsor.id ? null : sponsor.id)}
            categoryColor={category.color}
          />
        );
      })}
      
      {/* Carte détaillée du sponsor sélectionné */}
      <AnimatePresence>
        {selectedSponsor && positions[selectedSponsor] && (
          <SponsorDetailCard 
            sponsor={sponsorNetwork.nodes.find(s => s.id === selectedSponsor)!}
            category={getCategoryForSponsor(selectedSponsor)!}
            position={positions[selectedSponsor]}
            onClose={() => setSelectedSponsor(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface CategoryLegendProps {
  isVisible: boolean;
}

// Légende des catégories
const CategoryLegend: React.FC<CategoryLegendProps> = ({ isVisible }) => {
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-3 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {sponsorNetwork.categories.map(category => (
        <div 
          key={category.id} 
          className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors"
          style={{ 
            backgroundColor: `${category.color}15`, 
            border: `1px solid ${category.color}40`,
          }}
        >
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: category.color }}
          />
          <span 
            className="text-sm font-medium" 
            style={{ color: category.color }}
          >
            {category.name}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

export default function SponsorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm uppercase tracking-wider text-accent-blue mb-2">Our Network</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Sponsors</h3>
            <p className="text-lg text-muted-light">
              Explore our diverse ecosystem of sponsors who bring their expertise and
              innovation to make this hackathon a world-class collaborative experience.
            </p>
          </motion.div>
        </div>
        
        {/* Légende des catégories */}
        <CategoryLegend isVisible={isInView} />
        
        {/* Visualisation du réseau de sponsors */}
        <NetworkGraph isVisible={isInView} />
        
        {/* Appel à l'action pour devenir sponsor */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="glass inline-block p-8 rounded-2xl border border-white/10">
            <h4 className="text-2xl font-bold mb-4 text-white">Join Our Sponsor Network</h4>
            <p className="text-muted-light mb-6 max-w-2xl">
              Connect with the brightest minds in technology by becoming a hackathon sponsor.
              Showcase your brand, tools, and APIs to thousands of developers worldwide.
            </p>
            <a 
              href="mailto:sponsors@hackathon.dev" 
              className="relative overflow-hidden group px-6 py-3 rounded-md text-white font-bold transition-all duration-300 inline-flex items-center gap-2"
            >
              {/* Fond du bouton avec effet de glow */}
              <span className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-blue-light rounded-md opacity-90 group-hover:opacity-100 transition-opacity duration-300"></span>
              
              {/* Effet de brillance au hover */}
              <span className="absolute inset-0 w-full h-full shine-effect opacity-0 group-hover:opacity-100"></span>
              
              {/* Animation de pulse autour du bouton */}
              <span className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent-blue to-accent-blue-light blur-md group-hover:animate-pulse"></span>
              </span>
              
              <span className="relative z-10">Contact Us</span>
              <svg className="relative z-10" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 