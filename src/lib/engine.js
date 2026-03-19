const STORAGE_KEY = 'rainbow_rage_facts';

export const INTERVALS_MINUTES = [
  0,        // Level 0: Next review immediately
  1,        // Level 1: 1 minute
  10,       // Level 2: 10 minutes
  60,       // Level 3: 1 hour
  24 * 60,  // Level 4: 1 day
  5 * 24 * 60 // Level 5: 5 days
];

export function initFacts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch(e) {
      console.error("Failed to parse stored facts", e);
    }
  }

  const facts = [];
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      facts.push({
        id: `${i}x${j}`,
        a: i,
        b: j,
        answer: i * j,
        masteryLevel: 0,
        hasBeenSeen: false,
        nextReviewDate: Date.now() // Start off due immediately
      });
    }
  }
  
  // Shuffle them initially
  for (let i = facts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [facts[i], facts[j]] = [facts[j], facts[i]];
  }
  
  saveFacts(facts);
  return facts;
}

export function saveFacts(facts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(facts));
}

export function getFacts() {
  return initFacts();
}

export function getNextQuestion(facts) {
  if (!facts || facts.length === 0) return null;
  
  const now = Date.now();
  
  // Find overdue facts (nextReviewDate <= now)
  const dueFacts = facts.filter(f => f.nextReviewDate <= now);
  
  if (dueFacts.length > 0) {
    // Priority: Items that have been seen and failed (mastery 0, seen) but are due
    // Or just sort by nextReviewDate ascending (most overdue first)
    dueFacts.sort((a, b) => a.nextReviewDate - b.nextReviewDate);
    const selected = dueFacts[0];
    
    // Determine mode
    // Standard Mode (Happy): For new or mastered facts.
    // Emergency Mode (Rage): If a fact is due for review and has a low masteryLevel.
    const isNew = selected.masteryLevel === 0 && !selected.hasBeenSeen;
    const isMastered = selected.masteryLevel >= 4; // High mastery is happy too
    const isRage = !isNew && !isMastered && selected.masteryLevel < 3;
    
    return { fact: selected, mode: isRage ? 'Rage' : 'Happy' };
  } else {
    // No facts strictly due? Pick the one with the lowest nextReviewDate (or a new fact)
    const sorted = [...facts].sort((a, b) => a.nextReviewDate - b.nextReviewDate);
    const selected = sorted[0];
    const isNew = selected.masteryLevel === 0 && !selected.hasBeenSeen;
    const isRage = !isNew && selected.masteryLevel < 3;
    
    return { fact: selected, mode: isRage ? 'Rage' : 'Happy' };
  }
}

export function submitAnswer(facts, factId, isCorrect, turnFailed) {
  const factIndex = facts.findIndex(f => f.id === factId);
  if (factIndex === -1) return facts;
  
  const fact = {...facts[factIndex]}; // copy to avoid direct mutation
  fact.hasBeenSeen = true;

  if (!isCorrect || turnFailed) {
    fact.masteryLevel = 0;
    // Review again soon
    fact.nextReviewDate = Date.now(); 
  } else {
    // Correct!
    fact.masteryLevel = Math.min(fact.masteryLevel + 1, 5);
    const minutesToWait = INTERVALS_MINUTES[fact.masteryLevel];
    fact.nextReviewDate = Date.now() + minutesToWait * 60 * 1000;
  }
  
  const newFacts = [...facts];
  newFacts[factIndex] = fact;
  saveFacts(newFacts);
  return newFacts;
}
