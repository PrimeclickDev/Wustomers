import { zodResolver } from '@hookform/resolvers/zod'
import { CampaignProps } from 'models/shared'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './Button'
import { ErrorMessage } from './ErrorMessage'

const schema = z.object({
	uploadOption: z
		.string({ required_error: 'Please select one' })
		.min(3, { message: 'Please select one' })
		.trim(),
	instagramLink: z
		.string({ required_error: 'Instagram link is required' })
		.min(1, { message: 'Instagram link is required' })
		.url({ message: 'Instagram link must be a url' })
		.trim(),
	officeAddress: z
		.string({ required_error: 'Office address is required' })
		.min(1, { message: 'Office address is required' })
		.trim(),
	phoneNumber: z
		.string({ required_error: 'Phone number is required' })
		.min(1, { message: 'Phone number is required' })
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

type StepTwoSchema = z.infer<typeof schema>

export const NewCampaignStepTwo = ({ nextStep, prevStep }: CampaignProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<StepTwoSchema>({
		defaultValues: {
			uploadOption: '',
			instagramLink: '',
			officeAddress: '',
			phoneNumber: '',
			email: '',
		},
		resolver: zodResolver(schema),
	})

	const onSubmit: SubmitHandler<StepTwoSchema> = data => {
		console.log(data)
		nextStep?.()
	}

	return (
		<section className='mt-10 flex flex-col'>
			<h3 className='bg-wustomers-neutral-light p-3 font-medium md:px-9'>
				Body section:
			</h3>
			<form className='flex flex-col gap-6 bg-white px-3 py-6 md:py-12 md:px-9'>
				<div className='grid gap-1 md:grid-cols-5'>
					<p className='md:col-span-1'>Upload Option:</p>

					<div className='flex flex-col gap-1 md:col-span-3'>
						<label className='flex items-center gap-3'>
							<input
								type='radio'
								{...register('uploadOption')}
								value='connectToIG'
							/>
							<span>Connect to IG</span>
						</label>
						{errors.uploadOption ? (
							<ErrorMessage message={errors.uploadOption.message} />
						) : null}
					</div>
				</div>

				<div className='grid gap-2 md:grid-cols-5'>
					<label htmlFor='instagramLink' className='md:col-span-1'>
						Instagram link:
					</label>
					<div className='flex flex-col gap-1 md:col-span-4'>
						<div className='flex flex-wrap items-center'>
							<input
								type='text'
								inputMode='url'
								{...register('instagramLink')}
								className={`flex-1 appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
									errors.instagramLink
										? 'bg-red-50 ring-red-600'
										: 'bg-wustomers-primary ring-wustomers-primary-light'
								}`}
							/>
							<button
								type='button'
								className='bg-wustomers-primary-lighter px-7 py-3 text-white transition-colors hover:bg-wustomers-blue-light'
							>
								Link to IG
							</button>
						</div>

						{errors.instagramLink ? (
							<ErrorMessage message={errors.instagramLink.message} />
						) : null}
					</div>
				</div>

				<div className='grid gap-2 md:grid-cols-5'>
					<p className='md:col-span-1'>Contact info:</p>

					<div className='flex flex-col gap-3 md:col-span-4'>
						<div className='flex flex-col gap-1'>
							<input
								type='text'
								placeholder='Office Address'
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
						<div className='flex flex-col gap-1'>
							<input
								type='tel'
								inputMode='numeric'
								placeholder='Phone number'
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
						<div className='flex flex-col gap-1'>
							<input
								type='email'
								placeholder='Email address'
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
				</div>
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
	)
}
