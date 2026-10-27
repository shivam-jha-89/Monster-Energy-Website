import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, BatteryCharging, Snowflake, Gauge, Crosshair, Activity } from 'lucide-react';

const FuelSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const leftSpecs = [
        { icon: Zap, label: "160mg", sub: "CAFFEINE" },
        { icon: BatteryCharging, label: "UNLEASH", sub: "THE BEAST" },
        { icon: Snowflake, label: "ICE COLD", sub: "CRISP TASTE" }
    ];

    const rightSpecs = [
        { icon: Gauge, label: "MAXIMUM", sub: "PERFORMANCE" },
        { icon: Crosshair, label: "LASER", sub: "FOCUS" },
        { icon: Activity, label: "HIGH", sub: "IMPACT" }
    ];

    return (
        <section
            id="fuel"
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-black"
        >
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 h-full w-full object-cover scale-105"
            >
                <source src="/monsterad.mp4" type="video/mp4" />
            </video>

            {/* Dark Overlay with Gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/70" />

            {/* Content */}
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center px-4">

                {/* Main Headline */}
                <motion.h2
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="font-black text-5xl md:text-8xl lg:text-9xl text-white tracking-tight scale-210"
                    style={{
                        fontFamily: "var(--font-accent)",
                        textShadow: "0 0 20px rgba(57, 255, 20, 0.6), 0 0 40px rgba(57, 255, 20, 0.3)"
                    }}
                >
                    FUEL YOUR GRIND
                </motion.h2>

                {/* Subtext */}
                <motion.p
                    className="absolute bottom-24 md:bottom-20 text-white text-xl md:text-2xl font-light tracking-[0.3em] uppercase opacity-90 w-full"
                    animate={{
                        opacity: [0.8, 1, 0.8],
                        scale: [1, 1.05, 1],
                        textShadow: [
                            "0 0 0px rgba(255,255,255,0)",
                            "0 0 20px rgba(57, 255, 20, 0.8)",
                            "0 0 0px rgba(255,255,255,0)"
                        ]
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                >
                    No limits. No holding back.
                </motion.p>
            </div>

            {/* HUD Elements */}
            <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between py-10 md:py-0 md:justify-center">

                {/* Left Side - The Fuel - HIDDEN ON MOBILE to prevent overlap */}
                <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-12 hidden md:flex flex-col gap-8 items-start border-l-2 border-(--monster-green) pl-6 py-8 backdrop-blur-[2px] bg-black/10">
                    {leftSpecs.map((spec, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + (i * 0.1), duration: 0.5, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 group"
                        >
                            <spec.icon className="w-8 h-8 text-(--monster-green) drop-shadow-[0_0_8px_rgba(100,255,0,0.8)]" />
                            <div className="flex flex-col items-start">
                                <span className="text-(--monster-green) font-mono text-[10px] tracking-widest opacity-80 mb-0.5">SYS.DAT.0{i + 1}</span>
                                <div className="flex flex-col leading-none">
                                    <span className="text-white font-(--font-tech) text-2xl tracking-tighter">{spec.label}</span>
                                    <span className="text-white/80 font-light text-sm tracking-[0.2em]">{spec.sub}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Right Side - The Impact - HIDDEN ON MOBILE to prevent overlap */}
                <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 hidden md:flex flex-col gap-8 items-end border-r-2 border-(--monster-green) pr-6 py-8 backdrop-blur-[2px] bg-black/10">
                    {rightSpecs.map((spec, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + (i * 0.1), duration: 0.5, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 flex-row-reverse text-right group"
                        >
                            <spec.icon className="w-8 h-8 text-(--monster-green) drop-shadow-[0_0_8px_rgba(100,255,0,0.8)]" />
                            <div className="flex flex-col items-end">
                                <span className="text-(--monster-green) font-mono text-[10px] tracking-widest opacity-80 mb-0.5">SYS.MET.0{i + 1}</span>
                                <div className="flex flex-col leading-none">
                                    <span className="text-white font-(--font-tech) text-2xl tracking-tighter">{spec.label}</span>
                                    <span className="text-white/80 font-light text-sm tracking-[0.2em]">{spec.sub}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile View - Bottom Stack */}
                <div className="absolute bottom-8 w-full md:hidden">
                    <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px py-4 w-full justify-start no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {[...leftSpecs, ...rightSpecs].map((item, i) => (
                            <div key={i} className="shrink-0 snap-center flex items-center gap-2 bg-black/80 border border-(--monster-green) px-4 py-2 rounded-full backdrop-blur-md shadow-lg shadow-black/50">
                                <item.icon className="w-4 h-4 text-(--monster-green)" />
                                <span className="text-white font-bold text-xs tracking-wider">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FuelSection;
