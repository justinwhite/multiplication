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

  const cells = [];
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      const isHighlighted = r >= rMin && r <= rMax && c >= cMin && c <= cMax;
      cells.push(
        <div
          key={`${r}-${c}`}
          className={`w-8 h-8 border border-white/20 cursor-crosshair transition-colors duration-75 ${
            isHighlighted ? 'bg-yellow-400' : 'bg-blue-800 hover:bg-blue-700'
          }`}
          onMouseDown={() => handleMouseDown(r, c)}
          onMouseEnter={() => handleMouseEnter(r, c)}
        />
      );
    }
  }

  const w = cMin !== -1 ? cMax - cMin + 1 : 0;
  const h = rMin !== -1 ? rMax - rMin + 1 : 0;
  const area = w * h;
  const highlightDesc = area > 0 ? `${w} x ${h} = ${area}` : 'Drag to measure area';

  return (
    <div className="flex flex-col items-center bg-blue-900/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border-4 border-yellow-400">
      <h2 className="text-2xl font-black text-white mb-2 tracking-wide uppercase">The Blueprint</h2>
      <p className="text-yellow-300 font-bold mb-4 text-xl h-8">{highlightDesc}</p>
      
      <div 
        className="grid grid-cols-10 gap-1 bg-blue-950 p-3 rounded-2xl shadow-inner select-none touch-none"
        onMouseLeave={() => setIsDragging(false)}
      >
        {cells}
      </div>
      
      <button 
        onClick={onClose}
        className="mt-6 px-8 py-3 bg-yellow-400 text-blue-900 font-black text-lg rounded-full hover:bg-yellow-300 hover:scale-105 active:scale-95 transition-all shadow-lg"
      >
        Back to Question
      </button>
    </div>
  );
}
