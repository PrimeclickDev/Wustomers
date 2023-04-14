import { atom } from 'jotai'
import { CampaignFormData } from 'models/campaigns'
import { IGAccessTokenType } from 'models/shared'

export const campaignAtom = atom<CampaignFormData>({} as CampaignFormData)
export const igAccessToken = atom<IGAccessTokenType>({} as IGAccessTokenType)
export const paymentModalType = atom('setup')
