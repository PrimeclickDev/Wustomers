import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { AuthResponse, ErrorResponse } from 'models/auth-models'
import { toast } from 'react-toastify'
import { baseURL, instance } from 'services/requests'

type UpdatePasswordInput = {
	old_password: string
	new_password: string
	confirmPassword: string
}

export const updatePassword = async (
	input: UpdatePasswordInput
): Promise<AxiosResponse<AuthResponse>> => {
	return await instance.put(`${baseURL}/password`, input)
}

export const useUpdatePassword = () => {
	return useMutation<
		AxiosResponse<AuthResponse>,
		AxiosError<ErrorResponse>,
		UpdatePasswordInput
	>({
		mutationFn: (data: UpdatePasswordInput) => updatePassword(data),
		onSuccess: ({ data }) => {
			toast.success(data?.message)
		},
		onError: error => toast.error(error.response?.data.message),
	})
}
