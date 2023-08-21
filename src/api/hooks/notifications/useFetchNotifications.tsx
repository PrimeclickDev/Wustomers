import { useQuery } from '@tanstack/react-query'
import { baseURL, instance } from 'api/requests'
import { AxiosResponse } from 'axios'
import { ResponseType } from 'models/shared'

export interface Notifications extends ResponseType {
	data: Notification[]
}

export interface Notification {
	id: string
	type: string
	data: Data
	read_at: any
	created_at: string
	updated_at: string
}

export interface Data {
	message?: string
	data?: string
	user?: string
	title?: string
}

export const getNotifications = async (): Promise<
	AxiosResponse<Notifications>
> => {
	return await instance.get(`${baseURL}/notification`)
}

export const useFetchNotifications = () => {
	return useQuery({
		queryKey: ['notifications'],
		queryFn: getNotifications,
		staleTime: 5 * (60 * 1000), // 5mins
		cacheTime: 10 * (60 * 1000),
		onError: error => console.error(error),
		select: data => data.data.data,
	})
}
