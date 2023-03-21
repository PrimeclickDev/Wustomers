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
