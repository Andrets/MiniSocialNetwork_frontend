'use client'

import type { PropsWithChildren } from 'react'
import Header from './Header/Header'

export function Layout({ children }: PropsWithChildren) {
	return (
		<div>
			<Header />
			<main>{children}</main>
		</div>
	)
}
