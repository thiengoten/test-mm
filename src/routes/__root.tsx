import { ThemeProvider } from '@/providers'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <div className='min-h-screen bg-background'>
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </ThemeProvider>
  ),
})
