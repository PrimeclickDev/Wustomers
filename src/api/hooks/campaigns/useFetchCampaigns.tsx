import { useQuery } from '@tanstack/react-query'
import { baseURL, instance } from 'api/requests'
import { AxiosError, AxiosResponse } from 'axios'
import { AllCampaigns } from 'models/campaigns'

export const getAllCampaigns = async (
	filterBy: string
): Promise<AxiosResponse<AllCampaigns>> => {
	return await instance.get(`${baseURL}/campaign/${filterBy}`)
}

export const useFetchCampaigns = (filterBy: string) => {
	return useQuery({
		queryKey: ['campaigns', filterBy],
		queryFn: () => getAllCampaigns(filterBy),
		keepPreviousData: true,
		onError: error => {
			if (error instanceof AxiosError) {
				console.error(error.response?.data.message)
			}
		},
		select: data => data.data.data,
	})
}
