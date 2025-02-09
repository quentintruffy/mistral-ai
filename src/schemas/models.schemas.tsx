import { z } from 'zod';

const ModelSchema = z.object({
  id: z.string(),
  object: z.string(),
  created: z.number(),
  owned_by: z.string(),
  capabilities: z.object({
    completion_chat: z.boolean(),
    completion_fim: z.boolean(),
    function_calling: z.boolean(),
    fine_tuning: z.boolean(),
    vision: z.boolean(),
  }),
  name: z.string(),
  description: z.string(),
  max_context_length: z.number(),
  aliases: z.array(z.string()),
  deprecation: z.number().nullable(),
  default_model_temperature: z.number().nullable(),
  type: z.string(),
});
const ModelsSchema = z.array(ModelSchema);

type ModelType = z.infer<typeof ModelSchema>;
type ModelsType = z.infer<typeof ModelsSchema>;

export { ModelSchema, ModelsSchema };
export type { ModelsType, ModelType };
