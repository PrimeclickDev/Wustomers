import * as Popover from '@radix-ui/react-popover'
import { useCampaignAction } from 'api/hooks/campaigns/useCampaignAction'
import { useDeleteCampaign } from 'api/hooks/campaigns/useDeleteCampaign'
import { useFetchCampaigns } from 'api/hooks/campaigns/useFetchCampaigns'
import { ReactComponent as MoreIcon } from 'assets/icons/more-horizontal.svg'
import { ReactComponent as PlusCircleIcon } from 'assets/icons/plus-circle.svg'
import { ConfirmationModal } from 'components/ConfirmationModal'
import NewCampaignModal from 'components/NewCampaignModal'
import { PreviewModal } from 'components/PreviewModal'
import { Spinner } from 'components/Spinner'
import { usePageTitle } from 'hooks/usePageTitle'
import { CampaignSetupModal } from 'modals/CampaignSetupModal'
import { Campaign } from 'models/campaigns'
import { useState } from 'react'

const campaignStatus = {
	Active: 'Active',
	Inactive: 'Inactive',
	Paused: 'Paused',
}

const Campaigns = () => {
	usePageTitle('Campaigns')

	const [isOpen, setIsOpen] = useState(false)
	const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
	const [openCampaginModal, setOpenCampaginModal] = useState(false)
	const [campaignId, setCampaignId] = useState<string | number>()
	const [openPreviewModal, setOpenPreviewModal] = useState(false)
	const [campaignPreview, setCampaignPreview] = useState<Campaign | null>(null)
	const [action, setAction] = useState('')

	const { data, isLoading } = useFetchCampaigns('all')
	const deleteCampaign = useDeleteCampaign()
	const campaignAction = useCampaignAction()

	const performAction = () => {
		if (action === 'delete') {
			deleteCampaign.mutate(campaignId as number, {
				onSuccess: () => setOpenConfirmationModal(false),
			})
			return
		}

		campaignAction.mutate(
			{
				campaignId: campaignId as string,
				action,
			},
			{
				onSuccess: () => setOpenConfirmationModal(false),
			}
		)
	}

	return (
		<>
			<h2 className='text-3xl font-black'>My Campaigns</h2>

			{!isLoading ? (
				<ul className='mt-9 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] items-center gap-7'>
					{data?.campaigns?.data?.map(campaign => (
						<li
							key={campaign.id}
							className='relative w-full rounded bg-white'
						>
							<div className='campaign-badge-bg absolute top-3 right-3 flex items-center gap-2 rounded-sm px-3 py-1 backdrop:blur-sm'>
								<span
									className={`h-3 w-3 rounded-full ${
										campaign.campaign_status === 'Active'
											? 'bg-[#24C97A]'
											: 'bg-[rgba(255,0,0,0.9)]'
									}`}
								/>
								<span
									className={`text-sm font-medium ${
										campaign.campaign_status === 'Active'
											? 'text-[#24C97A]'
											: 'text-[rgba(255,0,0,0.9)]'
									}`}
								>
									{
										campaignStatus[
											campaign?.campaign_status as keyof typeof campaignStatus
										]
									}
								</span>
							</div>
							<img
								src={campaign.background_image}
								alt={`${campaign.title} banner`}
								className='h-[200px] w-full object-cover p-2'
							/>
							<div
								className={`flex items-center justify-between gap-2 px-4 py-3 text-white ${
									campaign.campaign_status === 'Active'
										? 'bg-wustomers-blue'
										: 'bg-wustomers-primary-lighter'
								}`}
							>
								<p>{campaign.title}</p>

								<Popover.Root>
									<Popover.Trigger asChild>
										<button
											type='button'
											aria-label='show more options'
											className='p-2'
										>
											<MoreIcon />
										</button>
									</Popover.Trigger>
									<Popover.Portal>
										<Popover.Content
											className='flex w-max flex-col rounded border border-gray-200 bg-white p-1 text-xs shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade'
											sideOffset={5}
										>
											{campaign?.payment_status === 'Paid' &&
											campaign?.campaign_status === 'Paused' ? (
												<button
													onClick={() => {
														setOpenConfirmationModal(true)
														setCampaignId(campaign.campaign_code)
														setAction('resume')
													}}
													type='button'
													className='rounded py-[6px] px-4 text-left transition-colors hover:bg-wustomers-blue hover:text-white'
												>
													Resume
												</button>
											) : null}
											{campaign?.campaign_status === 'Completed' ? (
												<button
													onClick={() => {
														setOpenConfirmationModal(true)
														setCampaignId(campaign.campaign_code)
														setAction('renew')
													}}
													type='button'
													className='rounded py-[6px] px-4 text-left transition-colors hover:bg-wustomers-blue hover:text-white'
												>
													Renew
												</button>
											) : null}
											{campaign?.payment_status === 'Unpaid' &&
											campaign?.campaign_status === 'Inactive' ? (
												<button
													type='button'
													onClick={() => {
														setOpenCampaginModal(true)
														setCampaignId(campaign.id)
													}}
													className='rounded py-[6px] px-4 text-left transition-colors hover:bg-wustomers-blue hover:text-white'
												>
													Activate
												</button>
											) : null}
											<button
												type='button'
												className='rounded py-[6px] px-4 text-left transition-colors hover:bg-wustomers-blue hover:text-white'
												onClick={() => {
													setOpenPreviewModal(true)
													setCampaignPreview(campaign)
												}}
											>
												Preview
											</button>
											{campaign?.payment_status === 'Paid' &&
											campaign?.campaign_status === 'Active' ? (
												<button
													onClick={() => {
														setOpenConfirmationModal(true)
														setCampaignId(campaign.campaign_code)
														setAction('pause')
													}}
													type='button'
													className='rounded py-[6px] px-4 text-left transition-colors hover:bg-wustomers-blue hover:text-white'
												>
													Pause
												</button>
											) : null}
											{(campaign?.payment_status === 'Unpaid' &&
												campaign?.campaign_status === 'Inactive') ||
											campaign?.campaign_status === 'Paused' ? (
												<button
													type='button'
													className='rounded py-[6px] px-4 text-left transition-colors hover:bg-wustomers-blue hover:text-white'
													onClick={() => {
														const newCampaign = { ...campaign }
														sessionStorage.setItem(
															'campaign',
															JSON.stringify(newCampaign)
														)
														setIsOpen(true)
													}}
												>
													Edit
												</button>
											) : null}
											{campaign?.campaign_status !== 'Active' ? (
												<button
													type='button'
													onClick={() => {
														setOpenConfirmationModal(true)
														setCampaignId(campaign.id)
														setAction('delete')
													}}
													className='rounded py-[6px] px-4 text-left transition-colors hover:bg-red-600 hover:text-white'
												>
													Delete
												</button>
											) : null}
											<Popover.Arrow className='fill-gray-300' />
										</Popover.Content>
									</Popover.Portal>
								</Popover.Root>
							</div>
						</li>
					))}

					<li className='w-full justify-self-start'>
						<button
							type='button'
							onClick={() => {
								sessionStorage.removeItem('campaign')
								setIsOpen(true)
							}}
							className='group inline-block w-full transition-colors'
						>
							<div className='grid h-[200px] place-items-center bg-white p-2'>
								<PlusCircleIcon />
							</div>
							<p className='bg-wustomers-primary px-4 py-3 text-center text-wustomers-blue transition-colors group-hover:bg-wustomers-blue group-hover:text-white'>
								Add new campaign
							</p>
						</button>
					</li>
				</ul>
			) : (
				<Spinner className='mt-3 text-wustomers-blue-light' />
			)}

			{/* setup new campaign modal */}
			<NewCampaignModal setIsOpen={setIsOpen} isOpen={isOpen} />

			{/* confirmation modal */}
			<ConfirmationModal
				isLoading={deleteCampaign.isLoading || campaignAction.isLoading}
				onClick={performAction}
				openModal={openConfirmationModal}
				setOpenModal={setOpenConfirmationModal}
				title={`Are you sure you ${action} campaign?`}
				btnText={`Yes, ${action}`}
			/>

			<CampaignSetupModal
				openModal={openCampaginModal}
				campaignId={campaignId as number}
				closeModal={() => setOpenCampaginModal(false)}
			/>

			<PreviewModal
				openModal={openPreviewModal}
				setOpenModal={setOpenPreviewModal}
				campaign={campaignPreview}
			/>
		</>
	)
}

export default Campaigns
