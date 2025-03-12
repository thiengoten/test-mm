import { signUp } from '@/api/auth'
import { AuthResponse } from '@supabase/supabase-js'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

export type SignUpPayload = {
  email: string
  password: string
}

export const useSignUp = (
  options?: UseMutationOptions<AuthResponse, Error, SignUpPayload>
) => {
  const {
    data: signUpData,
    isPending,
    error,
    mutate: onSignUp,
  } = useMutation({
    mutationFn: (data: SignUpPayload) => {
      return signUp(data.email, data.password)
    },
    ...options,
  })

  return { data: signUpData, isPending, error, onSignUp }
}
