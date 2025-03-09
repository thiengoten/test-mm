import { Header } from '@/components/common'
import { Transactions } from '@/components/transactions'

import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/dashboard/transactions')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Header title='Transactions' breadcrumb='Dashboard' to='/dashboard' />
      <Transactions />
    </>
  )
}
