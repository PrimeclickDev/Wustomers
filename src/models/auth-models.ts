import { ResponseType } from './shared'

export interface ErrorResponse extends ResponseType {
	errors: Errors
}

export type Errors = {
	email: string[]
	otp: string[]
	passwordReset: string[]
}
export interface AuthResponse extends ResponseType {
	data: User
}

export interface LoginResponse extends ResponseType {
	data: Data
}

export type Data = {
	user: User
	access_token: string
}

export type User = {
	id: number
	email: string
	status: Status
	created_at: Date
	updated_at: Date
}

export type Status = {
	id: number
	name: string
}
