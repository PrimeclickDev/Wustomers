import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from 'models/auth-models'
import { LoginSchema } from 'pages/website/Login'
import { toast } from 'react-toastify'
import { baseURL } from 'services/requests'
import { setAccessCookie } from 'utils/storage'

export type LoginInput = LoginSchema

export type LoginResponse = {
	success: boolean
	data: Data
	message: string
}

export type Data = {
	user: User
	access_token: string
}

export type User = {
	id: number
	email: string
	status: Status
	created_at: Date
	updated_at: Date
}

export type Status = {
	id: number
	name: string
}

export const login = async (
	user: LoginInput
): Promise<AxiosResponse<LoginResponse>> => {
	return await axios.post(`${baseURL}/login`, user)
}

export const useLogin = () => {
	return useMutation<
		AxiosResponse<LoginResponse>,
		AxiosError<ErrorResponse>,
		LoginInput
	>({
		mutationFn: (data: LoginInput) => login(data),
		onSuccess: ({ data }) => {
			localStorage.setItem('wustomers-user', JSON.stringify(data.data.user))
			setAccessCookie(data.data.access_token)
			toast.success(data?.message)
		},
		// onError: error => {},
	})
}
