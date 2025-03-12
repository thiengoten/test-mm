import { FinishStep } from '@/components/onboarding/steps'
import {
  BankAccountFormData,
  BankAccountRef,
  BankAccountStep,
} from '@/components/onboarding/steps/bank-account'
import {
  PersonalInfoFormData,
  PersonalInfoRef,
  PersonalInfoStep,
} from '@/components/onboarding/steps/personal-info'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'
import { useNavigate } from '@tanstack/react-router'
import { useRef, useState } from 'react'

const steps = [
  {
    step: 1,
    title: 'Personal Information',
    description: 'Fill out your basic details',
  },
  {
    step: 2,
    title: 'Bank Account',
    description: 'Add your banking information',
  },
  {
    step: 3,
    title: 'Finish',
    description: 'You are all set!',
  },
]

type FormData = {
  personalInfo: PersonalInfoFormData | null
  bankAccount: BankAccountFormData | null
}

export function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    personalInfo: null,
    bankAccount: null,
  })
  const navigate = useNavigate()

  const personalInfoRef = useRef<PersonalInfoRef>(null)
  const bankAccountRef = useRef<BankAccountRef>(null)

  const handleNext = async () => {
    try {
      if (currentStep === 0 && personalInfoRef.current) {
        const isValid = await personalInfoRef.current.submitForm()
        if (!isValid) return

        const form = personalInfoRef.current.getForm()
        setFormData((prev) => ({
          ...prev,
          personalInfo: form.getValues(),
        }))
        setCurrentStep(currentStep + 1)
      } else if (currentStep === 1 && bankAccountRef.current) {
        const isValid = await bankAccountRef.current.submitForm()
        if (!isValid) return

        const form = bankAccountRef.current.getForm()
        setFormData((prev) => ({
          ...prev,
          bankAccount: form.getValues(),
        }))
        setCurrentStep(currentStep + 1)
      } else if (currentStep === steps.length - 1) {
        navigate({ to: '/dashboard/overview' })
      }
    } catch (error) {
      console.error('Form validation failed:', error)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    const stepMapping = {
      0: (
        <PersonalInfoStep
          ref={personalInfoRef}
          defaultValues={formData.personalInfo || undefined}
        />
      ),
      1: (
        <BankAccountStep
          ref={bankAccountRef}
          defaultValues={formData.bankAccount || undefined}
        />
      ),
      2: <FinishStep />,
    }
    return stepMapping[currentStep as keyof typeof stepMapping]
  }

  return (
    <Card className='p-6'>
      <div className='space-y-8 text-center'>
        <Stepper value={currentStep + 1}>
          {steps.map(({ step, title, description }) => (
            <StepperItem
              key={step}
              step={step}
              className='not-last:flex-1 max-md:items-start'
            >
              <StepperTrigger className='rounded max-md:flex-col'>
                <StepperIndicator />
                <div className='text-center md:text-left'>
                  <StepperTitle>{title}</StepperTitle>
                  <StepperDescription className='max-sm:hidden'>
                    {description}
                  </StepperDescription>
                </div>
              </StepperTrigger>
              {step < steps.length && (
                <StepperSeparator className='min-w-[3rem] md:min-w-[6rem]' />
              )}
            </StepperItem>
          ))}
        </Stepper>
      </div>

      {/* Step Content */}
      <div>{renderStepContent()}</div>

      {/* Navigation */}
      <div className='flex justify-between mt-6'>
        <Button
          type='button'
          variant='outline'
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        <Button type='button' onClick={handleNext}>
          {currentStep === steps.length - 1 ? 'Complete' : 'Continue'}
        </Button>
      </div>
    </Card>
  )
}
