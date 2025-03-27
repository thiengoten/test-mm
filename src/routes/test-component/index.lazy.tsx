import { Button } from '@/components/ui/button'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useCustomDialog } from './-components/CustomDialog'

export const Route = createLazyFileRoute('/test-component/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { openDialog, closeDialog, DialogComponent, setDialogLoading } =
    useCustomDialog()
  const [isLoading, setIsLoading] = useState(true)

  // Simulate API call with progress updates

  // Effect to handle the loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setDialogLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleOpenDialog = () => {
    openDialog({
      title: 'Processing Dialog',
      description: 'This dialog demonstrates a processing workflow',
      content: (
        <div className='space-y-4'>
          <p>This dialog stays open during processing:</p>
        </div>
      ),
      hasLoading: true,
      onConfirm: () => {},
      onCancel: () => {
        // Reset loading state when closing
        setIsLoading(false)
      },
      confirmText: isLoading ? 'Cancel Process' : 'Start Processing',
      footerLeftContent: (
        <div className='text-sm text-muted-foreground'>
          {isLoading ? `Processing in progress...` : 'Ready to process'}
        </div>
      ),
    })
  }

  const handleOpenNormalDialog = () => {
    openDialog({
      title: 'Normal Dialog',
      description: 'This is a normal dialog without loading state',
      content: (
        <div className='py-4'>
          <p>This is a regular dialog that closes immediately on confirm.</p>
        </div>
      ),
      onConfirm: () => {
        console.log('Normal dialog confirmed!')
      },
      widthSize: 'sm',
    })
  }

  return (
    <div className='p-4 space-y-4'>
      <div className='space-y-2'>
        <h2 className='text-lg font-semibold'>Dialog Testing</h2>
        <p className='text-sm text-muted-foreground'>
          Click the buttons below to test different dialog behaviors
        </p>
      </div>

      <div className='flex gap-4'>
        <Button onClick={handleOpenDialog}>Open Processing Dialog</Button>
        <Button variant='outline' onClick={handleOpenNormalDialog}>
          Open Normal Dialog
        </Button>
      </div>

      <DialogComponent />
    </div>
  )
}
