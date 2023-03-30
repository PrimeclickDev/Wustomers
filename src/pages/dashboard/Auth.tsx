import { baseURL, instance } from 'api/requests'
import { Spinner } from 'components/Spinner'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { igAccessToken } from 'store/atoms'

const Auth = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [, setToken] = useAtom(igAccessToken)
	const code = location.search.slice(6)

	const generateAccessToken = async () => {
		const accessToken = await instance.post(
			`${baseURL}/campaign/instagram/token`,
			{
				code,
			},
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		)

		console.log('access_token', accessToken.data?.data?.token)

		if (accessToken.data) {
			setToken(accessToken.data?.data?.token)
			navigate('/campaigns/new')
		}
	}

	useEffect(() => {
		if (code) {
			generateAccessToken()
		} else {
			navigate('/campaigns')
		}
	}, [code])

	return <Spinner />
}

export default Auth
