import { useQuery } from '@tanstack/react-query'
import { baseURL, instance } from 'api/requests'
import { AxiosResponse } from 'axios'
import { Metrics } from 'models/metrics'

export const getCampaignsMetrics = async (
	filterBy?: string
): Promise<AxiosResponse<Metrics>> => {
	return await instance.get(
		`${baseURL}/metric${filterBy ? `/${filterBy}` : '/overview'}`
	)
}

export const useFetchMetrics = (filterBy?: string) => {
	return useQuery({
		queryKey: ['campaign-metrics', filterBy],
		queryFn: () => getCampaignsMetrics(filterBy),
		refetchOnMount: false,
		keepPreviousData: true,
		onError: error => console.error(error),
		select: data => data.data.data,
	})
}
