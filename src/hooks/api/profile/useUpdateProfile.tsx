import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from 'models/auth-models'
import { ProfileInput, UserProfile } from 'models/profile'
import { toast } from 'react-toastify'
import { baseURL, instance } from 'services/requests'

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
		},
		// onError: error => {},
	})
}
