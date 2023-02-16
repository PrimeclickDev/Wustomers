import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from 'models/auth-models'
import { SignupSchema } from 'pages/website/Signup'
import { toast } from 'react-toastify'
import { baseURL } from 'services/requests'

export type RegisterInput = Pick<SignupSchema, 'email' | 'password'>

type RegisterResponse = {
	success: boolean
	data: Data
	message: string
}

type Data = {
	id: number
	email: string
	status: Status
	created_at: Date
	updated_at: Date
}

type Status = {
	id: number
	name: string
}

export const register = async (
	user: RegisterInput
): Promise<AxiosResponse<RegisterResponse>> => {
	return await axios.post(`${baseURL}/register`, user)
}

export const useRegister = () => {
	return useMutation<
		AxiosResponse<RegisterResponse>,
		AxiosError<ErrorResponse>,
		RegisterInput
	>({
		mutationFn: (data: RegisterInput) => register(data),
		onSuccess: ({ data }) => {
			localStorage.setItem('wustomers-user', JSON.stringify(data))
			toast.success(data?.message)
		},
		// onError: error => {
		// 	toast.error(error.response?.data.message)
		// },
	})
}
