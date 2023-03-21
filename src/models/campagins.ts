import { ResponseType } from './shared'

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
	start_date: string
	end_date: string
	testimonials: Testimonial[]
	social_posts: SocialPost[]
	created_at: string
	updated_at: string
}

type Testimonial = {
	id: number
	campaign_id: number
	comment: string
	name: string
	designation: string
	created_at: string
	updated_at: string
}

type SocialPost = {
	id: number
	campaign_id: number
	title: string
	sub_title: string
	posted_date: string
	image_url: string
	created_at: string
	updated_at: string
}
