import { useMutation } from '@tanstack/react-query'
import { baseURL, instance } from 'api/requests'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

type SetupCampaignPayload = {
	duration: number
	amount: number
}

export const setupCampaign = async (
	id: number,
	payload: SetupCampaignPayload
): Promise<AxiosResponse<any>> => {
	return await instance.patch(`${baseURL}/campaign/${id}/setup`, payload)
}

export const useSetupCampaign = () => {
	return useMutation({
		mutationFn: ({
			id,
			payload,
		}: {
			id: number
			payload: SetupCampaignPayload
		}) => setupCampaign(id, payload),
		onSuccess: () => {
			toast.success('Campaign deleted successfully!')
		},
		onError: error => {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message)
				console.error(error)
			}
		},
	})
}
