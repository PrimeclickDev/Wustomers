import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse, LoginResponse } from 'models/auth-models'
import { toast } from 'react-toastify'
import { baseURL } from 'services/requests'
import { setAccessToken } from 'utils/storage'

export type RegisterInput = {
	last_name?: string
	first_name?: string
	provider: 'google' | 'instagram'
	email: string
}

export const register = async (
	user: RegisterInput
): Promise<AxiosResponse<LoginResponse>> => {
	return await axios.post(`${baseURL}/register/social`, user)
}

export const useSignupWithGoogle = () => {
	return useMutation<
		AxiosResponse<LoginResponse>,
		AxiosError<ErrorResponse>,
		RegisterInput
	>({
		mutationFn: (data: RegisterInput) => register(data),
		onSuccess: ({ data }) => {
			localStorage.setItem('wustomers-user', JSON.stringify(data.data.user))
			setAccessToken(data.data.access_token)
			toast.success(data?.message)
		},
		onError: error => {
			toast.error(error.response?.data?.errors?.email[0])
		},
	})
}
