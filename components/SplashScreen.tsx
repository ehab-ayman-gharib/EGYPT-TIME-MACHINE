import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Camera, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);
  const isExitingRef = useRef(false);

  const handleInteraction = () => {
    if (isExiting) return;
    setIsExiting(true);
    isExitingRef.current = true;
    setTimeout(() => {
        onStart();
    }, 1800);
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Scene Setup ---
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    // Deep Egyptian Night Blue
    const bgColor = new THREE.Color('#020617'); 
    scene.background = bgColor;
    scene.fog = new THREE.FogExp2(bgColor, 0.03);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 10;
    camera.position.y = 0;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Golden spotlight for the Ankh
    const spotLight = new THREE.SpotLight(0xffd700, 10);
    spotLight.position.set(5, 10, 8);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.5;
    spotLight.decay = 2;
    spotLight.distance = 50;
    scene.add(spotLight);

    // Blue rim light for mystery
    const blueLight = new THREE.PointLight(0x4444ff, 5, 20);
    blueLight.position.set(-5, -2, 5);
    scene.add(blueLight);

    // --- 1. The Golden Ankh (Centerpiece) ---
    const ankhGroup = new THREE.Group();
    
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      roughness: 0.2,
      metalness: 1.0,
      emissive: 0xaa6600,
      emissiveIntensity: 0.1
    });

    // Top Loop (Torus)
    const loopGeo = new THREE.TorusGeometry(0.8, 0.2, 32, 64, Math.PI * 2);
    const loop = new THREE.Mesh(loopGeo, goldMaterial);
    loop.position.y = 1.1;
    loop.scale.set(1, 1.4, 1);
    ankhGroup.add(loop);

    // Horizontal Bar
    const hBarGeo = new THREE.BoxGeometry(2.2, 0.4, 0.25);
    const hBar = new THREE.Mesh(hBarGeo, goldMaterial);
    hBar.position.y = 0.1;
    ankhGroup.add(hBar);

    // Vertical Bar (Stem)
    const vBarGeo = new THREE.BoxGeometry(0.4, 2.8, 0.25);
    const vBar = new THREE.Mesh(vBarGeo, goldMaterial);
    vBar.position.y = -1.1;
    ankhGroup.add(vBar);

    scene.add(ankhGroup);
    ankhGroup.position.z = 0;

    // --- 2. Floating Photo Frames (Reduced Number) ---
    const framesGroup = new THREE.Group();
    scene.add(framesGroup);

    const createFrame = () => {
      // Hollow Frame Shape
      const shape = new THREE.Shape();
      const w = 1.2;
      const h = 1.6;
      const t = 0.15; // thickness of rim

      shape.moveTo(-w/2, -h/2);
      shape.lineTo(w/2, -h/2);
      shape.lineTo(w/2, h/2);
      shape.lineTo(-w/2, h/2);
      shape.lineTo(-w/2, -h/2);

      const hole = new THREE.Path();
      hole.moveTo((-w/2) + t, (-h/2) + t);
      hole.lineTo((w/2) - t, (-h/2) + t);
      hole.lineTo((w/2) - t, (h/2) - t);
      hole.lineTo((-w/2) + t, (h/2) - t);
      hole.lineTo((-w/2) + t, (-h/2) + t);
      shape.holes.push(hole);

      const extrudeSettings = { steps: 1, depth: 0.1, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 };
      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      
      // Bronze/Dark Gold material for frames
      const mat = new THREE.MeshStandardMaterial({
        color: 0xcd7f32,
        roughness: 0.4,
        metalness: 0.8,
        transparent: true,
        opacity: 0.7
      });

      const mesh = new THREE.Mesh(geo, mat);
      
      // Add a simple plane inside to represent "canvas" content (faded)
      const canvasGeo = new THREE.PlaneGeometry(w - t*2, h - t*2);
      const canvasMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
      const canvasMesh = new THREE.Mesh(canvasGeo, canvasMat);
      canvasMesh.position.z = 0.05;
      mesh.add(canvasMesh);

      return mesh;
    };

    const frames: THREE.Mesh[] = [];
    const frameCount = 8; // Reduced count as requested

    for (let i = 0; i < frameCount; i++) {
        const frame = createFrame();
        
        // Position in a loose cloud around the center
        const theta = (i / frameCount) * Math.PI * 2;
        const radius = 4 + Math.random() * 2;
        
        frame.position.x = Math.cos(theta) * radius;
        frame.position.y = (Math.random() - 0.5) * 6; // Spread vertically
        frame.position.z = (Math.random() - 0.5) * 4 - 2; // Depth variation

        frame.rotation.z = (Math.random() - 0.5) * 0.5; // Slight tilt
        frame.rotation.y = (Math.random() - 0.5) * 0.5;

        // Store random movement data
        frame.userData = {
            rotSpeed: (Math.random() - 0.5) * 0.005,
            floatSpeed: 0.005 + Math.random() * 0.005,
            yBase: frame.position.y
        };

        framesGroup.add(frame);
        frames.push(frame);
    }

    // --- 3. Magical Particles ---
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 200;
    const posArray = new Float32Array(particleCount * 3);
    
    for(let i=0; i<particleCount*3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create texture for glow
    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        const grad = ctx.createRadialGradient(16,16,0,16,16,16);
        grad.addColorStop(0, 'rgba(255, 215, 0, 1)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0,0,32,32);
    }
    const particleTexture = new THREE.Texture(canvas);
    particleTexture.needsUpdate = true;

    const particlesMat = new THREE.PointsMaterial({
        size: 0.15,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        color: 0xffd700
    });
    
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);


    // --- Animation Loop ---
    let animationId: number;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      const isExitingNow = isExitingRef.current;

      // Rotate Ankh
      if (!isExitingNow) {
          ankhGroup.rotation.y = Math.sin(time * 0.5) * 0.3; // Gentle swaying
          ankhGroup.rotation.x = Math.cos(time * 0.3) * 0.1;
      } else {
          // Rapid spin on exit
          ankhGroup.rotation.y += 0.15;
          ankhGroup.scale.multiplyScalar(0.96); // Shrink
      }

      // Animate Frames
      frames.forEach((f, i) => {
          if (isExitingNow) {
              // Fly away outwards
              f.position.x += Math.sign(f.position.x) * 0.1;
              f.position.y += Math.sign(f.position.y) * 0.1;
              f.rotation.z += 0.05;
              (f.material as THREE.MeshStandardMaterial).opacity -= 0.02;
          } else {
              // Float gently
              f.position.y = f.userData.yBase + Math.sin(time + i) * 0.5;
              f.rotation.y += f.userData.rotSpeed;
          }
      });

      // Animate Particles
      particleSystem.rotation.y = time * 0.05;
      if (isExitingNow) {
          particlesMat.opacity -= 0.02;
      }

      // Camera motion
      if (isExitingNow) {
          camera.position.z -= 0.2; // Zoom in
      } else {
          camera.position.x = Math.sin(time * 0.2) * 0.5;
          camera.position.y = Math.cos(time * 0.1) * 0.5;
          camera.lookAt(0,0,0);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mountRef.current) mountRef.current.innerHTML = '';
      renderer.dispose();
      goldMaterial.dispose();
      loopGeo.dispose();
      hBarGeo.dispose();
      vBarGeo.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
    };
  }, []);

  return (
    <div className="h-full w-full relative overflow-hidden bg-slate-950">
      <div ref={mountRef} className="absolute inset-0 z-0" />
      
      <div 
        onClick={handleInteraction}
        className={`
            absolute inset-0 z-10 flex flex-col items-center justify-center 
            cursor-pointer 
            transition-all duration-1000 ease-in-out
            ${isExiting ? 'opacity-0 scale-125 pointer-events-none' : 'opacity-100 scale-100'}
        `}
      >
        <div className="flex flex-col items-center p-8 text-center w-full max-w-md">
            {/* Logo/Icon Container */}
            <div className="mb-8 relative group">
                <div className="absolute inset-0 bg-yellow-500/30 blur-[40px] rounded-full animate-pulse group-hover:bg-yellow-500/50 transition-all duration-500"></div>
                <div className="relative border-2 border-yellow-500/40 p-6 rounded-full backdrop-blur-sm bg-black/20 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                   <Camera className="w-12 h-12 text-yellow-400" />
                </div>
                <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-6 h-6 text-white animate-bounce" />
                </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-400 to-amber-700 brand-font tracking-tighter drop-shadow-2xl mb-4">
              CHRONO<br/>LENS
            </h1>
            
            <div className="flex items-center space-x-4 mb-12">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-yellow-500/50"></div>
                <p className="text-yellow-100/80 font-serif italic text-xl tracking-wide">
                  Egypt's Time Machine
                </p>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-yellow-500/50"></div>
            </div>

            <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-lg animate-pulse"></div>
                <div className="relative border-b border-t border-yellow-500/30 py-2 px-8">
                    <span className="text-white text-sm uppercase tracking-[0.4em] font-light animate-pulse">Tap to Enter</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};