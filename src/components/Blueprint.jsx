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
          className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-[2px] cursor-pointer select-none transition-all duration-75 ${isHighlighted ? highlightStyle : defaultStyle}`}
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="flex flex-col items-center bg-blue-900/95 p-5 sm:p-6 md:p-8 rounded-3xl shadow-2xl border-[4px] border-yellow-400 animate-in zoom-in-95 duration-200">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-1 tracking-wide uppercase text-center">The Blueprint</h2>
          <p className="text-yellow-300 font-bold mb-1 text-lg sm:text-xl h-7">{highlightDesc}</p>
          <p className="text-blue-300 font-bold mb-3 text-xs sm:text-sm h-5">{area === 0 ? '' : (lockedArea ? 'Locked!' : 'Hovering...')}</p>
          
          <div 
            className="flex flex-col gap-[2px] bg-blue-950 p-2 md:p-3 rounded-2xl border-4 border-blue-900 shadow-inner cursor-pointer"
            onMouseLeave={() => { if(!lockedArea) setHoverArea(null); }}
          >
          {rows}
        </div>
        
        <button 
          onClick={onClose}
          className="mt-5 px-6 md:px-8 py-2 md:py-3 bg-yellow-400 text-blue-900 font-black text-base md:text-lg rounded-full hover:bg-yellow-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 transition-all shadow-lg"
        >
          Back to Question
        </button>
        </div>
      </div>
    </div>
  );
}
