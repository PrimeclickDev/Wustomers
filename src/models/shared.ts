export type ResponseType = {
	success: boolean
	message: string
}

export type Industries = {
	success: boolean
	data: Industry[]
	message: string
}

type Industry = {
	id: number
	name: string
	status: string
	created_at: string
	updated_at: string
}
