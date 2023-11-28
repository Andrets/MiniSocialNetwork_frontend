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
import {redirect, usePathname, useRouter} from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './login.module.scss'
import {useEffect} from "react";
import axios from 'axios';

export function AuthLoginPage() {
	const router = useRouter()
	const  { handleSubmit,
		register} = useForm<ILoginForm>()
	const queryClient = useQueryClient()
	const pathname = usePathname()

	const mutation = useMutation({
		mutationKey: ['loginData'],
		mutationFn: async (formData: ILoginForm) => await fetchLogin(formData),
		onSuccess: data => {
			console.log(data)
			queryClient.setQueryData(['login'], data.accessToken)
			router.push('/')
		},
		onError: error => {
			queryClient.clear()
			const wrongData = 'Wrong typed info! Please double check your data'
			queryClient.setQueryData(['error'], wrongData)
		}
	})

	useEffect(() => {
		const refreshToken = Cookies.get('refresh_token')
		if (refreshToken) {
			router.push('/')
		}
	}, []);

	const OnSubmit: SubmitHandler<ILoginForm> = async formData => {
		try {
			mutation.reset()
			await mutation.mutateAsync(formData)
		} catch (err) {
			console.error(err)
		}
	}

	if (mutation.isSuccess) {
		return <div>Loading...</div>
	}

	return (
		<div className='flex h-full justify-center items-center flex-col gap-8'>
			<div className={styles.link}>
				<Link
					href='/login'
					className={cn({ [styles.active]: pathname === '/login' })}
					aria-disabled={pathname === '/login'}
				>
					Login
				</Link>
				<Link
					href='/register'
					className={cn({ [styles.active]: pathname === '/register' })}
					aria-disabled={pathname === '/register'}
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
				{mutation.isError ? <div className='w-96'>An error: {mutation.error.message}</div> : null}
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
