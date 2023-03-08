import { useMutation } from '@tanstack/react-query'
import { baseURL } from 'api/requests'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { AuthResponse, ErrorResponse } from 'models/auth-models'
import { SignupSchema } from 'pages/website/Signup'
import { toast } from 'react-toastify'

export type RegisterInput = Pick<SignupSchema, 'email' | 'password'>

export const register = async (
	user: RegisterInput
): Promise<AxiosResponse<AuthResponse>> => {
	return await axios.post(`${baseURL}/register`, user)
}

export const useRegister = () => {
	return useMutation<
		AxiosResponse<AuthResponse>,
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
