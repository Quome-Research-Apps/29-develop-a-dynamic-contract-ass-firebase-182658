import type { Clause, AnswerRecord } from './types';

const getParties = (answers: AnswerRecord) => {
  if (answers.agreementType === 'One-way NDA') {
    return {
      disclosingParty: answers.disclosingPartyName,
      receivingParty: answers.receivingPartyName,
    };
  }
  return {
    partyOne: answers.partyOneName,
    partyTwo: answers.partyTwoName,
  };
};

export const clauses: Clause[] = [
  // --- Introduction ---
  {
    id: 'intro-oneway',
    name: 'One-Way NDA Introduction',
    category: 'Introduction',
    conditions: answers => answers.agreementType === 'One-way NDA',
    text: `This Non-Disclosure Agreement (the "Agreement") is entered into as of {currentDate} (the "Effective Date"), by and between {disclosingParty}, ("Disclosing Party"), and {receivingParty}, ("Receiving Party").`,
  },
  {
    id: 'intro-mutual',
    name: 'Mutual NDA Introduction',
    category: 'Introduction',
    conditions: answers => answers.agreementType === 'Mutual NDA',
    text: `This Mutual Non-Disclosure Agreement (the "Agreement") is entered into as of {currentDate} (the "Effective Date"), by and between {partyOne}, and {partyTwo} (each a "Party" and collectively the "Parties").`,
  },
  // --- Definitions ---
  {
    id: 'def-purpose',
    name: 'Purpose Definition',
    category: 'Definitions',
    conditions: () => true,
    text: `The parties wish to discuss and evaluate a potential business relationship related to {purpose} (the "Purpose"). In connection with the Purpose, each party may disclose certain confidential information to the other.`,
  },
  {
    id: 'def-confidential-info-mutual',
    name: 'Confidential Information Definition (Mutual)',
    category: 'Definitions',
    conditions: answers => answers.agreementType === 'Mutual NDA',
    text: `"Confidential Information" means any data or information that is proprietary to the Disclosing Party and not generally known to the public, whether in tangible or intangible form, whenever and however disclosed, including, but not limited to: (i) any marketing strategies, plans, financial information, or projections, operations, sales estimates, business plans and performance results relating to the past, present or future business activities of such Party, its affiliates, subsidiaries and affiliated companies; (ii) plans for products or services, and customer or supplier lists; (iii) any scientific or technical information, invention, design, process, procedure, formula, improvement, technology or method; (iv) any concepts, reports, data, know-how, works-in-progress, designs, development tools, specifications, computer software, source code, object code, flow charts, databases, inventions, information and trade secrets; and (v) any other information that should reasonably be recognized as confidential information of the Disclosing Party.`,
  },
  {
    id: 'def-confidential-info-oneway',
    name: 'Confidential Information Definition (One-Way)',
    category: 'Definitions',
    conditions: answers => answers.agreementType === 'One-way NDA',
    text: `For purposes of this Agreement, "Confidential Information" shall include all information or material that has or could have commercial value or other utility in the business in which Disclosing Party is engaged.`,
  },
  // --- Obligations ---
  {
    id: 'obligation-non-use',
    name: 'Obligation of Non-Use',
    category: 'Obligations',
    conditions: () => true,
    text: `The Receiving Party agrees not to use any Confidential Information for any purpose except to evaluate and engage in discussions concerning the Purpose. Any other use of Confidential Information by the Receiving Party is strictly prohibited.`,
  },
  {
    id: 'obligation-non-disclosure',
    name: 'Obligation of Non-Disclosure',
    category: 'Obligations',
    conditions: () => true,
    text: `The Receiving Party agrees to hold the Confidential Information in strict confidence and to take all reasonable precautions to protect such Confidential Information.`,
  },
  // --- Term and Termination ---
  {
    id: 'term-and-termination',
    name: 'Term and Termination',
    category: 'Term and Termination',
    conditions: answers => !!answers.term,
    text: `This Agreement shall remain in effect for a period of {term} year(s) from the Effective Date, unless terminated earlier by either Party with thirty (30) days prior written notice. The obligations of confidentiality, however, shall survive the termination of this Agreement.`,
  },
  // --- Miscellaneous ---
  {
    id: 'misc-governing-law-ca',
    name: 'Governing Law - California',
    category: 'Miscellaneous',
    conditions: answers => answers.governingLaw === 'California',
    text: `This Agreement shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of laws principles.`,
  },
  {
    id: 'misc-governing-law-ny',
    name: 'Governing Law - New York',
    category: 'Miscellaneous',
    conditions: answers => answers.governingLaw === 'New York',
    text: `This Agreement shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of laws principles.`,
  },
  {
    id: 'misc-governing-law-de',
    name: 'Governing Law - Delaware',
    category: 'Miscellaneous',
    conditions: answers => answers.governingLaw === 'Delaware',
    text: `This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of laws principles.`,
  },
    {
    id: 'misc-governing-law-tx',
    name: 'Governing Law - Texas',
    category: 'Miscellaneous',
    conditions: answers => answers.governingLaw === 'Texas',
    text: `This Agreement shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of laws principles.`,
  },
  {
    id: 'misc-entire-agreement',
    name: 'Entire Agreement',
    category: 'Miscellaneous',
    conditions: () => true,
    text: `This Agreement contains the entire agreement between the Parties concerning the subject matter hereof and supersedes all prior agreements, understandings, discussions, and negotiations, whether oral or written.`,
  },
];
