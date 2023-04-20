import { useMutation, useQueryClient } from '@tanstack/react-query'
import { baseURL, instance } from 'api/requests'
import { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from 'models/auth-models'
import { CampaignFormData, CreateCampaign } from 'models/campaigns'
import { toast } from 'react-toastify'

type UpdateCampaignParams = {
	formdata: CampaignFormData
	id: number
}

export const updateCampaign = async (
	payload: UpdateCampaignParams
): Promise<AxiosResponse<CreateCampaign>> => {
	return await instance.post(
		`${baseURL}/campaign/${payload.id}/update`,
		payload.formdata,
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
		}
	)
}

export const useUpdateCampaign = () => {
	const queryClient = useQueryClient()

	return useMutation<
		AxiosResponse<CreateCampaign>,
		AxiosError<ErrorResponse>,
		UpdateCampaignParams
	>({
		mutationFn: payload => updateCampaign(payload),
		onSuccess: ({ data }) => {
			toast.success(data.message)
			queryClient.invalidateQueries({ queryKey: ['campaigns'] })
		},
		onError: error => {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message)
				console.error(error)
			}
		},
	})
}
