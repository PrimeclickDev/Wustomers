import { zodResolver } from '@hookform/resolvers/zod'
import { ReactComponent as PlusCircleIcon } from 'assets/icons/plus-circle.svg'
import { CampaignProps } from 'models/shared'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './Button'
import { ErrorMessage } from './ErrorMessage'

const schema = z.object({
	addTestimonial: z.enum(['no', 'yes'], {
		invalid_type_error: 'Please select one',
		required_error: 'Add testimonial is required',
	}),
	testimonials: z
		.array(
			z.object({
				comment: z
					.string()
					.min(1, { message: 'Customer comment is required' })
					.min(5, {
						message: 'Customer comment cannot be less than 5 characters',
					})
					.trim(),
				name: z
					.string()
					.min(1, { message: 'Customer name is required' })
					.trim(),
				designation: z
					.string()
					.min(1, { message: 'Customer designation is required' })
					.trim(),
			})
		)
		.default([]),
	whatsappNumber: z
		.string()
		.min(1, { message: 'Whatsapp number is required' })
		.min(5, { message: 'Whatsapp number cannot be less than 5 characters' })
		.or(z.literal('')),
	instagram: z
		.string()
		.min(1, { message: 'Whatsapp number is required' })
		.or(z.literal('')),
	btnStickyOption: z.enum(['no', 'yes'], {
		invalid_type_error: 'Please select one',
		required_error: 'Button sticky option is required',
	}),
})

type StepThreeSchema = z.infer<typeof schema>

