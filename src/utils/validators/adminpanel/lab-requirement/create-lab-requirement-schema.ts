import { z } from 'zod';
import { messages } from '@/config/messages';


export const createLabRequirementSchema = z.object({
  name: z.string().min(1, { message: messages.labRequirementNameIsRequired }),

});


export type CreateLabRequirementInput = z.infer<typeof createLabRequirementSchema>;


