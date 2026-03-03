import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trainingTips } from '../data/knowledgeBase.js';

const WisdomTooltip = ({ show = false, onClose }) => {
  const [currentTip, setCurrentTip] = useState('');

  useEffect(() => {
    if (show) {
      const randomIndex = Math.floor(Math.random() * trainingTips.length);
      setCurrentTip(trainingTips[randomIndex]);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-md"
        >
          <div className="bg-gradient-to-r from-kengan-gold/20 to-purple-900/30 border border-kengan-gold/50 rounded-xl p-4 shadow-2xl backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div className="flex-1">
                <h4 className="text-kengan-gold font-bold text-sm uppercase tracking-wider mb-1">
                  Sabiduría del Guerrero
                </h4>
                <p className="text-gray-300 text-sm italic leading-relaxed">
                  "{currentTip}"
                </p>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const useWisdom = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipKey, setTooltipKey] = useState(0);

  const showWisdom = () => {
    setTooltipKey(prev => prev + 1);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 5000);
  };

  const hideWisdom = () => setShowTooltip(false);

  return {
    showTooltip,
    tooltipKey,
    showWisdom,
    hideWisdom,
    WisdomTooltip: () => (
      <WisdomTooltip 
        key={tooltipKey}
        show={showTooltip} 
        onClose={hideWisdom} 
      />
    )
  };
};

export default WisdomTooltip;
