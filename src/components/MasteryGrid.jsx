import React from 'react';

export default function MasteryGrid({ facts, onClose }) {
  // Creating a fast lookup map for facts by id: `AxB`
  const factMap = {};
  facts.forEach(f => {
    factMap[f.id] = f;
  });
  
  const getLevelStyle = (level, seen) => {
    if (!seen) return 'bg-white opacity-40 text-black border border-black/10';
    switch(level) {
      case 5: return 'bg-emerald-500 text-white shadow-inner font-black';
      case 4: return 'bg-green-400 text-green-900 shadow-inner font-bold';
      case 3: return 'bg-lime-400 text-green-900 shadow-inner font-bold';
      case 2: return 'bg-yellow-400 text-yellow-900 shadow-inner font-bold';
      case 1: return 'bg-amber-300 text-amber-900 shadow-inner font-bold';
      case 0: return 'bg-red-500 text-white shadow-inner font-black animate-pulse'; // Needs Review for failed facts
      default: return 'bg-white opacity-40 text-black border border-black/10'; 
    }
  };

  const rows = [];
  for (let r = 1; r <= 10; r++) {
    const cols = [];
    for (let c = 1; c <= 10; c++) {
      const fact = factMap[`${r}x${c}`];
      const level = fact ? fact.masteryLevel : 0;
      const seen = fact ? fact.hasBeenSeen : false;
      const title = seen ? `${r}x${c}=${r*c} (Mastery: ${level}/5)` : `${r}x${c} (Unseen)`;

      cols.push(
        <div 
          key={`${r}x${c}`} 
          className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center text-[10px] sm:text-xs md:text-sm rounded-[2px] cursor-help transition-all hover:scale-110 hover:z-10 ${getLevelStyle(level, seen)}`}
          title={title}
        >
          {r * c}
        </div>
      );
    }
    rows.push(<div key={`r${r}`} className="flex gap-[2px]">{cols}</div>);
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="bg-white p-5 sm:p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-200">
          <h2 className="text-2xl md:text-3xl font-black text-blue-900 mb-4 uppercase tracking-wider text-center">
            Mastery Matrix
          </h2>
        
        <div className="flex flex-col gap-[2px] bg-gray-200 p-2 md:p-3 rounded-2xl border-4 border-gray-300 shadow-inner">
          {rows}
        </div>
        
        <div className="grid grid-cols-2 md:flex justify-center flex-wrap gap-4 mt-8 text-sm md:text-base font-bold text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-white opacity-40 border border-black/10 rounded-[2px]"></div> Unseen
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-red-500 rounded-[2px] shadow-inner"></div> Needs Review
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-amber-300 rounded-[2px] shadow-inner"></div> Getting There
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-yellow-400 rounded-[2px] shadow-inner"></div> On Track
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-lime-400 rounded-[2px] shadow-inner"></div> Solid
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-emerald-500 rounded-[2px] shadow-inner"></div> Mastered
          </div>
        </div>

        <button 
          onClick={onClose}
          className="mt-6 px-8 py-3 bg-sky-500 text-white font-black text-lg rounded-full hover:bg-sky-400 hover:-translate-y-1 hover:shadow-xl active:scale-95 transition-all shadow-lg"
        >
          Close Grid
        </button>
        </div>
      </div>
    </div>
  );
}
