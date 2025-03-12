import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

// This route is designed to test error handling
export const Route = createFileRoute('/test-error')({
  component: ErrorTestComponent,
})

function ErrorTestComponent() {
  const [shouldError, setShouldError] = useState(false)

  // This will trigger when the button is clicked
  if (shouldError) {
    throw new Error('This is a test error to check the error boundary')
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold'>Error Boundary Test</h1>
          <p className='mt-2 text-gray-600'>
            Click the button below to trigger an error and test the
            DefaultCatchBoundary component.
          </p>
        </div>

        <div className='space-y-4'>
          <Button onClick={() => setShouldError(true)} className='w-full'>
            Trigger Error
          </Button>

          <div className='rounded-md bg-yellow-50 p-4'>
            <div className='flex'>
              <div className='ml-3'>
                <h3 className='text-sm font-medium text-yellow-800'>Note</h3>
                <div className='mt-2 text-sm text-yellow-700'>
                  <p>
                    This will trigger React's error boundary and show the
                    DefaultCatchBoundary component.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
