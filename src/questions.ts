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

const Quiz = defineSchema(
  'Quiz',
  z.array(z.object({
    question: z.string(),
    answer: z.string()
  }))
);

async function generateResponse() {

  const newPrompt = await prompt('quiz');

  const result = await newPrompt.generate<typeof Quiz>({
    input: {
      information: `
      Charles Darwin was a renowned naturalist and biologist born in Shrewsbury, England, on February 12, 1809. He was the fifth of six children born to Robert Darwin and Susannah Wedgwood. Growing up, Darwin showed an interest in nature and collecting specimens, a passion that would shape his future
studies and career. After completing his education at the University of Edinburgh and the University
of Cambridge, Darwin embarked on a five-year voyage on the HMS Beagle, where he collected
specimens and made observations that would later form the basis of his famous theory of evolution
by natural selection. Upon his return to England, Darwin began to develop his ideas on evolution and natural selection, spurred on by the observations he had made on the Beagle voyage. He spent over 20 years studying
and experimenting, eventually publishing his seminal work "On the Origin of Species" in 1859. This
book presented his theory that all species of life have descended over time from common ancestors
and that the process of natural selection, where organisms with advantageous traits are more likely to
survive and reproduce, is the driving force behind evolution. Darwin's theory revolutionized the field
of biology and had far-reaching implications for many other fields, including psychology, anthropology, and philosophy. Despite the controversy that initially surrounded his theory, Darwin continued to write and publish
works on evolution, including "The Descent of Man" and "The Expression of the Emotions in Man and
Animals." He also became a well-respected figure in the scientific community, receiving numerous
awards and honors, including the Copley Medal from the Royal Society in 1864. Darwin died on April
19, 1882, at the age of 73, leaving behind a legacy that continues to influence scientific research and
discourse to this day.
      `
    }
  });

  console.log(result.output())
}

generateResponse();