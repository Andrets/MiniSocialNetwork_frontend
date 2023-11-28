'use client'

import { Button } from '@/ui/button/Button'
import Field from '@/ui/field/Field'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import cn from 'clsx'
import { KeyRound, Mail, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IRegisterForm } from './interfaces'
import styles from './register.module.scss'
import { registerFetch } from "@/server/loginFetch";

export function Register() {
	const router = useRouter()
	const queryClient = useQueryClient()
	const pathname = usePathname()
	const { handleSubmit, register } = useForm<IRegisterForm>()
	const mutation = useMutation({
		mutationKey: ['MutationRegister'],
		mutationFn: async (formData: IRegisterForm) =>
			await registerFetch(formData),
		onSuccess: data => {
			queryClient.setQueryData(['register'], 'success')
			router.push('/login')
		}
	})
	const formSubmit: SubmitHandler<IRegisterForm> = async data => {
		try {
			mutation.reset()
			await mutation.mutateAsync(data)
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
			<h1 className='text-[#000000] text-[50px] flex justify-center'>
				Register
			</h1>
			<form
				onSubmit={handleSubmit(formSubmit)}
				className='flex flex-col gap-6'
			>
				<Field
					type='text'
					placeholder='Type nickname'
					Icon={User}
					{...register('nickname')}
				/>
				<Field
					type='email'
					placeholder='Type email'
					Icon={Mail}
					{...register('email')}
				/>
				<Field
					type='password'
					placeholder='Type password'
					Icon={KeyRound}
					{...register('password', { required: true })}
				/>
				{mutation.isError ? (
					<div className="w-96">An error: {mutation.error.message}</div>
				) : null}
				<Button
					type='submit'
					isLoading={false}
				>
					Register
				</Button>
			</form>
		</div>
	)
}
