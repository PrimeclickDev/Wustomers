import { useQuery } from '@tanstack/react-query'
import { baseURL, instance } from 'api/requests'
import { AxiosError, AxiosResponse } from 'axios'
import { Locations } from 'models/shared'

export const getAllCampaigns = async (): Promise<AxiosResponse<Locations>> => {
	return await instance.get(`${baseURL}/campaign`)
}

export const useFetcchCampaigns = () => {
	return useQuery({
		queryKey: ['campaings'],
		queryFn: getAllCampaigns,
		refetchOnMount: false,
		onError: error => {
			if (error instanceof AxiosError) {
				console.error(error.response?.data.message)
			}
		},
	})
}
