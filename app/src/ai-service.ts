import { googleAI } from '@genkit-ai/googleai';
import { genkit, z } from 'genkit';

// Configure GenKit with Google AI
const ai = genkit({
  plugins: [googleAI({
    apiKey: process.env.GOOGLE_API_KEY || 'AIzaSyACXDMG8NTf8epBQxfulHqRwGoo2phu9Zs',
  })],
  model: googleAI.model('gemini-2.5-flash', {
    temperature: 0.3
  }),
});


export async function generateResponse(prompt: string): Promise<string> {
  const result = await ai.generate({
    prompt,
  });

  return result.text;
}