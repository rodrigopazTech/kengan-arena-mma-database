import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-kengan-dark/90 backdrop-blur-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-black italic tracking-tighter text-white">
              KENGAN<span className="text-kengan-gold">ARENA</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`relative px-6 py-2 text-sm font-black tracking-widest uppercase transition-all duration-300 ${
                isActive('/') 
                  ? 'text-kengan-gold' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Arena
              {isActive('/') && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-kengan-gold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </Link>

            <Link
              to="/workouts"
              className={`relative px-6 py-2 text-sm font-black tracking-widest uppercase transition-all duration-300 ${
                isActive('/workouts') 
                  ? 'text-kengan-gold' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Workouts
              {isActive('/workouts') && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-kengan-gold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </Link>
          </div>

          {/* Underground indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-kengan-red rounded-full animate-pulse"></div>
            <span className="text-gray-600 font-bold tracking-wider uppercase">
              Underground Access
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;