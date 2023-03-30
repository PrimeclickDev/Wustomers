import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'
import InstagramPostsModal from 'modals/InstagramPostsModal'
import { CampaignProps } from 'models/shared'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { campaignAtom } from 'store/atoms'
import { z } from 'zod'
import { Button } from './Button'
import { ErrorMessage } from './ErrorMessage'
import { Modal } from './Modal'

const schema = z.object({
	officeAddress: z
		.string({ required_error: 'Office address is required' })
		.min(1, { message: 'Office address is required' })
		.trim(),
	phoneNumber: z
		.string({ required_error: 'Phone number is required' })
		.min(1, { message: 'Phone number is required' })
		.min(11, { message: 'Phone number cannot be less than 11 characters' })
		// .regex(/^([0]{1}|\+?234)([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g, {
		// 	message: 'Please enter a valid phone number',
		// })
		.trim(),
	email: z
		.string({ required_error: 'Email address is required' })
		.min(1, { message: 'Email is required' })
		.min(3, { message: 'Email address cannot be less than 3 characters' })
		.email({ message: 'Please enter a valid email address' })
		.trim(),
	whatsappNumber: z
		.string()
		.min(1, { message: 'Whatsapp number is required' })
		.min(11, {
			message: 'Whatsapp number cannot be less than 11 characters',
		}),
	instagramLink: z
		.string({ required_error: 'Instagram link is required' })
		.min(1, { message: 'Instagram link is required' })
		.url({ message: 'Instagram link must be a url' })
		.trim(),
})

export type StepTwoSchema = z.infer<typeof schema>

export const NewCampaignStepTwo = ({ nextStep, prevStep }: CampaignProps) => {
	const [campaign, setCampaign] = useAtom(campaignAtom)
	// const [token] = useAtom(igAccessToken)
	// const [posts, setPosts] = useState<IGPosts>({} as IGPosts)
	const [isOpen, setIsOpen] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<StepTwoSchema>({
		defaultValues: {
			officeAddress: campaign.officeAddress ?? '',
			phoneNumber: campaign.phoneNumber ?? '',
			email: campaign.email ?? '',
			whatsappNumber: campaign.whatsappNumber ?? '',
			instagramLink: campaign.instagramLink ?? '',
		},
		resolver: zodResolver(schema),
	})

	const onSubmit: SubmitHandler<StepTwoSchema> = data => {
		setCampaign(prev => ({ ...prev, ...data }))
		nextStep?.()
	}

	const closeModal = () => setIsOpen(false)

	// const fetchUserIGPost = async () => {
	// 	const posts: AxiosResponse<IGPosts> = await axios.get(
	// 		`https://graph.instagram.com/me/media?limit=50&fields=id,media_type,media_url,caption,timestamp,permalink&access_token=${token.access_token}`
	// 	)
	// 	setPosts(posts.data)
	// }

	// useEffect(() => {
	// 	if (token) {
	// 		fetchUserIGPost()
	// 	}
	// }, [token])

	return (
		<>
			<section className='mt-10 flex flex-col'>
				<h3 className='bg-wustomers-neutral-light p-3 font-medium md:px-9'>
					Body section:
				</h3>
				<form className='flex flex-col gap-5 bg-white px-3 py-6 md:py-12 md:px-9'>
					<div className='grid gap-2 md:grid-cols-5'>
						<label htmlFor='officeAddress' className='md:col-span-1'>
							Office address:
						</label>
						<div className='flex flex-col gap-1 md:col-span-4'>
							<input
								type='text'
								id='officeAddress'
								{...register('officeAddress')}
								className={`w-full appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
									errors.officeAddress
										? 'bg-red-50 ring-red-600'
										: 'bg-wustomers-primary ring-wustomers-primary-light'
								}`}
							/>
							{errors.officeAddress ? (
								<ErrorMessage message={errors.officeAddress.message} />
							) : null}
						</div>
					</div>
					<div className='grid gap-2 md:grid-cols-5'>
						<label htmlFor='phoneNumber' className='md:col-span-1'>
							Phone number:
						</label>
						<div className='flex flex-col gap-1 md:col-span-4'>
							<input
								type='tel'
								id='phoneNumber'
								inputMode='numeric'
								{...register('phoneNumber')}
								className={`w-full appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
									errors.phoneNumber
										? 'bg-red-50 ring-red-600'
										: 'bg-wustomers-primary ring-wustomers-primary-light'
								}`}
							/>
							{errors.phoneNumber ? (
								<ErrorMessage message={errors.phoneNumber.message} />
							) : null}
						</div>
					</div>
					<div className='grid gap-2 md:grid-cols-5'>
						<label htmlFor='email' className='md:col-span-1'>
							Email address:
						</label>
						<div className='flex flex-col gap-1 md:col-span-4'>
							<input
								type='email'
								id='email'
								{...register('email')}
								className={`w-full appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
									errors.email
										? 'bg-red-50 ring-red-600'
										: 'bg-wustomers-primary ring-wustomers-primary-light'
								}`}
							/>
							{errors.email ? (
								<ErrorMessage message={errors.email.message} />
							) : null}
						</div>
					</div>
					<div className='grid gap-2 md:grid-cols-5'>
						<label htmlFor='whatsappNumber' className='md:col-span-1'>
							Whatsapp number:
						</label>
						<div className='flex flex-col gap-1 md:col-span-4'>
							<input
								type='tel'
								id='whatsappNumber'
								inputMode='numeric'
								{...register('whatsappNumber')}
								className={`w-full appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
									errors.whatsappNumber
										? 'bg-red-50 ring-red-600'
										: 'bg-wustomers-primary ring-wustomers-primary-light'
								}`}
							/>
							{errors.whatsappNumber ? (
								<ErrorMessage message={errors.whatsappNumber.message} />
							) : null}
						</div>
					</div>
					<div className='grid gap-2 md:grid-cols-5'>
						<label htmlFor='instagram' className='md:col-span-1'>
							Instagram link:
						</label>
						<div className='flex flex-col gap-1 md:col-span-4'>
							<input
								type='url'
								id='instagram'
								inputMode='url'
								{...register('instagramLink')}
								className={`w-full appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
									errors.instagramLink
										? 'bg-red-50 ring-red-600'
										: 'bg-wustomers-primary ring-wustomers-primary-light'
								}`}
							/>
							{errors.instagramLink ? (
								<ErrorMessage message={errors.instagramLink.message} />
							) : null}
						</div>
					</div>
					<Button
						text='Select posts'
						variant='outline'
						onClick={() => setIsOpen(true)}
						className='!bg-white px-11 !font-normal capitalize'
					/>
				</form>

				<div className='mt-3 flex flex-col gap-4 md:flex-row md:items-center md:self-end'>
					<Button
						text='Previous'
						variant='outline'
						onClick={prevStep}
						className='!bg-white px-11 !font-normal capitalize'
					/>
					<Button
						text='Next'
						type='submit'
						variant='fill'
						onClick={handleSubmit(onSubmit)}
						className='px-14 !font-normal capitalize'
					/>
				</div>
			</section>

			<Modal
				modalOpen={isOpen}
				closeModal={closeModal}
				className='max-w-3xl'
			>
				<InstagramPostsModal closeModal={closeModal} />
			</Modal>
		</>
	)
}
