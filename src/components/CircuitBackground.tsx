'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';

// Types pour les structures de données du circuit
interface CircuitNode {
  position: THREE.Vector3;
  size: number;
  connections: { pathId: number; nodeId: number }[];
}

interface CircuitPath {
  start: number;
  end: number;
  length: number;
}

interface CircuitPulse {
  pathId: number;
  position: number; // Position le long du chemin (0-1)
  speed: number;
  direction: number; // 1 ou -1
  color?: string;
}

interface CircuitData {
  nodes: CircuitNode[];
  paths: CircuitPath[];
  pulses: CircuitPulse[];
}

// Fonction pour générer les données du circuit
function generateCircuitData(): CircuitData {
  const data: CircuitData = {
    nodes: [],  // Points d'intersection
    paths: [],  // Lignes connectant les nœuds
    pulses: []  // Points de départ des impulsions
  };
  
  // Générer une grille de nœuds potentiels
  const gridSize = 10;
  const spacing = 2;
  
  for (let x = -gridSize; x <= gridSize; x++) {
    for (let y = -gridSize; y <= gridSize; y++) {
      // Ne pas créer un nœud à chaque point (rendre le circuit moins dense)
      if (Math.random() > 0.7) {
        data.nodes.push({
          position: new THREE.Vector3(x * spacing, y * spacing, 0),
          size: Math.random() * 0.1 + 0.05,
          connections: []
        });
      }
    }
  }
  
  // Connecter les nœuds proches pour former des chemins
  for (let i = 0; i < data.nodes.length; i++) {
    const node = data.nodes[i];
    
    for (let j = i + 1; j < data.nodes.length; j++) {
      const otherNode = data.nodes[j];
      const distance = node.position.distanceTo(otherNode.position);
      
      // Connecter uniquement les nœuds proches
      if (distance < spacing * 2 && Math.random() > 0.5) {
        const pathId = data.paths.length;
        data.paths.push({
          start: i,
          end: j,
          length: distance
        });
        
        node.connections.push({ pathId, nodeId: j });
        otherNode.connections.push({ pathId, nodeId: i });
        
        // Ajouter des impulsions sur certains chemins
        if (Math.random() > 0.7) {
          const colors = ['#ffffff', '#8adaff', '#1488fc'];
          data.pulses.push({
            pathId,
            position: Math.random(), // Position aléatoire sur le chemin
            speed: Math.random() * 0.01 + 0.003,
            direction: Math.random() > 0.5 ? 1 : -1,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
      }
    }
  }
  
  return data;
}

// Composant principal pour les circuits
function CircuitBackground() {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  
  // Générer la structure du circuit
  const circuitData = useMemo(() => generateCircuitData(), []);
  
  // État pour les impulsions
  const pulsesRef = useRef(circuitData.pulses);
  
  // Animation d'entrée
  useEffect(() => {
    if (groupRef.current) {
      // Animation d'entrée avec GSAP
      gsap.from(groupRef.current.scale, {
        x: 0.8,
        y: 0.8,
        z: 0.8,
        duration: 2,
        ease: 'elastic.out(1, 0.5)'
      });
      
      gsap.from(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 3,
        ease: 'power3.out'
      });
    }
  }, [camera]);
  
  // Animation continue
  useFrame((state) => {
    if (groupRef.current) {
      // Rotation lente
      groupRef.current.rotation.y += 0.0005;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
      
      // Mettre à jour les positions des impulsions
      pulsesRef.current.forEach(pulse => {
        // Avancer l'impulsion le long du chemin
        pulse.position += pulse.speed * pulse.direction;
        
        // Si l'impulsion atteint la fin du chemin
        if (pulse.position >= 1 || pulse.position <= 0) {
          const path = circuitData.paths[pulse.pathId];
          const nodeId = pulse.position >= 1 ? path.end : path.start;
          const node = circuitData.nodes[nodeId];
          
          // Choisir un nouveau chemin aléatoire parmi les connexions du nœud
          if (node.connections.length > 1) {
            // Filtrer pour éviter de revenir sur le même chemin
            const availablePaths = node.connections.filter(
              conn => conn.pathId !== pulse.pathId
            );
            
            if (availablePaths.length > 0) {
              const newConn = availablePaths[Math.floor(Math.random() * availablePaths.length)];
              const newPath = circuitData.paths[newConn.pathId];
              
              // Déterminer la nouvelle direction
              const isStart = nodeId === newPath.start;
              
              pulse.pathId = newConn.pathId;
              pulse.position = isStart ? 0 : 1;
              pulse.direction = isStart ? 1 : -1;
            } else {
              // Inverser simplement la direction si pas d'autre chemin
              pulse.direction *= -1;
              pulse.position = pulse.position >= 1 ? 0.99 : 0.01;
            }
          } else {
            // Inverser simplement la direction si pas d'autre connexion
            pulse.direction *= -1;
            pulse.position = pulse.position >= 1 ? 0.99 : 0.01;
          }
        }
      });
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Lignes de circuit */}
      {circuitData.paths.map((path, index) => {
        const startNode = circuitData.nodes[path.start];
        const endNode = circuitData.nodes[path.end];
        
        // Créer la géométrie de la ligne directement avec THREE.js
        const points = [
          new THREE.Vector3(startNode.position.x, startNode.position.y, startNode.position.z),
          new THREE.Vector3(endNode.position.x, endNode.position.y, endNode.position.z)
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ 
          color: '#1488fc',
          opacity: 0.6,
          transparent: true
        });
        const line = new THREE.Line(geometry, material);
        
        return (
          <primitive key={`path-${index}`} object={line} />
        );
      })}
      
      {/* Nœuds d'intersection */}
      {circuitData.nodes.map((node, index) => (
        <mesh key={`node-${index}`} position={node.position}>
          <sphereGeometry args={[node.size, 8, 8]} />
          <meshBasicMaterial color="#8adaff" opacity={0.8} transparent />
        </mesh>
      ))}
      
      {/* Impulsions */}
      {pulsesRef.current.map((pulse, index) => {
        const path = circuitData.paths[pulse.pathId];
        const startNode = circuitData.nodes[path.start];
        const endNode = circuitData.nodes[path.end];
        
        // Calculer la position le long du chemin
        const position = new THREE.Vector3().lerpVectors(
          startNode.position,
          endNode.position,
          pulse.position
        );
        
        return (
          <mesh key={`pulse-${index}`} position={position}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color={pulse.color || "#ffffff"} opacity={0.9} transparent />
          </mesh>
        );
      })}
    </group>
  );
}

export default CircuitBackground; 