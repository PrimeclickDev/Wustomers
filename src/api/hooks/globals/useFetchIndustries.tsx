import { useQuery } from '@tanstack/react-query'
import { baseURL } from 'api/requests'
import axios, { AxiosResponse } from 'axios'
import { Industries } from 'models/shared'

export const getAllIndustries = async (): Promise<
	AxiosResponse<Industries>
> => {
	return await axios.get(`${baseURL}/industries`)
}

export const useFetchIndustries = () => {
	return useQuery({
		queryKey: ['industries'],
		queryFn: getAllIndustries,
		cacheTime: Infinity,
		staleTime: Infinity,
		refetchOnMount: false,
		onError: error => console.error(error),
		select: data => data.data.data,
	})
}
