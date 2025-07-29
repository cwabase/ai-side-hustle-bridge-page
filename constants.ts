
import type { QuizQuestion } from './types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your biggest frustration when it comes to making money online?",
    options: [
      "Everything feels too complicated and technical.",
      "I don't have enough time to learn something new.",
      "I'm skeptical of 'get rich quick' schemes.",
      "I suffer from 'analysis paralysis' and don't know where to start."
    ],
    key: "frustration"
  },
  {
    id: 2,
    question: "How much time can you realistically commit per week to a new side hustle?",
    options: [
      "Less than 2 hours - I'm swamped!",
      "2-5 hours - I can make some time.",
      "5-10 hours - I'm serious about this.",
      "10+ hours - I'm ready to go all-in."
    ],
    key: "time"
  },
  {
    id: 3,
    question: "When you hear 'Artificial Intelligence (AI)', what's your first reaction?",
    options: [
      "Excited - I see the opportunity!",
      "Intimidated - It sounds complex.",
      "Skeptical - It seems like hype.",
      "Curious, but I don't know how it applies to me."
    ],
    key: "aiFeeling"
  },
  {
    id: 4,
    question: "What is your primary goal for starting a side hustle?",
    options: [
        "To replace my current job's income.",
        "To pay off debt and save more.",
        "To have more freedom and flexibility.",
        "To build a new skill and create something of my own."
    ],
    key: "goal"
  }
];
