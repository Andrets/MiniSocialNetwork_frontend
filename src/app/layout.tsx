import { Layout } from '@/components/layout/layout'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'ChatMessanger',
	description: 'Best one for safe chatting'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Layout>{children}</Layout>
			</body>
		</html>
	)
}
