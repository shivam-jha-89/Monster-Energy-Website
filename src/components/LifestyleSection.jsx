import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Cloud, Stars } from "@react-three/drei";
import * as THREE from "three";
import Monolith from "./Monolith";

const cultures = [
    {
        id: "gaming",
        title: "GAMING",
        quote: "No sleep. Pure focus.",
        image: "/lifestyle/gaming.png",
    },
    {
        id: "fitness",
        title: "FITNESS",
        quote: "Push past limits.",
        image: "/lifestyle/fitness.png",
    },
    {
        id: "music",
        title: "MUSIC",
        quote: "Late nights. Loud ideas.",
        image: "/lifestyle/music.png",
    },
    {
        id: "motorsport",
        title: "MOTORSPORT",
        quote: "Speed. Control. Adrenaline.",
        image: "/lifestyle/motorsport.png",
    },
];

const LifestyleScene = () => {
    const groupRef = useRef();

    useFrame((state) => {
        // Subtle ambient rotation for the whole group based on mouse
        if (groupRef.current) {
            const x = state.pointer.x * 0.2;
            const y = state.pointer.y * 0.1;
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x, 0.05);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y, 0.05);
        }
    });

    return (
        <group ref={groupRef}>
            {cultures.map((c, i) => {
                // Arrange in a slight arc
                const angle = (i - 1.5) * 0.5; // -0.75, -0.25, 0.25, 0.75
                const x = Math.sin(angle) * 8.0; // Maximize width
                const z = Math.cos(angle) * -1.5 + 0.5; // Flatter arc

                return (
                    <Monolith
                        key={c.id}
                        textureUrl={c.image}
                        title={c.title}
                        quote={c.quote}
                        position={[x, 0, z]}
                        rotation={[0, -angle, 0]} // Face center
                    />
                );
            })}
        </group>
    );
};

const LifestyleSection = () => {
    return (
        <section id="lifestyle" className="relative w-full h-screen bg-black overflow-hidden">

            {/* HTML Header Layer */}
            <div className="absolute top-10 w-full text-center z-10 pointer-events-none">
                <h2 className="text-5xl md:text-8xl font-[Energy_Storm] text-white uppercase tracking-tight mb-4 drop-shadow-[0_0_15px_rgba(100,255,0,0.3)]">
                    Fueling The <span className="text-[#64ff00] text-shadow-neon">Obsessed</span>
                </h2>
            </div>

            {/* 3D Scene - Desktop Only */}
            <div className="hidden md:block w-full h-full absolute inset-0">
                <Canvas camera={{ position: [0, 0, 9.5], fov: 45 }}>
                    <Suspense fallback={null}>
                        <color attach="background" args={["#050505"]} />

                        {/* Cinematic Lighting */}
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} color="#64ff00" />
                        <pointLight position={[-10, -5, -10]} intensity={1} color="blue" />

                        {/* Environment */}
                        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                        <Cloud position={[0, -5, -10]} opacity={0.5} speed={0.4} width={20} depth={5} segments={20} color="#050505" />
                        <fog attach="fog" args={['#050505', 5, 20]} />

                        <LifestyleScene />

                        <Environment preset="night" blur={0.8} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Mobile Layout - Simple Cards */}
            <div className="md:hidden relative z-20 w-full h-full overflow-y-auto px-4 pb-20 pt-32 flex flex-col gap-6">
                {cultures.map((c) => (
                    <div key={c.id} className="relative w-full h-64 rounded-lg overflow-hidden border border-white/10 shadow-lg group">
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                            style={{ backgroundImage: `url(${c.image})` }}
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-90" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 p-6 w-full">
                            <h3 className="text-3xl font-[Energy_Storm] text-white uppercase tracking-wider mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                {c.title}
                            </h3>
                            <p className="text-[#64ff00] font-[Orbitron] text-xs tracking-widest uppercase border-l-2 border-[#64ff00] pl-3">
                                {c.quote}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Scroll indicator or overlay */}
            <div className="absolute bottom-0 w-full h-32 bg-linear-to-t from-black to-transparent z-10 pointer-events-none" />
        </section>
    );
};

export default LifestyleSection;
