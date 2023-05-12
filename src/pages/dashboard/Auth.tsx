import { baseURL, instance } from 'api/requests'
import { Spinner } from 'components/Spinner'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { campaignAtom, igAccessToken } from 'store/atoms'

const Auth = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [, setToken] = useAtom(igAccessToken)
	const [, setCampaign] = useAtom(campaignAtom)
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

		if (accessToken.data) {
			setToken(accessToken.data?.data?.token)
			navigate('/campaigns/new')
		}
	}

	const getSavedCampaign = async () => {
		const campaign = JSON.parse(sessionStorage.getItem('campaign') || '')
		const urls = [campaign.product_logo, campaign.background_image]
		// fetch both image and get their blob
		const allImage = await Promise.all(
			urls.map(u => fetch(u).then(response => response.blob()))
		)
		// create a new data transfer object to add files into a filelist object
		const first = new DataTransfer()
		const fileOne = new File([allImage[0]], 'image.jpg', {
			type: allImage[0].type,
		})
		first.items.add(fileOne)

		const second = new DataTransfer()
		const fileTwo = new File([allImage[1]], 'image.jpg', {
			type: allImage[1].type,
		})
		second.items.add(fileTwo)
		setCampaign({
			...campaign,
			product_logo: first.files,
			background_image: second.files,
		})
	}

	useEffect(() => {
		if (code) {
			generateAccessToken()
		} else {
			navigate('/campaigns')
		}
	}, [code])

	useEffect(() => {
		getSavedCampaign()
	}, [])

	return <Spinner />
}

export default Auth
