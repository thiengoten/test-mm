import { ThemeProvider } from '@/providers'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { DialogProvider } from '@/providers/dialog-provider'
import type { QueryClient } from '@tanstack/react-query'
export interface MyRouterContext {
  queryClient: QueryClient
}
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <DialogProvider>
        <div className='min-h-screen bg-background'>
          <Outlet />
        </div>
      </DialogProvider>
      <TanStackRouterDevtools position='bottom-right' />
      <ReactQueryDevtools buttonPosition='top-right' />
    </ThemeProvider>
  ),
  errorComponent: () => <div>Error</div>,
})
