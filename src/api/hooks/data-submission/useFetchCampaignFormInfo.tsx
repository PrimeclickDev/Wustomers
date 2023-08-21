import { useQuery } from '@tanstack/react-query'
import { baseURL, instance } from 'api/requests'
import { AxiosError, AxiosResponse } from 'axios'
import { Campaign, Links, Meta } from 'models/campaigns'
import { ResponseType } from 'models/shared'

export interface CampaignForm extends ResponseType {
	data: Data
}

export interface Data {
	forms: Forms
	total_forms: number
}

export interface Forms {
	data: Daum[]
	links: Links
	meta: Meta
}

export interface Daum {
	id: number
	campaign_code: string
	full_name: string
	email: string
	phone_number: string
	location: any
	campaign: Campaign
}

export const getAllCampaigns = async (
	page: number
): Promise<AxiosResponse<CampaignForm>> => {
	return await instance.get(`${baseURL}/metric/campaign/form?page=${page}`)
}

export const useFetchCampaignFormInfo = ({ page }: { page: number }) => {
	return useQuery({
		queryKey: ['data-submissions', page],
		queryFn: () => getAllCampaigns(page),
		keepPreviousData: true,
		onError: error => {
			if (error instanceof AxiosError) {
				console.error(error.response?.data.message)
			}
		},
		select: data => data.data.data,
	})
}
