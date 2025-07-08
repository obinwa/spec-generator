import { configureGenkit } from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/googleai';
import {expressServer} from '@genkit-ai/express';

export default configureGenkit({
  plugins: [
    expressServer(),
    googleAI({
      apiKey: process.env.GOOGLE_API_KEY,
    }),
  ],
  logLevel: 'info',
});
