
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  key: string; // Used to identify the answer in the results object
}

export type QuizAnswers = {
  [key: string]: string;
};
