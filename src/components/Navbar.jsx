const Navbar = () => {
    return (
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-6 z-50">
            <div className="flex items-center">
                <img src="/logo.png" alt="Monster Energy Logo" className="h-12 md:h-16 object-contain" />
            </div>

            {/* Navigation Links (Desktop) */}
            <div className="hidden md:flex gap-8">
                {[
                    { name: 'Fuel', link: '#fuel' },
                    { name: 'Lifestyle', link: '#lifestyle' },
                    { name: 'Flavors', link: '#flavors' },
                    { name: 'Promotions', link: '#promotions' }
                ].map((item) => (
                    <a
                        key={item.name}
                        href={item.link}
                        className="text-white font-bold uppercase tracking-wider hover:text-green-500 transition-colors font-tech text-sm"
                    >
                        {item.name}
                    </a>
                ))}
            </div>


        </nav>
    );
};

export default Navbar;
