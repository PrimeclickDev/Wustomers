import { useQuery } from '@tanstack/react-query'
import { baseURL } from 'api/requests'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { AuthResponse } from 'models/auth-models'
import { toast } from 'react-toastify'

export const forgotPassword = async (
	email: string
): Promise<AxiosResponse<AuthResponse>> => {
	return await axios.get(`${baseURL}/forgot-password/${email}`)
}

export const useForgotPassword = ({ email }: { email: string }) => {
	return useQuery({
		queryKey: ['forgotPassword', email],
		enabled: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		queryFn: () => forgotPassword(email),
		onSuccess: data => {
			toast.success(data.data.message)
		},
		onError: error => {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message)
			}
		},
	})
}
