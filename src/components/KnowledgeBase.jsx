import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { knowledgeArticles, getRandomTip } from '../data/knowledgeBase.js';

const categories = [
  { id: 'all', label: 'Todos', icon: '📚' },
  { id: 'lore', label: 'Filosofía', icon: '⚔️' },
  { id: 'technique', label: 'Técnica', icon: '⚡' },
  { id: 'science', label: 'Ciencia', icon: '🧬' },
  { id: 'training', label: 'Entrenamiento', icon: '🏋️' }
];

const KnowledgeBase = ({ compact = false }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [dailyTip, setDailyTip] = useState(getRandomTip());

  const filteredArticles = selectedCategory === 'all' 
    ? Object.values(knowledgeArticles)
    : Object.values(knowledgeArticles).filter(a => a.category === selectedCategory);

  const refreshTip = () => setDailyTip(getRandomTip());

  if (compact) {
    return (
      <div className="bg-kengan-card border border-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-kengan-gold uppercase tracking-wider">💡 Tip del Día</h3>
          <button onClick={refreshTip} className="text-gray-500 hover:text-white text-xs">🔄</button>
        </div>
        <p className="text-gray-300 text-sm italic">{dailyTip}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con Tip */}
      <div className="bg-gradient-to-r from-kengan-gold/20 to-transparent border border-kengan-gold/30 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-black text-kengan-gold uppercase tracking-wider">💡 Tip de Hoy</h3>
          <button onClick={refreshTip} className="text-gray-500 hover:text-white text-xs px-2 py-1 bg-gray-800 rounded">🔄 Nuevo</button>
        </div>
        <p className="text-gray-300 italic">"{dailyTip}"</p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              selectedCategory === cat.id 
                ? 'bg-kengan-gold text-black' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArticles.map(article => (
          <motion.button
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-kengan-card border border-gray-700 hover:border-kengan-gold/50 rounded-xl p-5 text-left transition-all"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{article.icon}</span>
              <div>
                <h4 className="text-white font-bold">{article.title}</h4>
                <span className="text-xs text-gray-500 uppercase">{article.category}</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-kengan-card border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedArticle.icon}</span>
                  <div>
                    <h3 className="text-xl font-black text-white">{selectedArticle.title}</h3>
                    <span className="text-xs text-gray-500 uppercase">{selectedArticle.category}</span>
                  </div>
                </div>
              </div>
              <div className="p-6 text-gray-300 text-sm leading-relaxed space-y-4">
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-xl font-black text-kengan-gold mb-3 mt-4" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-lg font-bold text-white mb-2 mt-3" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-base font-bold text-gray-300 mb-1 mt-2" {...props} />,
                    p: ({node, ...props}) => <p className="mb-2 text-gray-400" {...props} />,
                    strong: ({node, ...props}) => <strong className="text-kengan-gold font-bold" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1 text-gray-400" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-5 space-y-1 text-gray-400" {...props} />,
                    li: ({node, ...props}) => <li className="text-gray-400" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-kengan-gold pl-4 italic text-gray-400" {...props} />,
                    hr: ({node, ...props}) => <hr className="border-gray-700 my-4" {...props} />,
                  }}
                >
                  {selectedArticle.content}
                </ReactMarkdown>
              </div>
              <div className="p-4 border-t border-gray-800">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KnowledgeBase;
