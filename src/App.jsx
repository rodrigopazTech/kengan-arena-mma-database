import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fighters = [
  {
    id: 1,
    name: "Ohma Tokita",
    title: "The Ashura",
    style: "Niko Style",
    specialty: "All-rounder",
    stats: { striking: 90, grappling: 85, power: 88, speed: 92, endurance: 95 },
    techniques: ["Demonsbane", "Advance", "Ironbreaker"],
    color: "from-red-900 to-black",
    record: "72 Wins, 2 Losses"
  },
  {
    id: 2,
    name: "Gaolang Wongsawat",
    title: "Thai God of War",
    style: "Boxing / Muay Thai",
    specialty: "Striker",
    stats: { striking: 99, grappling: 40, power: 85, speed: 98, endurance: 88 },
    techniques: ["Flash", "God Glow", "Muay Thai Medley"],
    color: "from-blue-900 to-black",
    record: "30 Wins, 1 Loss"
  },
  {
    id: 3,
    name: "Cosmo Imai",
    title: "The King of Stranglers",
    style: "BJJ",
    specialty: "Grappler",
    stats: { striking: 70, grappling: 98, power: 65, speed: 94, endurance: 85 },
    techniques: ["The Zone", "Triangle Choke", "Python Hold"],
    color: "from-yellow-900 to-black",
    record: "24 Wins, 1 Loss"
  },
  {
    id: 4,
    name: "Agito Kanoh",
    title: "The Fifth Fang of Metsudo",
    style: "Formless / MMA",
    specialty: "Adaptable",
    stats: { striking: 95, grappling: 95, power: 94, speed: 90, endurance: 96 },
    techniques: ["Dragon Shot", "Evolution", "Formless Soul"],
    color: "from-purple-900 to-black",
    record: "158 Wins, 1 Loss"
  },
  {
    id: 5,
    name: "Takeshi Wakatsuki",
    title: "The Wild Tiger",
    style: "Full Contact Karate",
    specialty: "Striker",
    stats: { striking: 88, grappling: 75, power: 100, speed: 82, endurance: 99 },
    techniques: ["Blast Core", "Low Kick", "Grappling (Amateur)"],
    color: "from-orange-900 to-black",
    record: "306 Wins, 3 Losses"
  },
  {
    id: 6,
    name: "Raian Kure",
    title: "The Devil",
    style: "Kure Clan Techniques",
    specialty: "All-rounder",
    stats: { striking: 92, grappling: 88, power: 96, speed: 94, endurance: 98 },
    techniques: ["Removal", "Lions Bite", "Hard Slam"],
    color: "from-pink-900 to-black",
    record: "Unlisted"
  },
  {
    id: 7,
    name: "Julius Reinhold",
    title: "The Monster",
    style: "Pure Overwhelming Power",
    specialty: "Striker",
    stats: { striking: 80, grappling: 60, power: 100, speed: 75, endurance: 100 },
    techniques: ["Gott-töter Steinbohrer", "Muscle Control"],
    color: "from-slate-800 to-black",
    record: "51 Wins, 1 Loss"
  },
  {
    id: 8,
    name: "Kuroki Gensai",
    title: "The Devil Lance",
    style: "Kaiwan Style",
    specialty: "Striker",
    stats: { striking: 100, grappling: 80, power: 92, speed: 88, endurance: 100 },
    techniques: ["Devil Lance", "Pre-initiative", "Sanchin"],
    color: "from-emerald-900 to-black",
    record: "Undefeated"
  },
  {
    id: 9,
    name: "Kiryu Setsuna",
    title: "The Beautiful Beast",
    style: "Koei Style",
    specialty: "All-rounder",
    stats: { striking: 88, grappling: 85, power: 80, speed: 99, endurance: 85 },
    techniques: ["Rakshasa's Palm", "Blink", "Fallen Demon"],
    color: "from-indigo-900 to-black",
    record: "Unlisted"
  }
];

const StatBar = ({ label, value, comparisonValue }) => (
  <div className="mb-2">
    <div className="flex justify-between text-[10px] mb-1">
      <span className="uppercase text-gray-400 font-bold tracking-widest">{label}</span>
      <span className="text-kengan-gold font-black">{value}%</span>
    </div>
    <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden border border-gray-700 relative">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-kengan-gold h-full absolute left-0 top-0 z-10" 
      />
      {comparisonValue !== undefined && (
        <div 
          className="bg-red-600/30 h-full absolute left-0 top-0 z-0" 
          style={{ width: `${comparisonValue}%` }}
        />
      )}
    </div>
  </div>
);

