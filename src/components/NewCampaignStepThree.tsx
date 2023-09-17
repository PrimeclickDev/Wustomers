import { zodResolver } from '@hookform/resolvers/zod'
import { ReactComponent as PlusCircleIcon } from 'assets/icons/plus-circle.svg'
import { useAtom } from 'jotai'
import { CampaignProps } from 'models/shared'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { campaignAtom } from 'store/atoms'
import { z } from 'zod'
import { Button } from './Button'
import { CampaignContact } from './CampaignContact'
import { ErrorMessage } from './ErrorMessage'

const schema = z.object({
	is_testimonial: z.enum(['0', '1'], {
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
					.max(250, {
						message:
							'Customer comment cannot be greater than 250 characters',
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
	contact_option: z.enum(['whatsapp', 'email', 'form', 'instagram', 'phone'], {
		invalid_type_error: 'Please select one',
		required_error: 'Contact option is required',
	}),
	contact_option_link: z.union([
		z.string().min(1, 'This fieldis required'),
		z
			.array(z.string())
			.nonempty(
				'You must select at least one field to be added to the form'
			),
	]),
	is_button_sticky: z.enum(['0', '1'], {
		invalid_type_error: 'Please select one',
		required_error: 'Button sticky option is required',
	}),
})

export type StepThreeSchema = z.infer<typeof schema>

export const NewCampaignStepThree = ({ nextStep, prevStep }: CampaignProps) => {
	const [campaign, setCampaign] = useAtom(campaignAtom)
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		control,
	} = useForm<StepThreeSchema>({
		defaultValues: {
			is_testimonial: campaign.is_testimonial ?? '',
			testimonials: campaign.testimonials ?? [
				{ comment: '', designation: '', name: '' },
			],
			is_button_sticky: campaign.is_button_sticky ?? undefined,
			contact_option: campaign.contact_option ?? undefined,
			contact_option_link: campaign.contact_option_link ?? '',
		},
		resolver: zodResolver(schema),
		shouldUnregister: true,
	})

	const { fields, append } = useFieldArray({
		control,
		name: 'testimonials',
	})

	const showAddTestimonial = watch('is_testimonial')
	const onSubmit: SubmitHandler<StepThreeSchema> = data => {
		setCampaign(prev => ({ ...prev, ...data }))
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
							{['0', '1'].map((testimonial, index) => (
								<label className='flex items-center gap-2' key={index}>
									<input
										type='radio'
										value={testimonial}
										{...register('is_testimonial')}
										className='h-4 w-4 accent-wustomers-blue'
									/>
									<span>
										{testimonial === '0'
											? 'No, not adding testimonial'
											: 'Yes, add testimonial'}
									</span>
								</label>
							))}
						</div>
						{errors.is_testimonial ? (
							<ErrorMessage message={errors.is_testimonial.message} />
						) : null}
					</div>
				</div>

				{/* testimonial field */}
				{showAddTestimonial === '1' ? (
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

				{/* contact option */}
				<CampaignContact
					register={register}
					control={control}
					errors={errors}
				/>

				{/* button sticky option */}
				<div className='grid gap-2 md:grid-cols-5'>
					<p className='md:col-span-1'>Button sticky option:</p>

					<div className='flex flex-col gap-1'>
						<div className='flex items-center gap-16 text-wustomers-main md:col-span-3'>
							{['1', '0'].map(value => (
								<label
									className='flex items-center gap-2 capitalize'
									key={value}
								>
									<input
										type='radio'
										value={value}
										{...register('is_button_sticky')}
									/>
									<span>{value === '1' ? 'Yes' : 'No'}</span>
								</label>
							))}
						</div>
						{errors.is_button_sticky ? (
							<ErrorMessage message={errors.is_button_sticky.message} />
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
