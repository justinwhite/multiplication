import React from 'react';

export default function Character({ mode }) {
  const isRage = mode === 'Rage';
  
  return (
    <div className={`relative w-48 h-48 mb-10 transition-transform duration-300 ${isRage ? 'animate-bounce' : 'animate-[bounce_2s_infinite]'}`}>
      <div className={`absolute inset-0 rounded-3xl border-8 ${isRage ? 'bg-orange-600 border-orange-800' : 'bg-yellow-400 border-yellow-300'} shadow-2xl shadow-black/20 overflow-hidden`}>
        
        {/* Blush (Happy mode only) */}
        {!isRage && (
          <>
            <div className="absolute top-20 left-4 w-6 h-4 bg-pink-400/50 rounded-full blur-sm"></div>
            <div className="absolute top-20 right-4 w-6 h-4 bg-pink-400/50 rounded-full blur-sm"></div>
          </>
        )}

        {/* Left Eye */}
        <div className="absolute top-10 left-8 w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner">
          <div className={`w-5 h-5 bg-black rounded-full ${isRage ? 'mt-2' : ''}`}></div>
          {isRage && <div className="absolute -top-1 left-[-20%] w-[140%] h-5 bg-orange-800 rotate-12 origin-top-left"></div>}
        </div>

        {/* Right Eye */}
        <div className="absolute top-10 right-8 w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner">
          <div className={`w-5 h-5 bg-black rounded-full ${isRage ? 'mt-2' : ''}`}></div>
          {isRage && <div className="absolute -top-1 right-[-20%] w-[140%] h-5 bg-orange-800 -rotate-12 origin-top-right"></div>}
        </div>

        {/* Mouth */}
        {isRage ? (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-24 h-12 bg-black rounded-sm flex justify-center items-end overflow-hidden">
             {/* Teeth */}
             <div className="absolute top-0 w-full flex justify-around">
               <div className="w-3 h-4 bg-white rounded-b-sm"></div>
               <div className="w-3 h-4 bg-white rounded-b-sm"></div>
               <div className="w-3 h-4 bg-white rounded-b-sm"></div>
               <div className="w-3 h-4 bg-white rounded-b-sm"></div>
             </div>
             {/* Tongue */}
             <div className="w-16 h-4 bg-red-600 rounded-t-full mb-1"></div>
          </div>
        ) : (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-20 h-12 bg-black rounded-b-[2rem] rounded-t-sm overflow-hidden">
            {/* Happy tongue */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-14 h-8 bg-pink-500 rounded-full"></div>
          </div>
        )}
      </div>
      
      {/* Decorative sweat/steam */}
      {isRage && (
        <>
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-white opacity-80 rounded-full animate-ping"></div>
          <div className="absolute -top-6 right-0 w-6 h-6 bg-white opacity-60 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
        </>
      )}
    </div>
  );
}
