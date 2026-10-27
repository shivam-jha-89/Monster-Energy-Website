import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import MonsterCan from "./MonsterCan";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const CanRig = () => {
    const scrollGroup = useRef(); // Outer group for scroll exit
    const entryGroup = useRef();  // Inner group for entry animation
    const canRef = useRef();      // Leaf for mouse interaction
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize(); // Check on mount
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mouse interaction state (Parallax)
    useFrame((state) => {
        // Camera sway
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.5, 0.05);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.5, 0.05);
        state.camera.lookAt(0, 0, 0);

        // Can interaction - subtle rotation based on mouse
        if (canRef.current) {
            canRef.current.rotation.y = THREE.MathUtils.lerp(canRef.current.rotation.y, state.pointer.x * 0.5, 0.1);
            canRef.current.rotation.x = THREE.MathUtils.lerp(canRef.current.rotation.x, -state.pointer.y * 0.3, 0.1);
        }
    });

    useEffect(() => {
        if (!entryGroup.current || !scrollGroup.current) return;

        // Animation logic:
        // We want the can to drop in from the top-left, moving to the center.
        // As it drops, it spins on its own axis (like Earth) to look dynamic.

        // 1. Start Position: Top-left corner, off-screen
        gsap.set(entryGroup.current.position, {
            x: -12,
            y: 12,
            z: 0
        });

        // 2. Tilt: Angle the whole group so the path looks diagonal
        gsap.set(entryGroup.current.rotation, {
            z: -Math.PI / 4 // -45 degrees
        });

        // 3. Reset the inner can spin
        if (canRef.current) {
            gsap.set(canRef.current.rotation, { y: 0 });
        }

        const entryTl = gsap.timeline({ delay: 0.3 });

        // Check if mobile for positioning (Move UP on mobile to make room for text)
        const isSmallScreen = window.innerWidth < 768;

        // Animation Phase 1: drop to center
        entryTl.to(entryGroup.current.position, {
            x: 0,
            y: 0, // Keep centered (User requested)
            z: 0,
            duration: 3.5,
            ease: "power2.out"
        })

            // Animation Phase 2: spin the can while it moves
            // This spins the *can itself*, independent of the diagonal path
            .to(canRef.current.rotation, {
                y: Math.PI * 12, // 6 full spins
                duration: 3.5,
                ease: "power2.out"
            }, "<")

            // Animation Phase 3: stick the landing
            // Straighten up the group so the can stands vertical
            .to(entryGroup.current.rotation, {
                z: 0,
                duration: 1.0,
                ease: "elastic.out(1, 0.5)"
            }, "-=0.5")

            // Animation Phase 4: little impact wobble
            .to(entryGroup.current.rotation, {
                z: 0.1,
                duration: 0.2,
                ease: "power1.out"
            })
            .to(entryGroup.current.rotation, {
                z: 0,
                duration: 0.2,
                ease: "power1.inOut"
            });


        // --- Scroll Exit Animation ---
        // When user scrolls, the can tips over and "log rolls" down
        const exitTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#hero-section",
                start: "top top",
                end: "bottom center",
                scrub: 1,
            }
        });

        exitTl
            // 1. Tip over to the right (become horizontal)
            .to(scrollGroup.current.rotation, {
                z: -Math.PI / 2,
                ease: "power1.inOut",
                duration: 1
            })

            // 2. Drop down and spin
            .to(scrollGroup.current.position, {
                y: -15, // Drop off-screen
                ease: "power1.in",
                duration: 2
            })
            // Spin on its own axis to look like it's rolling
            .to(canRef.current.rotation, {
                y: "+=" + (Math.PI * 10),
                ease: "none",
                duration: 2
            }, "<");

        return () => {
            entryTl.kill();
            exitTl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <group ref={scrollGroup}>
            <group ref={entryGroup}>
                <group ref={canRef}>
                    <Center>
                        <MonsterCan scale={isMobile ? 0.9 : 1.5} />
                    </Center>
                </group>
            </group>
        </group>
    );
};

const Hero = () => {
    return (
        <div id="hero-section" className="bg-black h-screen w-full relative overflow-hidden flex items-center justify-center">

            {/* Background Texture & Overlay */}
            <div className="absolute inset-0 z-0 opacity-70 pointer-events-none" style={{ backgroundImage: 'url(/bg_texture.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

            {/* Lightning - Localized to Top Center/Can area */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] z-0 opacity-80 mix-blend-screen pointer-events-none"
                style={{
                    backgroundImage: 'url(/lightning_bg.png)',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    maskImage: 'radial-gradient(circle, black 20%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(circle, black 20%, transparent 70%)'
                }}>
            </div>

            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_10%,black_100%)] opacity-80 pointer-events-none"></div>

            {/* Background Atmosphere - Enhanced Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#64ff00] blur-[150px] opacity-20 rounded-full pointer-events-none z-0 mix-blend-screen scale-150"></div>

            {/* Layer 1: Background Text (Behind Model) */}
            <div className="absolute z-1 flex flex-col items-center justify-center pointer-events-none select-none w-full h-full overflow-hidden">
                <h2 style={{ fontFamily: '"Energy Storm", sans-serif' }} className="text-[#64ff00] text-[15vw] md:text-[8vw] leading-none uppercase tracking-normal opacity-40 text-center drop-shadow-[0_0_25px_rgba(100,255,0,0.2)] whitespace-nowrap scale-y-[4] origin-center translate-y-10 flex flex-col md:flex-row gap-4 md:gap-[20vw]">
                    <span>Unleash</span> <span>The Beast</span>
                </h2>
            </div>

            {/* Layer 2: 3D Scene (Middle - Interactive) */}
            <div className="absolute inset-0 z-10 h-full w-full">
                <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }} gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}>
                    <Suspense fallback={null}>
                        {/* Professional Studio Lighting */}
                        <ambientLight intensity={0.8} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow shadow-mapSize={[1024, 1024]} />
                        <pointLight position={[-10, -10, -10]} intensity={1} color="#64ff00" /> {/* Green Underglow/Rim */}
                        <pointLight position={[0, 5, 0]} intensity={0.5} color="white" />

                        {/* Dramatic Rim Light */}
                        <spotLight position={[-5, 5, 10]} angle={0.4} intensity={2} color="#ccffcc" />

                        <Environment preset="studio" blur={0.5} />

                        {/* Interactive Can Rig */}
                        <CanRig />

                    </Suspense>
                </Canvas>
            </div>

            {/* Layer 3: Foreground Text (In Front of Model) */}
            <div className="absolute bottom-12 left-0 w-full md:relative md:bottom-auto md:w-auto md:inset-auto z-20 flex flex-col items-center text-center md:mt-[650px] pointer-events-none px-4">
                {/* Main Title - Single Line & Smaller */}
                <h1 className="text-white text-2xl md:text-6xl font-feast tracking-widest uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,1)] mix-blend-normal whitespace-normal md:whitespace-nowrap leading-normal">
                    Maximum charge <span className="text-[#64ff00] mx-2">#</span> zero compromise
                </h1>

                {/* Button - Needs pointer events to be clickable */}
                <div className="mt-8 md:mt-20 pointer-events-auto">
                    <a href="#flavors" className="relative inline-block group bg-[#64ff00] text-black text-lg md:text-xl font-bold px-6 py-2 md:px-8 md:py-3 hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(100,255,0,0.8)]"
                        style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
                        <span className="font-[Orbitron] tracking-widest uppercase">Get Charged</span>
                    </a>
                </div>
            </div>

        </div>
    );
};

export default Hero;
