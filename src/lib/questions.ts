import type { Question } from './types';

export const questions: Question[] = [
  {
    id: 'agreementType',
    text: 'What type of agreement is this?',
    type: 'radio',
    options: ['Mutual NDA', 'One-way NDA'],
    next: () => 'disclosingPartyType',
  },
  {
    id: 'disclosingPartyType',
    text: 'Is the Disclosing Party an individual or a company?',
    type: 'radio',
    options: ['Individual', 'Company'],
    next: (answer, answers) =>
      answers.agreementType === 'One-way NDA'
        ? 'disclosingPartyName'
        : 'partyOneType',
  },
  {
    id: 'disclosingPartyName',
    text: 'What is the name of the Disclosing Party?',
    type: 'text',
    next: () => 'receivingPartyType',
    validate: answer => answer.trim() !== '',
  },
  {
    id: 'receivingPartyType',
    text: 'Is the Receiving Party an individual or a company?',
    type: 'radio',
    options: ['Individual', 'Company'],
    next: () => 'receivingPartyName',
  },
  {
    id: 'receivingPartyName',
    text: 'What is the name of the Receiving Party?',
    type: 'text',
    next: () => 'purpose',
    validate: answer => answer.trim() !== '',
  },
  {
    id: 'partyOneType',
    text: 'Is the first party an individual or a company?',
    subtext: 'This question appears for Mutual NDAs.',
    type: 'radio',
    options: ['Individual', 'Company'],
    next: () => 'partyOneName',
  },
  {
    id: 'partyOneName',
    text: "What is the first party's name?",
    subtext: 'This question appears for Mutual NDAs.',
    type: 'text',
    next: () => 'partyTwoType',
    validate: answer => answer.trim() !== '',
  },
  {
    id: 'partyTwoType',
    text: 'Is the second party an individual or a company?',
    subtext: 'This question appears for Mutual NDAs.',
    type: 'radio',
    options: ['Individual', 'Company'],
    next: () => 'partyTwoName',
  },
  {
    id: 'partyTwoName',
    text: "What is the second party's name?",
    subtext: 'This question appears for Mutual NDAs.',
    type: 'text',
    next: () => 'purpose',
    validate: answer => answer.trim() !== '',
  },
  {
    id: 'purpose',
    text: 'What is the purpose of this agreement?',
    subtext: 'e.g., "to evaluate a potential business relationship"',
    type: 'longtext',
    next: () => 'governingLaw',
    validate: answer => answer.trim() !== '',
  },
  {
    id: 'governingLaw',
    text: 'Which state law will govern this agreement?',
    type: 'radio',
    options: ['California', 'New York', 'Delaware', 'Texas'],
    next: () => 'term',
  },
  {
    id: 'term',
    text: 'What is the term of this agreement (in years)?',
    type: 'text',
    next: () => null, // End of questionnaire
    validate: answer => !isNaN(parseInt(answer)) && parseInt(answer) > 0,
  },
];
