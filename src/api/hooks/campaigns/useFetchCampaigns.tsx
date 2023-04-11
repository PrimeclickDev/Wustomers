import { useQuery } from '@tanstack/react-query'
import { baseURL, instance } from 'api/requests'
import { AxiosError, AxiosResponse } from 'axios'
import { Campaigns } from 'models/campaigns'

export const getAllCampaigns = async (): Promise<AxiosResponse<Campaigns>> => {
	return await instance.get(`${baseURL}/campaign`)
}

export const useFetchCampaigns = () => {
	return useQuery({
		queryKey: ['campaings'],
		queryFn: getAllCampaigns,
		onError: error => {
			if (error instanceof AxiosError) {
				console.error(error.response?.data.message)
			}
		},
		select: data => data.data.data,
	})
}
