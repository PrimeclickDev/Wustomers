import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from 'models/auth-models'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { baseURL, instance } from 'services/requests'

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
			},
			onError: error => {
				toast.error(error.response?.data.message)
			},
		}
	)
}
