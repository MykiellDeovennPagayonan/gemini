import { googleAI } from '@genkit-ai/googleai';
import { dotprompt } from '@genkit-ai/dotprompt';
import { configureGenkit } from '@genkit-ai/core';
import { generate } from '@genkit-ai/ai';
import {
  geminiPro
} from '@genkit-ai/googleai';

import * as dotenv from 'dotenv';

const prompt = 'Tell me a joke.';

dotenv.config()

configureGenkit({
  plugins: [
    googleAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY}),
    dotprompt(),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
})


async function generateResponse() {
  const llmResponse = await generate({
    model: geminiPro,
    prompt: prompt
  });

  console.log(llmResponse.text());
}

generateResponse();