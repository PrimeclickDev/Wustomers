import { StepOneSchema } from 'components/NewCampaignStepOne'
import { StepThreeSchema } from 'components/NewCampaignStepThree'
import { StepTwoSchema } from 'components/NewCampaignStepTwo'
import { NewCampaignSchema } from 'pages/dashboard/Campaigns'
import { ResponseType } from './shared'

type Social = {
	title: string
	image_url: string
	posted_date: string
}

export interface CampaignFormData
	extends NewCampaignSchema,
		StepOneSchema,
		StepTwoSchema,
		StepThreeSchema {
	social_posts: Social[]
}

// export interface Campaign extends ResponseType {
// 	data: Data
// }

export interface Campaigns extends ResponseType {
	data: Campaign[]
}

export type Campaign = {
	id: number
	user_id: number
	status_id: number
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
	phone: string
	email: string
	is_testimonial: boolean
	contact_option: string
	contact_option_link: string
	is_button_sticky: boolean
	is_light_mode: boolean
	start_date: Date
	end_date: Date
	testimonials: Testimonial[]
	social_posts: SocialPost[]
	created_at: string
	updated_at: string
}

export type Testimonial = {
	id: number
	campaign_id: number
	comment: string
	name: string
	designation: string
	created_at: string
	updated_at: string
}

export type SocialPost = {
	id: number
	campaign_id: number
	title: string
	sub_title: string
	posted_date: string
	image_url: string
	created_at: string
	updated_at: string
}
