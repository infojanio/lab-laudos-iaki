import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { api } from '@/lib/axios'
import { useAuth } from '@/contexts/AuthContext'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

type SignInForm = z.infer<typeof signInForm>

async function signInRequest(data: SignInForm) {
  const response = await api.post('/sessions', data)
  return response.data
}

export function AdminLogin() {
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signInRequest,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      const response = await authenticate(data)

      if (!response?.accessToken) {
        toast.error('Token não retornado pela API.')
        return
      }

      signIn({
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      })

      toast.success(`Bem-vindo, ${response.user.name}!`)

      setTimeout(() => navigate('/admin'), 100)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Credenciais inválidas.')
    }
  }

  return (
    <>
      <Helmet title="Login Administrativo" />

      <div className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
        <div className="w-[380px] rounded-xl border bg-background p-8 shadow-sm">
          <div className="flex flex-col items-center gap-3 mb-6">
            <img src="/logo.png" alt="logo" className="h-14" />
            <p className="text-sm text-muted-foreground">
              Painel Administrativo
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
