import { signIn } from '@/api/auth'
import { AuthTokenResponsePassword } from '@supabase/supabase-js'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

export type LoginPayload = {
  email: string
  password: string
}

export const useLogin = (
  options?: UseMutationOptions<AuthTokenResponsePassword, Error, LoginPayload>
) => {
  const {
    data: loginData,
    isPending,
    error,
    mutate: onLogin,
  } = useMutation({
    mutationFn: (data: LoginPayload) => {
      return signIn(data.email, data.password)
    },
    ...options,
  })

  return { data: loginData, isPending, error, onLogin }
}
