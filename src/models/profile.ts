import { ResponseType } from './shared'

export interface UserProfile extends ResponseType {
	data: Profile
}

export type Profile = {
	id: number
	phone: string
	industry: string
	business_name: string
	business_email: string
	instagram_url: string
	facebook_url: string
	twitter_url: string
	tik_tok_url: string
	created_at: Date
	updated_at: Date
	user: User
}

export type User = {
	id: number
	last_name: string
	first_name: string
	provider: null
	social_login: boolean
	email: string
	status_id: number
	created_at: Date
	updated_at: Date
}

export type ProfileInput = {
	last_name: string
	first_name: string
	phone: string
	no_employee: string
	industry_type_id: number
	business_name: string
	business_email: string
	instagram_url: string
	facebook_url: string
	twitter_url: string
	tik_tok_url: string
}

export interface UserAvatar extends ResponseType {
	data: Avatar
}

export type Avatar = {
	id: number
	email: string
	status: string
	avatar: string
	created_at: Date
	updated_at: Date
}