const FighterCard = ({ fighter, onSelect, isSelected }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ y: -5 }}
    className={`relative group bg-gradient-to-br ${fighter.color} p-0.5 rounded-lg overflow-hidden transition-all duration-500 kengan-glow h-full ${isSelected ? 'ring-2 ring-kengan-gold shadow-[0_0_30px_rgba(212,175,55,0.4)]' : ''}`}
  >
    <div className="bg-kengan-card p-6 rounded-lg h-full flex flex-col justify-between">
      <div>
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <span className="text-kengan-gold text-[10px] uppercase tracking-[0.2em] font-black block mb-2 opacity-80">
              {fighter.style}
            </span>
            <span className="text-gray-600 text-[9px] font-bold uppercase tracking-widest">
              {fighter.record}
            </span>
          </div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-tight text-white mb-1">
            {fighter.name}
          </h2>
          <p className="text-red-600 text-[11px] italic font-black uppercase tracking-widest">
            "{fighter.title}"
          </p>
        </div>

        <div className="space-y-3 mb-8">
          <StatBar label="Striking" value={fighter.stats.striking} />
          <StatBar label="Grappling" value={fighter.stats.grappling} />
          <StatBar label="Power" value={fighter.stats.power} />
          <StatBar label="Speed" value={fighter.stats.speed} />
          <StatBar label="Endurance" value={fighter.stats.endurance} />
        </div>
      </div>

      <div>
        <h3 className="text-[10px] font-black text-gray-500 mb-3 uppercase tracking-[0.2em]">Secret Techniques</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {fighter.techniques.map(t => (
            <span key={t} className="bg-black/40 text-white text-[9px] px-3 py-1.5 rounded-sm border border-gray-800 font-bold uppercase tracking-tighter hover:border-kengan-gold hover:text-kengan-gold transition-all duration-300">
              {t}
            </span>
          ))}
        </div>
        
        <button 
          onClick={() => onSelect(fighter)}
          className={`w-full py-2 text-[10px] font-black tracking-widest border transition-all duration-300 ${
            isSelected 
              ? 'bg-kengan-gold text-black border-kengan-gold' 
              : 'border-gray-800 text-gray-500 hover:border-kengan-gold hover:text-white'
          }`}
        >
          {isSelected ? 'SELECTED' : 'SELECT FOR VS'}
        </button>
      </div>
    </div>
    
    <div className="absolute bottom-16 right-4 opacity-5 pointer-events-none">
      <div className="text-6xl font-black italic">#{fighter.id}</div>
    </div>
  </motion.div>
);

