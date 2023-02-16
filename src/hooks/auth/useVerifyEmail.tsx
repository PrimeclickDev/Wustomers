import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from 'models/auth-models'
import { toast } from 'react-toastify'
import { baseURL } from 'services/requests'

export type VerifyOTPInput = {
	identifier: string
	otp: number
}

export type LoginResponse = {
	success: boolean
	data: Data
	message: string
}

export type Data = {
	user: User
	access_token: string
}

export type User = {
	id: number
	email: string
	status: Status
	created_at: Date
	updated_at: Date
}

export type Status = {
	id: number
	name: string
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
			toast.success(data?.message)
		},
		onError: error => {
			toast.error(error.response?.data?.message)
		},
	})
}
