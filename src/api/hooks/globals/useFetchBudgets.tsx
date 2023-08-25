import { useQuery } from '@tanstack/react-query'
import { baseURL } from 'api/requests'
import axios, { AxiosResponse } from 'axios'
import { Budgets } from 'models/shared'

export const getAllBudgets = async (): Promise<AxiosResponse<Budgets>> => {
	return await axios.get(`${baseURL}/budgets`)
}

export const useFetchBudgets = () => {
	return useQuery({
		queryKey: ['locations'],
		queryFn: getAllBudgets,
		cacheTime: Infinity,
		staleTime: Infinity,
		refetchOnMount: false,
		onError: error => console.error(error),
		select: data => data.data.data,
	})
}
