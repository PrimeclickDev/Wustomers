import { useMutation } from '@tanstack/react-query'
import { queryClient } from 'api/QueryWrapper'
import { baseURL, instance } from 'api/requests'
import { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from 'models/auth-models'
import { UserAvatar } from 'models/profile'
import { toast } from 'react-toastify'

export const updateAvatar = async (
	data: FormData
): Promise<AxiosResponse<UserAvatar>> => {
	return await instance.post(`${baseURL}/profile/avatar`, data, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'multipart/form-data',
		},
	})
}

export const useUpdateAvatar = () => {
	return useMutation<
		AxiosResponse<UserAvatar>,
		AxiosError<ErrorResponse>,
		FormData
	>({
		mutationFn: (data: FormData) => updateAvatar(data),
		onSuccess: ({ data }) => {
			toast.success(data?.message)
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		},
		onError: error => {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message)
			}
		},
	})
}
