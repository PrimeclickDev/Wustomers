import { useQuery } from '@tanstack/react-query'
import { baseURL } from 'api/requests'
import axios, { AxiosResponse } from 'axios'
import { CreateCampaign } from 'models/campaigns'
import { useNavigate } from 'react-router-dom'

export const getCamapign = async (
	campaignId: string
): Promise<AxiosResponse<CreateCampaign>> => {
	return await axios.get(`${baseURL}/campaign/${campaignId}/index`)
}

export const useFetchCampaign = (campaignId: string) => {
	const navigate = useNavigate()

	return useQuery({
		queryKey: ['campaign', campaignId],
		queryFn: () => getCamapign(campaignId),
		staleTime: Infinity,
		cacheTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		retry: 2,
		onError: () => navigate('*'),
		select: data => data.data.data,
	})
}
