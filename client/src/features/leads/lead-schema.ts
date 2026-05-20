import { z } from 'zod'

export const leadFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().toLowerCase().email('Enter a valid email'),
  status: z.enum(['new', 'contacted', 'qualified', 'lost']),
  source: z.enum(['website', 'instagram', 'referral']),
})

export type LeadFormSchemaValues = z.infer<typeof leadFormSchema>

