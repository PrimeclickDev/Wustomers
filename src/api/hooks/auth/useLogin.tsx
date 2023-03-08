import { useMutation } from '@tanstack/react-query'
import { baseURL } from 'api/requests'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse, LoginResponse } from 'models/auth-models'
import { LoginSchema } from 'pages/website/Login'
import { toast } from 'react-toastify'
import { setAccessToken } from 'utils/storage'

export const login = async (
	user: LoginSchema
): Promise<AxiosResponse<LoginResponse>> => {
	return await axios.post(`${baseURL}/login`, user)
}

export const useLogin = () => {
	return useMutation<
		AxiosResponse<LoginResponse>,
		AxiosError<ErrorResponse>,
		LoginSchema
	>({
		mutationFn: (data: LoginSchema) => login(data),
		onSuccess: ({ data }) => {
			localStorage.setItem('wustomers-user', JSON.stringify(data.data.user))
			setAccessToken(data.data.access_token)
			toast.success(data?.message)
		},
		// onError: error => {},
	})
}
