import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from '@/utils/validators/common-rules';

export const jobcardFormSchema = z.object({
    client : z.string().min(1, {message: messages.clientNameIsRequired}),
    commodity: z.string().min(1,  {message: messages.commodityIsRequired}),
    country: z.string().min(1,  {message: messages.countryIsRequired}),
    address: z.string().min(1,  {message: messages.addressIsRequired}),
    city: z.string().min(1,  {message: messages.addressIsRequired}),
    description: z.string().optional()
    
    // typeofjob: z.string().min(1,  {message: messages.typeofjobIsRequired}),
    // status: z.string().min(1,  {message: messages.statusIsRequired}),
    // startDate: z.string().min(1,  {message: messages.startDateIsRequired}),
    // endDate: z.string().min(1,  {message: messages.endDateIsRequired}),
})

export type createJobcardInput = z.infer<typeof jobcardFormSchema>;


