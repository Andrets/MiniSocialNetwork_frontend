'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='flex justify-center items-center h-screen gap-16'>
			<div className='shadow-2xl'>
				<Image
					src='/errorpage.svg'
					alt=''
					width={200}
					height={250}
					priority
				/>
			</div>
			<div className='w-96'>
				<h1 className='font-extrabold text-3xl'>OOPS! PAGE NOT FOUND.</h1>
				<br />
				<p className='font-semibold'>
					You must have picked the wrong door because I havent't been able to
					lay my eye on the page you've been searching for.
				</p>
				<br />
				<Link
					href='/'
					className='flex w-60 h-10 px-14 py-2 bg-black rounded-3xl text-white duration-300 ease-in-out transition-colors font-semibold hover:bg-black/60 shadow-2xl'
				>
					BACK TO HOME
				</Link>
			</div>
		</div>
	)
}
