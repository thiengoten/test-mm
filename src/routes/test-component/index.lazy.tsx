import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import SelectWithConditons from '@/routes/test-component/-components/SelectWithConditons'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
export const Route = createLazyFileRoute('/test-component/')({
  component: RouteComponent,
})

type SelectValue = 'file' | 'version' | 'duplicate'

function RouteComponent() {
  const [value, setValue] = useState<SelectValue>('file')
  console.log('🚀 ~ RouteComponent ~ value:', value)
  return (
    <div className='space-y-2 border rounded-md p-4'>
      <Select
        value={value}
        onValueChange={(value) => {
          setValue(value as SelectValue)
        }}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Select a method' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='file'>Analyze File</SelectItem>
            <SelectItem value='version'>Analyze Version</SelectItem>
            <SelectItem value='duplicate'>Analyze Duplicate</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <SelectWithConditons selectMethod={value} />
    </div>
  )
}
