import { ResponseType } from './shared'

export interface Metrics extends ResponseType {
	data: Metric
}

export interface Metric {
	userCampignmetrics: UserCampignmetrics
}

export interface UserCampignmetrics {
	total_visit: number
	total_contact: number
	total_campaign: number
	conversion_rate: string
}