export const NewCampaignStepThree = ({ nextStep, prevStep }: CampaignProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		control,
	} = useForm<StepThreeSchema>({
		defaultValues: {
			addTestimonial: undefined,
			testimonials: [{ comment: '', designation: '', name: '' }],
			instagram: '',
			whatsappNumber: '',
			btnStickyOption: undefined,
		},
		resolver: zodResolver(schema),
		shouldUnregister: true,
	})

	const { fields, append } = useFieldArray({
		control,
		name: 'testimonials',
	})

	const showAddTestimonial = watch('addTestimonial')

	const onSubmit: SubmitHandler<StepThreeSchema> = data => {
		console.log(data)
		nextStep?.()
	}

	return (
		<section className='mt-10 flex flex-col'>
			<h3 className='bg-wustomers-neutral-light p-3 font-medium md:px-9'>
				Body section contd:
			</h3>
			<form className='flex flex-col gap-6 bg-white px-3 py-6 md:py-12 md:px-9'>
				<div className='grid gap-2 md:grid-cols-5'>
					<p className='md:col-span-1'>Testimonial:</p>
					<div className='flex flex-col gap-1 md:col-span-4'>
						<div className='flex flex-wrap items-center gap-2 text-wustomers-main md:gap-16'>
							{['no', 'yes'].map((testimonial, index) => (
								<label className='flex items-center gap-2' key={index}>
									<input
										type='radio'
										value={testimonial}
										{...register('addTestimonial')}
									/>
									<span>
										{testimonial === 'no'
											? 'No, not adding testimonial'
											: 'Yes, add testimonial'}
									</span>
								</label>
							))}
						</div>
						{errors.addTestimonial ? (
							<ErrorMessage message={errors.addTestimonial.message} />
						) : null}
					</div>
				</div>

				{/* testimonial field */}
				{showAddTestimonial === 'yes' ? (
					<div className='grid gap-2 md:grid-cols-5'>
						<p className='md:col-span-1'></p>
						<div className='text-sm md:col-span-4'>
							{fields?.map((field, index) => (
								<div
									className='rounded bg-wustomers-primary p-2 md:p-5'
									key={field.id}
								>
									<div className='flex flex-col gap-1'>
										<textarea
											placeholder='Customer’s comment'
											{...register(`testimonials.${index}.comment`)}
											className={`h-20 w-full resize-none appearance-none rounded-sm bg-white px-4 py-2.5 ${
												errors?.testimonials?.[index]?.comment
													? 'bg-red-50 ring-[1.5px] ring-red-600'
													: 'bg-white'
											}`}
										/>
										{errors?.testimonials?.[index]?.comment ? (
											<ErrorMessage
												message={
													errors?.testimonials?.[index]?.comment
														?.message
												}
											/>
										) : null}
									</div>
									<div className='mt-2 flex flex-col items-center gap-2 md:flex-row'>
										<div className='w-full'>
											<input
												type='text'
												{...register(`testimonials.${index}.name`)}
												className={`w-full appearance-none rounded-sm bg-white px-4 py-2.5 ${
													errors?.testimonials?.[index]?.name
														? 'bg-red-50 ring-[1.5px] ring-red-600'
														: 'bg-white'
												}`}
												placeholder='Name'
											/>
											{errors?.testimonials?.[index]?.name ? (
												<ErrorMessage
													message={
														errors?.testimonials?.[index]
															?.designation?.message
													}
												/>
											) : null}
										</div>
										<div className='w-full'>
											<input
												type='text'
												{...register(
													`testimonials.${index}.designation`
												)}
												className={`w-full appearance-none rounded-sm bg-white px-4 py-2.5 ${
													errors?.testimonials?.[index]
														?.designation
														? 'bg-red-50 ring-[1.5px] ring-red-600'
														: 'bg-white'
												}`}
												placeholder='Designation'
											/>
											{errors?.testimonials?.[index]?.designation ? (
												<ErrorMessage
													message={
														errors?.testimonials?.[index]
															?.designation?.message
													}
												/>
											) : null}
										</div>
									</div>
								</div>
							))}
							<button
								type='button'
								onClick={() =>
									append({
										comment: '',
										designation: '',
										name: '',
									})
								}
								className='mt-2 flex w-full items-center justify-center gap-3 rounded-sm border border-[#CDD4F4] bg-wustomers-primary-lighter py-1 px-5 text-white transition-all hover:bg-wustomers-blue-light'
							>
								<PlusCircleIcon width={26} />
								<span>Add testimonial</span>
							</button>
						</div>
					</div>
				) : null}

				{/* contact options */}
				<div className='grid gap-2 md:grid-cols-5'>
					<p className='md:col-span-1'>Contact Option:</p>
					<div className='flex flex-col gap-3 md:col-span-4'>
						<div className='flex flex-col'>
							<input
								type='tel'
								inputMode='numeric'
								{...register('whatsappNumber')}
								placeholder='Whatsapp Number'
								className={`flex-1 appearance-none rounded-sm px-4 py-2.5 text-sm ring-[1.5px] ${
									errors.whatsappNumber
										? 'bg-red-50 ring-red-600'
										: 'bg-wustomers-primary ring-[#CDD4F4]'
								}`}
							/>
							{errors.whatsappNumber ? (
								<ErrorMessage message={errors.whatsappNumber.message} />
							) : null}
						</div>
						<div className='flex flex-col'>
							<input
								type='text'
								{...register('instagram')}
								placeholder='Instagram username'
								className={`flex-1 appearance-none rounded-sm px-4 py-2.5 text-sm ring-[1.5px] ${
									errors.instagram
										? 'bg-red-50 ring-red-600'
										: 'bg-wustomers-primary ring-[#CDD4F4]'
								}`}
							/>
							{errors.instagram ? (
								<ErrorMessage message={errors.instagram.message} />
							) : null}
						</div>
					</div>
				</div>

				{/* button sticky option */}
				<div className='grid gap-2 md:grid-cols-5'>
					<p className='md:col-span-1'>Button sticky option:</p>

					<div className='flex flex-col gap-1'>
						<div className='flex items-center gap-16 text-wustomers-main md:col-span-3'>
							{['yes', 'no'].map(value => (
								<label
									className='flex items-center gap-2 capitalize'
									key={value}
								>
									<input
										type='radio'
										value={value}
										{...register('btnStickyOption')}
									/>
									<span>{value}</span>
								</label>
							))}
						</div>
						{errors.btnStickyOption ? (
							<ErrorMessage message={errors.btnStickyOption.message} />
						) : null}
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
