import { useMutation, useQueryClient } from '@tanstack/react-query'
import { baseURL, instance } from 'api/requests'
import { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from 'models/auth-models'
import { toast } from 'react-toastify'
import { Notifications } from './useFetchNotifications'

export const readAllNotifications = async (): Promise<
	AxiosResponse<Notifications>
> => {
	return await instance.get(`${baseURL}/notification/read-all`)
}

export const useReadAllNotifications = () => {
	const queryClient = useQueryClient()

	return useMutation<AxiosResponse<Notifications>, AxiosError<ErrorResponse>>({
		mutationFn: () => readAllNotifications(),
		onSuccess: () => {
			toast.success('Notifications marked as read')
			queryClient.invalidateQueries(['notifications'])
		},
	})
}
