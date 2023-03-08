import { useMutation } from '@tanstack/react-query'
import { baseURL } from 'api/requests'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { AuthResponse, ErrorResponse } from 'models/auth-models'
import { ResetPasswordSchema } from 'pages/website/ResetPassword'
import { toast } from 'react-toastify'

const url = new URL(window.location.href)

export const resetPassword = async (
	user: ResetPasswordSchema
): Promise<AxiosResponse<AuthResponse>> => {
	return await axios.patch(`${baseURL}${url.pathname}`, user)
}

export const useResetPassword = () => {
	return useMutation<
		AxiosResponse<AuthResponse>,
		AxiosError<ErrorResponse>,
		ResetPasswordSchema
	>({
		mutationFn: (data: ResetPasswordSchema) => resetPassword(data),
		onSuccess: ({ data }) => {
			toast.success(data?.message)
		},
		onError: error => {
			toast.error(error.response?.data.message)
		},
	})
}
