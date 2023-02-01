import axios from 'axios'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()
const pageUrl = new URL(window.location.href)

const baseURL =
	import.meta.env.MODE === 'development' || pageUrl.origin === '' ? '' : ''

export const publicInstance = axios.create({
	baseURL,
})
export const privateInstance = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
})

// intercepts requests and add token to header
privateInstance.interceptors.request.use(
	async config => {
		const token = cookies.get('wustomers')

		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}

		return config
	},
	error => Promise.reject(error)
)
