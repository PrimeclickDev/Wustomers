import { zodResolver } from '@hookform/resolvers/zod'
import { useFetchIGPosts } from 'api/hooks/useFetchIGPosts'
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

const schema = z
	.object({
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
			.min(1, { message: 'Email address is required' })
			.min(3, { message: 'Email address cannot be less than 3 characters' })
			.email({ message: 'Please enter a valid email address' })
			.trim(),
		is_body_content: z.enum(['0', '1'], {
			invalid_type_error: 'Please select one',
			required_error: 'Add body content is required',
		}),
		body_heading: z
			.string({ required_error: 'Body heading is required' })
			.optional(),
		body_description: z
			.string({
				required_error: 'Body description is required',
			})
			.optional(),
	})
	.superRefine((input, ctx) => {
		if (input.is_body_content === '1' && input.body_heading === '') {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Body heading is required',
				path: ['body_heading'],
			})
		}

		if (input.is_body_content === '1' && input.body_description === '') {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Body description is required',
				path: ['body_description'],
			})
		}
	})

export type StepTwoSchema = z.infer<typeof schema>

export const NewCampaignStepTwo = ({ nextStep, prevStep }: CampaignProps) => {
	const [campaign, setCampaign] = useAtom(campaignAtom)
	const [isOpen, setIsOpen] = useState(false)
	const [noPostError, setNoPostError] = useState(false)
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<StepTwoSchema>({
		defaultValues: {
			phone: campaign.phone ?? '',
			office_address: campaign.office_address ?? '',
			email: campaign.email ?? '',
			is_body_content: campaign.is_body_content ?? undefined,
			body_description: campaign.body_description ?? '',
			body_heading: campaign.body_heading ?? '',
		},
		resolver: zodResolver(schema),
	})
	const { posts } = useFetchIGPosts()

	const addBodyContent = watch('is_body_content')

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

	return (
		<>
			<section className='mt-10 flex flex-col'>
				<h3 className='bg-wustomers-neutral-light p-3 font-medium md:px-9'>
					Body section:
				</h3>
				<div className='bg-white px-3 py-6 md:py-12 md:px-9'>
					<form className='flex flex-col gap-5'>
						{/* Body content */}
						<div className='grid gap-2 md:grid-cols-5'>
							<p className='md:col-span-1'>Add body content:</p>
							<div className='flex flex-col gap-1 md:col-span-4'>
								<div className='flex items-center gap-16 text-wustomers-main md:col-span-3'>
									{['0', '1'].map(value => (
										<label
											className='flex items-center gap-2 capitalize'
											key={value}
										>
											<input
												type='radio'
												value={value}
												{...register('is_body_content')}
											/>
											<span>
												{value === '1'
													? 'Yes, add body content'
													: "No, don't add body content"}
											</span>
										</label>
									))}
								</div>
								{errors.is_body_content ? (
									<ErrorMessage
										message={errors.is_body_content.message}
									/>
								) : null}
							</div>
						</div>

						{/* body header and body description */}
						{addBodyContent === '1' ? (
							<div className='grid gap-2 md:grid-cols-5'>
								<p className='md:col-span-1'></p>
								<div className='flex flex-col gap-4 text-sm md:col-span-4'>
									<div className='flex flex-col gap-1 md:col-span-4'>
										<input
											type='text'
											id='body_heading'
											placeholder='Body heading'
											{...register('body_heading')}
											className={`w-full appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
												errors.body_heading
													? 'bg-red-50 ring-red-600'
													: 'bg-wustomers-primary ring-wustomers-primary-light'
											}`}
										/>
										{errors.body_heading ? (
											<ErrorMessage
												message={errors.body_heading.message}
											/>
										) : null}
									</div>

									<div className='flex flex-col gap-1 md:col-span-4'>
										<textarea
											id='body_description'
											{...register('body_description')}
											placeholder='Body description'
											className={`h-32 w-full resize-none appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
												errors.body_description
													? 'bg-red-50 ring-red-600'
													: 'bg-wustomers-primary ring-wustomers-primary-light'
											}`}
										/>
										{errors.body_description ? (
											<ErrorMessage
												message={errors.body_description.message}
											/>
										) : null}
									</div>
								</div>
							</div>
						) : null}

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
						<div className='w-full'>
							<Button
								text='Select IG posts'
								variant='outline'
								onClick={() => setIsOpen(true)}
								className='mt-5 w-full px-11 capitalize'
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
