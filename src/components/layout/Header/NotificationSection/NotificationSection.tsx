import Link from 'next/link'

export default function NotificationSection() {
	return (
		<Link
			href='/notifications'
			className='hover:bg-zinc-400 rounded-2xl mx-14'
		>
			Notifications
		</Link>
	)
}
