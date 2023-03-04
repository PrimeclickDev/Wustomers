import { zodResolver } from '@hookform/resolvers/zod'
import { ReactComponent as Facebook } from 'assets/icons/facebook.svg'
import { ReactComponent as InformationIcon } from 'assets/icons/information.svg'
import { ReactComponent as Instagram } from 'assets/icons/instagram.svg'
import { ReactComponent as Tiktok } from 'assets/icons/tiktok.svg'
import { ReactComponent as Twitter } from 'assets/icons/twitter.svg'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from 'components/Accordion'
import { Button } from 'components/Button'
import { ErrorMessage } from 'components/ErrorMessage'
import { Modal } from 'components/Modal'
import { Select } from 'components/Select'
// import { ImgWithFallback } from 'components/ImgWithFallback'
import { TextField } from 'components/TextField'
import { UserAvatar } from 'components/UserAvatar'
import { noOfEmployees } from 'data/constants'
import { useGetIndustries } from 'hooks/api/globals/useGetIndustries'
import { usePageTitle } from 'hooks/usePageTitle'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
	firstName: z.string().min(1, { message: 'First name is required' }),
	lastName: z.string().min(1, { message: 'First name is required' }),
	emailAddress: z
		.string()
		.min(1, { message: 'Email address is required' })
		.email({ message: 'Please enter a valid email address' })
		.trim(),
	phoneNumber: z
		.string()
		.min(1, { message: 'Phone number is required' })
		.regex(/^([0]{1}|\+?234)([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g, {
			message: 'Please enter a valid phone number',
		})
		.trim(),
	businessName: z.string().min(1, { message: 'Business name is required' }),
	businessMail: z
		.string()
		.min(1, { message: 'Business mail is required' })
		.email({ message: 'Please enter a valid email address' })
		.trim(),
	industryType: z.string().min(1, { message: 'Industry type is required' }),
	noOfEmployees: z.string().min(1, { message: 'No of Employees is required' }),
	instagramLink: z
		.string()
		// .url({ message: 'Please enter a valid link' })
		.optional(),
	tiktokLink: z
		.string()
		// .url({ message: 'Please enter a valid link' })
		.optional(),
	facebookLink: z
		.string()
		// .url({ message: 'Please enter a valid link' })
		.optional(),
	twitterLink: z
		.string()
		// .url({ message: 'Please enter a valid link' })
		.optional(),
})

type AccountUpdateSchema = z.infer<typeof schema>

const initialFormValues = {
	businessMail: '',
	businessName: '',
	emailAddress: '',
	firstName: '',
	industryType: '',
	lastName: '',
	noOfEmployees: '',
	phoneNumber: '',
	facebookLink: '',
	instagramLink: '',
	tiktokLink: '',
	twitterLink: '',
}

