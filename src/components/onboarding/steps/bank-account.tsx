import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useImperativeHandle } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export type BankAccountRef = {
  submitForm: () => Promise<boolean>
  getForm: () => UseFormReturn<BankAccountFormData>
}

type BankAccountStepProps = {
  ref: React.RefObject<BankAccountRef | null>
  defaultValues?: BankAccountFormData
}

const bankAccountSchema = z.object({
  bankName: z.string().optional(),
  accountType: z.string().optional(),
  accountNumber: z.string().optional(),
  routingNumber: z.string().optional(),
})

export type BankAccountFormData = z.infer<typeof bankAccountSchema>

export const BankAccountStep = ({
  ref,
  defaultValues,
}: BankAccountStepProps) => {
  const form = useForm<BankAccountFormData>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: defaultValues || {
      bankName: '',
      accountType: '',
      accountNumber: '',
      routingNumber: '',
    },
  })

  // Add this useEffect to trigger validation on mount if there are defaultValues
  useEffect(() => {
    if (defaultValues) {
      form.trigger()
    }
  }, [form, defaultValues])

  const onSubmit = (data: BankAccountFormData) => {
    console.log('Bank Account:', data)
  }

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      // Trigger validation first
      const isValid = await form.trigger()
      if (!isValid) {
        return false
      }
      await form.handleSubmit(onSubmit)()
      return true
    },
    getForm: () => form,
  }))

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='bankName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter your bank name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='accountType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select account type' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='checking'>Checking</SelectItem>
                  <SelectItem value='savings'>Savings</SelectItem>
                  <SelectItem value='business'>Business</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='accountNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Enter your account number'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='routingNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Routing Number</FormLabel>
              <FormControl>
                <Input placeholder='Enter your routing number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
