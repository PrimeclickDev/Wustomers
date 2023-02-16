import axios from 'axios'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()
// const pageUrl = new URL(window.location.href)

export const baseURL = 'http://www.stage-api.wustomers.com/api/v1'
// import.meta.env.MODE === 'development'
// 	? 'https://jsonplaceholder.typicode.com'
// 	: ''
const token = cookies.get('wustomers')

export const instance = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
})

// intercepts private requests and add token to header
instance.interceptors.request.use(
	async config => {
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
		if (response.status === 401) {
			window.location.pathname = '/login'
		}
		return response
	},
	error => Promise.reject(error)
)
