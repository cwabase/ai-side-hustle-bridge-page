
import { GoogleGenAI } from "@google/genai";
import type { QuizAnswers } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateAnalysis(answers: QuizAnswers): Promise<string> {
    const prompt = `
    You are an expert side hustle coach specializing in helping beginners. A user has completed a self-assessment with the following answers:
    - Their biggest frustration is: "${answers.frustration}"
    - Their available time per week is: "${answers.time}"
    - Their feeling about AI is: "${answers.aiFeeling}"
    - Their primary goal is: "${answers.goal}"

    Based *only* on these answers, generate a personalized analysis and recommendation in a 3-paragraph format. Your output must be a single string, with paragraphs separated by a newline character.

    Paragraph 1 (Analysis): Start with "Based on what you've shared, it's clear that..." Validate their feelings and show you understand their specific situation. For example, if their frustration is complexity and they feel intimidated by AI, acknowledge this as a common and valid roadblock that keeps many people stuck. Agitate the problem slightly by mentioning the cost of inaction or feeling left behind.

    Paragraph 2 (The Bridge): Introduce the solution conceptually without naming a product. Say something like, "For someone in your exact position, the key isn't to become a tech expert, but to leverage a simple, proven system..." Frame this as a 'perfect fit' for their available time and comfort level. Connect it to their primary goal.

    Paragraph 3 (The Prescription): Confidently state that you have found the perfect solution that aligns with their needs. Say something like, "That's why I'm so confident in recommending the 'AI Side Hustle Blueprint'." Briefly mention its key benefit that directly solves their primary frustration (e.g., "It's designed specifically for non-techies to get started in under 5 hours a week"). Create a sense of urgency and empowerment, telling them this is their chance to finally move forward.

    Your tone must be encouraging, authoritative, and highly persuasive. Do not use markdown, just plain text with newline separators between paragraphs.
    `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { thinkingConfig: { thinkingBudget: 0 } }
    });
    return response.text;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate analysis from Gemini API.');
  }
}
