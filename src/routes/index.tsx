import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Hello "/"!</h1>
      <Outlet />
    </div>
  )
}
