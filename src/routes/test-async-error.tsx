import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

// This route demonstrates an error that occurs asynchronously after component mount
export const Route = createFileRoute('/test-async-error')({
  component: AsyncErrorTestComponent,
})

function AsyncErrorTestComponent() {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Simulate an async operation that fails after component mount
    const timer = setTimeout(() => {
      setHasError(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (hasError) {
    throw new Error('This is an async error that occurs after component mount')
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold'>Async Error Test</h1>
          <p className='mt-2 text-gray-600'>
            Wait for 1 second and an error will be thrown automatically...
          </p>
        </div>

        <div className='flex justify-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
        </div>
      </div>
    </div>
  )
}
