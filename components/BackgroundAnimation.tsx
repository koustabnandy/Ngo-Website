"use client";

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';
import useThemeDetector from '@/hooks/useThemeDetector';

// Animated floating particles
const Particles = ({ count = 100, mousePosition, isDarkMode, onPositionsUpdate }) => {
  const mesh = useRef();
  const [positions, setPositions] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [speeds, setSpeeds] = useState([]);
  const [colors, setColors] = useState([]);
  
  // Colors based on theme
  const lightModeColors = ['#88ccff', '#90cdf4', '#4299e1', '#3182ce', '#2b6cb0'];
  const darkModeColors = ['#4a88ff', '#2563eb', '#1d4ed8', '#3b82f6', '#60a5fa'];
  
  // Initialize particles
  useEffect(() => {
    const tempPositions = [];
    const tempSizes = [];
    const tempSpeeds = [];
    const tempColors = [];
    
    for (let i = 0; i < count; i++) {
      // Create random positions in a sphere
      const radius = 7.5 + Math.random() * 7.5; // Distance from center
      const theta = Math.random() * Math.PI * 2; // Angle around y-axis
      const phi = Math.acos((Math.random() * 2) - 1); // Angle from y-axis
      
      // Convert spherical to cartesian coordinates
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      tempPositions.push([x, y, z]);
      
      // Varied sizes with some particles being larger
      const size = Math.random() < 0.1 
        ? Math.random() * 0.8 + 0.3 // 10% larger particles
        : Math.random() * 0.4 + 0.05; // 90% smaller particles
      
      tempSizes.push(size);
      
      // Varied speeds
      const speed = Math.random() * 0.01 + 0.002;
      const angle = Math.random() * Math.PI * 2;
      
      tempSpeeds.push({
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
        z: (Math.random() - 0.5) * speed
      });
      
      // Random color from palette
      const colorSet = isDarkMode ? darkModeColors : lightModeColors;
      tempColors.push(colorSet[Math.floor(Math.random() * colorSet.length)]);
    }
    
    setPositions(tempPositions);
    setSizes(tempSizes);
    setSpeeds(tempSpeeds);
    setColors(tempColors);
  }, [count, isDarkMode]);
  
  // Animation loop
  useFrame((state, delta) => {
    if (!mesh.current) return;
    
    // Rotate the entire particle system
    mesh.current.rotation.y += 0.0005;
    mesh.current.rotation.x += 0.0002;
    
    // Update each particle position
    const newPositions = [...positions];
    
    for (let i = 0; i < newPositions.length; i++) {
      // Enhanced sine wave motion with more complex patterns
      const time = state.clock.getElapsedTime();
      const waveX = Math.sin(time * 0.5 + i * 0.1) * 0.025 + Math.sin(time * 0.2 + i * 0.3) * 0.01;
      const waveY = Math.cos(time * 0.3 + i * 0.05) * 0.025 + Math.cos(time * 0.1 + i * 0.2) * 0.01;
      const waveZ = Math.sin(time * 0.4 + i * 0.15) * 0.01;
      
      newPositions[i][0] += speeds[i].x + waveX;
      newPositions[i][1] += speeds[i].y + waveY;
      newPositions[i][2] += speeds[i].z + waveZ;
      
      // Reset particles that go too far
      const distance = Math.sqrt(
        newPositions[i][0] * newPositions[i][0] + 
        newPositions[i][1] * newPositions[i][1] + 
        newPositions[i][2] * newPositions[i][2]
      );
      
      if (distance > 15) {
        // Reset to a random position on the sphere surface
        const radius = 7.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        newPositions[i][0] = radius * Math.sin(phi) * Math.cos(theta);
        newPositions[i][1] = radius * Math.sin(phi) * Math.sin(theta);
        newPositions[i][2] = radius * Math.cos(phi);
      }
      
      // Enhanced mouse influence with dynamic response
      if (mousePosition.x !== undefined && mousePosition.y !== undefined) {
        // Calculate distance from particle to mouse position
        const mouseX = mousePosition.x * 10;
        const mouseY = mousePosition.y * 10;
        const dx = mouseX - newPositions[i][0];
        const dy = mouseY - newPositions[i][1];
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Stronger influence for closer particles (inverse square law)
        const maxDistance = 8;
        if (distance < maxDistance) {
          const strength = 0.002 * (1 - distance / maxDistance);
          newPositions[i][0] += dx * strength;
          newPositions[i][1] += dy * strength;
          // Add slight vertical movement for more dynamic feel
          newPositions[i][2] += (Math.random() - 0.5) * 0.01;
        }
      }
    }
    
    setPositions(newPositions);
    
    // Update positions for connection lines
    if (onPositionsUpdate) {
      onPositionsUpdate(newPositions);
    }
  });
  
  return (
    <group ref={mesh}>
      {positions.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[sizes[i], 8, 8]} />
          <meshBasicMaterial 
            color={colors[i]} 
            transparent 
            opacity={0.7} 
          />
        </mesh>
      ))}
    </group>
  );
};

