import React, { useState } from 'react';

export default function QuestionCard({ fact, mode, onSubmit, onOpenBlueprint }) {
  const [inputVal, setInputVal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal) return;
    onSubmit(parseInt(inputVal, 10));
    setInputVal('');
  };

  const isRage = mode === 'Rage';
  const cardBg = isRage ? 'bg-red-900' : 'bg-white';
  const textColor = isRage ? 'text-red-100' : 'text-blue-900';
  const inputBorder = isRage ? 'border-red-500 bg-red-950 text-red-100' : 'border-blue-300 bg-white text-gray-900';
  const inputFocus = isRage ? 'focus:ring-orange-500 focus:border-orange-500' : 'focus:ring-yellow-400 border-yellow-400';
  const buttonBg = isRage ? 'bg-orange-600 hover:bg-orange-500' : 'bg-pink-500 hover:bg-pink-400';
  const borderCol = isRage ? 'border-orange-600' : 'border-pink-300';

  return (
    <div className={`${cardBg} ${textColor} p-8 rounded-[2rem] shadow-2xl max-w-md w-full border-4 ${borderCol} transform transition-all`}>
      <h2 className="text-3xl font-black mb-6 tracking-tight">
        {isRage ? "I NEED BRICKS NOW!" : "Dance Floor Planners!"}
      </h2>
      <p className="text-xl font-bold mb-8 leading-relaxed">
        We have <span className={`inline-block px-3 py-1 mx-1 rounded-lg shadow-sm ${isRage ? 'bg-red-800 text-yellow-300' : 'bg-blue-100 text-blue-700'}`}>
          {fact.a} x {fact.b}
        </span> dancers coming! How many bricks do we need?
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="number"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          className={`text-center text-5xl font-black p-4 rounded-xl border-4 ${inputBorder} focus:outline-none focus:ring-4 ${inputFocus} transition-all shadow-inner`}
          placeholder="?"
          autoFocus
        />
        <div className="flex gap-4">
          <button 
            type="button" 
            onClick={onOpenBlueprint}
            className="flex-1 py-4 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-2xl transition-transform hover:-translate-y-1 shadow-lg"
          >
            Use Blueprint
          </button>
          <button 
            type="submit"
            className={`flex-1 py-4 px-4 ${buttonBg} text-white font-black text-xl rounded-2xl transition-transform hover:-translate-y-1 shadow-lg`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
