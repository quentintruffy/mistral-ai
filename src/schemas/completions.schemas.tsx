import { z } from 'zod';

const CompletionSchema = z.object({
  model: z.string(),
  temperature: z.number(),
  top_p: z.number(),
  max_tokens: z.number(),
  stream: z.boolean(),
  stop: z.string(),
  random_seed: z.number(),
  messages: z.array(
    z.object({
      role: z.string(),
      content: z.string(),
    }),
  ),
  response_format: z.object({
    type: z.string(),
  }),
  tools: z.array(
    z.object({
      type: z.string(),
      function: z.object({
        name: z.string(),
        description: z.string(),
        strict: z.boolean(),
        parameters: z.object({}),
      }),
    }),
  ),
  tool_choice: z.string(),
  presence_penalty: z.number(),
  frequency_penalty: z.number(),
  n: z.number(),
  prediction: z.object({
    type: z.string(),
    content: z.string(),
  }),
  safe_prompt: z.boolean(),
});
const CompletionsSchema = z.array(CompletionSchema);

type CompletionType = z.infer<typeof CompletionSchema>;
type CompletionsType = z.infer<typeof CompletionsSchema>;

export { CompletionSchema, CompletionsSchema };
export type { CompletionsType, CompletionType };
