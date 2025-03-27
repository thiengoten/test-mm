import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'

type SelectDateRangeProps = {
  onRangeChange?: (from: string, to: string) => void
}

const SelectDateRange = ({ onRangeChange }: SelectDateRangeProps) => {
  const [fromValue, setFromValue] = useState<string>('0')
  const [toValue, setToValue] = useState<string>('12')

  const fromOptions = ['0', '12', '24', '36', '48']
  const allToOptions = ['12', '24', '36', '48', 'infinity']

  // Filter toOptions based on fromValue
  const toOptions = allToOptions.filter((option) => {
    if (option === 'infinity') return true
    return parseInt(option) > parseInt(fromValue)
  })

  useEffect(() => {
    // Validate that 'from' is less than 'to'
    if (fromValue !== '0' && toValue !== 'infinity') {
      const fromNum = parseInt(fromValue)
      const toNum = parseInt(toValue)
      if (fromNum >= toNum) {
        // Reset to value to next valid option
        const nextValidTo = toOptions.find(
          (opt) => opt === 'infinity' || parseInt(opt) > fromNum
        )
        setToValue(nextValidTo || 'infinity')
      }
    }

    // Notify parent of changes
    onRangeChange?.(fromValue, toValue)
  }, [fromValue, toValue, onRangeChange, toOptions])

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='from-select'>From</Label>
          <Select value={fromValue} onValueChange={setFromValue}>
            <SelectTrigger id='from-select'>
              <SelectValue placeholder='Select months' />
            </SelectTrigger>
            <SelectContent>
              {fromOptions.map((value) => (
                <SelectItem key={value} value={value}>
                  {value} months
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='to-select'>To</Label>
          <Select value={toValue} onValueChange={setToValue}>
            <SelectTrigger id='to-select'>
              <SelectValue placeholder='Select months' />
            </SelectTrigger>
            <SelectContent>
              {toOptions.map((value) => (
                <SelectItem key={value} value={value}>
                  {value === 'infinity' ? '∞' : `${value} months`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default SelectDateRange
