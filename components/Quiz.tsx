
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuizQuestion, QuizAnswers } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (answers: QuizAnswers) => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [direction, setDirection] = useState(1);

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentStep];
    const newAnswers = { ...answers, [currentQuestion.key]: answer };
    setAnswers(newAnswers);
    setDirection(1);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  }

  const progressPercentage = ((currentStep) / questions.length) * 100;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-2xl mx-auto border border-gray-700">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-brand-secondary">Progress</span>
            <span className="text-sm font-medium text-white">{currentStep + 1} / {questions.length}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <motion.div
            className="bg-brand-secondary h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </div>

      <div className="relative h-64 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
              {questions[currentStep].question}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[currentStep].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full p-4 bg-gray-700 text-white rounded-lg text-left transition-colors duration-200 hover:bg-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
       <div className="mt-6 text-center">
        {currentStep > 0 && (
          <button onClick={handleBack} className="text-gray-400 hover:text-white transition-colors duration-200">
            &larr; Back
          </button>
        )}
      </div>
    </div>
  );
};
