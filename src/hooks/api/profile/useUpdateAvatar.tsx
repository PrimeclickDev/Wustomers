import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from 'models/auth-models'
import { ProfileInput, UserAvatar } from 'models/profile'
import { toast } from 'react-toastify'
import { baseURL, instance } from 'services/requests'

export const updateAvatar = async (
	data: ProfileInput
): Promise<AxiosResponse<UserAvatar>> => {
	return await instance.post(`${baseURL}/profile/avatar`, data)
}

export const useUpdateAvatar = () => {
	return useMutation<
		AxiosResponse<UserAvatar>,
		AxiosError<ErrorResponse>,
		ProfileInput
	>({
		mutationFn: (data: ProfileInput) => updateAvatar(data),
		onSuccess: ({ data }) => {
			toast.success(data?.message)
		},
		// onError: error => {},
	})
}
