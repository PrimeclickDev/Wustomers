import { useQuery } from '@tanstack/react-query'
import { baseURL } from 'api/requests'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { AuthResponse } from 'models/auth-models'
import { toast } from 'react-toastify'

export const resendOTP = async (
	email: string
): Promise<AxiosResponse<AuthResponse>> => {
	return await axios.get(`${baseURL}/resend-otp/${email}`)
}

export const useResendOTP = ({ email }: { email: string }) => {
	return useQuery({
		queryKey: ['resendOtp', email],
		enabled: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		queryFn: () => resendOTP(email),
		onSuccess: data => {
			toast.success(data.data.message)
		},
		onError: error => {
			if (error instanceof AxiosError) {
				console.error(error.message)
			}
		},
	})
}
