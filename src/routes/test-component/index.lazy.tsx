import SelectConditionsDate from '@/routes/test-component/-components/SelectConditionsDate'
import { createLazyFileRoute } from '@tanstack/react-router'
export const Route = createLazyFileRoute('/test-component/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <SelectConditionsDate />
    </div>
  )
}
