import { atom } from 'jotai'
import { CampaignFormData, IGAccessTokenType } from 'models/shared'

export const campaignAtom = atom<CampaignFormData>({} as CampaignFormData)
export const igAccessToken = atom<IGAccessTokenType>({} as IGAccessTokenType)
export const stepsAtom = atom([
	{
		id: 1,
		completed: false,
	},
	{
		id: 2,
		completed: false,
	},
	{
		id: 3,
		completed: false,
	},
	{
		id: 4,
		completed: false,
	},
])
