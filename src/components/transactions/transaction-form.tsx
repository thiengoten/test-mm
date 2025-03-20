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
  TransactionFormValuesWithCriteria,
  transactionSchemaWithCriteria,
} from '@/components/transactions/transtion.helper'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DialogTypes, useDialog } from '@/providers'
import ordinalDateFormatter from '@/utils/date'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
const categories = [
  { id: '1', name: 'Food', is_default: true },
  { id: '2', name: 'Transportation', is_default: true },
  { id: '3', name: 'Housing', is_default: true },
  { id: '4', name: 'Entertainment', is_default: true },
  { id: '5', name: 'Utilities', is_default: true },
  { id: '6', name: 'Salary', is_default: true },
  { id: '7', name: 'Investments', is_default: true },
]

type TransactionsFormProps = {
  isEdit?: boolean
}

// Add the criteria types to your schema

export function TransactionForm({ isEdit = false }: TransactionsFormProps) {
  const { openDialog, closeDialog, hideAllDialog } = useDialog()
  const [isDirty, setIsDirty] = useState(false)

  const form = useForm<TransactionFormValuesWithCriteria>({
    resolver: zodResolver(transactionSchemaWithCriteria),
    defaultValues: {
      amount: 0,
      type: 'expense',
      description: '',
      category_id: '',
      date: new Date(),
      criteria: [
        { type: 'modified_time', operator: 'before', date: new Date() },
      ],
    },
  })

  // Set up field array for criteria
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'criteria',
  })

  useEffect(() => {
    const subscription = form.watch(() => {
      setIsDirty(true)
    })
    return () => subscription.unsubscribe()
  }, [form])

  const onSubmit = (data: TransactionFormValuesWithCriteria) => {
    console.log('Form submitted:', data)
    hideAllDialog()
  }

  const handleCancel = () => {
    if (isDirty) {
      openDialog({
        type: DialogTypes.ALERT_DIALOG,
        title: 'Discard Changes',
        content:
          'You have unsaved changes. Are you sure you want to discard them?',
        okText: 'Discard',
        cancelText: 'Continue Editing',
      })
    } else {
      closeDialog()
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='income'>Income</SelectItem>
                    <SelectItem value='expense'>Expense</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    step='0.01'
                    placeholder='0.00'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='category_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories
                      .filter((c) =>
                        form.watch('type') === 'income'
                          ? ['6', '7'].includes(c.id)
                          : !['6', '7'].includes(c.id)
                      )
                      .map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder='Description' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className='w-full pl-3 text-left font-normal'
                      >
                        {field.value ? (
                          ordinalDateFormatter(field.value)
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Criteria section */}
          <div className='space-y-2 border rounded-md p-4'>
            <FormLabel className='block mb-2'>Criteria</FormLabel>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className='grid grid-cols-12 gap-2 items-start'
              >
                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name={`criteria.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select type' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='modified_time'>
                              Modified time
                            </SelectItem>
                            <SelectItem value='create_time'>
                              Create time
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div className='col-span-3'>
                  <FormField
                    control={form.control}
                    name={`criteria.${index}.operator`}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Operator' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='before'>Before</SelectItem>
                            <SelectItem value='after'>After</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name={`criteria.${index}.date`}
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className='w-full pl-3 text-left font-normal'
                              >
                                {field.value ? (
                                  ordinalDateFormatter(field.value)
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </div>

                <div className='col-span-1 flex items-center'>
                  {index > 0 && (
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      onClick={() => remove(index)}
                      className='h-8 w-8 p-0'
                    >
                      ×
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <Button
              type='button'
              variant='outline'
              size='sm'
              className='mt-2'
              onClick={() =>
                append({
                  type: 'modified_time',
                  operator: 'before',
                  date: new Date(),
                })
              }
            >
              <PlusCircle className='mr-2 h-4 w-4' />
              Add criteria
            </Button>
          </div>
          <div className='flex justify-between gap-2'>
            <div>
              <Button type='button' variant='secondary' onClick={handleCancel}>
                Cancel
              </Button>
            </div>
            <div>
              <Button type='submit'>Save Transaction</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
