import Icon from '@/components/ui/nextjs-icon'
import Link from 'next/link'

export default function ProfileSection() {
	return (
		<div className='flex justify-end rounded-3xl w-12 h-12 hover:bg-slate-500'>
			<Link
				href='/profile'
				className='p-3'
			>
				<Icon
					name='user-2'
					width={25}
					height={25}
				/>
			</Link>
		</div>
	)
}
