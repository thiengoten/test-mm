import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authLayout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <Outlet />
      </div>
    </div>
  )
}
