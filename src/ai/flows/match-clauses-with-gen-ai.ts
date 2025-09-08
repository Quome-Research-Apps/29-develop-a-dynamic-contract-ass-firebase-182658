'use server';

/**
 * @fileOverview Uses GenAI to match clauses with user responses using semantic similarity.
 *
 * - matchClausesWithGenAI - A function that matches clauses with user responses.
 * - MatchClausesInput - The input type for the matchClausesWithGenAI function.
 * - MatchClausesOutput - The return type for the matchClausesWithGenAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchClausesInputSchema = z.object({
  userResponse: z.string().describe('The user response to a questionnaire.'),
  clause: z.string().describe('A legal clause from the clause library.'),
});
export type MatchClausesInput = z.infer<typeof MatchClausesInputSchema>;

const MatchClausesOutputSchema = z.object({
  matchScore: z
    .number()
    .describe(
      'A score indicating the relevance of the clause to the user response, from 0 to 1.'
    ),
  reason: z.string().describe('The reasoning behind the match score.'),
});
export type MatchClausesOutput = z.infer<typeof MatchClausesOutputSchema>;

export async function matchClausesWithGenAI(
  input: MatchClausesInput
): Promise<MatchClausesOutput> {
  return matchClausesFlow(input);
}

const matchClausesPrompt = ai.definePrompt({
  name: 'matchClausesPrompt',
  input: {schema: MatchClausesInputSchema},
  output: {schema: MatchClausesOutputSchema},
  prompt: `You are an expert legal assistant. You are given a user response to a questionnaire and a legal clause. You must determine how well the clause matches the user response on a scale from 0 to 1, with 0 being not at all relevant and 1 being perfectly relevant. You must also provide a brief explanation for your reasoning.

User Response: {{{userResponse}}}
Legal Clause: {{{clause}}}

Output in JSON format:
{
  "matchScore": "<relevance score between 0 and 1>",
    "reason": "<brief explanation for the score>"
}
`,
});

const matchClausesFlow = ai.defineFlow(
  {
    name: 'matchClausesFlow',
    inputSchema: MatchClausesInputSchema,
    outputSchema: MatchClausesOutputSchema,
  },
  async input => {
    const {output} = await matchClausesPrompt(input);
    return output!;
  }
);
