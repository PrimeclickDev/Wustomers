import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'
import { CampaignProps } from 'models/shared'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { campaignAtom } from 'store/atoms'
import { z } from 'zod'
import { Button } from './Button'
import { ErrorMessage } from './ErrorMessage'

const logoPositions = ['left', 'center', 'right']

const allowedExtension = ['image/jpeg', 'image/jpg', 'image/png']
const schema = z.object({
	title: z
		.string({ required_error: 'Campaign title is required' })
		.min(1, { message: 'Campaign title is required' })
		.max(30, { message: 'Campaign title cannot be more than 30 characters' })
		.trim(),
	logo_position: z.enum(['left', 'center', 'right'], {
		invalid_type_error: 'Please select one',
		required_error: 'Logo position is required',
	}),
	product_logo: z
		.instanceof(FileList, {
			message: 'Please select an image file not more than 300kb',
		})
		.superRefine((val, ctx) => {
			if (val.length === 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Please select an image file not more than 300kb',
				})
			}
			if (val[0]?.size > 300000) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `Image cannot be larger than 300kb`,
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
		}),
	header_content: z
		.string({ required_error: 'Header content is required' })
		.min(1, { message: 'Header content is required' })
		.min(5, { message: 'Header content cannot be less than 5 characters' })
		.trim(),
	subheading_content: z
		.string({ required_error: 'Subheading content is required' })
		.min(1, {
			message: 'Subheading content is required',
		})
		.min(10, {
			message: 'Subheading content cannot be less than 10 characters',
		})
		.max(245, {
			message: 'Subheading content cannot be greater than 250 characters',
		})
		.trim(),
	background_image: z
		.instanceof(FileList, {
			message: 'Please select an image file not more than 300kb',
		})
		.superRefine((val, ctx) => {
			if (val.length === 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Please select an image file not more than 300kb',
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
		}),
	button_text: z
		.string({ required_error: 'Button Text is required' })
		.min(1, { message: 'Button Text is required' })
		.trim(),
})

export type StepOneSchema = z.infer<typeof schema>

