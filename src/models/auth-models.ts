export type ErrorResponse = {
	success: boolean
	errors: Errors
	message: string
}

export type Errors = {
	email: string[]
	otp: string[]
	passwordReset: string[]
}

export type AuthResponse = {
	success: boolean
	data: Data
	message: string
}

type Data = {
	id: number
	email: string
	status: Status
	created_at: Date
	updated_at: Date
}

type Status = {
	id: number
	name: string
}
