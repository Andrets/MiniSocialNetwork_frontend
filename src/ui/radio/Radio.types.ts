import { InputHTMLAttributes } from 'react'

export interface IRadioProps {
	message?: string
}

export type TypeRadioProps = InputHTMLAttributes<HTMLInputElement> & IRadioProps
