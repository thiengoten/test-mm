import { supabase } from '@/lib/supabase'

export type PersonalInfo = {
  fullName: string
  country: string
  city: string
  phoneNumber: string
}

export type BankAccount = {
  accountType: string
  accountNumber: string
  routingNumber: string
  bankName: string
}

export type Preferences = {
  monthlyIncome: string
  currency: string
  savingsGoal: string
  notificationsEnabled: boolean
}

export const updatePersonalInfo = async (data: PersonalInfo) => {
  const { error } = await supabase
    .from('user_profiles')
    .update({
      full_name: data.fullName,
      country: data.country,
      city: data.city,
      phone_number: data.phoneNumber,
    })
    .eq(
      'id',
      supabase.auth.getUser().then((res) => res.data.user?.id)
    )

  if (error) throw error
}

export const updateBankAccount = async (data: BankAccount) => {
  const { error } = await supabase
    .from('user_profiles')
    .update({
      account_type: data.accountType,
      account_number: data.accountNumber,
      routing_number: data.routingNumber,
      bank_name: data.bankName,
    })
    .eq(
      'id',
      supabase.auth.getUser().then((res) => res.data.user?.id)
    )

  if (error) throw error
}

export const updatePreferences = async (data: Preferences) => {
  const { error } = await supabase
    .from('user_profiles')
    .update({
      monthly_income: parseFloat(data.monthlyIncome),
      currency: data.currency,
      savings_goal: parseFloat(data.savingsGoal),
      notifications_enabled: data.notificationsEnabled,
      onboarding_completed: true,
    })
    .eq(
      'id',
      supabase.auth.getUser().then((res) => res.data.user?.id)
    )

  if (error) throw error
}
