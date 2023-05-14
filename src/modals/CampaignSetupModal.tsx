/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { zodResolver } from '@hookform/resolvers/zod'
import { useSetupCampaign } from 'api/hooks/campaigns/useSetupCampaign'
import { useFetchBudgets } from 'api/hooks/globals/useFetchBudgets'
import { ReactComponent as CloseIcon } from 'assets/icons/close-square.svg'
import { Button } from 'components/Button'
import { ErrorMessage } from 'components/ErrorMessage'
import { Select, SelectItem } from 'components/Select'
import { Spinner } from 'components/Spinner'
import { states } from 'constants/state'
import { useAtom } from 'jotai'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { paymentModalType } from 'store/atoms'
import { formatCurrency } from 'utils/formatCurrency'
import { z } from 'zod'
import { Modal } from '../components/Modal'

type CampaignSetupModalProps = {
	closeModal: () => void
	openModal: boolean
	campaignId: number
}

const schema = z.object({
	duration: z
		.string({ required_error: 'Please select a duration' })
		.min(1, { message: 'Campaign duration is required' }),
	location: z
		.string({ required_error: 'Please select a location' })
		.min(1, { message: 'Location is required' }),
	acceptTerms: z.literal(true, {
		errorMap: () => ({
			message: 'You must accept the terms and conditions',
		}),
	}),
})

export type CampaignSetupSchema = z.infer<typeof schema>

