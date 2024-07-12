import { z } from 'zod';
import { messages } from '@/config/messages';




export const createJobTypeSchema = z.object({
  name: z.string().min(1, { message: messages.jobTypeNameIsRequired }),

});

// generate form types from zod validation schema
export type CreateJobTypeInput = z.infer<typeof createJobTypeSchema>;