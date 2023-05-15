import axios, { AxiosError } from 'axios'
import { getAccessToken, removeAccessToken } from 'utils/storage'

export const baseURL = 'https://stage.wustomers.com/api/v1'

export const instance = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
})

// intercepts private requests and add token to header
instance.interceptors.request.use(
	async config => {
		const token = getAccessToken()
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
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
				removeAccessToken()
				// window.location.pathname = '/login'
			}

			throw error
		}
	}
)
