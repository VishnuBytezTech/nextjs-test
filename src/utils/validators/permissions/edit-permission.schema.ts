import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const editPermissionSchema = z.object({
  routeName: z.string().min(1, { 
    message: messages.routeNameIsRequired 
  }),
  pageName: z.string().min(1, { 
    message: messages.pageNameIsRequired 
  }),
  status: z.boolean().refine(val => val !== undefined, {
    message: messages.statusIsRequired
  }),
  actions: z.string().refine(value => isNaN(parseFloat(value)), {
    message: messages.actionsCannotNumber
  })
});

// generate form types from zod validation schema
export type editPermissionInput = z.infer<typeof editPermissionSchema>;
