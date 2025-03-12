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

const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  country: z.string().min(1, 'Please select your country'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
})

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>

type PersonalInfoStepProps = {
  ref: React.RefObject<PersonalInfoRef | null>
  defaultValues?: PersonalInfoFormData
}

export type PersonalInfoRef = {
  submitForm: () => Promise<boolean>
  getForm: () => UseFormReturn<PersonalInfoFormData>
}

export const PersonalInfoStep = ({
  ref,
  defaultValues,
}: PersonalInfoStepProps) => {
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: defaultValues || {
      fullName: '',
      country: '',
      city: '',
      phoneNumber: '',
    },
    mode: 'all',
  })

  useEffect(() => {
    if (defaultValues) {
      form.trigger()
    }
  }, [form, defaultValues])

  const onSubmit = (data: PersonalInfoFormData) => {
    console.log('Personal Info:', data)
    //TODO: Call API to save personal info
    // console.log(onNext)
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
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder='John Doe' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='country'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  // Trigger validation manually after selection
                  form.trigger('country')
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger onBlur={field.onBlur}>
                    <SelectValue placeholder='Select your country' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='us'>United States</SelectItem>
                  <SelectItem value='uk'>United Kingdom</SelectItem>
                  <SelectItem value='ca'>Canada</SelectItem>
                  <SelectItem value='au'>Australia</SelectItem>
                  {/* Add more countries as needed */}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='city'
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder='New York' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder='+1 (555) 000-0000' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

PersonalInfoStep.displayName = 'PersonalInfoStep'
