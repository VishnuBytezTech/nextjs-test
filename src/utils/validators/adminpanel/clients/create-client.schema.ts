// import { z } from 'zod';
// import { messages } from '@/config/messages';
// // import { validateEmail } from '@/utils/validators/common-rules';


// // Assuming validateEmail is a Zod schema or custom function for email validation
// const validateEmail = z.string().email({ message: 'Invalid email address format' });

// const phoneRegex = /^[0-9]*$/; // Regular expression to ensure phone contains only numeric characters

// // form zod validation schema
// export const createClientSchema = z.object({
//   // id: z.string().optional(), 
//   name: z.string().min(1, { message: messages.fullNameIsRequired }),
//   country: z.string().min(1, { message: messages.countryIsRequired }),
  
//   email: validateEmail,
//   phone: z.string()
//     .regex(phoneRegex, { message: 'Phone number must contain only numeric characters' })
    
// });

// // generate form types from zod validation schema
// export type CreateClientInput = z.infer<typeof createClientSchema>;



import { z } from 'zod';
import { messages } from '@/config/messages';
const validateEmail = z.string().email({ message: 'Invalid email address format' })

const phoneRegex = /^[0-9]*$/;
export const createClientSchema = z.object({
  name: z.string().min(1, { message: messages.fullNameIsRequired }),
  country: z.object({
    id: z.string(),
    iso: z.string(),
    name: z.string()
  }),
  email: validateEmail,
  phone: z.string()
    .regex(phoneRegex, { message: 'Phone number must contain only numeric characters' })
});
export type CreateClientInput = z.infer<typeof createClientSchema>;



