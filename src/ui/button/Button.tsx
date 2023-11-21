import styles from './Button.module.scss'
import { TypeButtonProps } from './Button.types'

export function Button({ isLoading, children }: TypeButtonProps) {
	return (
		<button className={styles.button}>
			{isLoading ? <div>Загрузка...</div> : children}
		</button>
	)
}
