import cn from 'clsx'
import { forwardRef } from 'react'
import styles from './Radio.module.scss'
import { TypeRadioProps } from './Radio.types'

const Radio = forwardRef<HTMLInputElement, TypeRadioProps>(
	({ style, message, className, ...rest }, ref) => {
		return (
			<div
				className={cn(styles.radio, className)}
				style={style}
			>
				<input
					{...rest}
					ref={ref}
				/>
				{message && <label className={styles.label}>{message}</label>}
			</div>
		)
	}
)

export default Radio
