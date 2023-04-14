import { useMutation, useQueryClient } from '@tanstack/react-query'
import { baseURL, instance } from 'api/requests'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const deleteCampaign = async (id: number) => {
	return await instance.delete(`${baseURL}/campaign/${id}/delete`)
}

export const useDeleteCampaign = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: number) => deleteCampaign(id),
		onSuccess: () => {
			toast.success('Campaign deleted successfully!')
			queryClient.invalidateQueries({ queryKey: ['campaings'] })
		},
		onError: error => {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message)
				console.error(error)
			}
		},
	})
}
