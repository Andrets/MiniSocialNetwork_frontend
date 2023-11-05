'use client'

import Icon from '@/components/ui/nextjs-icon'
import Link from 'next/link'
import NotificationSection from './NotificationSection/NotificationSection'
import ProfileSection from './Profile/ProfileSection'
import SearchSection from './SearchSection/SearchSections'

export default function Header() {
	return (
		<header className='flex flex-row items-center h-28 p-12'>
			<div className='flex flex-row justify-between items-center'>
				<div>
					<Icon
						name='rotate-3d'
						size={64}
					/>
				</div>
				<SearchSection />
			</div>
			<div className='flex flex-row justify-between items-center ml-14'>
				<nav>
					<Link
						href='/'
						type='button'
						className='hover:bg-zinc-400 rounded-2xl mx-14'
					>
						Homepage
					</Link>
					<Link
						href='/chat'
						type='button'
						className='hover:bg-zinc-400 rounded-2xl mx-14'
					>
						Messages
					</Link>
					<NotificationSection />
				</nav>
				<ProfileSection />
			</div>
		</header>
	)
}
