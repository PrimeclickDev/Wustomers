/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCreateCampaign } from 'api/hooks/campaigns/useCreateCampaign'
import { useUpdateCampaign } from 'api/hooks/campaigns/useUpdateCampaign'
import { ReactComponent as FullscreenIcon } from 'assets/icons/fullscreen.svg'
import { ReactComponent as MobileIcon } from 'assets/icons/mobile-2.svg'
import { ReactComponent as MonitorIcon } from 'assets/icons/monitor.svg'
import { ReactComponent as TickCircleIcon } from 'assets/icons/tickcircle.svg'
import { useAtom } from 'jotai'
import { CampaignSetupModal } from 'modals/CampaignSetupModal'
import { CampaignProps } from 'models/shared'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { campaignAtom, paymentModalType } from 'store/atoms'
import { Button } from './Button'
import { Modal } from './Modal'
import { Preview } from './Preview'
import { Spinner } from './Spinner'

export const NewCampaignStepFour = ({ prevStep }: CampaignProps) => {
	const navigate = useNavigate()
	const [campaign] = useAtom(campaignAtom)
	const [activeView, setActiveView] = useState('desktop')
	const [campaignId, setCampaignId] = useState(0)
	const [openModal, setOpenModal] = useState(false)
	const [openCampaginModal, setOpenCampaginModal] = useState(false)
	const [, setModalType] = useAtom(paymentModalType)
	const previewRef = useRef<HTMLIFrameElement | null>(null)

	const closeModal = () => setOpenModal(false)
	const publishCampaign = useCreateCampaign()
	const updateCampaign = useUpdateCampaign()

	const onPublishCampaign = () => {
		const campaignToPublish = {
			...campaign,
			product_logo: Object.values(campaign.product_logo)[0],
			background_image: Object.values(campaign.background_image)[0],
			upload_option: campaign.upload_option ?? 'instagram',
			upload_option_link: campaign.upload_option ?? 'instagram',
		}

		//@ts-expect-error
		delete campaignToPublish.is_body_content

		//@ts-expect-error
		publishCampaign.mutate(campaignToPublish, {
			onSuccess: ({ data }) => {
				setOpenModal(true)
				setCampaignId(data.data.id)
			},
		})
	}

	const onUpdateCampaign = () => {
		const campaignToUpdate = {
			...campaign,
			product_logo: Object.values(campaign.product_logo)[0],
			background_image: Object.values(campaign.background_image)[0],
			upload_option: campaign.upload_option ?? 'instagram',
			upload_option_link: campaign.upload_option ?? 'instagram',
		}

		updateCampaign.mutate(
			{
				//@ts-expect-error
				formdata: campaignToUpdate,
				id: campaign.id!,
			},
			{
				onSuccess: () => navigate('/campaigns'),
			}
		)
	}

	const setupCampaign = () => {
		setOpenModal(false)
		setOpenCampaginModal(true)
		setModalType('setup')
	}

	const previewFullscreen = () => {
		const elem = previewRef.current
		if (elem?.requestFullscreen) {
			elem?.requestFullscreen()
		}
	}

	return (
		<>
			<section className='mt-10 flex flex-col'>
				<header className='flex items-center justify-between bg-wustomers-neutral-light p-3 font-medium md:px-9'>
					<h3>Preview Campaign:</h3>

					<div className='flex items-center gap-4 text-sm'>
						<button
							aria-label='full screen preview'
							title='Full screen preview'
							onClick={previewFullscreen}
							className='hidden rounded-sm bg-wustomers-dark-gray p-2 transition-all hover:bg-wustomers-main hover:text-white md:block'
						>
							<FullscreenIcon />
						</button>
						<div className='hidden md:block'>
							<button
								type='button'
								className={`rounded-l p-2 transition-colors ${
									activeView === 'desktop'
										? 'bg-wustomers-blue'
										: 'bg-[#CDD4F4]'
								}`}
								onClick={() => setActiveView('desktop')}
							>
								<MonitorIcon />
								<span className='sr-only'>desktop view</span>
							</button>
							<button
								type='button'
								className={`rounded-r p-2 transition-colors ${
									activeView === 'mobile'
										? 'bg-wustomers-blue'
										: 'bg-[#CDD4F4]'
								}`}
								onClick={() => setActiveView('mobile')}
							>
								<MobileIcon />
								<span className='sr-only'>mobile view</span>
							</button>
						</div>
					</div>
				</header>
				<div className='flex flex-col gap-6 bg-white px-3 py-6 md:py-12 md:px-9'>
					<Preview
						activeView={activeView}
						campaign={campaign}
						ref={previewRef}
					/>

					{/* switch */}
					{/* <label className='relative mt-10 inline-flex cursor-pointer items-center'>
						<input
							type='checkbox'
							value=''
							className='peer sr-only'
							checked={changeMode}
							onChange={() => setChangeMode(!changeMode)}
						/>
						<div className='flex h-[50px] w-[180px] items-center'>
							<span
								className={`grid h-full place-items-center bg-wustomers-blue px-4 transition-all ${
									changeMode ? '-translate-x-0' : 'translate-x-[125px]'
								}`}
							>
								{changeMode ? <SunIcon /> : <MoonIcon />}
							</span>
							<span
								className={`grid h-full w-full place-items-center px-5 transition-all ${
									changeMode
										? 'translate-x-0 bg-wustomers-primary'
										: 'translate-x-[-55px] bg-wustomers-main text-white'
								}`}
							>
								{changeMode ? 'Light mode' : 'Dark mode'}
							</span>
						</div>
						<span className='sr-only'>toggle theme</span>
					</label> */}
				</div>

				<div className='mt-3 flex flex-col gap-4 md:flex-row md:items-center md:self-end'>
					<Button
						text='Previous'
						variant='outline'
						disabled={
							publishCampaign.isLoading || updateCampaign.isLoading
						}
						onClick={prevStep}
						className='!bg-white px-11 !font-normal capitalize'
					/>
					{campaign.contact_option_medium ? (
						<Button
							text={updateCampaign.isLoading ? <Spinner /> : 'Update'}
							disabled={updateCampaign.isLoading}
							variant='fill'
							className='px-14 !font-normal capitalize'
							onClick={onUpdateCampaign}
						/>
					) : (
						<Button
							text={publishCampaign.isLoading ? <Spinner /> : 'Publish'}
							disabled={publishCampaign.isLoading}
							variant='fill'
							className='px-14 !font-normal capitalize'
							onClick={onPublishCampaign}
						/>
					)}
				</div>
			</section>

			<Modal modalOpen={openModal} closeModal={closeModal}>
				<div className='flex flex-col justify-center py-6 md:items-center md:px-10'>
					<div className='grid h-20 w-20 place-content-center self-center rounded-full bg-wustomers-blue'>
						<TickCircleIcon />
					</div>
					<h3 className='pt-5 text-center text-2xl md:px-11'>
						Landing page created successfully
					</h3>

					<div className='mt-6 flex flex-col justify-between gap-3 md:flex-row md:items-center'>
						<Button
							variant='outline'
							text='Go back'
							className='!px-8 normal-case text-wustomers-blue'
							href='/campaigns'
						/>

						<Button
							variant='fill'
							text='Setup campaign'
							className='!px-5 normal-case'
							onClick={setupCampaign}
						/>
					</div>
				</div>
			</Modal>

			<CampaignSetupModal
				openModal={openCampaginModal}
				campaignId={campaignId}
				closeModal={() => setOpenCampaginModal(false)}
			/>
		</>
	)
}
