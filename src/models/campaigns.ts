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
	contact_option_medium?: string
	id?: number
}

export interface AllCampaigns extends ResponseType {
	data: {
		campaigns: Campaigns
		metrics: Metrics
	}
}

export type Campaigns = {
	data: Campaign[]
	links: Links
	meta: Meta
}

export interface CreateCampaign extends ResponseType {
	data: Campaign
}

export type Campaign = {
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
	phone: string
	email: string
	is_testimonial: boolean
	contact_option: string
	contact_option_medium: string
	body_heading: string
	body_description: string
	is_button_sticky: boolean
	start_date?: string
	end_date?: string
	location: string
	budget: Budget
	testimonials: Testimonial[]
	social_posts: SocialPost[]
	paused_at: any
	resumed_at: any
	created_at: string
	updated_at: string
}

export type Budget = {
	id: number
	amount: number
	duration: number
	status_id: number
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
	posted_date: string
	image_url: string
	created_at: string
	updated_at: string
}

export type Links = {
	first: string
	last: string
	prev: any
	next: any
}

export type Meta = {
	current_page: number
	from: number
	last_page: number
	links: Link[]
	path: string
	per_page: number
	to: number
	total: number
}

export type Link = {
	url?: string
	label: string
	active: boolean
}

export type Metrics = {
	total_campaigns: number
	active_campaigns: number
	inactive_campaigns: number
	completed_campaigns: number
	paused_campaigns: number
}
