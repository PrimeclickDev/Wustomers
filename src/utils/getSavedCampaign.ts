import { getDefaultStore } from 'jotai'
import { campaignAtom } from 'store/atoms'
const store = getDefaultStore()

export const getSavedCampaign = async () => {
	const campaign =
		JSON.parse(sessionStorage.getItem('campaign') as string) || ''
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

	store.set(campaignAtom, {
		...campaign,
		product_logo: urls[0] ? first.files : undefined,
		background_image: urls[1] ? second.files : undefined,
	})
}
