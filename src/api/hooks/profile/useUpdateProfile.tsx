import { useMutation } from '@tanstack/react-query'
import { queryClient } from 'api/QueryWrapper'
import { baseURL, instance } from 'api/requests'
import { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from 'models/auth-models'
import { ProfileInput, UserProfile } from 'models/profile'
import { toast } from 'react-toastify'

export const updateProfile = async (
	profile: ProfileInput
): Promise<AxiosResponse<UserProfile>> => {
	return await instance.post(`${baseURL}/profile/update`, profile)
}

export const useUpdateProfile = () => {
	return useMutation<
		AxiosResponse<UserProfile>,
		AxiosError<ErrorResponse>,
		ProfileInput
	>({
		mutationFn: (data: ProfileInput) => updateProfile(data),
		onSuccess: ({ data }) => {
			toast.success(data?.message)
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		},
		onError: error => {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message)
				console.error(error)
			}
		},
	})
}
