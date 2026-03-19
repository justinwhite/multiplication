import React, { useEffect, useState } from 'react';
import { getFacts, getNextQuestion, submitAnswer } from './lib/engine';
import Character from './components/Character';
import QuestionCard from './components/QuestionCard';
import Blueprint from './components/Blueprint';
import MasteryGrid from './components/MasteryGrid';

function App() {
  const [facts, setFacts] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [blueprintOpen, setBlueprintOpen] = useState(false);
  const [turnFailed, setTurnFailed] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [celebMsg, setCelebMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [masteryOpen, setMasteryOpen] = useState(false);

  const celebMessages = [
    "The dance floor is packed!",
    "Time to Party!",
    "Let's Dance!",
    "The dancers are ready!"
  ];

  useEffect(() => {
    const loadedFacts = getFacts();
    setFacts(loadedFacts);
    setCurrentQuestion(getNextQuestion(loadedFacts));
  }, []);

  useEffect(() => {
    let timeout;
    if (errorMsg) {
      timeout = setTimeout(() => {
        setErrorMsg('');
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [errorMsg]);

  const handleOpenBlueprint = () => {
    setBlueprintOpen(true);
    setTurnFailed(true);
    setErrorMsg('');
  };

  const handleSubmit = (answer) => {
    if (!currentQuestion) return;
    
    const isCorrect = answer === currentQuestion.fact.answer;
    
    if (isCorrect) {
      setErrorMsg('');
      const newFacts = submitAnswer(facts, currentQuestion.fact.id, true, turnFailed);
      setFacts(newFacts);
      
      // Celebrate
      setCelebMsg(celebMessages[Math.floor(Math.random() * celebMessages.length)]);
      setCelebrating(true);
      setTimeout(() => {
        setCelebrating(false);
        setTurnFailed(false);
        setBlueprintOpen(false);
        setCurrentQuestion(getNextQuestion(newFacts));
      }, 2000);
      
    } else {
      // Wrong answer
      const newFacts = submitAnswer(facts, currentQuestion.fact.id, false, turnFailed);
      setFacts(newFacts);
      setTurnFailed(true);
      setErrorMsg("Not quite! We need exactly the right number.");
    }
  };

  if (!currentQuestion) return <div className="min-h-screen bg-sky-400 text-white flex justify-center items-center text-2xl font-bold">Loading...</div>;

  const { fact, mode } = currentQuestion;
  const isRage = mode === 'Rage';
  
  const bgClass = isRage ? 'bg-red-950' : 'bg-sky-400';
  const patternClass = isRage 
    ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900 via-red-950 to-black' 
    : 'bg-gradient-to-b from-sky-300 via-sky-400 to-sky-500';

  return (
    <div className={`min-h-[100dvh] w-full transition-colors duration-700 flex flex-col items-center justify-center p-4 ${bgClass} ${patternClass}`}>
      {/* Celebration Overlay */}
      {celebrating && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-green-500/90 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
          <div className="text-6xl md:text-8xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-5xl md:text-7xl font-black text-white px-4 text-center tracking-tight drop-shadow-xl">
            PERFECT!
          </h2>
          <p className="text-2xl md:text-4xl font-bold text-green-100 mt-4 tracking-wide shadow-sm text-center">
            {celebMsg}
          </p>
        </div>
      )}
      <div className="max-w-md w-full flex flex-col items-center">
          <Character mode={mode} isFrowning={!!errorMsg} />
          
          <div className="relative w-full flex justify-center z-20">
            {errorMsg && (
              <div className="absolute top-0 -mt-2 bg-red-500 text-white px-6 py-2 rounded-full font-bold shadow-lg animate-bounce text-center">
                {errorMsg}
              </div>
            )}
          </div>

          {blueprintOpen && (
            <Blueprint onClose={() => setBlueprintOpen(false)} />
          )}

          <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-500">
            <QuestionCard 
              fact={fact} 
              mode={mode}
              onSubmit={handleSubmit}
              onOpenBlueprint={handleOpenBlueprint}
            />
          </div>

          {isRage && !blueprintOpen && (
            <div className="mt-8 text-red-200 font-bold uppercase tracking-widest text-xl animate-pulse flex items-center gap-2">
              <span className="text-2xl">⚠️</span> MELTDOWN IMMINENT <span className="text-2xl">⚠️</span>
            </div>
          )}
        </div>

      {masteryOpen && (
        <MasteryGrid facts={facts} onClose={() => setMasteryOpen(false)} />
      )}
      
      {/* Subtle Mastery Indicator for Parents */}
      <div 
        onClick={() => setMasteryOpen(true)}
        className="fixed bottom-4 right-4 text-white/40 hover:text-white/90 transition-all text-xs font-bold tracking-widest cursor-pointer z-[40] select-none bg-black/10 hover:bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-2 group"
      >
        <span>MASTERY: {fact.masteryLevel}/5</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">👁️ Grid</span>
      </div>
    </div>
  );
}

export default App;
