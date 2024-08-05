import { googleAI } from '@genkit-ai/googleai';
import { dotprompt, prompt } from '@genkit-ai/dotprompt';
import { configureGenkit } from '@genkit-ai/core';
import { MessageData } from '@genkit-ai/ai/model';
import { defineSchema } from '@genkit-ai/core';
import z from 'zod';

import * as dotenv from 'dotenv';

dotenv.config()

configureGenkit({
  plugins: [
    googleAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY,  apiVersion: 'v1beta' }),
    dotprompt(),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

async function generateResponse() {

  const newPrompt = await prompt('create_menu');

  const result = await newPrompt.generate({
    input: {
      theme: `burger`,
    }
  });

  const output = result.output()

  console.log(output)
}

generateResponse();