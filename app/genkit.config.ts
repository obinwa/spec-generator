import {defineConfig} from '@genkit-ai/core';
import {expressServer} from '@genkit-ai/express';
import {openai} from '@genkit-ai/openai';

export default defineConfig({
  plugins: [
    expressServer(),
    openai({
      apiKey: process.env.OPENAI_API_KEY,
    })
  ]
});