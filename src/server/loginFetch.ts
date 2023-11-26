'use server'

import { ILoginForm } from '@/components/auth/Login/interfaces'
import axios from 'axios'
import {IRegisterForm} from "@/components/auth/Register/interfaces";

export async function fetchLogin(formData: ILoginForm) {
	const response = await axios({
		url: 'http://localhost:8000/api/auth/login',
		method: 'POST',
		data: formData
	})
	return response.data
}

export async function fetchLogOut() {
	const response = await axios({
		url: 'http://localhost:8000/api/auth/logout',
		method: 'GET'
	})
	return response.data
}

export async function registerFetch(formData: IRegisterForm) {
	const response = await axios({
		url: 'http://localhost:8000/api/auth/register',
		method: 'POST',
		data: formData,
	})
	return response.data
}
