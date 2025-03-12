import {
  BankAccount,
  PersonalInfo,
  Preferences,
  updateBankAccount,
  updatePersonalInfo,
  updatePreferences,
} from '@/api/user-profile'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

export const useUpdatePersonalInfo = (
  options?: UseMutationOptions<void, Error, PersonalInfo>
) => {
  return useMutation({
    mutationFn: updatePersonalInfo,
    ...options,
  })
}

export const useUpdateBankAccount = (
  options?: UseMutationOptions<void, Error, BankAccount>
) => {
  return useMutation({
    mutationFn: updateBankAccount,
    ...options,
  })
}

export const useUpdatePreferences = (
  options?: UseMutationOptions<void, Error, Preferences>
) => {
  return useMutation({
    mutationFn: updatePreferences,
    ...options,
  })
}
