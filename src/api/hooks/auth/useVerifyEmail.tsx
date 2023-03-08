import { useMutation } from '@tanstack/react-query'
import { baseURL } from 'api/requests'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse, LoginResponse } from 'models/auth-models'
import { toast } from 'react-toastify'
import { setAccessToken } from 'utils/storage'

export type VerifyOTPInput = {
	identifier: string
	otp: number
}

export const verifyOtp = async (
	data: VerifyOTPInput
): Promise<AxiosResponse<LoginResponse>> => {
	return await axios.post(`${baseURL}/verify-otp`, data)
}

export const useVerifyEmail = () => {
	return useMutation<
		AxiosResponse<LoginResponse>,
		AxiosError<ErrorResponse>,
		VerifyOTPInput
	>({
		mutationFn: (data: VerifyOTPInput) => verifyOtp(data),
		onSuccess: ({ data }) => {
			localStorage.setItem('wustomers-user', JSON.stringify(data.data.user))
			setAccessToken(data.data.access_token)
			toast.success(data?.message)
		},
		onError: error => {
			toast.error(error.response?.data?.message)
		},
	})
}