const ComparisonOverlay = ({ selectedFighters, onClose }) => {
  if (selectedFighters.length !== 2) return null;
  const [f1, f2] = selectedFighters;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 overflow-y-auto"
    >
      <div className="max-w-6xl w-full bg-kengan-dark border border-gray-800 rounded-2xl overflow-hidden shadow-2xl relative my-auto">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white z-10 p-2 bg-black/50 rounded-full"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-16 relative">
          {/* Background Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="text-[20rem] font-black italic text-red-600/5 tracking-tighter select-none uppercase">VS</div>
          </div>

          {/* Fighter 1 */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-right z-10"
          >
            <h3 className="text-kengan-gold text-xs font-black uppercase tracking-widest mb-2 opacity-60">{f1.style}</h3>
            <h2 className="text-4xl md:text-7xl font-black italic uppercase leading-[0.8] mb-4 text-white drop-shadow-2xl">
              {f1.name.split(' ')[0]}<br/>
              <span className="text-red-600">{f1.name.split(' ')[1]}</span>
            </h2>
            <p className="text-gray-500 text-sm italic mb-8 font-bold">"{f1.title}"</p>
            
            <div className="space-y-6 mt-12">
              {Object.entries(f1.stats).map(([key, val]) => (
                <div key={key}>
                  <div className="text-[10px] uppercase font-bold text-gray-500 mb-1">{key}</div>
                  <div className="text-3xl font-black italic text-white flex justify-end items-center gap-2">
                    {val}%
                    <div className={`w-2 h-2 rounded-full ${val >= f2.stats[key] ? 'bg-kengan-gold shadow-[0_0_10px_#d4af37]' : 'bg-gray-800'}`} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Center Column */}
          <div className="flex flex-col items-center justify-center z-10">
            <div className="bg-kengan-red text-white p-6 font-black italic text-5xl transform -rotate-12 border-4 border-white shadow-[0_0_30px_rgba(255,0,0,0.5)] mb-8">VS</div>
            
            <div className="w-full max-w-[200px] aspect-square relative opacity-40">
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-gray-800 fill-none stroke-1">
                <circle cx="50" cy="50" r="45" />
                <circle cx="50" cy="50" r="30" />
                <circle cx="50" cy="50" r="15" />
                <path d="M50 5 L50 95 M5 50 L95 50" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase">Matrix Analytics</div>
            </div>

            <div className="mt-12 text-center">
              <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Likely Outcome</div>
              <div className="text-kengan-gold font-black italic text-xl">DATA INCONCLUSIVE</div>
              <div className="text-[8px] text-gray-800 mt-2 font-bold uppercase">Yamashita Intelligence Unit</div>
            </div>
          </div>

          {/* Fighter 2 */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-left z-10"
          >
            <h3 className="text-kengan-gold text-xs font-black uppercase tracking-widest mb-2 opacity-60">{f2.style}</h3>
            <h2 className="text-4xl md:text-7xl font-black italic uppercase leading-[0.8] mb-4 text-white drop-shadow-2xl">
              {f2.name.split(' ')[0]}<br/>
              <span className="text-red-600">{f2.name.split(' ')[1]}</span>
            </h2>
            <p className="text-gray-500 text-sm italic mb-8 font-bold">"{f2.title}"</p>
            
            <div className="space-y-6 mt-12">
              {Object.entries(f2.stats).map(([key, val]) => (
                <div key={key}>
                  <div className="text-[10px] uppercase font-bold text-gray-500 mb-1">{key}</div>
                  <div className="text-3xl font-black italic text-white flex justify-start items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${val >= f1.stats[key] ? 'bg-kengan-gold shadow-[0_0_10px_#d4af37]' : 'bg-gray-800'}`} />
                    {val}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="bg-gray-900/50 p-6 flex justify-center gap-4 border-t border-gray-800">
          <button 
            onClick={onClose}
            className="px-12 py-4 bg-transparent border-2 border-gray-700 text-gray-400 font-black italic tracking-[0.3em] hover:text-white hover:border-white transition-all"
          >
            BACK TO ROSTER
          </button>
          <button 
            onClick={() => alert("Simulating match...")}
            className="px-12 py-4 bg-kengan-red text-white font-black italic tracking-[0.3em] hover:bg-red-700 transition-all shadow-lg hover:shadow-red-900/50"
          >
            CONFIRM MATCHUP
          </button>
        </div>
      </div>
    </motion.div>
  );
};


export default function App() {
  const [filter, setFilter] = useState('All');
  const [selectedFighters, setSelectedFighters] = useState([]);
  const [isVSMode, setIsVSMode] = useState(false);
  
  const filteredFighters = filter === 'All' 
    ? fighters 
    : fighters.filter(f => f.specialty === filter || (filter === 'All-rounder' && f.specialty === 'Adaptable'));

  const handleSelect = (fighter) => {
    if (selectedFighters.find(f => f.id === fighter.id)) {
      setSelectedFighters(selectedFighters.filter(f => f.id !== fighter.id));
    } else if (selectedFighters.length < 2) {
      setSelectedFighters([...selectedFighters, fighter]);
    }
  };

  return (
    <div className="min-h-screen bg-kengan-dark text-white p-6 md:p-12 selection:bg-kengan-gold selection:text-black">
      <header className="text-center mb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-kengan-red/20 blur-[100px] -z-10"></div>
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-6xl md:text-9xl font-black italic tracking-tighter text-white mb-4 leading-none inline-block border-b-8 border-kengan-gold pb-4"
        >
          KENGAN<span className="text-kengan-gold">ARENA</span>
        </motion.h1>
        <p className="text-gray-400 tracking-[0.5em] uppercase text-xs md:text-sm font-bold mt-4">
          Underground MMA Fighter Skill Matrix
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mt-16">
          {['All', 'Striker', 'Grappler', 'All-rounder'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-8 py-3 text-[11px] font-black tracking-[0.2em] border-2 transition-all duration-300 uppercase ${
                filter === f 
                  ? 'bg-kengan-gold text-black border-kengan-gold scale-105 shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                  : 'text-gray-500 border-gray-900 hover:border-gray-700 hover:text-gray-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      {selectedFighters.length > 0 && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-black/80 backdrop-blur-xl border border-kengan-gold p-4 rounded-full flex items-center gap-6 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          <div className="flex -space-x-4">
            {selectedFighters.map(f => (
              <div key={f.id} className={`w-12 h-12 rounded-full border-2 border-kengan-gold bg-gradient-to-br ${f.color} flex items-center justify-center font-black italic text-xs`}>
                {f.name.charAt(0)}
              </div>
            ))}
            {selectedFighters.length === 1 && (
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-600 font-bold text-xs">
                VS
              </div>
            )}
          </div>
          <div className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
            {selectedFighters.length}/2 FIGHTERS SELECTED
          </div>
          {selectedFighters.length === 2 && (
            <button 
              onClick={() => setIsVSMode(true)} 
              className="bg-kengan-gold text-black px-6 py-2 rounded-full font-black italic text-xs tracking-tighter animate-pulse"
            >
              INITIATE MATCHUP
            </button>
          )}
          <button 
            onClick={() => setSelectedFighters([])}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}

      <AnimatePresence mode="popLayout">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto mb-24 items-stretch"
        >
          {filteredFighters.map(f => (
            <FighterCard 
              key={f.id} 
              fighter={f} 
              onSelect={handleSelect}
              isSelected={selectedFighters.find(sf => sf.id === f.id)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isVSMode && selectedFighters.length === 2 && (
          <ComparisonOverlay 
            selectedFighters={selectedFighters} 
            onClose={() => setIsVSMode(false)} 
          />
        )}
      </AnimatePresence>

      <footer className="text-center border-t border-gray-900 pt-16 pb-8">
        <div className="text-kengan-gold font-black italic text-2xl mb-4 tracking-tighter">YAMASHITA TRADING CO.</div>
        <div className="text-gray-700 text-[10px] uppercase tracking-[0.4em] font-bold">
          Confidential Fighter Database &copy; 2026 - No Unauthorized Access
        </div>
      </footer>
    </div>
  );
}

