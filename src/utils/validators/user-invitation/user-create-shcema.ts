import { messages } from '@/config/messages';
import { z } from 'zod';

export const userCreateSchema = z.object({
    firstName: z.string().min(1, {message: messages.firstNameRequired}),
    lastName: z.string().min(1, {message: messages.lastNameRequired}),

    country: z.string().min(1, {message: messages.countryIsRequired}),
    timezone: z.string().min(1, {message: messages.timezoneIsRequired}),
    
    password: z.string().min(1, {message: messages.passwordIsRequired}),
    confirmPassword: z.string().min(1, {message: messages.confirmPasswordIsRequired}),
     
    
})

export type userCreateInput = z.infer<typeof userCreateSchema >