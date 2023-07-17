import { Spinner } from 'components/Spinner'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSavedCampaign } from 'utils/getSavedCampaign'

const Auth = () => {
	// const location = useLocation()
	const navigate = useNavigate()
	// const [, setToken] = useAtom(igAccessToken)
	// const [campaign, setCampaign] = useAtom(campaignAtom)
	// const code = location.search.slice(6)

	// const generateAccessToken = async () => {
	// 	const accessToken = await instance.post(
	// 		`${baseURL}/campaign/instagram/token`,
	// 		{
	// 			code,
	// 		},
	// 		{
	// 			headers: {
	// 				'Content-Type': 'multipart/form-data',
	// 			},
	// 		}
	// 	)

	// 	if (accessToken.data) {
	// 		setToken(accessToken.data?.data?.token)
	// 		navigate('/campaigns/new')
	// 	}
	// }

	// useEffect(() => {
	// 	if (code) {
	// 		generateAccessToken()
	// 		return
	// 	}
	// 	navigate('/campaigns')
	// }, [code])

	useEffect(() => {
		getSavedCampaign().then(() => navigate('/campaigns/new?type=manual'))
	}, [])

	return <Spinner />
}

export default Auth
