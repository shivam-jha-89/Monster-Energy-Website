import { useState, Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useTexture, Center, Float } from "@react-three/drei";
import MonsterCan from "./MonsterCan";
import gsap from "gsap";
import WavyCircles from "./WavyCircles";
import { FLAVORS } from "../data/flavors";
import useMobile from "../hooks/useMobile";

const FlavorCan = ({ texturePath, isSpinning, isMobile }) => {
    const texture = useTexture(texturePath);
    texture.flipY = false;

    const canRef = useRef();

    useEffect(() => {
        if (isSpinning) {
            if (isMobile) {
                // Mobile: No rotation, just let the texture swap happen via state
            } else {
                // Desktop: Spin fast: 2 full rotations (4PI) in 0.5s
                gsap.to(canRef.current.rotation, {
                    y: canRef.current.rotation.y + Math.PI * 4,
                    duration: 0.5,
                    ease: "power2.inOut"
                });
            }
        }
    }, [isSpinning, isMobile]);

    return (
        <Float speed={2} rotationIntensity={0} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
            <group ref={canRef} rotation={[0, -Math.PI / 3.5, 0]}>
                <Center>
                    <MonsterCan itemMap={texture} scale={2.2} />
                </Center>
            </group>
        </Float>
    );
};

const FlavorSection = () => {
    const isMobile = useMobile();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);

    const currentFlavor = FLAVORS[currentIndex];

    const handleNext = () => {
        if (isSpinning) return;
        setIsSpinning(true);

        // Change flavor halfway through the spin for "hidden" effect
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % FLAVORS.length);
        }, 250);

        // Reset spinning state after animation
        setTimeout(() => {
            setIsSpinning(false);
        }, 500);
    };

    const handlePrev = () => {
        if (isSpinning) return;
        setIsSpinning(true);

        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + FLAVORS.length) % FLAVORS.length);
        }, 250);

        setTimeout(() => {
            setIsSpinning(false);
        }, 500);
    };

    return (
        <div id="flavors" className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center transition-colors duration-1000 ease-in-out"
            style={{
                background: `linear-gradient(135deg, ${currentFlavor.bgFrom}, ${currentFlavor.bgTo})`
            }}
        >
            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-overlay"
                style={{
                    backgroundImage: `url("/texture.png")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            ></div>

            <WavyCircles color={currentFlavor.color} />

            {/* Header */}
            <h2 className="absolute top-10 text-white text-4xl md:text-7xl font-accent font-bold tracking-widest drop-shadow-md z-20 opacity-90">
                Choose Your Beast
            </h2>

            {/* 3D Scene */}
            <div className="relative w-full h-[75vh] z-10 flex items-center justify-center">
                {/* Navigation Arrows */}
                <button onClick={handlePrev} className="absolute left-[10%] md:left-[20%] z-20 text-white hover:scale-110 transition-transform p-2 border-2 border-white/50 rounded-full bg-black/20 backdrop-blur-sm cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <button onClick={handleNext} className="absolute right-[10%] md:right-[20%] z-20 text-white hover:scale-110 transition-transform p-2 border-2 border-white/50 rounded-full bg-black/20 backdrop-blur-sm cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>

                <Canvas camera={{ position: [0, 0, 4], fov: 55 }} gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}>
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.8} />
                        <spotLight position={[10, 10, 10]} intensity={1} />
                        <spotLight position={[-10, 5, 10]} intensity={2} color={currentFlavor.color} />
                        <Environment preset="studio" blur={0.5} />
                        {/* Scale is handled in FlavorCan, adjusted camera to fit */}
                        <group position={[0, 0, 0]}>
                            <FlavorCan texturePath={currentFlavor.texture} isSpinning={isSpinning} isMobile={isMobile} />
                        </group>
                    </Suspense>
                </Canvas>
            </div>

            {/* Footer / Info */}
            <div className="absolute bottom-20 flex flex-col items-center text-center z-20 text-white">
                <h3 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg" style={{ color: currentFlavor.accent }}>
                    {currentFlavor.name}
                </h3>
                <p className="text-lg opacity-80 backdrop-blur-sm bg-black/10 px-4 py-1 rounded-full">
                    {currentFlavor.description} - <span>{currentFlavor.price}</span>
                </p>
            </div>

            {/* Styles for animations */}
            <style>{`
                @keyframes spin-slow {
                    0% { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
                 @keyframes spin-slow-reverse {
                    0% { transform: translate(50%, -50%) rotate(0deg); }
                    100% { transform: translate(50%, -50%) rotate(-360deg); }
                }
            `}</style>
        </div>
    );
};

// Preload all textures
FLAVORS.forEach(flavor => {
    useTexture.preload(flavor.texture);
});

export default FlavorSection;
