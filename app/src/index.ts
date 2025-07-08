import express from 'express';
import cors from 'cors';
import {openAI} from '@genkit-ai/openai';
import {generate} from '@genkit-ai/ai';
import {SwaggerGeneratorModel} from './models/SwaggerGeneratorModel';
import {SwaggerPromptService} from './services/SwaggerPromptService';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.json());
