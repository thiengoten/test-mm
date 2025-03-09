import * as z from 'zod'

export const transactionSchema = z.object({
  amount: z.coerce.number().positive({ message: 'Amount must be positive' }),
  type: z.enum(['income', 'expense'], {
    required_error: 'Please select a transaction type',
  }),
  description: z.string().optional(),
  category_id: z.string({ required_error: 'Please select a category' }),
  date: z.date({
    required_error: 'Please select a date',
  }),
})

// Type for our form data
export type TransactionFormValues = z.infer<typeof transactionSchema>
