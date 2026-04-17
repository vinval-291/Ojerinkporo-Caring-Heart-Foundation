import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { 
    name: 'Events', 
    path: '/events',
    subLinks: [
      { name: 'All Events', path: '/events' },
      { name: 'Grant Program', path: '/events/grant' },
    ]
  },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Visionary', path: '/visionary' },
  { name: 'Contact Us', path: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileExpanded, setMobileExpanded] = React.useState<string | null>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isHome 
          ? (isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4") 
          : "sticky bg-white border-b border-gray-100 py-2"
      )}
    >
      <div className="container-max flex items-center justify-between h-16 px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="https://i.postimg.cc/FK8yvgj9/ochf-logo.png" 
            alt="OCHF Logo" 
            className={cn(
              "h-10 w-auto object-contain transition-all",
              isHome && !isScrolled ? "brightness-0 invert" : ""
            )}
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.path} className="relative group/nav">
              {link.subLinks ? (
                <div className="flex items-center gap-1 cursor-pointer">
                  <Link
                    to={link.path}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-brand-accent",
                      isHome && !isScrolled 
                        ? "text-white/90 hover:text-white" 
                        : (location.pathname.startsWith(link.path) ? "text-brand-royal" : "text-brand-text-dark")
                    )}
                  >
                    {link.name}
                  </Link>
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform group-hover/nav:rotate-180",
                    isHome && !isScrolled ? "text-white/50" : "text-gray-400"
                  )} />
                </div>
              ) : (
                <Link
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-brand-accent",
                    isHome && !isScrolled 
                      ? "text-white/90 hover:text-white" 
                      : (location.pathname === link.path ? "text-brand-royal" : "text-brand-text-dark")
                  )}
                >
                  {link.name}
                </Link>
              )}

              {/* Dropdown */}
              {link.subLinks && (
                <div className="absolute top-full left-0 pt-4 hidden group-hover/nav:block w-56 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2">
                    {link.subLinks.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className={cn(
                          "block px-5 py-3 text-sm transition-colors hover:bg-brand-bg hover:text-brand-accent",
                          location.pathname === sub.path ? "text-brand-royal bg-brand-bg font-bold" : "text-brand-text-dark"
                        )}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link
            to="/donate"
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md",
              isHome && !isScrolled
                ? "bg-white text-brand-navy hover:bg-gray-100"
                : "bg-brand-accent hover:bg-brand-accent/90 text-white"
            )}
          >
            Donate Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={cn(
            "md:hidden transition-colors",
            isHome && !isScrolled ? "text-white" : "text-brand-navy"
          )} 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-gray-100 px-6 py-8 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <div key={link.path} className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-bold",
                    location.pathname === link.path ? "text-brand-royal" : "text-brand-text-dark"
                  )}
                >
                  {link.name}
                </Link>
                {link.subLinks && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileExpanded(mobileExpanded === link.name ? null : link.name);
                    }}
                    className="p-1.5 hover:bg-brand-bg rounded-lg transition-colors"
                  >
                    <ChevronDown className={cn(
                      "w-5 h-5 transition-transform",
                      mobileExpanded === link.name ? "rotate-180" : ""
                    )} />
                  </button>
                )}
              </div>
              
              {link.subLinks && mobileExpanded === link.name && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex flex-col gap-4 pl-6 border-l-2 border-brand-bg overflow-hidden"
                >
                  {link.subLinks.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-base font-medium py-1",
                        location.pathname === sub.path ? "text-brand-royal" : "text-brand-text-light"
                      )}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
          <Link
            to="/donate"
            onClick={() => setIsOpen(false)}
            className="bg-brand-accent text-white px-6 py-3 rounded-xl text-center font-bold"
          >
            Donate Now
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
