import Layout from '@/components/layout/Layout'
import { Provider } from '@/util/Providers'
import type { Metadata } from 'next'
import { Roboto_Slab } from 'next/font/google'
import './globals.scss'

const inter = Roboto_Slab({ subsets: ['latin', 'cyrillic'], weight: ['500'] })

export const metadata: Metadata = {
	title: 'ChatMessanger',
	description: 'Best one for safe chatting',
	icons: '/logo.svg'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Provider>
					<Layout>{children}</Layout>
				</Provider>
			</body>
		</html>
	)
}
