export type AnswerRecord = Record<string, string>;

export type Question = {
  id: string;
  text: string;
  subtext?: string;
  type: 'radio' | 'text' | 'longtext';
  options?: string[];
  next: (answer: string, answers: AnswerRecord) => string | null;
  // Optional function to validate the answer
  validate?: (answer: string) => boolean;
};

export type Clause = {
  id: string;
  name: string;
  text: string;
  category: 'Introduction' | 'Definitions' | 'Obligations' | 'Confidentiality' | 'Term and Termination' | 'Miscellaneous';
  conditions: (answers: AnswerRecord) => boolean;
};
