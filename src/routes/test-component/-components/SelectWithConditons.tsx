import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Trash2 } from 'lucide-react'
import { forwardRef, useEffect, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'

type SelectWithConditonsProps = {
  selectMethod: 'file' | 'version' | 'duplicate'
}

// Base criteria type that we'll use for form state
type CriterionType = {
  field: string
  operator: string
  value: string
}

// Add logical operators between criteria
type LogicalOperator = 'AND' | 'OR'

type FormValues = {
  criteria: CriterionType[]
  // Store logical operators between criteria
  logicalOperators: LogicalOperator[]
}

export type SelectWithConditionsRef = {
  getLogicalOperators: () => LogicalOperator[]
  getCriteria: () => CriterionType[]
  getLogicalExpression: () => string
}

const SelectWithConditons = forwardRef<
  SelectWithConditionsRef,
  SelectWithConditonsProps
>(({ selectMethod }, ref) => {
  // Setup form with basic structure
  const form = useForm<FormValues>({
    defaultValues: {
      criteria: [
        {
          field: getDefaultField(selectMethod),
          operator: 'matches',
          value: '',
        },
      ],
      logicalOperators: [],
    },
  })

  // Reset form when method changes
  useEffect(() => {
    form.reset({
      criteria: [
        {
          field: getDefaultField(selectMethod),
          operator: 'matches',
          value: '',
        },
      ],
      logicalOperators: [],
    })
  }, [selectMethod, form])

  // Get default field based on method
  function getDefaultField(method: 'file' | 'version' | 'duplicate'): string {
    switch (method) {
      case 'file':
        return 'name'
      case 'version':
        return 'latest_version'
      case 'duplicate':
        return 'duplicate'
    }
  }

  // Get available fields based on the selected method
  const getAvailableFields = () => {
    switch (selectMethod) {
      case 'file':
        return [
          { value: 'name', label: 'Name' },
          { value: 'parent_folder', label: 'Parent folder name' },
          { value: 'created_time', label: 'Created time' },
          { value: 'modified_time', label: 'Modified time' },
          { value: 'type', label: 'Type' },
          { value: 'size', label: 'Size' },
        ]
      case 'version':
        return [
          { value: 'latest_version', label: 'Keep the latest version' },
          { value: 'modified_time', label: 'Modified time' },
          { value: 'type', label: 'Type' },
          { value: 'size', label: 'Size' },
        ]
      case 'duplicate':
        return [{ value: 'duplicate', label: 'Duplicate' }]
    }
  }

  // Get available operators based on field
  const getAvailableOperators = (field: string) => {
    if (field === 'name' || field === 'parent_folder' || field === 'type') {
      return [
        { value: 'matches', label: 'Matches' },
        { value: 'contains', label: 'Contains' },
        { value: 'starts_with', label: 'Starts with' },
        { value: 'ends_with', label: 'Ends with' },
      ]
    } else if (field === 'created_time' || field === 'modified_time') {
      return [
        { value: 'before', label: 'Before' },
        { value: 'after', label: 'After' },
      ]
    } else if (field === 'size') {
      return [
        { value: 'less_than', label: 'Less than' },
        { value: 'greater_than', label: 'Greater than' },
      ]
    } else {
      return [
        { value: 'equals', label: 'Equals' },
        { value: 'not_equals', label: 'Not equals' },
      ]
    }
  }

  // Add a new criteria field
  const addCriteria = (index: number) => {
    const criteria = form.getValues('criteria')
    const logicalOperators = form.getValues('logicalOperators')

    // Insert the new criterion after the specified index
    const newCriteria = [
      ...criteria.slice(0, index + 1),
      {
        field: getDefaultField(selectMethod),
        operator: 'matches',
        value: '',
      },
      ...criteria.slice(index + 1),
    ]

    // Insert a new logical operator (default to AND)
    const newLogicalOperators = [
      ...logicalOperators.slice(0, index),
      'AND' as LogicalOperator,
      ...logicalOperators.slice(index),
    ]

    form.setValue('criteria', newCriteria)
    form.setValue('logicalOperators', newLogicalOperators)
  }

  // Remove a criteria field
  const removeCriteria = (index: number) => {
    const criteria = form.getValues('criteria')
    const logicalOperators = form.getValues('logicalOperators')

    if (criteria.length > 1) {
      // Remove the criterion at the specified index
      const newCriteria = criteria.filter((_, i) => i !== index)

      // Remove the logical operator before this criterion (if not the first criterion)
      // or after it (if it's the first criterion)
      const newLogicalOperators =
        index === 0
          ? logicalOperators.slice(1)
          : [
              ...logicalOperators.slice(0, index - 1),
              ...logicalOperators.slice(index),
            ]

      form.setValue('criteria', newCriteria)
      form.setValue('logicalOperators', newLogicalOperators)
    }
  }

  // Generate a logical expression string based on criteria and operators
  const generateLogicalExpression = () => {
    const criteria = form.watch('criteria')
    const logicalOperators = form.watch('logicalOperators')

    if (criteria.length <= 1) return ''

    let expression = ''
    let needsParentheses = false

    // Check if we have mixed operators (both AND and OR)
    if (logicalOperators.length > 0) {
      const uniqueOperators = new Set(logicalOperators)
      needsParentheses = uniqueOperators.size > 1
    }

    if (needsParentheses) {
      // Complex expression with different operators
      let currentGroup = `1`
      let currentOperator = logicalOperators[0]

      for (let i = 1; i < criteria.length; i++) {
        const operator = logicalOperators[i - 1] || currentOperator

        if (i === 1) {
          currentGroup = `1 ${operator} 2`
        } else if (operator === currentOperator) {
          // Continue the current group
          currentGroup = `${currentGroup} ${operator} ${i + 1}`
        } else {
          // Switch operators, wrap the previous group in parentheses
          currentGroup = `(${currentGroup}) ${operator} ${i + 1}`
          currentOperator = operator
        }
      }

      expression = currentGroup
    } else if (logicalOperators.length > 0) {
      // Simple expression with all the same operator
      const operator = logicalOperators[0]
      const indices = Array.from({ length: criteria.length }, (_, i) => i + 1)
      expression = indices.join(` ${operator} `)
    }

    return expression
  }

  // Handle form submission with validation
  const onSubmit = (data: FormValues) => {
    // Perform validation based on the selected method
    let isValid = true

    // Simple validation example - could be replaced with zod validation
    for (const criterion of data.criteria) {
      if (!criterion.field || !criterion.operator || !criterion.value) {
        isValid = false
        break
      }
    }

    if (isValid) {
      console.log('Form data:', data)
      console.log('Logical expression:', generateLogicalExpression())
    } else {
      console.error('Form validation failed')
    }
  }

  const criteria = form.watch('criteria')
  const logicalOperators = form.watch('logicalOperators')

  useImperativeHandle(ref, () => ({
    getLogicalOperators: () => logicalOperators,
    getCriteria: () => criteria,
    getLogicalExpression: () => generateLogicalExpression(),
  }))

  return (
    <div className='space-y-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='mb-4'>
            <h3 className='text-sm font-medium'>Criteria</h3>
          </div>

          {criteria.map((criterion, index) => (
            <div key={index}>
              <div className='grid grid-cols-12 gap-2 items-start'>
                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name={`criteria.${index}.field`}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value)
                            // Update operator when field changes
                            const operators = getAvailableOperators(value)
                            form.setValue(
                              `criteria.${index}.operator`,
                              operators[0].value
                            )
                          }}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select a field' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {getAvailableFields().map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
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
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select operator' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {getAvailableOperators(
                              form.getValues(`criteria.${index}.field`)
                            ).map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name={`criteria.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='Enter value' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className='col-span-1 flex items-center space-x-1'>
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    onClick={() => addCriteria(index)}
                    className='h-8 w-8 p-0'
                  >
                    <Plus className='h-4 w-4' />
                  </Button>

                  {criteria.length > 1 && (
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      onClick={() => removeCriteria(index)}
                      className='h-8 w-8 p-0 text-destructive'
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  )}
                </div>
              </div>

              {/* Logical operator buttons between criteria */}
              {index < criteria.length - 1 && (
                <div className='flex my-2 ml-2'>
                  <Button
                    type='button'
                    variant={
                      logicalOperators[index] === 'AND' ? 'default' : 'outline'
                    }
                    size='sm'
                    onClick={() => {
                      const newOperators = [...logicalOperators]
                      newOperators[index] = 'AND'
                      form.setValue('logicalOperators', newOperators)
                    }}
                    className='mr-2 px-4'
                  >
                    And
                  </Button>
                  <Button
                    type='button'
                    variant={
                      logicalOperators[index] === 'OR' ? 'default' : 'outline'
                    }
                    size='sm'
                    onClick={() => {
                      const newOperators = [...logicalOperators]
                      newOperators[index] = 'OR'
                      form.setValue('logicalOperators', newOperators)
                    }}
                  >
                    Or
                  </Button>
                </div>
              )}
            </div>
          ))}

          {/* Display logical expression summary */}
          {criteria.length > 1 && (
            <div className='text-sm text-muted-foreground mt-2'>
              ({generateLogicalExpression()})
            </div>
          )}
        </form>
      </Form>
    </div>
  )
})

export default SelectWithConditons
