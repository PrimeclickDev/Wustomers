import { useQuery } from '@tanstack/react-query'
import { baseURL, instance } from 'api/requests'
import { AxiosResponse } from 'axios'
import { UserProfile } from 'models/profile'

export const getUserProfile = async (): Promise<AxiosResponse<UserProfile>> => {
	return await instance.get(`${baseURL}/profile`)
}

export const useFetchProfile = () => {
	return useQuery({
		queryKey: ['profile'],
		queryFn: getUserProfile,
		cacheTime: Infinity,
		staleTime: Infinity,
		refetchOnMount: false,
		onError: error => console.error(error),
		select: data => data.data.data?.profile,
	})
}
