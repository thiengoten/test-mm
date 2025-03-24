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
import ordinalDateFormatter from '@/utils/date'
import { CalendarIcon, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid' // You may need to install this package

type Criterion = {
  id: string
  type: 'modified_time' | 'create_time'
  operator: 'before' | 'after'
  date: Date
}

type SelectConditionsDateProps = {
  onChange?: (criteria: Omit<Criterion, 'id'>[]) => void
  defaultCriteria?: Omit<Criterion, 'id'>[]
  selectType?: 'file' | 'folder' | 'duplicate'
}

const SelectConditionsDate = ({
  onChange,
  defaultCriteria,
  selectType,
}: SelectConditionsDateProps = {}) => {
  const [criteria, setCriteria] = useState<Criterion[]>(
    defaultCriteria?.map((c) => ({ ...c, id: uuidv4() })) || [
      {
        id: uuidv4(),
        type: 'modified_time',
        operator: 'before',
        date: new Date(),
      },
    ]
  )

  const handleAdd = () => {
    const newCriteria = [
      ...criteria,
      {
        id: uuidv4(),
        type: 'modified_time' as const,
        operator: 'before' as const,
        date: new Date(),
      },
    ]
    setCriteria(newCriteria)
    notifyChange(newCriteria)
  }

  const handleRemove = (id: string) => {
    const newCriteria = criteria.filter((c) => c.id !== id)
    setCriteria(newCriteria)
    notifyChange(newCriteria)
  }

  const handleChange = (
    id: string,
    field: keyof Omit<Criterion, 'id'>,
    value: any
  ) => {
    const newCriteria = criteria.map((c) =>
      c.id === id ? { ...c, [field]: value } : c
    )
    setCriteria(newCriteria)
    notifyChange(newCriteria)
  }

  const notifyChange = (updatedCriteria: Criterion[]) => {
    if (onChange) {
      // Strip out the id before passing to parent
      onChange(updatedCriteria.map(({ id, ...rest }) => rest))
    }
  }

  return (
    <div className='space-y-2 border rounded-md p-4'>
      <div className='block mb-2 text-sm font-medium'>Criteria</div>

      {criteria.map((criterion, index) => (
        <div key={criterion.id} className='grid grid-cols-12 gap-2 items-start'>
          <div className='col-span-4'>
            <Select
              value={criterion.type}
              onValueChange={(value) =>
                handleChange(
                  criterion.id,
                  'type',
                  value as 'modified_time' | 'create_time'
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Select type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='modified_time'>Modified time</SelectItem>
                <SelectItem value='create_time'>Create time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='col-span-3'>
            <Select
              value={criterion.operator}
              onValueChange={(value) =>
                handleChange(
                  criterion.id,
                  'operator',
                  value as 'before' | 'after'
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Operator' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='before'>Before</SelectItem>
                <SelectItem value='after'>After</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='col-span-4'>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className='w-full pl-3 text-left font-normal'
                >
                  {criterion.date ? (
                    ordinalDateFormatter(criterion.date)
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={criterion.date}
                  onSelect={(date) =>
                    date && handleChange(criterion.id, 'date', date)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className='col-span-1 flex items-center'>
            {index > 0 && (
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => handleRemove(criterion.id)}
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
        onClick={handleAdd}
      >
        <PlusCircle className='mr-2 h-4 w-4' />
        Add criteria
      </Button>
    </div>
  )
}

export default SelectConditionsDate
