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
  const [errorMsg, setErrorMsg] = useState('');
  const [masteryOpen, setMasteryOpen] = useState(false);

  useEffect(() => {
    const loadedFacts = getFacts();
    setFacts(loadedFacts);
    setCurrentQuestion(getNextQuestion(loadedFacts));
  }, []);

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
      {celebrating ? (
        <div className="flex justify-center items-center flex-col animate-[bounce_1s_infinite]">
          <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-xl text-center px-4 leading-tight mb-12">
            PERFECT! <br/>
            <span className="text-3xl md:text-5xl text-yellow-300 block mt-4">Dance floor built!</span>
          </h1>
          <div className="w-48 h-48 md:w-64 md:h-64 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(250,204,21,0.8)]">
            <span className="text-7xl md:text-9xl relative z-10 animate-spin" style={{ animationDuration: '3s' }}>🕺</span>
          </div>
        </div>
      ) : (
        <div className="max-w-md w-full flex flex-col items-center">
          <Character mode={mode} />
          
          {errorMsg && (
            <div className="mb-4 bg-red-500 text-white px-6 py-2 rounded-full font-bold shadow-lg animate-bounce">
              {errorMsg}
            </div>
          )}

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
      )}

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
