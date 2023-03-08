import { useMutation } from '@tanstack/react-query'
import { baseURL, instance } from 'api/requests'
import { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from 'models/auth-models'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { removeAccessToken } from 'utils/storage'

type LogoutResponse = {
	message: string
}

export const logout = async (): Promise<AxiosResponse<LogoutResponse>> => {
	return await instance.delete(`${baseURL}/logout`)
}

export const useLogout = () => {
	const navigate = useNavigate()

	return useMutation<AxiosResponse<LogoutResponse>, AxiosError<ErrorResponse>>(
		{
			mutationFn: logout,
			onSuccess: ({ data }) => {
				removeAccessToken()
				localStorage.removeItem('wustomers-user')
				navigate('/login')
				toast.success(data?.message)
			},
			onError: error => {
				toast.error(error.response?.data.message)
			},
		}
	)
}
