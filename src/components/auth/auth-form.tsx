import { loginSchema, registerSchema } from '@/components/auth/auth.helper'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

interface AuthFormProps {
  type: 'login' | 'register'
}

type AuthFormData = z.infer<typeof loginSchema> | z.infer<typeof registerSchema>

export function AuthForm({ type }: AuthFormProps) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const schema = type === 'login' ? loginSchema : registerSchema

  const form = useForm<AuthFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: AuthFormData) => {
    setLoading(true)
    setError(null)

    try {
      if (type === 'register') {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        })

        if (error) throw error

        alert(
          'Registration successful! Please check your email for verification.'
        )
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        })

        if (error) throw error

        navigate({ to: '/dashboard' })
      }

      console.log('Form submitted:', data)

      if (type === 'login') {
        navigate({ to: '/dashboard' })
      } else {
        alert(
          'Registration successful! Please check your email for verification.'
        )
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full max-w-md space-y-6'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold'>
          {type === 'login' ? 'Sign In' : 'Create an Account'}
        </h1>
        <p className='text-gray-500'>
          {type === 'login'
            ? 'Enter your credentials to sign in to your account'
            : 'Enter your information to create an account'}
        </p>
      </div>

      {error && (
        <div className='p-3 bg-red-100 border border-red-200 rounded text-red-600'>
          {error}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='name@example.com'
                    type='email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='••••••••' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full' disabled={loading}>
            {loading
              ? 'Loading...'
              : type === 'login'
                ? 'Sign In'
                : 'Create Account'}
          </Button>
        </form>
      </Form>

      <div className='text-center text-sm'>
        {type === 'login' ? (
          <p>
            Don't have an account?{' '}
            <a
              href='/register'
              className='font-medium text-primary hover:underline'
              onClick={(e) => {
                e.preventDefault()
                navigate({ to: '/register' })
              }}
            >
              Sign up
            </a>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <a
              href='/login'
              className='font-medium text-primary hover:underline'
              onClick={(e) => {
                e.preventDefault()
                navigate({ to: '/login' })
              }}
            >
              Sign in
            </a>
          </p>
        )}
      </div>
    </div>
  )
}
