import { z } from 'zod';
import { messages } from '@/config/messages';




export const createCommiditySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: messages.commodityNameIsRequired }),

});

// generate form types from zod validation schema
export type CreateCommodityInput = z.infer<typeof createCommiditySchema>;