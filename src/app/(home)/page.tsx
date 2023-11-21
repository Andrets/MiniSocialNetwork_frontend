'use client'

import { fetchLogOut } from '@/server/loginFetch'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from 'js-cookie'
import { SendHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import io from 'socket.io-client'
import * as yup from 'yup'

interface IMessageArea {
	message: string
}

const shema = yup.object({
	message: yup.string().min(1).required()
})

export default function Home() {
	const router = useRouter()
	const queryClient = useQueryClient()
	const [isError, setIsError] = useState('')
	const [loading, setLoading] = useState(false)
	const [logged, setLogged] = useState(true)
	const accessToken = queryClient.getQueryData(['login'])
	const {
		handleSubmit,
		register,
		reset,
		control,
		formState: { errors }
	} = useForm<IMessageArea>({ resolver: yupResolver(shema) })
	useEffect(() => {
		const refreshToken = Cookies.get('refresh_token')
		if (!refreshToken) {
			setLogged(false)
			return
		}
		try {
			const socket = io('http://localhost:8000', {
				extraHeaders: { Authorization: `Bearer ` + accessToken }
			})

			socket.on('newMessage', data => {
				console.log('message: ', data)
			})
			socket.emit('joinRoom', '12')
			console.log('подключились!')
			return () => {
				socket.disconnect()
			}
		} catch (err) {
			console.log(err)
		}
	})

	const mutation = useMutation({
		mutationKey: ['logout'],
		mutationFn: async () => await fetchLogOut(),
		onSuccess: data => {
			const refreshToken = Cookies.get('refresh_token')
			if (refreshToken) {
				Cookies.remove('refresh_token')
			}
			router.push('/login')
		},
		onError: error => {
			console.error(error)
		}
	})

	const onClick = async () => {
		try {
			mutation.reset()
			await mutation.mutateAsync()
		} catch (err) {
			console.error(err)
		}
	}

	const onSubmit: SubmitHandler<IMessageArea> = async data => {
		console.log(data)
		const accessToken = Cookies.get('accessToken')
		const room = '12'
		const message = data.message
		try {
			const socket = io('http://localhost:8000', {
				extraHeaders: { Authorization: `Bearer ` + accessToken }
			})
			socket.emit('sendMessage', { message, room })
			reset()
		} catch (err) {
			console.error(err)
		}
	}

	if (logged == false) {
		return (
			<main className='flex justify-center items-center h-full'>
				<div className='flex flex-col gap-10'>
					<h1>Пожалуйста войдите в свой аккаунт!</h1>
					<button
						type='button'
						onClick={() => router.push('/login')}
						className='bg-[#D9D9D9] p-4 rounded-[25px]'
					>
						Войти
					</button>
					<button
						type='button'
						className='bg-[#D9D9D9] p-4 rounded-[25px]'
						onClick={() =>
							axios
								.get('http://localhost:8000/api/auth/logout')
								.then(res => {
									if (res.status === 200) {
										router.push('/login')
									}
								})
								.catch(err => {
									console.error(err)
								})
						}
					>
						Выйти
					</button>
				</div>
			</main>
		)
	}
	return (
		<main className='h-full flex justify-center items-end p-14'>
			<div className='bg-[#D9D9D9]'>
				<div>
					<h1>Чат</h1>
					<p>Welcome, {}</p>
				</div>
				<div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className=''
					>
						<div className='flex flex-row gap-5'>
							<Controller
								name='message'
								control={control}
								rules={{ required: true }}
								render={({ field }) => {
									return (
										<TextField
											{...field}
											placeholder='Напишите сообщение...'
										/>
									)
								}}
							/>
							<p>{errors.message?.message}</p>
							<button
								type='submit'
								title='d'
							>
								<SendHorizontal size={50} />
							</button>
						</div>
					</form>
				</div>
			</div>
			<div>
				<button
					type='button'
					onClick={onClick}
				>
					Выйти
				</button>
			</div>
		</main>
	)
}
