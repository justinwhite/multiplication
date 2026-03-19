import React from 'react';

export default function Character({ mode }) {
  const isRage = mode === 'Rage';
  
  // Base colors
  const faceBg = isRage ? 'bg-[#da291c]' : 'bg-gradient-to-b from-[#f47bbb] from-[45%] to-white to-[45%]';
  const bottomPlate = isRage ? 'bg-[#b31b1b]' : 'bg-gray-100';
  const earColor = isRage ? 'bg-[#da291c]' : 'bg-[#e24c9c]';
  const hornColor = isRage ? 'bg-[#ff7e00]' : 'bg-[#a3dff5]';
  const hornBase = isRage ? 'bg-[#cc5500]' : 'bg-[#e2e8f0]';
  const neckTop = isRage ? 'bg-[#ff7e00]' : 'bg-[#d2f074]'; 
  const neckBot = isRage ? 'bg-[#ffe800]' : 'bg-[#fbe870]'; 

  return (
    <div className={`relative w-64 h-64 transition-all duration-300 flex justify-center items-end ${isRage ? 'animate-bounce scale-110' : 'animate-[bounce_2s_infinite]'}`}>

      {/* Container holding the blocky head & neck */}
      <div className="relative w-48 shadow-2xl drop-shadow-lg flex flex-col items-center z-10">
        
        {/* Top Add-ons: Ears and Horn base plate row */}
        <div className="relative w-full h-12 flex justify-between px-1">
          {/* Left Ear (cheese slope facing outwards) */}
          <div className={`w-12 h-10 ${earColor} mt-2 drop-shadow-sm border border-black/5 rounded-tl-sm`} style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 0)' }}></div>
          
          {/* Horn Assembly positioned between ears */}
          <div className="relative flex flex-col items-center bg-transparent mt-[-40px]">
            {/* Horn Cone */}
            <div className={`w-7 h-[4.5rem] ${hornColor} overflow-hidden shadow-inner flex flex-col items-center align-bottom border border-black/10`} 
                 style={{ clipPath: 'polygon(50% 0%, 20% 100%, 80% 100%)' }}>
               <div className={`w-full h-[5px] mt-4 ${isRage ? 'bg-red-700' : 'bg-[#6bcbe4] opacity-50'}`}></div>
               <div className={`w-full h-[5px] mt-3 ${isRage ? 'bg-red-700' : 'bg-[#6bcbe4] opacity-50'}`}></div>
               <div className={`w-full h-[5px] mt-3 ${isRage ? 'bg-red-700' : 'bg-[#6bcbe4] opacity-50'}`}></div>
            </div>
            {/* Horn Base Flanges / Round tiles */}
            <div className={`w-10 h-[10px] rounded-full ${hornBase} -mt-[2px] z-20 shadow-sm border border-black/10`}></div>
            <div className={`w-[48px] h-2 ${earColor} border-x border-t border-black/10 z-10`}></div>
          </div>

          {/* Right Ear (cheese slope facing outwards) */}
          <div className={`w-12 h-10 ${earColor} mt-2 drop-shadow-sm border border-black/5 rounded-tr-sm`} style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }}></div>
        </div>

        {/* Head Top Plate: 1x3 Plate */}
        <div className={`w-full h-[18px] ${earColor} border border-b-0 border-black/10 z-10 rounded-t-sm shadow-inner`}>
           <div className="w-full h-[2px] bg-white/20 mt-[2px]"></div>
        </div>

        {/* Face Block: 1x3 Brick */}
        <div className={`w-full h-[5.5rem] relative z-10 ${faceBg} border border-black/10 border-b-0 overflow-hidden`}>
           {isRage ? (
             // Rage/Angry Kitty Face
             <div className="absolute inset-0 flex flex-col items-center justify-center -mt-1">
               <div className="flex w-full justify-between items-center px-6">
                 {/* Angry Yellow Eyes */}
                 <div className="w-11 h-6 bg-[#ffe800] rotate-12 relative overflow-hidden border-[3px] border-black flex items-center justify-center">
                    <div className="w-4 h-4 bg-black rounded-full shadow-[0_0_8px_rgba(255,100,0,0.8)]"></div>
                 </div>
                 <div className="w-11 h-6 bg-[#ffe800] -rotate-12 relative overflow-hidden border-[3px] border-black flex items-center justify-center">
                    <div className="w-4 h-4 bg-black rounded-full shadow-[0_0_8px_rgba(255,100,0,0.8)]"></div>
                 </div>
               </div>
               
               {/* Jagged Flaming Jaw */}
               <div className="w-[85%] h-11 bg-black mt-2 flex flex-col justify-between border-2 border-[#b31b1b] overflow-hidden rounded-[2px] relative z-10">
                  <div className="flex justify-around w-full mb-[-4px]">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-transparent border-t-[#ffe800]"></div>)}
                  </div>
                  <div className="absolute inset-0 top-2 bottom-2 bg-gradient-to-t from-[#ff7e00] to-transparent animate-pulse blur-[1px]"></div>
                  <div className="flex justify-around w-full rotate-180 mt-[-4px]">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-transparent border-t-[#ffe800]"></div>)}
                  </div>
               </div>
             </div>
           ) : (
             // Happy Unikitty Face
             <div className="absolute inset-0">
               {/* Eyes + Light Blue Rings */}
               <div className="absolute top-[8px] left-[18px] w-[50px] h-[50px] bg-[#8bd9f0] rounded-full flex justify-center items-center">
                 <div className="w-[42px] h-[42px] bg-[#1a1a1a] rounded-full relative overflow-hidden shadow-inner">
                   <div className="absolute top-1 left-2 w-5 h-5 bg-white rounded-full"></div>
                   <div className="absolute bottom-2 right-3 w-[6px] h-[6px] bg-white rounded-full"></div>
                 </div>
               </div>
               {/* Lashes */}
               <div className="absolute top-[8px] left-[12px] w-[14px] h-[3px] bg-black -rotate-[35deg] rounded-full opacity-90"></div>
               <div className="absolute top-[21px] left-[8px] w-[12px] h-[3px] bg-black -rotate-[15deg] rounded-full opacity-90"></div>
               
               <div className="absolute top-[8px] right-[18px] w-[50px] h-[50px] bg-[#8bd9f0] rounded-full flex justify-center items-center">
                 <div className="w-[42px] h-[42px] bg-[#1a1a1a] rounded-full relative overflow-hidden shadow-inner">
                   <div className="absolute top-1 left-3 w-5 h-5 bg-white rounded-full"></div>
                   <div className="absolute bottom-2 right-[10px] w-[6px] h-[6px] bg-white rounded-full"></div>
                 </div>
               </div>
               {/* Lashes */}
               <div className="absolute top-[8px] right-[12px] w-[14px] h-[3px] bg-black rotate-[35deg] rounded-full opacity-90"></div>
               <div className="absolute top-[21px] right-[8px] w-[12px] h-[3px] bg-black rotate-[15deg] rounded-full opacity-90"></div>

               {/* Magenta Cheeks */}
               <div className="absolute bottom-4 left-4 w-[14px] h-[14px] bg-[#d92c7d] rounded-full opacity-95"></div>
               <div className="absolute bottom-4 right-4 w-[14px] h-[14px] bg-[#d92c7d] rounded-full opacity-95"></div>

               {/* Pink Nose & Tongue */}
               <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 flex flex-col items-center">
                 <div className="w-[20px] h-[10px] bg-[#e24c9c] rounded-full mb-[2px] shadow-sm"></div>
                 <div className="w-10 h-5 bg-[#3b1216] rounded-b-full overflow-hidden flex justify-center items-end border-t border-[#3b1216]">
                    <div className="w-6 h-3 bg-[#f25287] rounded-t-full mt-[1px]"></div>
                 </div>
               </div>
             </div>
           )}
        </div>

        {/* Head Bottom Plate */}
        <div className={`w-full h-4 relative z-10 border border-black/10 rounded-b-sm shadow-sm ${bottomPlate}`}>
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 rounded-b-sm"></div>
        </div>

        {/* Neck Column: Lime Green + Yellow/White */}
        <div className={`w-[26px] h-[14px] relative z-0 border-x border-black/10 ${neckTop}`}>
           <div className="w-full h-[2px] bg-black/5 mt-1"></div>
        </div>
        <div className={`w-[26px] h-[16px] relative z-0 border-x border-b border-black/10 shadow-[0_4px_6px_rgba(0,0,0,0.15)] rounded-b-[1px] ${neckBot}`}>
           <div className="w-full h-[6px] bg-black/5 mt-[2px]"></div>
        </div>
      </div>
      
      {/* Rage Mode Background Glow */}
      {isRage && (
        <div className="absolute bottom-0 -z-10 bg-[#da291c] w-64 h-64 mix-blend-screen opacity-40 blur-[40px] animate-pulse rounded-full pointer-events-none"></div>
      )}
    </div>
  );
}
