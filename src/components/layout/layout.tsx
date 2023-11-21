import type { PropsWithChildren } from 'react'
import Header from '../header/header'
import styles from './Layout.module.scss'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<main className={styles.layout}>
			<Header />
			<section>{children}</section>
		</main>
	)
}