const AccountUpdate = () => {
	usePageTitle('Account Update')
	const [openModal, setOpenModal] = useState(false)
	const {
		control,
		register,
		handleSubmit,
		formState: { isValid, isSubmitted },
	} = useForm<AccountUpdateSchema>({
		resolver: zodResolver(schema),
		defaultValues: initialFormValues,
	})
	const { data: industries } = useGetIndustries()

	const closeModal = () => setOpenModal(false)

	const updateProfile: SubmitHandler<AccountUpdateSchema> = data => {
		console.log('data', data)
		// setOpenModal(true)
		// setFormData(data)
	}

	return (
		<>
			<h2 className='text-3xl'>
				Hi, <span className='font-black'>Bosun</span>
			</h2>

			{/*alert */}
			<div
				role='alert'
				className='mt-5 flex items-center gap-4 rounded-sx bg-white py-1 text-sm font-medium lg:text-base'
			>
				<div className='bg-wustomers-blue py-2 px-4 text-white'>
					<InformationIcon />
				</div>
				<span>
					Note: Please fill this form to get your account verified
				</span>
			</div>

			<div className='mt-10 flex flex-col md:flex-row md:gap-10 lg:gap-20'>
				<form
					className='order-2 mt-8 flex flex-1 flex-col gap-1 md:order-none md:mt-0'
					onSubmit={handleSubmit(updateProfile)}
				>
					<Accordion>
						<AccordionItem value='item-1' className='border-b-0'>
							<AccordionTrigger className='w-full rounded-sx bg-[#9CAAE9] p-2 text-left text-base text-white transition-all hover:bg-wustomers-blue/50 focus-visible:outline-wustomers-blue data-[state=open]:bg-wustomers-blue-light lg:px-4 lg:py-2 lg:text-lg'>
								Basic Information
							</AccordionTrigger>
							<AccordionContent className='bg-white text-base'>
								<TextField
									control={control}
									placeholder='First Name'
									name='firstName'
									register={register}
									type='text'
									className='mt-0'
								/>
								<TextField
									control={control}
									placeholder='Last Name'
									name='lastName'
									register={register}
									type='text'
									className='mt-[6px]'
								/>
								<TextField
									control={control}
									name='emailAddress'
									register={register}
									type='email'
									placeholder='Email Address'
									className='mt-[6px]'
								/>
								<TextField
									control={control}
									placeholder='Phone Number'
									name='phoneNumber'
									register={register}
									type='tel'
									inputMode='numeric'
									maxLength={11}
									className='mt-[6px]'
								/>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value='item-2' className='border-b-0'>
							<AccordionTrigger className='w-full rounded-sx bg-[#9CAAE9] p-2 text-left text-base text-white transition-all hover:bg-wustomers-blue/50 focus-visible:outline-wustomers-blue data-[state=open]:bg-wustomers-blue-light lg:px-4 lg:py-2 lg:text-lg'>
								Business Information
							</AccordionTrigger>
							<AccordionContent className='bg-white text-base'>
								<TextField
									control={control}
									placeholder='Business name'
									name='businessName'
									register={register}
									type='text'
									className='mt-0'
								/>
								<TextField
									control={control}
									name='businessMail'
									register={register}
									type='email'
									placeholder='Business mail'
									className='mt-[6px]'
								/>

								<Controller
									name='industryType'
									control={control}
									render={({
										field: { onChange, value },
										fieldState: { error },
									}) => (
										<>
											<Select
												options={industries?.data.data}
												className={`custom-select ${
													error
														? 'ring-red-600'
														: 'ring-wustomers-primary-light'
												}`}
												placeholder='Select an industry type....'
												value={value}
												onChange={onChange}
											/>
											{error ? (
												<ErrorMessage message={error.message} />
											) : null}
										</>
									)}
								/>
								<Controller
									name='noOfEmployees'
									control={control}
									render={({
										field: { onChange, value },
										fieldState: { error },
									}) => (
										<>
											<Select
												options={noOfEmployees}
												className={`custom-select ${
													error
														? 'ring-red-600'
														: 'ring-wustomers-primary-light'
												}`}
												placeholder='Select number of employees...'
												value={value}
												onChange={onChange}
											/>
											{error ? (
												<ErrorMessage message={error.message} />
											) : null}
										</>
									)}
								/>
								{/* <TextField
									control={control}
									placeholder='Industry type'
									name='industryType'
									register={register}
									type='text'
									className='mt-[6px]'
								/> */}
								{/* <TextField
									control={control}
									placeholder='No of employees'
									name='noOfEmployess'
									register={register}
									type='number'
									inputMode='numeric'
									className='mt-[6px]'
								/> */}
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value='item-3' className='border-b-0'>
							<AccordionTrigger className='w-full rounded-sx bg-[#9CAAE9] p-2 text-left text-base text-white transition-all hover:bg-wustomers-blue/50 focus-visible:outline-wustomers-blue data-[state=open]:bg-wustomers-blue-light lg:px-4 lg:py-2 lg:text-lg'>
								Social Media accounts
							</AccordionTrigger>
							<AccordionContent className='mt-0 bg-white text-base'>
								<TextField
									control={control}
									placeholder='Instagram link'
									name='instagramLink'
									register={register}
									type='url'
									className='mt-0'
									prefixIcon={<Instagram />}
								/>
								<TextField
									control={control}
									placeholder='Tiktok link'
									name='tiktokLink'
									register={register}
									type='url'
									className='mt-[6px]'
									prefixIcon={<Tiktok />}
								/>
								<TextField
									control={control}
									placeholder='Facebook link'
									name='facebookLink'
									register={register}
									type='url'
									className='mt-[6px]'
									prefixIcon={<Facebook />}
								/>
								<TextField
									control={control}
									placeholder='Twitter link'
									name='twitterLink'
									register={register}
									type='url'
									className='mt-[6px]'
									prefixIcon={<Twitter />}
								/>
							</AccordionContent>
						</AccordionItem>
					</Accordion>

					<div className='mt-2 flex flex-col items-center justify-between md:mt-0 md:flex-row'>
						{isSubmitted && !isValid ? (
							<ErrorMessage message='This form has errors, pls check' />
						) : null}

						<Button
							text='Submit'
							variant='fill'
							type='submit'
							className='mt-3 lg:mt-0 lg:ml-auto'
						/>
					</div>
				</form>

				<UserAvatar />
			</div>

			<Modal closeModal={closeModal} modalOpen={openModal}>
				<div className='flex flex-col items-center justify-center py-5'>
					<p className='px-14 text-center text-lg'>
						Are tou sure you want to update your account?
					</p>

					<div className='flex items-center gap-5'>
						<Button
							variant='outline'
							text='Close'
							className='mt-5 normal-case'
							onClick={closeModal}
						/>
						<Button
							variant='fill'
							text='Update account'
							className='mt-5 px-8 normal-case'
						/>
					</div>
				</div>
			</Modal>
		</>
	)
}
export default AccountUpdate
