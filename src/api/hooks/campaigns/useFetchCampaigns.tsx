import { useQuery } from '@tanstack/react-query'
import { baseURL, instance } from 'api/requests'
import { AxiosError, AxiosResponse } from 'axios'
import { Campaigns } from 'models/campagins'

export const getAllCampaigns = async (): Promise<AxiosResponse<Campaigns>> => {
	return await instance.get(`${baseURL}/campaign`)
}

export const useFetchCampaigns = () => {
	return useQuery({
		queryKey: ['campaings'],
		queryFn: getAllCampaigns,
		refetchOnMount: import.meta.env.PROD,
		onError: error => {
			if (error instanceof AxiosError) {
				console.error(error.response?.data.message)
			}
		},
		select: data => data.data.data,
	})
}
