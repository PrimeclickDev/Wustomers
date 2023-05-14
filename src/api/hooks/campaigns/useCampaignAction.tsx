import { useMutation, useQueryClient } from '@tanstack/react-query'
import { baseURL, instance } from 'api/requests'
import { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from 'models/auth-models'
import { CreateCampaign } from 'models/campaigns'
import { toast } from 'react-toastify'

type Payload = {
	campaignId: string
	action: string
}

export const campaignAction = async (
	payload: Payload
): Promise<AxiosResponse<CreateCampaign>> => {
	return await instance.get(
		`${baseURL}/campaign/${payload.campaignId}/${payload.action}`
	)
}

export const useCampaignAction = () => {
	const queryClient = useQueryClient()

	return useMutation<
		AxiosResponse<CreateCampaign>,
		AxiosError<ErrorResponse>,
		Payload
	>({
		mutationFn: payload => campaignAction(payload),
		onSuccess: ({ data }) => {
			toast.success(data.message)
			queryClient.invalidateQueries({ queryKey: ['campaigns', 'all'] })
		},
		onError: error => {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message)
				console.error(error)
			}
		},
	})
}
