import { zodResolver } from '@hookform/resolvers/zod'
import * as Popover from '@radix-ui/react-popover'
import { useDeleteCampaign } from 'api/hooks/campaigns/useDeleteCampaign'
import { useFetchCampaigns } from 'api/hooks/campaigns/useFetchCampaigns'
import { ReactComponent as MoreIcon } from 'assets/icons/more-horizontal.svg'
import { ReactComponent as PlusCircleIcon } from 'assets/icons/plus-circle.svg'
import { Button } from 'components/Button'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { ErrorMessage } from 'components/ErrorMessage'
import { Modal } from 'components/Modal'
import { PreviewModal } from 'components/PreviewModal'
import { Spinner } from 'components/Spinner'
import { usePageTitle } from 'hooks/usePageTitle'
import { useAtom } from 'jotai'
import { CampaignSetupModal } from 'modals/CampaignSetupModal'
import { Campaign } from 'models/campaigns'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { campaignAtom } from 'store/atoms'
import { z } from 'zod'

const schema = z.object({
	upload_option: z
		.string({
			invalid_type_error: 'To continue, select of the above upload options',
		})
		.min(1, { message: 'To continue, select of the above upload options' })
		.trim(),
})

export type NewCampaignSchema = z.infer<typeof schema>

const campaignStatus = {
	Active: 'Active',
	Inactive: 'Inactive',
	Paused: 'Paused',
}

const Campaigns = () => {
	usePageTitle('Campaigns')
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitted, isValid },
		reset,
	} = useForm<NewCampaignSchema>({
		defaultValues: {
			upload_option: '',
		},
		resolver: zodResolver(schema),
	})
	const [isOpen, setIsOpen] = useState(false)
	const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
	const [openCampaginModal, setOpenCampaginModal] = useState(false)
	const [campaignId, setCampaignId] = useState(0)
	const [openPreviewModal, setOpenPreviewModal] = useState(false)
	const [campaignPreview, setcampaignPreview] = useState<Campaign | null>(null)

	const [, setCampaign] = useAtom(campaignAtom)
	const { data, isLoading } = useFetchCampaigns('all')
	const deleteCampaign = useDeleteCampaign()

	const closeModal = () => setIsOpen(false)
	const openModal = () => setIsOpen(true)

	const onSubmit: SubmitHandler<NewCampaignSchema> = data => {
		setCampaign(prev => ({ ...prev, ...data }))
		if (data.upload_option === 'manual') {
			navigate('/campaigns/new')
		}

		window.location.href = `https://api.instagram.com/oauth/authorize?client_id=${
			import.meta.env.VITE_IG_CLIENT_ID
		}&redirect_uri=https://wustomers.netlify.app/auth&scope=user_profile,user_media&response_type=code`
	}

	const campaignDelete = () => {
		deleteCampaign.mutate(campaignId, {
			onSuccess: () => setOpenConfirmationModal(false),
		})
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
													type='button'
													className='rounded py-[6px] px-4 text-left transition-colors hover:bg-wustomers-blue hover:text-white'
												>
													Resume
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
											{/* <Link
												to='/campaigns-metrics'
												className='rounded py-[6px] px-4 text-left transition-colors hover:bg-wustomers-blue hover:text-white'
											>
												Show metrics
											</Link> */}
											<button
												type='button'
												className='rounded py-[6px] px-4 text-left transition-colors hover:bg-wustomers-blue hover:text-white'
												onClick={() => {
													setOpenPreviewModal(true)
													setcampaignPreview(campaign)
												}}
											>
												Preview
											</button>
											{campaign?.payment_status === 'Paid' &&
											campaign?.campaign_status === 'Active' ? (
												<button
													type='button'
													className='rounded py-[6px] px-4 text-left transition-colors hover:bg-wustomers-blue hover:text-white'
												>
													Pause
												</button>
											) : null}
											{campaign?.payment_status === 'Unpaid' &&
											campaign?.campaign_status === 'Inactive' ? (
												<button
													type='button'
													className='rounded py-[6px] px-4 text-left transition-colors hover:bg-wustomers-blue hover:text-white'
													onClick={() => {
														const newCampaign = { ...campaign }
														sessionStorage.setItem(
															'campaign',
															JSON.stringify(newCampaign)
														)
														openModal()
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
								openModal()
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
			<Modal closeModal={closeModal} modalOpen={isOpen}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<header>
						<h3 className='text-lg font-medium'>
							How would you like to upload your campaign?
						</h3>
						<p className='text-sm italic'>NB: Pls select one</p>
					</header>

					<div className='mt-6 flex flex-col gap-3'>
						{['manual', 'instagram'].map(value => (
							<div key={value} className='flex items-center gap-3'>
								<input
									type='radio'
									className='peer h-4 w-4 accent-wustomers-blue disabled:cursor-not-allowed disabled:opacity-50'
									disabled={value === 'manual'}
									id={value}
									value={value}
									{...register('upload_option')}
								/>
								<label
									htmlFor={value}
									className='peer-disabled:cursor-not-allowed peer-disabled:opacity-50'
								>
									{value === 'manual'
										? 'Manual Upload'
										: 'Connect to IG'}
								</label>
							</div>
						))}
						{errors.upload_option ? (
							<ErrorMessage message={errors.upload_option.message} />
						) : null}
					</div>

					<div className='flex items-center justify-between gap-4'>
						<Button
							text={isSubmitted && isValid ? <Spinner /> : 'Continue'}
							disabled={isSubmitted && isValid}
							variant='fill'
							className='mt-6 w-full normal-case'
							type='submit'
						/>
						<Button
							text='Cancel'
							variant='outline'
							className='mt-6 w-full normal-case'
							onClick={() => {
								closeModal()
								reset()
							}}
						/>
					</div>
				</form>
			</Modal>

			{/* confirmation modal */}
			<ConfirmationModal
				mutationAction={deleteCampaign}
				onClick={campaignDelete}
				openModal={openConfirmationModal}
				setOpenModal={setOpenConfirmationModal}
				title='Are you sure you delete campaign?'
			/>

			<CampaignSetupModal
				openModal={openCampaginModal}
				campaignId={campaignId}
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
