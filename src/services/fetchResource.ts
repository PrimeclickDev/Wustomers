const baseUrl = 'https://jsonplaceholder.typicode.com'

const parseResponse = async (response: Response) => {
	if (!response.ok) {
		return Promise.reject(new Error(response?.error.message))
	}

	// if token has expired. in here intercept the response, logout user and redirect to login page
	if (response.status === 401) {
		// logout()
		// window.location.assign(window.)
		// return Promise.reject(new Error('Session expired, please log in again'))
		return
	}

	return response.status !== 204 ? await response.json() : { success: true }
}

export const fetchResource = <T>(
	endpoint: string,
	options: RequestInit
): Promise<T> => {
	const { method, headers, ...extraOpts } = options
	const controller = new AbortController()

	const token = window.localStorage.getItem('wustomers')

	const reqOptions = {
		method,
		signal: controller.signal,
		...extraOpts,
		headers: {
			'Content-Type': 'application/json',
			...(token && { Authorization: `Bearer ${token}` }),
			...headers,
		},
	}

	if (options.body) {
		reqOptions.body =
			typeof options.body === 'object'
				? JSON.stringify(options.body)
				: options.body
	}

	return fetch(`${baseUrl}${endpoint}`, reqOptions)
		.then(parseResponse)
		.catch(error => {
			throw error
		})
}
