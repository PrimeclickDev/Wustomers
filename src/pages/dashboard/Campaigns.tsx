import { zodResolver } from '@hookform/resolvers/zod'
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
import { useNavigate } from 'react-router-dom'
import { campaignAtom } from 'store/atoms'
import { z } from 'zod'

const schema = z.object({
	uploadOption: z
		.string({
			invalid_type_error: 'To continue, select of the above upload options',
		})
		.min(1, { message: 'To continue, select of the above upload options' })
		.trim(),
})

type NewCampaignSchema = z.infer<typeof schema>

const Campaigns = () => {
	usePageTitle('Campaigns')
	const linkToIGRef = useRef<HTMLAnchorElement | null>(null)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm<NewCampaignSchema>({
		defaultValues: {
			uploadOption: '',
		},
		resolver: zodResolver(schema),
	})
	const { data: campaigns, isLoading } = useFetchCampaigns()
	const [isOpen, setIsOpen] = useState(false)
	const [, setCampaign] = useAtom(campaignAtom)
	const navigate = useNavigate()

	const closeModal = () => setIsOpen(false)
	const openModal = () => setIsOpen(true)

	const onSubmit: SubmitHandler<NewCampaignSchema> = data => {
		setCampaign(prev => ({ ...prev, ...data }))
		if (data.uploadOption === 'manual') {
			navigate('/campaigns/new')
		} else {
			linkToIGRef.current?.click()
		}
	}

	return (
		<>
			<h2 className='text-3xl font-black'>My Campaigns</h2>

			{!isLoading ? (
				<ul className='mt-9 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center justify-items-start gap-7'>
					{campaigns?.map(campaign => (
						<li key={campaign.id} className='relative rounded bg-white'>
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
								<button type='button' aria-label='view more'>
									<MoreIcon />
								</button>
							</div>
						</li>
					))}
					<li className='w-[300px]'>
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
									className='h-4 w-4 accent-wustomers-blue'
									id={value}
									value={value}
									{...register('uploadOption')}
								/>
								<label htmlFor={value}>
									{value === 'manual'
										? 'Manual Upload'
										: 'Connect to IG'}
								</label>
							</div>
						))}
						{errors.uploadOption ? (
							<ErrorMessage message={errors.uploadOption.message} />
						) : null}
					</div>

					<div className='flex items-center justify-between gap-4'>
						<Button
							text='Continue'
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
		</>
	)
}

export default Campaigns
