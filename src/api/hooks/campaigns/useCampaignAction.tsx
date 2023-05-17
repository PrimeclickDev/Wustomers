import { useMutation } from '@tanstack/react-query'
import { baseURL, instance } from 'api/requests'
import { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from 'models/auth-models'
import { CreateCampaign } from 'models/campaigns'

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
	return useMutation<
		AxiosResponse<CreateCampaign>,
		AxiosError<ErrorResponse>,
		Payload
	>({
		mutationFn: payload => campaignAction(payload),
	})
}
