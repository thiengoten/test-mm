import { DashboardBreadcrumb } from '@/components/common'
import { Transactions } from './-components/Transactions'

import { createLazyFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
export const Route = createLazyFileRoute('/dashboard/transactions')({
  component: RouteComponent,
  pendingComponent: () => (
    <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
      <div className='flex flex-1 items-center justify-center'>
        <Loader2 className='h-4 w-4 animate-spin' />
      </div>
    </div>
  ),
})

function RouteComponent() {
  return (
    <>
      <DashboardBreadcrumb
        title='Transactions'
        breadcrumb='Dashboard'
        to='/dashboard'
      />
      <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
        <Transactions />
      </div>
    </>
  )
}
