import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosResponse } from 'axios'
import { useAtom } from 'jotai'
import InstagramPostsModal from 'modals/InstagramPostsModal'
import { CampaignProps, IGPosts } from 'models/shared'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { campaignAtom, igAccessToken } from 'store/atoms'
import { z } from 'zod'
import { Button } from './Button'
import { ErrorMessage } from './ErrorMessage'
import { Modal } from './Modal'

const schema = z.object({
	office_address: z
		.string({ required_error: 'Office address is required' })
		.min(1, { message: 'Office address is required' })
		.trim(),
	phone: z
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
})

export type StepTwoSchema = z.infer<typeof schema>

export const NewCampaignStepTwo = ({ nextStep, prevStep }: CampaignProps) => {
	const [campaign, setCampaign] = useAtom(campaignAtom)
	const [token] = useAtom(igAccessToken)
	const [posts, setPosts] = useState<IGPosts>({} as IGPosts)
	const [isOpen, setIsOpen] = useState(false)
	const [noPostError, setNoPostError] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<StepTwoSchema>({
		defaultValues: {
			office_address: campaign.office_address ?? '',
			phone: campaign.phone ?? '',
			email: campaign.email ?? '',
		},
		resolver: zodResolver(schema),
	})

	const onSubmit: SubmitHandler<StepTwoSchema> = data => {
		if (!campaign?.social_posts) {
			setNoPostError(true)
			return
		}
		setCampaign(prev => ({ ...prev, ...data }))
		setNoPostError(false)
		nextStep?.()
	}

	const closeModal = () => setIsOpen(false)

	const fetchUserIGPost = async () => {
		const posts: AxiosResponse<IGPosts> = await axios.get(
			`https://graph.instagram.com/me/media?limit=50&fields=id,media_type,media_url,caption,timestamp,permalink&access_token=${token?.access_token}`
		)
		setPosts(posts.data)
	}

	useEffect(() => {
		if (token) {
			fetchUserIGPost()
		}
	}, [token])

	return (
		<>
			<section className='mt-10 flex flex-col'>
				<h3 className='bg-wustomers-neutral-light p-3 font-medium md:px-9'>
					Body section:
				</h3>
				<div className='bg-white px-3 py-6 md:py-12 md:px-9'>
					<form className='flex flex-col gap-5'>
						<div className='grid gap-2 md:grid-cols-5'>
							<label htmlFor='office_address' className='md:col-span-1'>
								Office address:
							</label>
							<div className='flex flex-col gap-1 md:col-span-4'>
								<input
									type='text'
									id='office_address'
									{...register('office_address')}
									className={`w-full appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
										errors.office_address
											? 'bg-red-50 ring-red-600'
											: 'bg-wustomers-primary ring-wustomers-primary-light'
									}`}
								/>
								{errors.office_address ? (
									<ErrorMessage
										message={errors.office_address.message}
									/>
								) : null}
							</div>
						</div>
						<div className='grid gap-2 md:grid-cols-5'>
							<label htmlFor='phone' className='md:col-span-1'>
								Phone number:
							</label>
							<div className='flex flex-col gap-1 md:col-span-4'>
								<input
									type='tel'
									id='phone'
									inputMode='numeric'
									{...register('phone')}
									className={`w-full appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
										errors.phone
											? 'bg-red-50 ring-red-600'
											: 'bg-wustomers-primary ring-wustomers-primary-light'
									}`}
								/>
								{errors.phone ? (
									<ErrorMessage message={errors.phone.message} />
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
						{/* <div className='grid gap-2 md:grid-cols-5'>
							<label htmlFor='whatsapp_number' className='md:col-span-1'>
								Whatsapp number:
							</label>
							<div className='flex flex-col gap-1 md:col-span-4'>
								<input
									type='tel'
									id='whatsapp_number'
									inputMode='numeric'
									{...register('whatsapp_number')}
									className={`w-full appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
										errors.whatsapp_number
											? 'bg-red-50 ring-red-600'
											: 'bg-wustomers-primary ring-wustomers-primary-light'
									}`}
								/>
								{errors.whatsapp_number ? (
									<ErrorMessage
										message={errors.whatsapp_number.message}
									/>
								) : null}
							</div>
						</div>
						<div className='grid gap-2 md:grid-cols-5'>
							<label
								htmlFor='instagram_username'
								className='md:col-span-1'
							>
								Instagram username:
							</label>
							<div className='flex flex-col gap-1 md:col-span-4'>
								<input
									type='text'
									id='instagram_username'
									{...register('instagram_username')}
									className={`w-full appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
										errors.instagram_username
											? 'bg-red-50 ring-red-600'
											: 'bg-wustomers-primary ring-wustomers-primary-light'
									}`}
								/>
								{errors.instagram_username ? (
									<ErrorMessage
										message={errors.instagram_username.message}
									/>
								) : null}
							</div>
						</div> */}
						<div className='grid place-items-center self-center'>
							<Button
								text='Select IG posts'
								variant='fill'
								onClick={() => setIsOpen(true)}
								className='mt-5 px-11 capitalize'
							/>
							{noPostError ? (
								<ErrorMessage message='Plese select post(s) before you can continue' />
							) : null}
						</div>
					</form>

					{/* selected posts preview */}
					{campaign?.social_posts?.length > 0 ? (
						<div className='mx-auto mt-5 bg-wustomers-blue/10 px-6 py-4 text-sm'>
							<h4 className='pb-3 font-bold uppercase'>
								Selected Posts:
							</h4>
							<ul className='grid gap-4 md:grid-cols-2'>
								{campaign.social_posts.map(post => (
									<li
										className='flex items-center gap-4 pt-3'
										key={post.posted_date}
									>
										<img
											src={post.image_url}
											alt='woman walkign to a store'
											width={72}
											height={72}
											className='h-20 object-cover'
										/>
										<div className='flex flex-col gap-1'>
											<p className='pt-1'>{post.title}</p>
											<p className='text-xs italic'>
												{new Date(post.posted_date).toDateString()}
											</p>
										</div>
									</li>
								))}
							</ul>
						</div>
					) : null}
				</div>

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
				<InstagramPostsModal closeModal={closeModal} posts={posts} />
			</Modal>
		</>
	)
}
