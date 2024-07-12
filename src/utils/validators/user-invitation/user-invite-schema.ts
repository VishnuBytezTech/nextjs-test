import { z } from 'zod';
import { messages } from '@/config/messages';

export const sendUserInviteSchema = z.object({
  email: z.string().min(1, { message: messages.emailIsRequired }).email({ message: messages.invalidEmail }),
});

// generate form types from zod validation schema
export type SendUserInviteInput = z.infer<typeof sendUserInviteSchema>;
