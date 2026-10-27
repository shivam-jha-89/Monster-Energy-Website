import React from 'react';
import { ArrowRight, Instagram, Youtube, Twitter } from 'lucide-react';

const Box = ({ children, className = '' }) => (
    <div className={`p-6 border border-white/10 bg-black/50 backdrop-blur-sm ${className}`}>
        {children}
    </div>
);

export default function PromotionsSection() {
    return (
        <section id="promotions" className="bg-black text-white min-h-screen relative overflow-hidden font-sans selection:bg-[#00ff00] selection:text-black">
            {/* 1. HERO SECTION */}
            <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                {/* Background - To be replaced with generated image or gradient */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/60 to-black z-10" />
                    {/* Placeholder for Hero Image */}
                    <div className="w-full h-full bg-[#111] bg-[url('/promo_hero_bg.png')] bg-cover bg-center animate-pulse-slow relative">
                        <div className="absolute inset-0 backdrop-blur-[2px]" />
                    </div>
                </div>

                <div className="relative z-20 text-center px-4 max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-8xl font-black italic tracking-tighter mb-6">
                        NO LIMITS. <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00ff00] to-white">
                            NO HOLDING BACK.
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl font-bold uppercase tracking-widest text-[#00ff00] animate-pulse">
                        Upcoming Events & Drops
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 md:py-24 space-y-16 md:space-y-32">
                {/* 2. FEATURED CAMPAIGN */}
                <div className="relative group cursor-pointer">
                    <div className="absolute -inset-1 bg-linear-to-r from-[#00ff00] to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative aspect-video md:aspect-21/9 bg-zinc-900 rounded-lg overflow-hidden border border-white/10">
                        {/* Image Placeholder */}
                        <div className="absolute inset-0 bg-[url('/featured_gaming_subway.png')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"></div>

                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-6 md:p-12">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h2 className="text-3xl md:text-6xl font-black italic uppercase mb-2 md:mb-4 text-white">
                                    Cyber Series <span className="text-[#00ff00]">2025</span>
                                </h2>
                                <p className="text-gray-300 text-sm md:text-xl max-w-2xl mb-6 md:mb-8 font-medium">
                                    The biggest underground gaming tournament is back. 48 hours. Non-stop action. Ultimate glory.
                                </p>
                                <button className="bg-[#00ff00] text-black font-black uppercase px-6 py-3 md:px-8 md:py-4 text-base md:text-lg hover:bg-white transition-colors duration-300 flex items-center gap-2 skew-x-[-10deg]">
                                    <span className="skew-x-10">Join the Arena</span>
                                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 skew-x-10" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. CAMPAIGN GRID */}
                <div>
                    <div className="flex items-center justify-between mb-8 md:mb-12">
                        <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter">
                            Latest Drops & Events
                        </h3>
                        <div className="h-[2px] grow ml-8 bg-[#333]"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Gaming Nights", tag: "Community", img: "/grid_dj_crowd.png", color: "from-purple-600 to-blue-600" },
                            { title: "Fuel The Grind", tag: "Tour", img: "/grid_moto_jump1.png", color: "from-orange-600 to-red-600" },
                            { title: "Ultra Paradise", tag: "Drop", img: "/grid_skate.png", color: "from-[#00ff00] to-emerald-600" },
                        ].map((item, i) => (
                            <div key={i} className="group relative aspect-4/5 overflow-hidden rounded-lg cursor-pointer border border-white/10 hover:border-[#00ff00]/50 transition-colors duration-300">
                                <div className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100`} style={{ backgroundImage: `url(${item.img})` }}></div>
                                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-90"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="inline-block px-3 py-1 bg-[#00ff00] text-black text-xs font-bold uppercase mb-3">
                                        {item.tag}
                                    </span>
                                    <h4 className="text-3xl font-black italic uppercase leading-none group-hover:text-[#00ff00] transition-colors">
                                        {item.title}
                                    </h4>
                                    <div className="h-[2px] w-0 group-hover:w-full bg-[#00ff00] mt-4 transition-all duration-500"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. COMMUNITY CTA */}
                <div className="text-center py-12 md:py-20 border-t border-white/10">
                    <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter mb-4">
                        WANT IN?
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 font-medium uppercase tracking-widest mb-8 md:mb-12">
                        Follow the chaos. Join the movement.
                    </p>

                    <div className="flex justify-center gap-6">
                        {[
                            { icon: Instagram, label: "Instagram" },
                            { icon: Youtube, label: "YouTube" },
                            { icon: Twitter, label: "X" },
                        ].map((Social, idx) => (
                            <button key={idx} className="p-4 border border-white/20 rounded-full hover:bg-[#00ff00] hover:border-[#00ff00] hover:text-black transition-all duration-300 group">
                                <Social.icon className="w-8 h-8" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
