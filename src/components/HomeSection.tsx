import React from 'react';
import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';
import { useState } from 'react';

// ...existing HomeSection code...

export function HomeSection() {
  // Removed resume popup logic
  const [showPortfolioPopup, setShowPortfolioPopup] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto w-full">
        {/* Animated Title */}
        <motion.div className="mb-12">
          <h1 className="flex items-center justify-center flex-wrap gap-2 sm:gap-4 md:gap-6 lg:gap-8 text-4xl sm:text-5xl md:text-8xl lg:text-9xl xl:text-[10rem] font-extrabold font-['Montserrat',sans-serif] mb-4 text-center leading-tight">
            <span className="text-white font-['IM_Fell_English',serif] font-bold whitespace-nowrap">DESIGN</span>
            <span className="text-white font-['IM_Fell_English',serif] font-bold mx-1 sm:mx-2 md:mx-4 lg:mx-6 whitespace-nowrap">x</span>
            <span className="font-['IM_Fell_English',serif] font-bold whitespace-nowrap" style={{ color: '#FF0000' }}>STYLE</span>
          </h1>
          {/* Portfolio text below the title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl sm:text-3xl text-white/70 mt-2"
          >
            SAHITHI'S PORTFOLIO
          </motion.p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-6 justify-center flex-wrap"
        >
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,255,255,0.3)' }}
            whileTap={{ scale: 0.95 }}
            href="/sahithi%20resume%20.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-black rounded-full flex items-center gap-3 transition-all cursor-pointer"
          >
            <Briefcase size={25} />
            Resume
          </motion.a>

        </motion.div>
      </div>

      {/* Resume Popup removed. Resume button now opens PDF in new tab. */}

      {/* Portfolio Popup */}
      {showPortfolioPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowPortfolioPopup(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-3xl mb-4">Portfolio</h3>
            <p className="text-white/70 mb-6">
              View my complete portfolio showcasing my best fashion designs and creative projects.
            </p>
            <div className="flex gap-4">
              <a
                href="/MY%20PERSONAL%20REUME%20.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-colors text-center"
              >
                View Portfolio
              </a>
              <button
                onClick={() => setShowPortfolioPopup(false)}
                className="px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
}
