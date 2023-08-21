import { useMutation, useQueryClient } from '@tanstack/react-query'
import { baseURL, instance } from 'api/requests'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const deleteAllNotifications = async () => {
	return await instance.delete(`${baseURL}/notification/delete/all`)
}

export const useDeleteAllNotifications = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => deleteAllNotifications(),
		onSuccess: () => {
			toast.success('All notifications deleted successfully!')
			queryClient.invalidateQueries({ queryKey: ['notifications'] })
		},
		onError: error => {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message)
				console.error(error)
			}
		},
	})
}
