'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

// Composant pour effet holographique avec scan-lines et glitch
function HolographicEffect() {
  const { size, viewport } = useThree();
  
  // Matériel de shader personnalisé pour les scan-lines
  const scanlineMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(size.width, size.height) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;
        
        void main() {
          // Ligne de scan principale
          float scanLineMain = abs(sin(vUv.y * 100.0 - time * 5.0)) < 0.1 ? 0.5 : 0.0;
          
          // Lignes de scan secondaires pour effet CRT/hologramme
          float scanLine = abs(sin(vUv.y * 100.0)) < 0.1 ? 0.1 : 0.0;
          
          // Effet de glitch périodique
          float glitchIntensity = sin(time * 2.0) * 0.5 + 0.5;
          float glitch = step(0.98, sin(time * 100.0) * sin(time * 50.0) * glitchIntensity);
          float glitchLine = step(0.5, sin(vUv.y * 2000.0 + time * 1000.0));
          
          // Couleur finale
          vec3 color = vec3(0.0, 0.6, 1.0); // Bleu clair holographique
          float alpha = scanLine + scanLineMain + glitch * glitchLine * 0.2;
          
          gl_FragColor = vec4(color, alpha * 0.3); // Transparence ajustée
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
  }, [size]);
  
  // Mettre à jour le temps pour l'animation du shader
  useFrame((state) => {
    scanlineMaterial.uniforms.time.value = state.clock.elapsedTime;
  });
  
  // Créer un plan qui couvre toute la vue
  return (
    <mesh position={[0, 0, 5]}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
      <primitive object={scanlineMaterial} attach="material" />
    </mesh>
  );
}

// Composant pour ajouter des interfaces holographiques flottantes
function HolographicInterface() {
  // Création de quelques "écrans" holographiques flottants
  const interfaces = useMemo(() => {
    const items = [];
    
    // Générer 5 interfaces aléatoires
    for (let i = 0; i < 5; i++) {
      items.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
          Math.random() * 5 - 10
        ),
        rotation: new THREE.Euler(
          Math.random() * 0.2 - 0.1,
          Math.random() * 0.5 - 0.25,
          Math.random() * 0.2 - 0.1
        ),
        scale: Math.random() * 1 + 0.5,
        pulseSpeed: Math.random() * 2 + 1
      });
    }
    
    return items;
  }, []);
  
  // Animation des interfaces
  useFrame(({ clock }) => {
    // Animation appliquée directement dans le rendu via les refs
  });
  
  return (
    <group>
      {interfaces.map((item, index) => (
        <mesh
          key={`interface-${index}`}
          position={item.position}
          rotation={item.rotation}
          scale={item.scale}
        >
          <planeGeometry args={[2, 1, 1, 1]} />
          <meshBasicMaterial
            color="#1488fc"
            opacity={0.2}
            transparent
            wireframe={Math.random() > 0.5}
          />
          
          {/* Bordure holographique pour les "écrans" */}
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(2, 1, 1, 1)]} />
            <lineBasicMaterial 
              color="#8adaff" 
              opacity={0.8} 
              transparent 
            />
          </lineSegments>
        </mesh>
      ))}
    </group>
  );
}

// Exporter les deux composants
export { HolographicEffect, HolographicInterface }; 