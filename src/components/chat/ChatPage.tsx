'use client'


import  {fetchLogOut, refreshTokens} from '@/server/loginFetch'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from 'js-cookie'
import { SendHorizontal } from 'lucide-react'
import {redirect, useRouter} from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import io from 'socket.io-client'
import * as yup from 'yup'
import styles from './home.module.scss'
import {validateRefreshToken} from "@/server/validateRefreshToken";
import {LogPromisePage} from "@/components/logpromise/logpromise";

interface IMessageArea {
    message: string
}


export function ChatPage() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [isError, setIsError] = useState('')
    const [loading, setLoading] = useState(false)
    const [logged, setLogged] = useState(true)
    const accessToken = queryClient.getQueryData(['login'])
    const { formState: {errors}, handleSubmit, register, reset, control} = useForm<IMessageArea>()
    useEffect(() => {
        try {
            const socket = io('http://localhost:8000', {
                extraHeaders: { Authorization: `${accessToken}` }
            })
            socket.on('newMessage', data => {
                console.log('message: ', data)
            })
            socket.emit('joinRoom', '12')
            return () => {
                socket.disconnect()
            }
        } catch (err) {
            console.error(err)
        }
    })

    const refreshTokenMutation = useMutation({
        mutationKey: ['refresh_tokens'],
        mutationFn: async () => await refreshTokens(),
        onSuccess: data => {
            const refreshToken = data.refreshToken
            Cookies.set('refresh_token', refreshToken, {sameSite: 'lax', path: '/', secure: true, expires: 30})
            const accessToken = data.accessToken
            queryClient.setQueryData(['login'], accessToken)
        },
        onError: error => {
            router.push('/login')
        }
    })

    const mutation = useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => await fetchLogOut(),
        onSuccess: async data => {
            console.log(data)
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
                extraHeaders: { Authorization: `${accessToken}` }
            })
            socket.emit('sendMessage', { message, room })
            reset()
        } catch (err) {
            console.error(err)
        }
    }

    if (logged == false) {
        return <LogPromisePage />
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