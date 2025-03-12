import { OnboardingForm } from '@/components/onboarding/onboarding-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/onboarding')({
  component: OnboardingPage,
})

function OnboardingPage() {
  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <div className='w-full max-w-4xl'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold tracking-tight'>
            Complete Your Profile
          </h1>
          <p className='text-muted-foreground mt-2'>
            Let's get to know you better to provide personalized financial
            insights
          </p>
        </div>
        <OnboardingForm />
      </div>
    </div>
  )
}
