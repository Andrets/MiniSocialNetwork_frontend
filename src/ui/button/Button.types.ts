import { ButtonHTMLAttributes } from 'react'

export interface IButtonProps {
	isLoading?: boolean
}

export type TypeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	IButtonProps
