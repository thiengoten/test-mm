import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/error-testing')({
  component: ErrorTestingPage,
})

function ErrorTestingPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold'>Error Boundary Testing</h1>
          <p className='mt-2 text-gray-600'>
            Select a test to trigger different types of errors and test your
            DefaultCatchBoundary component.
          </p>
        </div>

        <div className='space-y-4'>
          <Link to='/test-error'>
            <Button variant='outline' className='w-full justify-start'>
              <div className='text-left'>
                <div className='font-medium'>Component Error</div>
                <div className='text-sm text-gray-500'>
                  Test error thrown directly in a component
                </div>
              </div>
            </Button>
          </Link>

          <Link to='/test-loader-error'>
            <Button variant='outline' className='w-full justify-start'>
              <div className='text-left'>
                <div className='font-medium'>Loader Error</div>
                <div className='text-sm text-gray-500'>
                  Test error thrown in a route loader function
                </div>
              </div>
            </Button>
          </Link>

          <Link to='/test-async-error'>
            <Button variant='outline' className='w-full justify-start'>
              <div className='text-left'>
                <div className='font-medium'>Async Error</div>
                <div className='text-sm text-gray-500'>
                  Test error thrown asynchronously after component mount
                </div>
              </div>
            </Button>
          </Link>

          <div className='pt-4'>
            <Link to='/dashboard'>
              <Button variant='ghost' size='sm'>
                ← Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
