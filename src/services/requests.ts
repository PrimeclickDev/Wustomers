import axios, { AxiosError } from 'axios'
import { getAccessCookie } from 'utils/storage'

// const pageUrl = new URL(window.location.href)

export const baseURL = 'http://www.stage-api.wustomers.com/api/v1'
// import.meta.env.MODE === 'development'
// 	? 'https://jsonplaceholder.typicode.com'
// 	: ''

export const instance = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
})

// intercepts private requests and add token to header
instance.interceptors.request.use(
	async config => {
		const token = getAccessCookie()
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}

		return config
	},
	error => Promise.reject(error)
)

// intercepts private response and check if token has expired
instance.interceptors.response.use(
	response => {
		return response
	},
	error => {
		if (error instanceof AxiosError) {
			if (error.response?.status === 401) {
				window.location.pathname = '/login'
			}
		}
	}
)