export const NewCampaignStepOne = ({ nextStep }: CampaignProps) => {
	const navigate = useNavigate()
	const [campaign, setCampaign] = useAtom(campaignAtom)
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<StepOneSchema>({
		defaultValues: {
			title: campaign.title ?? '',
			product_logo: campaign.product_logo ?? undefined,
			logo_position: campaign.logo_position ?? undefined,
			header_content: campaign.header_content ?? '',
			subheading_content: campaign.subheading_content ?? '',
			background_image: campaign.background_image ?? undefined,
			button_text: campaign.button_text ?? '',
		},
		resolver: zodResolver(schema),
	})

	// watch files
	const selectedLogo = watch('product_logo')
	const selectedBgImage = watch('background_image')

	const onSubmit: SubmitHandler<StepOneSchema> = data => {
		setCampaign(prev => ({ ...prev, ...data }))
		nextStep?.()
	}

	return (
		<section className='mt-10 flex flex-col'>
			<h3 className='bg-wustomers-neutral-light p-3 font-medium md:px-9'>
				Above the fold section:
			</h3>
			<form className='flex flex-col gap-5 bg-white px-3 py-6 md:py-12 md:px-9'>
				{/* campaign title */}
				<div className='grid gap-2 md:grid-cols-5'>
					<label htmlFor='title' className='md:col-span-1'>
						Campaign title:
					</label>
					<div className='flex flex-col gap-1 md:col-span-4'>
						<input
							type='text'
							id='title'
							{...register('title')}
							className={`w-full appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
								errors.title
									? 'bg-red-50 ring-red-600'
									: 'bg-wustomers-primary ring-wustomers-primary-light'
							}`}
						/>
						{errors.title ? (
							<ErrorMessage message={errors.title.message} />
						) : null}
					</div>
				</div>

				{/* product logo */}
				<div className='grid gap-2 md:grid-cols-5'>
					<p className='md:col-span-1'>Product logo:</p>
					<div className='flex flex-col gap-1 md:col-span-4'>
						<div className='flex flex-wrap items-center text-sm md:gap-4'>
							<label className=' cursor-pointer bg-wustomers-main py-2 px-16 text-white transition-opacity hover:opacity-90'>
								Upload
								<input
									type='file'
									id='product_logo'
									className='sr-only'
									accept='.jpg,.jpeg,.png'
									{...register('product_logo')}
								/>
							</label>
							<span className='text-sm text-wustomers-neutral-dark'>
								Logo format is png, jpeg, jpg. (not more than 300kb)
							</span>
						</div>
						{errors.product_logo ? (
							<ErrorMessage message={errors.product_logo.message} />
						) : null}
						{selectedLogo?.length ? (
							<img
								src={
									typeof campaign.product_logo === 'string'
										? campaign.product_logo
										: URL.createObjectURL(selectedLogo[0])
								}
								alt={selectedLogo[0].name}
								className='mt-2 h-52 w-max object-cover'
							/>
						) : null}
					</div>
				</div>

				{/* logo position */}
				<div className='grid gap-2 md:grid-cols-5'>
					<label htmlFor='title' className='md:col-span-1'>
						Logo position:
					</label>
					<div className='flex flex-col gap-1 md:col-span-4'>
						<div className='flex flex-wrap items-center justify-between md:justify-start md:gap-20'>
							{logoPositions.map(position => (
								<div
									className='flex flex-col items-center gap-1'
									key={position}
								>
									<input
										type='radio'
										id={position}
										value={position}
										className='peer sr-only'
										{...register('logo_position')}
									/>
									<label
										htmlFor={position}
										className={`relative h-6 w-20 cursor-pointer rounded-sm border border-wustomers-primary-light bg-wustomers-primary transition-all after:absolute after:top-1/2 after:h-3 after:w-3 after:-translate-y-1/2 after:rounded-full after:bg-[#8394E3] peer-checked:bg-[#516AD9] peer-checked:after:bg-white ${
											position === 'center'
												? 'after:left-1/2 after:-translate-x-1/2'
												: position === 'right'
												? 'after:right-2'
												: position === 'left'
												? 'after:left-2'
												: ''
										}`}
									/>
									<p className='text-center text-sm capitalize text-wustomers-gray'>
										{position}
									</p>
								</div>
							))}
						</div>
						{errors.logo_position ? (
							<ErrorMessage message={errors.logo_position.message} />
						) : null}
					</div>
				</div>

				{/* header content */}
				<div className='grid gap-2 md:grid-cols-5'>
					<label htmlFor='header_content' className='md:col-span-1'>
						Header content:
					</label>
					<div className='flex flex-col gap-1 md:col-span-4'>
						<input
							type='text'
							id='header_content'
							{...register('header_content')}
							className={`w-full appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
								errors.header_content
									? 'bg-red-50 ring-red-600'
									: 'bg-wustomers-primary ring-wustomers-primary-light'
							}`}
						/>
						{errors.header_content ? (
							<ErrorMessage message={errors.header_content.message} />
						) : null}
					</div>
				</div>

				{/* subheading content */}
				<div className='grid gap-2 md:grid-cols-5'>
					<label htmlFor='subheading' className='md:col-span-1'>
						Subheading content:
					</label>
					<div className='flex flex-col gap-1 md:col-span-4'>
						<textarea
							id='header'
							{...register('subheading_content')}
							className={`h-32 w-full resize-none appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
								errors.subheading_content
									? 'bg-red-50 ring-red-600'
									: 'bg-wustomers-primary ring-wustomers-primary-light'
							}`}
						/>
						{errors.subheading_content ? (
							<ErrorMessage
								message={errors.subheading_content.message}
							/>
						) : null}
					</div>
				</div>

				{/* bg image */}
				<div className='grid gap-2 md:grid-cols-5'>
					<p className='md:col-span-1'>Background Image:</p>
					<div className='flex flex-col gap-1 md:col-span-4'>
						<div className='flex flex-wrap items-center text-sm md:col-span-4 md:gap-4'>
							<label
								htmlFor='backgroundImage'
								className=' cursor-pointer bg-wustomers-main py-2 px-16 text-white transition-opacity hover:opacity-90'
							>
								Upload
							</label>
							<input
								type='file'
								{...register('background_image')}
								id='backgroundImage'
								className='sr-only'
								accept='.jpg,.jpeg,.png'
							/>
							<span className='text-wustomers-neutral-dark'>
								Background image format ispng, jpeg, jpg. (not more than
								1.5mb)
							</span>
						</div>
						{errors.background_image ? (
							<ErrorMessage message={errors.background_image.message} />
						) : null}
						{selectedBgImage && selectedBgImage?.length ? (
							<img
								src={URL.createObjectURL(selectedBgImage[0])}
								alt={selectedBgImage[0].name}
								className='mt-2 h-52 w-max object-cover'
							/>
						) : null}
					</div>
				</div>

				{/* button text */}
				<div className='grid gap-2 md:grid-cols-5'>
					<label htmlFor='button_text' className='md:col-span-1'>
						Button text:
					</label>
					<div className='flex flex-col gap-1 md:col-span-4'>
						<input
							type='text'
							id='button_text'
							{...register('button_text')}
							className={`w-full appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
								errors.button_text
									? 'bg-red-50 ring-red-600'
									: 'bg-wustomers-primary ring-wustomers-primary-light'
							}`}
						/>
						{errors.button_text ? (
							<ErrorMessage message={errors.button_text.message} />
						) : null}
					</div>
				</div>
			</form>

			<div className='mt-3 flex flex-col gap-4 md:flex-row md:items-center md:self-end'>
				<Button
					text='Cancel'
					variant='outline'
					onClick={() => navigate(-1)}
					className='!bg-white px-11 !font-normal capitalize'
				/>
				<Button
					text='Next'
					variant='fill'
					type='submit'
					onClick={handleSubmit(onSubmit)}
					className='px-14 !font-normal capitalize'
				/>
			</div>
		</section>
	)
}
