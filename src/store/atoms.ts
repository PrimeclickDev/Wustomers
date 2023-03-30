import { atom } from 'jotai'
import { CampaignFormData, IGAccessTokenType } from 'models/shared'

export const campaignAtom = atom<CampaignFormData>({} as CampaignFormData)
export const igAccessToken = atom<IGAccessTokenType>({} as IGAccessTokenType)
export const filled = atom({
	firstStep: false,
	secondStep: false,
	thirdStep: false,
})