export const CampaignSetupModal = ({
	closeModal,
	openModal,
	campaignId,
}: CampaignSetupModalProps) => {
	const [modalType, setModalType] = useAtom(paymentModalType)
	const navigate = useNavigate()
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<CampaignSetupSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			acceptTerms: undefined,
			duration: '',
			location: '',
		},
	})
	const durationValue = watch('duration')

	const setupCampaign = useSetupCampaign()
	const { data: budgets } = useFetchBudgets()

	const onSubmit: SubmitHandler<CampaignSetupSchema> = data => {
		const payload = {
			duration: budgets!.find(item => item.duration === data.duration)!.id,
			budget: budgets!.find(item => item.duration === data.duration)!.id,
			location: states.find(item => item.name === data.location)!.id,
		}
		setupCampaign.mutate(
			{
				id: campaignId,
				payload,
			},
			{
				onSuccess: () => {
					setModalType('checkout')
				},
			}
		)
	}

	const closeCampaignModal = () => {
		setModalType('setup')
		closeModal()
	}

	return (
		<>
			<Modal
				modalOpen={openModal}
				closeModal={closeModal}
				className='max-w-lg p-0'
			>
				<header className='flex items-center justify-between gap-2 bg-[#EAEAEA] px-6 py-3'>
					<h3 className='text-2xl font-black'>
						{modalType === 'setup' ? 'Campaign Setup' : 'Checkout'}
					</h3>
					<button
						aria-label='close modal'
						className='transition-opacity hover:opacity-70'
						onClick={closeCampaignModal}
					>
						<CloseIcon />
					</button>
				</header>

				{modalType === 'setup' ? (
					<form className='flex flex-col gap-6 p-6'>
						<div className='flex flex-col items-center gap-1 sm:grid sm:grid-cols-3 md:gap-5'>
							<label htmlFor='campaignDuration' className='col-span-1'>
								Campaign duration:
							</label>
							<Controller
								name='duration'
								control={control}
								render={({
									field: { onChange, value },
									fieldState: { error },
								}) => (
									<div className='col-span-2 flex flex-col gap-1'>
										<Select
											className={`${
												error
													? 'ring-red-600'
													: 'ring-wustomers-primary-light'
											}`}
											placeholder='Select campaign duration....'
											onChange={onChange}
											value={value}
										>
											{budgets?.map(option => (
												<SelectItem
													value={option.duration}
													key={option.id}
												>
													{option.duration} (
													{formatCurrency(option.amount)})
												</SelectItem>
											))}
										</Select>
										{errors.duration ? (
											<ErrorMessage
												message={errors.duration.message}
											/>
										) : null}
									</div>
								)}
							/>
						</div>

						<div className='flex flex-col items-center gap-1 sm:grid sm:grid-cols-3 md:gap-5'>
							<label htmlFor='locations' className='col-span-1'>
								Location:
							</label>
							<Controller
								name='location'
								control={control}
								render={({
									field: { onChange, value },
									fieldState: { error },
								}) => (
									<div className='col-span-2 flex flex-col gap-1'>
										<Select
											className={`${
												error
													? 'ring-red-600'
													: 'ring-wustomers-primary-light'
											}`}
											placeholder='Select location....'
											onChange={onChange}
											value={value}
										>
											{states?.map(option => (
												<SelectItem
													value={option.name}
													key={option.id}
												>
													{option.name}
												</SelectItem>
											))}
										</Select>
										{errors.location ? (
											<ErrorMessage
												message={errors.location.message}
											/>
										) : null}
									</div>
								)}
							/>
						</div>
						<div>
							<label className='flex flex-col items-center gap-2 text-center leading-none md:flex-row md:items-start md:gap-4 md:text-left'>
								<input
									type='checkbox'
									id='acceptTerms'
									className='h-5 w-5 accent-wustomers-blue'
									{...register('acceptTerms')}
								/>
								<span className='text-sm md:text-base md:leading-none'>
									I agree to the terms and condition and 10% service
									charge and all relevant taxes.
								</span>
							</label>

							{errors.acceptTerms ? (
								<ErrorMessage message={errors.acceptTerms.message} />
							) : null}
						</div>

						<div className='mx-auto mt-6 flex w-36 items-center justify-evenly gap-2 md:gap-5'>
							<Button
								variant='outline'
								text='Cancel'
								className='w-full normal-case'
								onClick={() => {
									closeModal()
									navigate('/campaigns')
								}}
							/>
							<Button
								disabled={setupCampaign.isLoading}
								variant='fill'
								text={
									setupCampaign.isLoading ? <Spinner /> : 'Checkout'
								}
								className='w-full normal-case'
								onClick={handleSubmit(onSubmit)}
							/>
						</div>
					</form>
				) : (
					<div className='flex flex-col gap-4 p-6'>
						<div className='flex flex-col gap-3 border-b-[1.5px] border-b-wustomers-neutral-lighter pb-3'>
							<div className='flex items-center justify-between gap-2'>
								<p className='font-semibold'>Campaign title:</p>
								<p className='text-right'>
									{setupCampaign.data?.data?.data?.campaign?.title}
								</p>
							</div>
							<div className='flex items-center justify-between gap-2'>
								<p className='font-semibold'>Campaign duration:</p>
								<p className='text-right'>{durationValue}</p>
							</div>
						</div>
						<div className='flex flex-col gap-3 border-b-[1.5px] border-b-wustomers-neutral-lighter pb-3'>
							<h4 className='pb-3 text-wustomers-neutral'>
								Payment Summary:
							</h4>
							<div className='flex items-center justify-between gap-2'>
								<p className='font-semibold'>Campaign cost:</p>
								<p className='text-right'>
									{formatCurrency(
										setupCampaign.data?.data?.data?.campaign?.amount
									)}
								</p>
							</div>
							<div className='flex items-center justify-between gap-2'>
								<p className='font-semibold'>Service charge:</p>
								<p className='text-right'>
									{formatCurrency(
										setupCampaign.data?.data?.data?.service_charge
									)}
								</p>
							</div>
							<div className='flex items-center justify-between gap-2'>
								<p className='font-semibold'>VAT:</p>
								<p className='text-right'>
									{formatCurrency(setupCampaign.data?.data?.data?.vat)}
								</p>
							</div>
						</div>

						<div className='flex items-center justify-between gap-2 border-b-[1.5px] border-b-wustomers-neutral-lighter pb-3 font-bold'>
							<h4>Total price:</h4>
							<p className='text-right'>
								{formatCurrency(
									setupCampaign.data?.data?.data?.campaign?.amount +
										setupCampaign.data?.data?.data?.vat +
										setupCampaign.data?.data?.data?.service_charge
								)}
							</p>
						</div>

						<div className='mt-3 flex flex-col gap-3'>
							<Button
								variant='fill'
								text='Make payment'
								className='normal-case'
								onClick={() => {
									window.location.href =
										setupCampaign.data?.data?.data?.redirecturl
								}}
							/>
							<Button
								variant='outline'
								text='Cancel'
								className='normal-case'
								onClick={closeCampaignModal}
							/>
						</div>
					</div>
				)}
			</Modal>
		</>
	)
}
