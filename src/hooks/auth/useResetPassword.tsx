import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { AuthResponse, ErrorResponse } from 'models/auth-models'
import { toast } from 'react-toastify'
import { baseURL } from 'services/requests'

type ResetPasswordInput = {
	password: string
	confirmPassword: string
}

export const resetPassword = async (
	user: ResetPasswordInput
): Promise<AxiosResponse<AuthResponse>> => {
	return await axios.post(`${baseURL}/register`, user)
}

export const useRegister = () => {
	return useMutation<
		AxiosResponse<AuthResponse>,
		AxiosError<ErrorResponse>,
		ResetPasswordInput
	>({
		mutationFn: (data: ResetPasswordInput) => resetPassword(data),
		onSuccess: ({ data }) => {
			localStorage.setItem('wustomers-user', JSON.stringify(data))
			toast.success(data?.message)
		},
		// onError: error => {
		// 	toast.error(error.response?.data.message)
		// },
	})
}
