import { useMutation } from '@tanstack/react-query'
import { baseURL, instance } from 'api/requests'
import { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from 'models/auth-models'
import { toast } from 'react-toastify'

type Payload = Partial<{
	full_name: string
	email: string
	phone_number: string
	location: string
	campaign_code: string
}>

export const campaignContact = async (data: Payload) => {
	return await instance.post(`${baseURL}/campaign/form`, data)
}

export const useCampaignContact = () => {
	return useMutation<AxiosResponse<any>, AxiosError<ErrorResponse>, Payload>({
		mutationFn: data => campaignContact(data),
		onSuccess: ({ data }) => {
			toast.success(data?.message)
		},
		onError: error => {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message)
				console.error(error)
			}
		},
	})
}
