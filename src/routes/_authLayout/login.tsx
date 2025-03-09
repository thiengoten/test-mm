import { AuthForm } from '@/components/auth/auth-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authLayout/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <AuthForm type='login' />
      </div>
    </div>
  )
}