// Animated gradient sphere
const GradientSphere = ({ isDarkMode }) => {
  const mesh = useRef();
  const { viewport } = useThree();
  
  // Create shader material for gradient effect
  const uniforms = {
    time: { value: 0 },
    color1: { value: new THREE.Color(isDarkMode ? '#1a365d' : '#e6f0ff') },
    color2: { value: new THREE.Color(isDarkMode ? '#3182ce' : '#90cdf4') },
    resolution: { value: new THREE.Vector2(viewport.width, viewport.height) }
  };
  
  // Update uniforms when theme changes
  useEffect(() => {
    uniforms.color1.value = new THREE.Color(isDarkMode ? '#1a365d' : '#e6f0ff');
    uniforms.color2.value = new THREE.Color(isDarkMode ? '#3182ce' : '#90cdf4');
  }, [isDarkMode, uniforms]);
  
  // Enhanced animation for pulsing with more fluid motion
  const { scale } = useSpring({
    from: { scale: 1 },
    to: async (next) => {
      while (true) {
        await next({ scale: 1.08 });
        await next({ scale: 0.92 });
      }
    },
    config: { 
      mass: 2,
      tension: 120, 
      friction: 14,
      duration: 4000 
    },
  });
  
  useFrame((state) => {
    if (!mesh.current) return;
    
    // Update time uniform for animated gradient
    uniforms.time.value = state.clock.getElapsedTime() * 0.5;
    
    // Gentle rotation
    mesh.current.rotation.y += 0.0005;
    mesh.current.rotation.x += 0.0002;
  });
  
  // Custom shader material for gradient effect
  const gradientMaterial = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        // Create animated gradient
        float noise = sin(vPosition.x * 2.0 + time) * sin(vPosition.y * 2.0 + time) * sin(vPosition.z * 2.0 + time);
        float pattern = abs(noise * 0.5 + 0.5);
        
        // Mix colors based on pattern
        vec3 color = mix(color1, color2, pattern);
        
        // Add pulsing glow
        float pulse = abs(sin(time * 0.5) * 0.5 + 0.5);
        float alpha = 0.15 + pulse * 0.1;
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    wireframe: true
  });
  
  return (
    <>
      {/* Inner sphere with gradient */}
      <animated.mesh ref={mesh} scale={scale}>
        <sphereGeometry args={[3, 64, 64]} />
        <primitive attach="material" object={gradientMaterial} />
      </animated.mesh>
      
      {/* Outer glow sphere */}
      <animated.mesh scale={scale.to(s => s * 1.2)}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial 
          color={isDarkMode ? '#3182ce' : '#90cdf4'} 
          transparent 
          opacity={0.05} 
        />
      </animated.mesh>
    </>
  );
};

// Animated connection lines between particles
const ConnectionLines = ({ positions, isDarkMode, maxDistance = 3 }) => {
  const linesRef = useRef();
  const [connections, setConnections] = useState([]);
  
  // Calculate connections between particles
  useEffect(() => {
    if (positions.length === 0) return;
    
    const newConnections = [];
    
    // Check each pair of particles
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const p1 = positions[i];
        const p2 = positions[j];
        
        // Calculate distance
        const dx = p1[0] - p2[0];
        const dy = p1[1] - p2[1];
        const dz = p1[2] - p2[2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        // Only connect particles within maxDistance
        if (distance < maxDistance) {
          // Calculate opacity based on distance (closer = more opaque)
          const opacity = 1 - (distance / maxDistance);
          
          newConnections.push({
            points: [
              new THREE.Vector3(p1[0], p1[1], p1[2]),
              new THREE.Vector3(p2[0], p2[1], p2[2])
            ],
            opacity
          });
        }
      }
    }
    
    setConnections(newConnections);
  }, [positions, maxDistance]);
  
  return (
    <group ref={linesRef}>
      {connections.map((connection, i) => (
        <line key={i}>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                connection.points[0].x, connection.points[0].y, connection.points[0].z,
                connection.points[1].x, connection.points[1].y, connection.points[1].z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            attach="material"
            color={isDarkMode ? '#4a88ff' : '#88ccff'}
            transparent
            opacity={connection.opacity * 0.2}
            linewidth={1}
          />
        </line>
      ))}
    </group>
  );
};

// Main scene component
const Scene = ({ mousePosition, isDarkMode, scrollY }) => {
  const [particlePositions, setParticlePositions] = useState([]);
  const sceneRef = useRef();
  
  // Enhanced animation for scene based on scroll with smoother response
  const { rotation } = useSpring({
    rotation: [scrollY * 0.005, scrollY * 0.015, scrollY * 0.002],
    config: { 
      mass: 2.5, 
      tension: 120, 
      friction: 20,
      precision: 0.001
    }
  });
  
  // Handle particle position updates
  const handlePositionsUpdate = (positions) => {
    setParticlePositions(positions);
  };
  
  return (
    <animated.group ref={sceneRef} rotation={rotation}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      
      {/* Main sphere */}
      <GradientSphere isDarkMode={isDarkMode} />
      
      {/* Particles */}
      <Particles 
        count={150} 
        mousePosition={mousePosition} 
        isDarkMode={isDarkMode} 
        onPositionsUpdate={handlePositionsUpdate}
      />
      
      {/* Connection lines */}
      <ConnectionLines 
        positions={particlePositions} 
        isDarkMode={isDarkMode} 
        maxDistance={3}
      />
    </animated.group>
  );
};

// Main component with mouse tracking and scroll tracking
const BackgroundAnimation = () => {
  const isDarkMode = useThemeDetector();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  // Handle mouse movement
  const handleMouseMove = (event) => {
    // Normalize mouse position to be between -1 and 1
    setMousePosition({
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1
    });
  };
  
  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY * 0.01);
      
      // Hide animation when scrolled far down for better performance
      if (window.scrollY > 2000) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Performance optimization - reduce animation quality on mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className="fixed inset-0 -z-10 opacity-70 pointer-events-none"
      onMouseMove={handleMouseMove}
    >
      <Canvas 
        camera={{ position: [0, 0, 10], fov: isMobile ? 60 : 50 }}
        dpr={isMobile ? 1 : window.devicePixelRatio}
        performance={{ min: 0.5 }}
      >
        <Scene 
          mousePosition={mousePosition} 
          isDarkMode={isDarkMode} 
          scrollY={scrollY}
        />
      </Canvas>
    </div>
  );
};

export default BackgroundAnimation;