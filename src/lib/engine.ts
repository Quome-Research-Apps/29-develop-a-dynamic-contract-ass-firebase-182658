import type { AnswerRecord, Clause } from './types';
import { clauses as clauseLibrary } from './clauses';

const CATEGORY_ORDER: Record<string, number> = {
  Introduction: 1,
  Definitions: 2,
  Obligations: 3,
  Confidentiality: 4,
  'Term and Termination': 5,
  Miscellaneous: 6,
};

export function assembleContract(answers: AnswerRecord): string {
  // 1. Filter clauses based on conditions
  const selectedClauses = clauseLibrary.filter(clause =>
    clause.conditions(answers)
  );

  // 2. Sort clauses by category order
  const sortedClauses = selectedClauses.sort((a, b) => {
    const orderA = CATEGORY_ORDER[a.category] || 99;
    const orderB = CATEGORY_ORDER[b.category] || 99;
    return orderA - orderB;
  });

  // 3. Assemble the document
  let contractText = `## ${answers.agreementType?.toUpperCase()} ##\n\n`;
  let currentCategory = '';
  let clauseNumber = 1;

  for (const clause of sortedClauses) {
    // Add category heading if it's a new category
    if (clause.category !== currentCategory) {
      currentCategory = clause.category;
      contractText += `\n### ${currentCategory.toUpperCase()} ###\n\n`;
      clauseNumber = 1; // Reset clause number for new section
    }

    // Replace placeholders in the clause text
    let processedText = clause.text;
    const placeholders = {
        ...answers,
        currentDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'}),
    };

    for (const key in placeholders) {
      const regex = new RegExp(`{${key}}`, 'g');
      processedText = processedText.replace(regex, placeholders[key]);
    }
    
    contractText += `${clauseNumber}. ${processedText}\n\n`;
    clauseNumber++;
  }

  return contractText;
}
