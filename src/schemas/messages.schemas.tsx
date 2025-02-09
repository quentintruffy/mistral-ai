import { z } from 'zod';

const MessageSchema = z.object({
  id: z.string(),
  object: z.string(),
  model: z.string(),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number(),
  }),
  created: z.number(),
  choices: z.array(
    z.object({
      index: z.number(),
      message: z.object({
        content: z.string(),
        tool_calls: z
          .array(
            z.object({
              id: z.string(),
              type: z.string(),
              function: z.object({
                name: z.string(),
                arguments: z.object({}),
              }),
              index: z.number(),
            }),
          )
          .nullable(),
        prefix: z.boolean().nullable().default(false),
        role: z.enum(['system', 'user', 'assistant', 'tool']),
      }),
      finish_reason: z.string(),
    }),
  ),
});
const MessagesSchema = z.array(MessageSchema);

type MessageType = z.infer<typeof MessageSchema>;
type MessagesType = z.infer<typeof MessagesSchema>;

export { MessageSchema, MessagesSchema };
export type { MessagesType, MessageType };
