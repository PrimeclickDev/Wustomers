import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Industries } from 'models/shared'
import { baseURL } from 'services/requests'

export const getAllIndustries = async (): Promise<
	AxiosResponse<Industries>
> => {
	return await axios.get(`${baseURL}/industries`)
}

export const useGetIndustries = () => {
	return useQuery({
		queryKey: ['industry'],
		queryFn: getAllIndustries,
		onError: error => {
			if (error instanceof AxiosError) {
				console.error(error.response?.data.message)
			}
		},
	})
}
