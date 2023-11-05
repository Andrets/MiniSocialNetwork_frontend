'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function NotFound() {
	
	const router = useRouter()
	
	
	return (
		<div>
			<Image
				src='/404pagenotfound.png'
				alt='404'
				width={500}
				height={650}
			/>
			<button
				type='button'
				onClick={() => {
					router.push('/')
				}}
			>
				Вернутся домой
			</button>
		</div>
	)
}
