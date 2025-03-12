import { supabase } from '@/lib/supabase'

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password })
}

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        onboarding_completed: false,
      },
    },
  })
}
