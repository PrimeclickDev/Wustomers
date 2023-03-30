import { baseURL } from 'api/requests'
import axios from 'axios'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { igAccessToken } from 'store/atoms'

const Auth = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [, setToken] = useAtom(igAccessToken)
	const code = location.search.slice(6)

	const generateAccessToken = async () => {
		const accessToken = await axios.post(
			`${baseURL}campaign/instagram/token`,
			{
				code,
			},
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		)

		console.log('access_token', accessToken.data)

		if (accessToken.data) {
			setToken(accessToken.data)
			navigate('/campaigns/new')
		}
	}

	useEffect(() => {
		generateAccessToken()
	}, [])

	return <Navigate replace to='/campaigns/new' />
}

export default Auth
