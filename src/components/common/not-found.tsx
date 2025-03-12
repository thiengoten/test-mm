import { Link } from '@tanstack/react-router'

export function NotFound() {
  return (
    <div className='h-screen min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6'>
      <h1 className='text-3xl font-bold'>Not Found</h1>
      <p className='text-gray-600'>
        The page you are looking for does not exist.
      </p>
      <Link to='/dashboard' className='text-blue-500'>
        Go to Dashboard
      </Link>
    </div>
  )
}
