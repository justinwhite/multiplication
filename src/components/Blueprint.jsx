import React, { useState, useEffect } from 'react';

export default function Blueprint({ onClose }) {
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleMouseDown = (r, c) => {
    setIsDragging(true);
    setDragStart({ r, c });
    setDragEnd({ r, c });
  };

  const handleMouseEnter = (r, c) => {
    if (isDragging) {
      setDragEnd({ r, c });
    }
  };

  const rMin = dragStart && dragEnd ? Math.min(dragStart.r, dragEnd.r) : -1;
  const rMax = dragStart && dragEnd ? Math.max(dragStart.r, dragEnd.r) : -1;
  const cMin = dragStart && dragEnd ? Math.min(dragStart.c, dragEnd.c) : -1;
  const cMax = dragStart && dragEnd ? Math.max(dragStart.c, dragEnd.c) : -1;

  const rows = [];
  for (let r = 1; r <= 10; r++) {
    const cols = [];
    for (let c = 1; c <= 10; c++) {
      const isHighlighted = r >= rMin && r <= rMax && c >= cMin && c <= cMax;
      
      const defaultStyle = 'bg-blue-800 border border-black/20 hover:bg-blue-700 opacity-80';
      const highlightStyle = 'bg-yellow-400 border border-yellow-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] z-10';
      
      cols.push(
        <div
          key={`${r}x${c}`}
          className={`w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 rounded-[2px] cursor-crosshair select-none transition-all duration-75 ${isHighlighted ? highlightStyle : defaultStyle}`}
          onMouseDown={() => handleMouseDown(r, c)}
          onMouseEnter={() => handleMouseEnter(r, c)}
        ></div>
      );
    }
    rows.push(<div key={`r${r}`} className="flex gap-[2px]">{cols}</div>);
  }

  const w = cMin !== -1 ? cMax - cMin + 1 : 0;
  const h = rMin !== -1 ? rMax - rMin + 1 : 0;
  const area = w * h;
  const highlightDesc = area > 0 ? `${w} x ${h} = ${area} bricks` : 'Drag to measure area';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="flex flex-col items-center bg-blue-900/95 p-6 md:p-10 rounded-3xl shadow-2xl border-[4px] border-yellow-400 animate-in zoom-in-95 duration-200">
        <h2 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-wide uppercase text-center">The Blueprint</h2>
        <p className="text-yellow-300 font-bold mb-6 text-lg md:text-xl h-8">{highlightDesc}</p>
        
        <div 
          className="flex flex-col gap-[2px] bg-blue-950 p-2 md:p-3 rounded-2xl border-4 border-blue-900 shadow-inner"
          onMouseLeave={() => setIsDragging(false)}
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
