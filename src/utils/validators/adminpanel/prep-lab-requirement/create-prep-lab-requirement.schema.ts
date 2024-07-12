import { z } from 'zod';
import { messages } from '@/config/messages';



export const createPrepLabRequirementSchema = z.object({
  name: z.string().min(1, { message: messages.prepLabRequirementNameIsRequired }),

});


export type CreatePrepLabRequirementInput = z.infer<typeof createPrepLabRequirementSchema>;


