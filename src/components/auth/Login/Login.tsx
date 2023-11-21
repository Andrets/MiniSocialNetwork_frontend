'use client'

import { ILoginForm } from '@/components/auth/Login/interfaces'
import { fetchLogin } from '@/server/loginFetch'
import { Button } from '@/ui/button/Button'
import Field from '@/ui/field/Field'
import Radio from '@/ui/radio/Radio'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import cn from 'clsx'
import Cookies from 'js-cookie'
import { KeyRound, Mail } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './login.module.scss'

export function AuthLoginPage() {
	const router = useRouter()
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<ILoginForm>()
	const queryClient = useQueryClient()
	const pathname = usePathname()

	const mutation = useMutation({
		mutationKey: ['loginData'],
		mutationFn: async (formData: ILoginForm) => await fetchLogin(formData),
		onSuccess: data => {
			const accessToken = data.accessToken
			queryClient.setQueryData(['login'], accessToken)
			const refreshToken = data.refreshToken
			Cookies.set('refresh_token', refreshToken)
			router.push('/')
		},
		onError: error => {
			queryClient.clear()
			const wrongData = 'Wrong typed info! Please double check your data'
			queryClient.setQueryData(['error'], wrongData)
		}
	})

	const OnSubmit: SubmitHandler<ILoginForm> = async formData => {
		try {
			mutation.reset()
			await mutation.mutateAsync(formData)
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className='flex h-full justify-center items-center flex-col gap-8'>
			<div className={styles.link}>
				<Link
					href='/login'
					className={cn({ [styles.active]: pathname === '/login' })}
				>
					Login
				</Link>
				<Link
					href='/register'
					className={cn({ [styles.active]: pathname === '/register' })}
				>
					Registration
				</Link>
			</div>
			<h1 className='text-[#000000] text-[50px] flex justify-center'>Login</h1>
			<form
				onSubmit={handleSubmit(OnSubmit)}
				className='flex flex-col gap-6'
			>
				<Field
					placeholder='Type email'
					type='email'
					Icon={Mail}
					{...register('email', { required: true })}
				/>
				<Field
					placeholder='Type password'
					type='password'
					Icon={KeyRound}
					{...register('password', { required: true })}
				/>
				<Radio
					type='checkbox'
					placeholder='Rembember me?'
					message='Remember me'
				/>
				<h1 className='text-red-600'>{queryClient.getQueryData(['error'])}</h1>
				<Button
					type='submit'
					isLoading={false}
				>
					Login
				</Button>
			</form>
		</div>
	)
}
