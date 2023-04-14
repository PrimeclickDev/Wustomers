import { useMutation } from '@tanstack/react-query'
import { baseURL, instance } from 'api/requests'
import { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from 'models/auth-models'
import { CampaignFormData, CreateCampaign } from 'models/campaigns'
import { toast } from 'react-toastify'

export const createCampaign = async (
	payload: CampaignFormData
): Promise<AxiosResponse<CreateCampaign>> => {
	return await instance.post(`${baseURL}/campaign/create`, payload, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'multipart/form-data',
		},
	})
}

export const useCreateCampaign = () => {
	return useMutation<
		AxiosResponse<CreateCampaign>,
		AxiosError<ErrorResponse>,
		CampaignFormData
	>({
		mutationFn: (data: CampaignFormData) => createCampaign(data),
		onSuccess: ({ data }) => {
			toast.success(data.message)
		},
		onError: error => {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message)
				console.log(error)
			}
		},
	})
}
