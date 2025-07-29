
import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiZap } from 'react-icons/fi';
import { QUIZ_QUESTIONS } from './constants';
import type { QuizAnswers } from './types';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { generateAnalysis } from './services/geminiService';

type AppState = 'intro' | 'quiz' | 'loading' | 'results';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('intro');
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [analysis, setAnalysis] = useState<string>('');

  const handleStartQuiz = () => {
    setAppState('quiz');
  };

  const handleQuizCompletion = useCallback(async (finalAnswers: QuizAnswers) => {
    setAnswers(finalAnswers);
    setAppState('loading');
    try {
      const result = await generateAnalysis(finalAnswers);
      setAnalysis(result);
      setAppState('results');
    } catch (error) {
      console.error("Error generating analysis:", error);
      // Fallback in case of API error
      setAnalysis("Based on your answers, you're looking for a clear, straightforward path to earning extra income without the usual tech headaches. You're ready for a change, and the system we've found is designed to provide just that. Click below to see how it works.");
      setAppState('results');
    }
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-brand-text font-sans flex flex-col items-center justify-center p-4 overflow-x-hidden">
      <div className="w-full max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {appState === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div 
                className="w-24 h-24 bg-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <FiZap size={48} />
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
                Stop Guessing. Start Earning.
              </h1>
              <p className="text-lg md:text-xl text-brand-text max-w-2xl mx-auto mb-8">
                Frustrated with side hustles that are too complex, time-consuming, or just don't work? Discover if our AI-powered system is the breakthrough you've been searching for.
              </p>
              <p className="text-md text-gray-400 mb-8">Take this free 60-second assessment to get your personalized success plan.</p>
              <motion.button
                onClick={handleStartQuiz}
                className="bg-brand-secondary text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg shadow-green-500/20 transition-transform duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start My Assessment
              </motion.button>
            </motion.div>
          )}

          {appState === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 100, damping: 20 }}
            >
              <Quiz questions={QUIZ_QUESTIONS} onComplete={handleQuizCompletion} />
            </motion.div>
          )}

          {appState === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
                <div className="flex justify-center items-center flex-col">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-secondary mb-4"></div>
                    <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Answers...</h2>
                    <p className="text-brand-text">Crafting your personalized success path!</p>
                </div>
            </motion.div>
          )}

          {appState === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <Results analysis={analysis} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
