import {ILoginForm} from '@/components/auth/Login/interfaces'
import axios from 'axios'
import {IRegisterForm} from "@/components/auth/Register/interfaces";

export async function fetchLogin(formData: ILoginForm) {
	const response = await axios.post('http://localhost:8000/api/auth/login', formData, {
		withCredentials: true,
	})
	return response.data
}

export async function fetchLogOut() {
	const response = await axios({
		url: 'http://localhost:8000/api/auth/logout',
		method: 'GET',
		withCredentials: true
	})
	return response.data
}

export async function registerFetch(formData: IRegisterForm) {
	const response = await axios({
		url: 'http://localhost:8000/api/auth/register',
		method: 'POST',
		data: formData,
		withCredentials: true
	})
	return response.data
}

export async function refreshTokens() {
	const response = await axios({
		url: 'http://localhost:8000/api/auth/refresh-tokens',
		method: 'GET',
		withCredentials: true,
	})
	return response.data
}
