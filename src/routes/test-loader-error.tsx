import { createFileRoute } from '@tanstack/react-router'

// This route demonstrates an error in the loader function
export const Route = createFileRoute('/test-loader-error')({
  loader: async () => {
    // Simulate an API call that fails
    await new Promise((resolve) => setTimeout(resolve, 500))
    throw new Error('This is a test error in the loader function')
  },
  component: LoaderErrorTestComponent,
})

function LoaderErrorTestComponent() {
  // This component won't render because the loader will throw an error
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold'>Loader Error Test</h1>
          <p className='mt-2 text-gray-600'>
            If you see this, something went wrong with the error boundary.
          </p>
        </div>
      </div>
    </div>
  )
}
