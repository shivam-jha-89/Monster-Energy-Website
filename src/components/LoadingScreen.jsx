import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = () => {
    const { progress, active } = useProgress();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (progress === 100) {
            // Keep the loading screen visible for a moment even after loading is done for smoothness
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [progress]);

    return (
        <AnimatePresence>
            {(active || isVisible) && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                >
                    {/* Brand Logo / Text */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1
                            style={{ fontFamily: '"Energy Storm", sans-serif' }}
                            className="text-[#64ff00] text-6xl md:text-8xl tracking-wider drop-shadow-[0_0_25px_rgba(100,255,0,0.6)]"
                        >
                            MONSTER
                        </h1>
                        <h2
                            style={{ fontFamily: '"Energy Storm", sans-serif' }}
                            className="text-white text-4xl md:text-6xl tracking-widest uppercase mt-2 opacity-90"
                        >
                            ENERGY
                        </h2>
                    </motion.div>

                    {/* Progress Bar Container */}
                    <div className="w-[80%] max-w-[400px] h-2 bg-gray-900 rounded-full mt-10 overflow-hidden border border-white/10 relative">
                        {/* Progress Fill */}
                        <motion.div
                            className="h-full bg-[#64ff00] shadow-[0_0_15px_#64ff00]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear" }}
                        />
                    </div>

                    {/* Percentage Text */}
                    <div className="mt-4 flex flex-col items-center">
                        <span className="text-[#64ff00] font-[Bitcount] text-2xl tracking-widest">
                            {progress.toFixed(0)}%
                        </span>
                        <p className="text-white/60 font-[Orbitron] text-sm mt-2 tracking-wider animate-pulse">
                            UNLEASHING THE BEAST...
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
