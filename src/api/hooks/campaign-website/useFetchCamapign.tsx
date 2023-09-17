import { useQuery } from '@tanstack/react-query'
import { baseURL } from 'api/requests'
import axios, { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'

export interface Root {
	id: number
	impression: number
	conversion: number
	conversion_rate: number
	campaign_code: string
	amount: number
	user_id: number
	campaign_status: string
	payment_status: string
	title: string
	product_logo: string
	logo_position: string
	header_content: string
	subheading_content: string
	background_image: string
	button_text: string
	upload_option: string
	upload_option_link: string
	office_address: string
	first_name: string
	last_name: string
	phone: string
	email: string
	business_name: string
	manager: Manager
	is_testimonial: boolean
	contact_option: string
	contact_option_medium: string
	body_heading: string
	body_description: string
	is_button_sticky: boolean
	budget: any
	testimonials: any[]
	social_posts: SocialPost[]
	campaignFormRequirement: CampaignFormRequirement
	campaign_locations: CampaignLocation[]
	target_audience: TargetAudience
	days_paused: number
	start_date: any
	end_date: any
	paused_at: any
	resumed_at: any
	created_at: string
	updated_at: string
}

export interface Manager {
	id: number
	last_name: string
	first_name: string
	email: string
}

export interface SocialPost {
	id: number
	campaign_id: number
	title: string
	posted_date: any
	image_url: ImageUrl[]
	post_url: any
	created_at: string
	updated_at: string
}

export interface ImageUrl {
	post_id: number
	image_url: string
	created_at: string
	updated_at: string
}

export interface CampaignFormRequirement {
	id: number
	full_name: boolean
	email: boolean
	phone_number: boolean
	location: boolean
	campaign_id: number
	created_at: string
	updated_at: string
}

export interface CampaignLocation {
	id: number
	campaign_id: number
	country_id: string
	state: string
	created_at: string
	updated_at: string
}

export interface TargetAudience {
	id: number
	campaign_id: number
	age_range: AgeRange[]
	gender: Gender[]
	campaign_keyword: CampaignKeyword[]
	audience_interest: AudienceInterest[]
	created_at: string
	updated_at: string
}

export interface AgeRange {
	age_range: string
}

export interface Gender {
	gender: string
}

export interface CampaignKeyword {
	campaign_keywords: string
}

export interface AudienceInterest {
	audience_interest: string
}

export const getCamapign = async (
	campaignId: string
): Promise<AxiosResponse<{ data: Root }>> => {
	return await axios.get(`${baseURL}/campaign/${campaignId}/index`)
}

export const useFetchCampaign = (campaignId: string) => {
	const navigate = useNavigate()

	return useQuery({
		queryKey: ['campaign', campaignId],
		queryFn: () => getCamapign(campaignId),
		staleTime: Infinity,
		cacheTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		retry: 2,
		onError: () => navigate('*'),
		select: data => data.data.data,
	})
}
