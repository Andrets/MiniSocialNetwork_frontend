'use client'

import axios from "axios";
import {useRouter} from "next/navigation";

export function LogPromisePage() {
    const router = useRouter()
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