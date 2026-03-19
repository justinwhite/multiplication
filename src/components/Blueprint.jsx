import React, { useState, useEffect } from 'react';

export default function Blueprint({ onClose }) {
  const [hoverArea, setHoverArea] = useState(null);
  const [lockedArea, setLockedArea] = useState(null);

  const handleMouseEnter = (r, c) => {
    if (!lockedArea) {
      setHoverArea({ r, c });
    }
  };

  const handleClick = (r, c) => {
    if (lockedArea) {
      // Unset if already locked
      setLockedArea(null);
      setHoverArea({ r, c });
    } else {
      // Lock it in
      setLockedArea({ r, c });
    }
  };

  const targetR = lockedArea ? lockedArea.r : (hoverArea ? hoverArea.r : 0);
  const targetC = lockedArea ? lockedArea.c : (hoverArea ? hoverArea.c : 0);

  const rows = [];
  for (let r = 1; r <= 10; r++) {
    const cols = [];
    for (let c = 1; c <= 10; c++) {
      const isHighlighted = r <= targetR && c <= targetC;
      
      const defaultStyle = 'bg-blue-800 border border-black/20 hover:bg-blue-700 opacity-80';
      const highlightStyle = 'bg-yellow-400 border border-yellow-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] z-10';
      
      cols.push(
        <div
          key={`${r}x${c}`}
          className={`w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 rounded-[2px] cursor-pointer select-none transition-all duration-75 ${isHighlighted ? highlightStyle : defaultStyle}`}
          onMouseDown={() => handleClick(r, c)}
          onMouseEnter={() => handleMouseEnter(r, c)}
        ></div>
      );
    }
    rows.push(<div key={`r${r}`} className="flex gap-[2px]">{cols}</div>);
  }

  const w = targetC;
  const h = targetR;
  const area = w * h;
  
  let instruction = 'Hover to view area, tap to lock';
  if (lockedArea) {
    instruction = 'Tap anywhere on the grid to reset';
  }
  const highlightDesc = area > 0 ? `${w} x ${h} = ${area} bricks` : instruction;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="flex flex-col items-center bg-blue-900/95 p-6 md:p-10 rounded-3xl shadow-2xl border-[4px] border-yellow-400 animate-in zoom-in-95 duration-200">
        <h2 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-wide uppercase text-center">The Blueprint</h2>
        <p className="text-yellow-300 font-bold mb-2 text-lg md:text-xl h-8">{highlightDesc}</p>
        <p className="text-blue-300 font-bold mb-4 text-sm md:text-base h-6">{area === 0 ? '' : (lockedArea ? 'Locked!' : 'Hovering...')}</p>
        
        <div 
          className="flex flex-col gap-[2px] bg-blue-950 p-2 md:p-3 rounded-2xl border-4 border-blue-900 shadow-inner cursor-pointer"
          onMouseLeave={() => { if(!lockedArea) setHoverArea(null); }}
        >
          {rows}
        </div>
        
        <button 
          onClick={onClose}
          className="mt-8 px-8 md:px-10 py-3 md:py-4 bg-yellow-400 text-blue-900 font-black text-lg md:text-xl rounded-full hover:bg-yellow-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 transition-all shadow-lg"
        >
          Back to Question
        </button>
      </div>
    </div>
  );
}
