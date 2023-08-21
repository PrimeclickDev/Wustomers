import { useMutation, useQueryClient } from '@tanstack/react-query'
import { baseURL, instance } from 'api/requests'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const deleteNotification = async (id: string) => {
	return await instance.delete(`${baseURL}/notification/${id}/delete`)
}

export const useDeleteNotification = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id }: { id: string }) => deleteNotification(id),
		onSuccess: () => {
			toast.success('Notification deleted successfully!')
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
