import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from 'models/auth-models'
import { UserProfile } from 'models/profile'
import { toast } from 'react-toastify'
import { baseURL, instance } from 'services/requests'

export const getUserProfile = async (): Promise<AxiosResponse<UserProfile>> => {
	return await instance.get(`${baseURL}/profile`)
}

export const useGetProfile = () => {
	return useQuery<AxiosResponse<UserProfile>, AxiosError<ErrorResponse>>({
		queryKey: ['profile'],
		queryFn: getUserProfile,
		// onSuccess: () => {
		// 	console.log('yh baby')
		// },
		onError: error => toast.error(error.response?.data.message),
	})
}
