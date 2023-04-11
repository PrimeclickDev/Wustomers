import { zodResolver } from '@hookform/resolvers/zod'
import * as Popover from '@radix-ui/react-popover'
import { useFetchCampaigns } from 'api/hooks/campaigns/useFetchCampaigns'
import { ReactComponent as MoreIcon } from 'assets/icons/more-horizontal.svg'
import { ReactComponent as PlusCircleIcon } from 'assets/icons/plus-circle.svg'
import { Button } from 'components/Button'
import { ErrorMessage } from 'components/ErrorMessage'
import { Modal } from 'components/Modal'
import { Spinner } from 'components/Spinner'
import { usePageTitle } from 'hooks/usePageTitle'
import { useAtom } from 'jotai'
import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
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

const Campaigns = () => {
	usePageTitle('Campaigns')
	const linkToIGRef = useRef<HTMLAnchorElement | null>(null)
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
	const { data: campaigns, isLoading } = useFetchCampaigns()
	const [isOpen, setIsOpen] = useState(false)
	const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
	const [, setCampaign] = useAtom(campaignAtom)
	const navigate = useNavigate()

	const closeModal = () => setIsOpen(false)
	const openModal = () => setIsOpen(true)

	const onSubmit: SubmitHandler<NewCampaignSchema> = data => {
		setCampaign(prev => ({ ...prev, ...data }))
		if (data.upload_option === 'manual') {
			navigate('/campaigns/new')
		} else {
			linkToIGRef.current?.click()
		}
	}

	console.log('campaigns', campaigns)

	return (
		<>
			<h2 className='text-3xl font-black'>My Campaigns</h2>

			{/* <div
				role='alert'
				className='mt-5 flex items-center gap-4 rounded-sx bg-white py-1 text-sm font-medium lg:text-base'
			>
				<div className='bg-wustomers-blue py-2 px-4 text-white'>
					<InformationIcon />
				</div>
				<span>
					Note: Inactive campaigns will be automatically deleted after
					60days
				</span>
			</div> */}

			{!isLoading ? (
				<ul className='mt-9 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] items-center gap-7'>
					{campaigns?.map(campaign => (
						<li
							key={campaign.id}
							className='relative w-full rounded bg-white'
						>
							<div className='campaign-badge-bg absolute top-3 right-3 flex items-center gap-2 rounded-sm px-3 py-1 backdrop:blur-sm'>
								<span
									className={`h-3 w-3 rounded-full ${
										campaign.status_id === 1
											? 'bg-[#24C97A]'
											: 'bg-[rgba(255,0,0,0.9)]'
									}`}
								/>
								<span
									className={`text-sm font-medium ${
										campaign.status_id === 1
											? 'text-[#24C97A]'
											: 'text-[rgba(255,0,0,0.9)]'
									}`}
								>
									{campaign.status_id === 1 ? 'Active' : 'Paused'}
								</span>
							</div>
							<img
								src={campaign.background_image}
								alt={`${campaign.title} banner`}
								className='h-[200px] w-full object-cover p-2'
							/>
							<div
								className={`flex items-center justify-between gap-2 px-4 py-3 text-white ${
									campaign.status_id === 1
										? 'bg-wustomers-blue'
										: 'bg-wustomers-primary-lighter'
								}`}
							>
								<p>{campaign.title}</p>

								<Popover.Root>
									<Popover.Trigger asChild>
										<button type='button' aria-label='view more'>
											<MoreIcon />
										</button>
										{/* <button
											aria-label='show more options'
											className='text-primary flex w-max p-1 underline transition-all'
										>
											<MoreIcon />
										</button> */}
									</Popover.Trigger>
									<Popover.Portal>
										<Popover.Content
											className='flex w-max flex-col rounded border border-gray-200 bg-white p-1 text-xs shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade'
											sideOffset={5}
										>
											<button className='rounded py-[6px] px-4 text-left transition-colors hover:bg-wustomers-blue hover:text-white'>
												Renew
											</button>
											<Link
												to='/campaigns-metrics'
												className='rounded py-[6px] px-4 text-left transition-colors hover:bg-wustomers-blue hover:text-white'
											>
												Show metrics
											</Link>
											<button className='rounded py-[6px]  px-4 text-left transition-colors hover:bg-wustomers-blue hover:text-white'>
												Start
											</button>
											<button
												onClick={() =>
													setOpenConfirmationModal(true)
												}
												className='rounded py-[6px]  px-4 text-left transition-colors hover:bg-red-600 hover:text-white'
											>
												Delete
											</button>
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
							onClick={openModal}
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

					<a
						aria-hidden='true'
						ref={linkToIGRef}
						className='invisible'
						href={`https://api.instagram.com/oauth/authorize?client_id=${
							import.meta.env.VITE_IG_CLIENT_ID
						}&redirect_uri=${
							import.meta.env.PROD
								? import.meta.env.VITE_PROD_REDIRECT_URL
								: import.meta.env.VITE_DEV_REDIRECT_URL
						}&scope=user_profile,user_media&response_type=code`}
					/>
				</form>
			</Modal>

			<Modal
				modalOpen={openConfirmationModal}
				closeModal={() => setOpenConfirmationModal(false)}
			>
				<div className='flex flex-col items-center text-center'>
					<h3 className='max-w-[20ch] pt-2 text-xl font-medium'>
						Are you sure you delete campaign?
					</h3>

					<div className='mt-6 flex items-center gap-5 md:mx-8'>
						<Button
							variant='outline'
							onClick={() => setOpenConfirmationModal(false)}
							text='No, Cancel'
							className='px-8 normal-case hover:shadow-none'
						/>
						<Button
							disabled={isLoading}
							text={
								isLoading ? (
									<Spinner className='text-white' />
								) : (
									'Yes, Delete'
								)
							}
							variant='fill'
							className='py-2 px-8 normal-case hover:shadow-none'
							// onClick={logout}
						/>
					</div>
				</div>
			</Modal>
		</>
	)
}

export default Campaigns
