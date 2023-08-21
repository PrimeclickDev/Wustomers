import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'
import { CampaignProps } from 'models/shared'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { campaignAtom } from 'store/atoms'
import { z } from 'zod'
import { Button } from './Button'
import { ErrorMessage } from './ErrorMessage'
import { ManualUploadForm } from './ManualUploadForm'
import { allowedExtension } from './NewCampaignStepOne'
import { SelectedIGPosts } from './SelectedIGPosts'
import { TextField } from './TextField'

const schema = z.object({
	office_address: z
		.string({ required_error: 'Office address is required' })
		.min(1, { message: 'Office address is required' })
		.trim(),
	phone: z
		.string({ required_error: 'Phone number is required' })
		.min(1, { message: 'Phone number is required' })
		.min(11, { message: 'Phone number cannot be less than 11 characters' })
		.max(11, { message: 'Phone number cannot be more than 11 characters' })
		.regex(/^([0]{1}|\+?234)([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g, {
			message: 'Please enter a valid phone number',
		})
		.trim(),
	email: z
		.string({ required_error: 'Email address is required' })
		.min(1, { message: 'Email address is required' })
		.min(5, { message: 'Email address cannot be less than 5 characters' })
		.email({ message: 'Please enter a valid email address' })
		.trim(),
	body_heading: z
		.string({ required_error: 'Body heading is required' })
		.min(1, { message: 'Body heading is required' })
		.trim(),
	body_description: z
		.string({
			required_error: 'Body description is required',
		})
		.min(1, { message: 'Body description is required' })
		.max(250, {
			message: 'Body description cannot be greater than 250 characters',
		})
		.trim(),
	social_posts: z.array(
		z.object({
			title: z.string().min(1, { message: 'Post is required' }).max(250, {
				message: 'Post cannot be more than 250 characters',
			}),
			posted_date: z
				.string()
				.default(new Date().toJSON().slice(0, 10))
				.nullable(),
			image_url: z
				.instanceof(FileList, {
					message: 'Please select an image file not more than 1.5mb',
				})
				.superRefine((val, ctx) => {
					if (val.length === 0) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Please select an image file not more than 1.5mb',
						})
					}
					if (val[0]?.size > 1500000) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: `Image cannot be larger than 1.5mb`,
						})
					}
					if (!val[0]?.type.includes('image')) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: `You can only upload image.`,
						})
					}
					if (!allowedExtension.includes(val[0]?.type)) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: `Only jpg, jpeg and png are allowed`,
						})
					}
				})
				.or(z.string()),
		})
	),
})

export type StepTwoSchema = z.infer<typeof schema>

export const NewCampaignStepTwo = ({ nextStep, prevStep }: CampaignProps) => {
	const [campaign, setCampaign] = useAtom(campaignAtom)
	// const [isOpen, setIsOpen] = useState(false)
	const [noPostError, setNoPostError] = useState(false)
	// const { posts } = useFetchIGPosts()
	const {
		register,
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<StepTwoSchema>({
		defaultValues: {
			phone: campaign.phone ?? '',
			office_address: campaign.office_address ?? '',
			email: campaign.email ?? '',
			body_description: campaign.body_description ?? '',
			body_heading: campaign.body_heading ?? '',
			social_posts: campaign.social_posts ?? [
				{
					title: '',
					image_url: undefined,
					// posted_date: '',
				},
			],
		},
		resolver: zodResolver(schema),
	})

	console.log('errors', errors)

	const [searchParams] = useSearchParams()
	const type = searchParams.get('type')

	const onSubmit: SubmitHandler<StepTwoSchema> = data => {
		console.log('two', data)
		if (type === 'instagram' && !campaign?.social_posts) {
			setNoPostError(true)
			return
		}

		setCampaign(prev => ({ ...prev, ...data }))
		setNoPostError(false)
		nextStep?.()
	}

	// const closeModal = () => setIsOpen(false)

	return (
		<>
			<section className='mt-10 flex flex-col'>
				<h3 className='bg-wustomers-neutral-light p-3 font-medium md:px-9'>
					Body section:
				</h3>
				<div className='bg-white px-3 py-6 md:py-12 md:px-9'>
					<form className='flex flex-col gap-4'>
						<div className='grid gap-2 md:grid-cols-5'>
							<label htmlFor='office_address' className='md:col-span-1'>
								Body heading
							</label>
							<TextField
								control={control}
								placeholder='Business heading'
								name='body_heading'
								register={register}
								type='text'
								className='md:col-span-4'
							/>
						</div>
						<div className='grid gap-2 md:grid-cols-5'>
							<label htmlFor='office_address' className='md:col-span-1'>
								Body description
							</label>
							<TextField
								control={control}
								name='body_description'
								register={register}
								type='textarea'
								className='md:col-span-4'
								placeholder='Body description'
							/>
						</div>
						<div className='grid gap-2 md:grid-cols-5'>
							<label htmlFor='office_address' className='md:col-span-1'>
								Office address:
							</label>
							<TextField
								control={control}
								name='office_address'
								register={register}
								type='text'
								className='md:col-span-4'
							/>
						</div>
						<div className='grid gap-2 md:grid-cols-5'>
							<label htmlFor='phone' className='md:col-span-1'>
								Phone number:
							</label>
							<TextField
								control={control}
								name='phone'
								register={register}
								type='tel'
								className='md:col-span-4'
								inputMode='numeric'
							/>
						</div>
						<div className='grid gap-2 md:grid-cols-5'>
							<label htmlFor='email' className='md:col-span-1'>
								Email address:
							</label>
							<TextField
								control={control}
								name='email'
								register={register}
								type='email'
								className='md:col-span-4'
								inputMode='email'
							/>
						</div>

						{type === 'instagram' ? (
							<div className='w-full'>
								<Button
									text='Select IG posts'
									variant='outline'
									// onClick={() => setIsOpen(true)}
									className='mt-5 w-full px-11 capitalize'
								/>
								{noPostError ? (
									<ErrorMessage message='Plese select post(s) before you can continue' />
								) : null}
							</div>
						) : null}
					</form>

					{/* selected posts preview */}
					{type === 'instagram' && campaign?.social_posts?.length ? (
						<SelectedIGPosts socialPosts={campaign.social_posts} />
					) : null}

					{type === 'manual' ? (
						<ManualUploadForm register={register} control={control} />
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

			{/* {type === 'instagram' ? (
				<Modal
					modalOpen={isOpen}
					closeModal={closeModal}
					className='max-w-3xl px-2 md:px-6'
				>
					<InstagramPostsModal closeModal={closeModal} posts={posts} />
				</Modal>
			) : null} */}
		</>
	)
}
