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
import { Select, SelectItem } from 'components/Select'
import { Spinner } from 'components/Spinner'
// import { ImgWithFallback } from 'components/ImgWithFallback'
import { TextField } from 'components/TextField'
import { UserAvatar } from 'components/UserAvatar'
import { useGetIndustries } from 'hooks/api/globals/useGetIndustries'
import { useGetProfile } from 'hooks/api/profile/useGetProfile'
import { useUpdateProfile } from 'hooks/api/profile/useUpdateProfile'
import { usePageTitle } from 'hooks/usePageTitle'
import { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { noOfEmployees } from 'utils/constants'
import { z } from 'zod'

const schema = z.object({
	firstName: z
		.string({
			invalid_type_error: 'First name is required',
			required_error: 'First name is required',
		})
		.min(1, { message: 'First name is required' }),
	lastName: z
		.string({
			invalid_type_error: 'Last name is required',
			required_error: 'Last name is required',
		})
		.min(1, { message: 'Last name is required' }),
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
		.url({ message: 'Please enter a valid link' })
		.optional()
		.or(z.literal('')),
	tiktokLink: z
		.string()
		.url({ message: 'Please enter a valid link' })
		.optional()
		.or(z.literal('')),
	facebookLink: z
		.string()
		.url({ message: 'Please enter a valid link' })
		.optional()
		.or(z.literal('')),
	twitterLink: z
		.string()
		.url({ message: 'Please enter a valid link' })
		.optional()
		.or(z.literal('')),
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
	const {
		control,
		register,
		handleSubmit,
		setValue,
		formState: { isValid, isSubmitted },
	} = useForm<AccountUpdateSchema>({
		resolver: zodResolver(schema),
		defaultValues: initialFormValues,
	})
	const { data: industries } = useGetIndustries()
	const { data: profile, isLoading } = useGetProfile()
	const mutation = useUpdateProfile()

	const updateProfile: SubmitHandler<AccountUpdateSchema> = data => {
		const selectedIndustry = industries?.data?.data?.find(
			option => data.industryType === option.name
		)
		mutation.mutate({
			business_email: data.businessMail,
			business_name: data.businessName,
			first_name: data.firstName,
			last_name: data.lastName,
			no_employee: data.noOfEmployees,
			phone: data.phoneNumber,
			industry_type_id: selectedIndustry?.id,
			facebook_url: data.facebookLink ?? '',
			instagram_url: data.instagramLink ?? '',
			tik_tok_url: data.tiktokLink ?? '',
			twitter_url: data.twitterLink ?? '',
		})
	}

	useEffect(() => {
		if (profile?.data.data) {
			const data = profile?.data.data.profile
			setValue('firstName', data.user.first_name)
			setValue('lastName', data.user.last_name)
			setValue('emailAddress', data.user.email)
			setValue('phoneNumber', data.phone)
			setValue('businessName', data.business_name)
			setValue('businessMail', data.business_email)
			setValue('industryType', data.industry)
			setValue('noOfEmployees', data.no_employee)
			setValue('instagramLink', data.instagram_url)
			setValue('facebookLink', data.facebook_url)
			setValue('tiktokLink', data.tik_tok_url)
			setValue('twitterLink', data.twitter_url)
		}
	}, [profile?.data.data])

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<h2 className='text-3xl'>
						Hi,{' '}
						<span className='font-black'>
							{profile?.data.data.profile.user.first_name}
						</span>
					</h2>

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
									<AccordionTrigger className='w-full rounded-sx bg-[#9CAAE9] p-2 text-left text-base text-white transition-all hover:bg-wustomers-blue/50 focus-visible:outline-wustomers-blue data-[state=open]:bg-wustomers-blue-light md:px-4 md:py-2 md:text-lg'>
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
									<AccordionTrigger className='w-full rounded-sx bg-[#9CAAE9] p-2 text-left text-base text-white transition-all hover:bg-wustomers-blue/50 focus-visible:outline-wustomers-blue data-[state=open]:bg-wustomers-blue-light md:px-4 md:py-2 md:text-lg'>
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
														className={`custom-select ${
															error
																? 'ring-red-600'
																: 'ring-wustomers-primary-light'
														}`}
														placeholder='Select an industry type....'
														onChange={onChange}
														value={value}
													>
														{industries?.data?.data?.map(
															option => (
																<SelectItem
																	value={option.name}
																	key={option.id}
																>
																	{option.name}
																</SelectItem>
															)
														)}
													</Select>
													{error ? (
														<ErrorMessage
															message={error.message}
														/>
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
														className={`custom-select ${
															error
																? 'ring-red-600'
																: 'ring-wustomers-primary-light'
														}`}
														placeholder='Select number of employees...'
														value={value}
														onChange={onChange}
													>
														{noOfEmployees?.map(option => (
															<SelectItem
																value={option.name}
																key={option.id}
															>
																{option.name}
															</SelectItem>
														))}
													</Select>
													{error ? (
														<ErrorMessage
															message={error.message}
														/>
													) : null}
												</>
											)}
										/>
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value='item-3' className='border-b-0'>
									<AccordionTrigger className='w-full rounded-sx bg-[#9CAAE9] p-2 text-left text-base text-white transition-all hover:bg-wustomers-blue/50 focus-visible:outline-wustomers-blue data-[state=open]:bg-wustomers-blue-light md:px-4 md:py-2 md:text-lg'>
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
									text={
										mutation.isLoading ? (
											<Spinner />
										) : (
											'Update account'
										)
									}
									variant='fill'
									type='submit'
									className='mt-3 normal-case md:ml-auto lg:mt-0'
									disabled={mutation.isLoading}
								/>
							</div>
						</form>

						<UserAvatar />
					</div>
				</>
			)}
		</>
	)
}

export default AccountUpdate
