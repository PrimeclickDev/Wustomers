import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'
import { CampaignProps } from 'models/shared'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { campaignAtom } from 'store/atoms'
import { z } from 'zod'
import { Button } from './Button'
import { ErrorMessage } from './ErrorMessage'

const logoPositions = [
	{
		id: 1,
		value: 'left',
		style: 'flex-start',
	},
	{
		id: 2,
		value: 'center',
		style: 'center',
	},
	{
		id: 3,
		value: 'right',
		style: 'flex-right',
	},
]
const schema = z.object({
	campaignTitle: z
		.string({ required_error: 'Campaign title is required' })
		.min(1, { message: 'Campaign title is required' })
		.trim(),
	logoPosition: z.enum(['left', 'center', 'right'], {
		invalid_type_error: 'Please select one',
		required_error: 'Logo position is required',
	}),
	productLogo: z
		.instanceof(FileList, {
			message: 'Please select an image file not more than 150kb',
		})
		.superRefine((val, ctx) => {
			if (val.length === 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Please select an image file not more than 300kb',
				})
			}
			if (val[0]?.size > 150000) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `Image cannot be larger than 150kb`,
				})
			}
			if (!val[0]?.type.includes('image')) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `You can only upload image.`,
				})
			}
		}),
	headerContent: z
		.string({ required_error: 'Header Content is required' })
		.min(1, { message: 'Header Content is required' })
		.trim(),
	subheadingContent: z
		.string({ required_error: 'Subheading Content is required' })
		.min(1, {
			message: 'Subheading Content is required',
		})
		.trim(),
	bgImage: z
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
		})
		.optional()
		.or(z.literal(undefined)),
	buttonText: z
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
			campaignTitle: campaign.campaignTitle ?? '',
			productLogo: campaign.productLogo ?? undefined,
			logoPosition: campaign.logoPosition ?? undefined,
			headerContent: campaign.headerContent ?? '',
			subheadingContent: campaign.subheadingContent ?? '',
			bgImage: campaign.bgImage ?? undefined,
			buttonText: campaign.buttonText ?? '',
		},
		resolver: zodResolver(schema),
	})

	// watch files
	const selectedLogo = watch('productLogo')
	const selectedBgImage = watch('bgImage')

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
					<label htmlFor='campaignTitle' className='md:col-span-1'>
						Campaign title:
					</label>
					<div className='flex flex-col gap-1 md:col-span-4'>
						<input
							type='text'
							id='campaignTitle'
							{...register('campaignTitle')}
							className={`w-full appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
								errors.campaignTitle
									? 'bg-red-50 ring-red-600'
									: 'bg-wustomers-primary ring-wustomers-primary-light'
							}`}
						/>
						{errors.campaignTitle ? (
							<ErrorMessage message={errors.campaignTitle.message} />
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
									id='productLogo'
									className='sr-only'
									accept='image/*'
									{...register('productLogo')}
								/>
							</label>
							<span className='text-wustomers-neutral-dark'>
								Logo format is png., svg. (not more than 150kb)
							</span>
						</div>
						{errors.productLogo ? (
							<ErrorMessage message={errors.productLogo.message} />
						) : null}
						{selectedLogo?.length ? (
							<img
								src={URL.createObjectURL(selectedLogo[0])}
								alt={selectedLogo[0].name}
								className='mt-2 h-52 w-max object-cover'
							/>
						) : null}
					</div>
				</div>

				{/* logo position */}
				<div className='grid gap-2 md:grid-cols-5'>
					<label htmlFor='campaignTitle' className='md:col-span-1'>
						Logo position:
					</label>
					<div className='flex flex-col gap-1 md:col-span-4'>
						<div className='flex flex-wrap items-center justify-between md:justify-start md:gap-20'>
							{logoPositions.map(position => (
								<div
									className='flex flex-col items-center gap-1'
									key={position.id}
								>
									<input
										type='radio'
										id={position.value}
										className='peer sr-only'
										value={position.style}
										{...register('logoPosition')}
									/>
									<label
										htmlFor={position.value}
										className={`relative h-6 w-20 cursor-pointer rounded-sm border border-wustomers-primary-light bg-wustomers-primary transition-all after:absolute after:top-1/2 after:h-3 after:w-3 after:-translate-y-1/2 after:rounded-full after:bg-[#8394E3] peer-checked:bg-[#516AD9] peer-checked:after:bg-white ${
											position.value === 'center'
												? 'after:left-1/2 after:-translate-x-1/2'
												: position.value === 'right'
												? 'after:right-2'
												: position.value === 'left'
												? 'after:left-2'
												: ''
										}`}
									/>
									<p className='text-center text-sm capitalize text-wustomers-gray'>
										{position.value}
									</p>
								</div>
							))}
						</div>
						{errors.logoPosition ? (
							<ErrorMessage message={errors.logoPosition.message} />
						) : null}
					</div>
				</div>

				{/* header content */}
				<div className='grid gap-2 md:grid-cols-5'>
					<label htmlFor='header' className='md:col-span-1'>
						Header content:
					</label>
					<div className='flex flex-col gap-1 md:col-span-4'>
						<textarea
							id='header'
							{...register('headerContent')}
							className={`h-32 w-full resize-none appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
								errors.headerContent
									? 'bg-red-50 ring-red-600'
									: 'bg-wustomers-primary ring-wustomers-primary-light'
							}`}
						/>
						{errors.headerContent ? (
							<ErrorMessage message={errors.headerContent.message} />
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
							{...register('subheadingContent')}
							className={`h-32 w-full resize-none appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
								errors.subheadingContent
									? 'bg-red-50 ring-red-600'
									: 'bg-wustomers-primary ring-wustomers-primary-light'
							}`}
						/>
						{errors.subheadingContent ? (
							<ErrorMessage message={errors.subheadingContent.message} />
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
								{...register('bgImage')}
								id='backgroundImage'
								className='sr-only'
								accept='image/*'
							/>
							<span className='text-wustomers-neutral-dark'>
								Logo format is png, jpeg. (not more than 300kb)
							</span>
						</div>
						{errors.bgImage ? (
							<ErrorMessage message={errors.bgImage.message} />
						) : null}
						{selectedBgImage?.length ? (
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
					<label htmlFor='buttonText' className='md:col-span-1'>
						Button text:
					</label>
					<div className='flex flex-col gap-1 md:col-span-4'>
						<input
							type='text'
							id='campaignTitle'
							{...register('buttonText')}
							className={`w-full appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
								errors.buttonText
									? 'bg-red-50 ring-red-600'
									: 'bg-wustomers-primary ring-wustomers-primary-light'
							}`}
						/>
						{errors.buttonText ? (
							<ErrorMessage message={errors.buttonText.message} />
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
