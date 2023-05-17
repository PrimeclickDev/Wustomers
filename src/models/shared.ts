export type ResponseType = {
	success: boolean
	message: string
}

export interface Industries extends ResponseType {
	data: Industry[]
}

type Industry = {
	id: number
	name: string
	status: string
	created_at: string
	updated_at: string
}

export interface Locations extends ResponseType {
	data: Location[]
}

type Location = {
	id: number
	name: string
	status: string
	created_at: string
	updated_at: string
}

export interface Budgets extends ResponseType {
	data: Budget[]
}

type Budget = {
	id: number
	amount: number
	duration: string
	status: string
	created_at: string
	updated_at: string
}

export type CampaignProps = {
	nextStep?: () => void
	prevStep?: () => void
}

export type IGAccessTokenType = {
	access_token: string
	user_id: number
}

export interface IGResponse {
	data: Daum[]
	paging: Paging
}

export interface Daum {
	id: string
	media_type: string
	media_url: string
	caption: string
}

export interface Paging {
	cursors: Cursors
	next: string
}

export interface Cursors {
	before: string
	after: string
}

export type IGPosts = {
	data: IGPost[]
	paging: any
}

export type IGPost = {
	id: string
	media_type: string
	media_url: string
	caption: string
	timestamp: Date
	username?: string
	// permalink: string
}
