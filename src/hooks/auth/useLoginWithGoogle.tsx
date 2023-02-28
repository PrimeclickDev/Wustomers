import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse, LoginResponse } from 'models/auth-models'
import { toast } from 'react-toastify'
import { baseURL } from 'services/requests'
import { setAccessToken } from 'utils/storage'

export type LoginInput = {
	email: string
}

export const login = async (
	user: LoginInput
): Promise<AxiosResponse<LoginResponse>> => {
	return await axios.post(`${baseURL}/login/social`, user)
}

export const useLoginWithGoogle = () => {
	return useMutation<
		AxiosResponse<LoginResponse>,
		AxiosError<ErrorResponse>,
		LoginInput
	>({
		mutationFn: (data: LoginInput) => login(data),
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
