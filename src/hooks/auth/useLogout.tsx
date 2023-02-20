import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from 'models/auth-models'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { baseURL, instance } from 'services/requests'
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
				toast.success(data?.message)
				removeAccessToken()
				localStorage.removeItem('wustomers-user')
				navigate('/login')
			},
			onError: error => {
				toast.error(error.response?.data.message)
			},
		}
	)
}