import React from 'react'
import {
	FieldErrors,
	useWatch,
	type Control,
	type FieldValues,
	type UseFormRegister,
} from 'react-hook-form'
import { ErrorMessage } from './ErrorMessage'
import { StepThreeSchema } from './NewCampaignStepThree'

type CampaignContactFormProps<T extends FieldValues> = {
	control: Control<T>
	register: UseFormRegister<T>
	errors: FieldErrors<T>
}

const contactOptions = [
	'whatsapp',
	'email',
	'form',
	'instagram',
	'phone',
] as const
const option = {
	whatsapp: 'Whatsapp number',
	email: 'Email address',
	instagram: 'Instagram username',
	phone: 'Phone number',
	form: 'Kindly choose your option of input for your form field.',
}

type ContactOption = (typeof contactOptions)[number]

export const CampaignContact = ({
	control,
	register,
	errors,
}: CampaignContactFormProps<StepThreeSchema>) => {
	const contactOption = useWatch({
		control,
		name: 'contact_option',
	})

	const renderInput: Record<ContactOption, React.ReactNode> = {
		whatsapp: (
			<input
				type='text'
				id='whatsapp'
				{...register('contact_option_link')}
				className={`appearance-none rounded-sm bg-white px-4 py-2 ${
					errors?.contact_option_link
						? 'bg-red-50 ring-[1.5px] ring-red-600'
						: 'bg-white'
				}`}
				inputMode='numeric'
			/>
		),
		email: (
			<input
				type='email'
				id='email'
				{...register('contact_option_link')}
				className={`appearance-none rounded-sm bg-white px-4 py-2 ${
					errors?.contact_option_link
						? 'bg-red-50 ring-[1.5px] ring-red-600'
						: 'bg-white'
				}`}
				inputMode='email'
			/>
		),
		instagram: (
			<input
				type='text'
				id='instagram'
				{...register('contact_option_link')}
				className={`appearance-none rounded-sm bg-white px-4 py-2 ${
					errors?.contact_option_link
						? 'bg-red-50 ring-[1.5px] ring-red-600'
						: 'bg-white'
				}`}
			/>
		),
		phone: (
			<input
				type='text'
				id='phone'
				{...register('contact_option_link')}
				className={`appearance-none rounded-sm bg-white px-4 py-2 ${
					errors?.contact_option_link
						? 'bg-red-50 ring-[1.5px] ring-red-600'
						: 'bg-white'
				}`}
				inputMode='tel'
			/>
		),
		form: (
			<div className='mt-4 space-y-4'>
				{['full_name', 'email', 'phone_number', 'location'].map(
					(field, index) => (
						<div
							key={index}
							className='flex items-center justify-between gap-2'
						>
							<label htmlFor={field} className='capitalize'>
								{field.replace('_', ' ')}
							</label>
							<input
								type='checkbox'
								value={field}
								id={field}
								{...register('contact_option_link')}
							/>
						</div>
					)
				)}
			</div>
		),
	}

	return (
		<div className='grid gap-2 md:grid-cols-5'>
			<p className='md:col-span-1'>Contact option:</p>

			<div className='flex flex-col gap-1 md:col-span-4'>
				<div>
					<div className='flex flex-col gap-3 md:flex-row md:items-center md:gap-10'>
						{contactOptions.map(option => (
							<label
								key={option}
								className='flex items-center gap-2 capitalize'
							>
								<input
									type='radio'
									value={option}
									{...register('contact_option')}
								/>
								<span>{option}</span>
							</label>
						))}
					</div>
					{errors.contact_option ? (
						<ErrorMessage message={errors.contact_option.message} />
					) : null}
				</div>

				{/* show this depending on what was selected */}
				{contactOption ? (
					<div className='mt-2 flex w-full max-w-lg flex-col gap-1 rounded bg-wustomers-primary py-3 px-2 text-sm md:px-5'>
						<label htmlFor='input'>
							{option[contactOption as keyof typeof option]}
						</label>
						<div className='flex flex-1 flex-col'>
							{renderInput[contactOption as ContactOption]}
							{errors.contact_option_link ? (
								<ErrorMessage
									message={errors.contact_option_link.message}
								/>
							) : null}
						</div>
					</div>
				) : null}
			</div>
		</div>
	)
}
