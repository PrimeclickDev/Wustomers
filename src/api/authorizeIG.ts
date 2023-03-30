import axios from 'axios'

// const client_id = 3550721125160522
// const redirect_uri = 'https://127.0.0.1:5173/campaigns/new'

export const getAccessCode = async () => {
	const getCode = await axios.get(
		'https://api.instagram.com/oauth/authorize?client_id=3550721125160522redirect_uri=https://wustomers.netlify.app/&scope=user_profile,user_media&response_type=code'
	)
	return getCode.data
}
