/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { zodResolver } from '@hookform/resolvers/zod'
import { useSetupCampaign } from 'api/hooks/campaigns/useSetupCampaign'
import { ReactComponent as CloseIcon } from 'assets/icons/close-square.svg'
import { Button } from 'components/Button'
import { Combobox } from 'components/Combobox'
import { ErrorMessage } from 'components/ErrorMessage'
import { Spinner } from 'components/Spinner'
import { useAtom } from 'jotai'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { paymentModalType } from 'store/atoms'
import { budgets, durations } from 'utils/constants'
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
		.min(1, { message: 'Campaign duration is required' })
		.trim(),
	budget: z
		.string({ required_error: 'Please select a budget' })
		.min(1, { message: 'Campaign budget is required' })
		.trim()
		.refine(val => parseInt(val) >= 2000, {
			message: 'The minimum budget is N2000',
		}),
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
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<CampaignSetupSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			acceptTerms: undefined,
			duration: '',
			budget: '',
		},
	})

	const setupCampaign = useSetupCampaign()
	const onSubmit: SubmitHandler<CampaignSetupSchema> = data => {
		const payload = { duration: +data.duration, amount: +data.budget }
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
		// console.log('data', data)
	}

	return (
		<>
			<Modal
				modalOpen={openModal}
				closeModal={closeModal}
				className='!max-w-md p-0'
			>
				<header className='flex items-center justify-between gap-2 bg-[#EAEAEA] px-6 py-3'>
					<h3 className='text-xl font-black'>Campaign Setup</h3>
					<button
						aria-label='close modal'
						className='transition-opacity hover:opacity-70'
						onClick={closeModal}
					>
						<CloseIcon />
					</button>
				</header>

				{modalType === 'setup' ? (
					<form className='flex flex-col gap-6 p-6'>
						<div className='flex flex-col gap-2'>
							<div className='flex flex-col'>
								<label>Your daily budget:</label>
								<span className='text-xs text-neutral-500'>
									You can select from the list or enter a custom value.
								</span>
							</div>
							<Combobox
								control={control}
								name='budget'
								options={budgets}
								placeholder='Select your preferred budget....'
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<div className='flex flex-col'>
								<label className='leading-0'>
									How long do you want your campaign to run for?:
								</label>
								<span className='text-xs text-neutral-500'>
									You can select from the list or enter a custom value.
									Value should be in days.
								</span>
							</div>
							<Combobox
								control={control}
								name='duration'
								options={durations}
								placeholder='Select your preferred duration....'
							/>
						</div>

						<div>
							<label className='flex flex-col items-center gap-2 text-center leading-none md:flex-row md:items-start md:gap-4 md:text-left'>
								<input
									type='checkbox'
									id='acceptTerms'
									className='h-8 w-8 accent-wustomers-blue'
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

						<div className='mt-4 flex items-center justify-evenly gap-2 md:gap-5'>
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
								<p className='text-right'>
									{
										setupCampaign.data?.data?.data?.campaign?.budget
											.duration
									}
									days
								</p>
							</div>
							<div className='flex items-center justify-between gap-2'>
								<p className='font-semibold'>Campaign budget:</p>
								<p className='text-right'>
									{formatCurrency(
										setupCampaign.data?.data?.data
											?.custom_budget_amount
									)}{' '}
									per day
								</p>
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
								text='Go back'
								className='normal-case'
								onClick={() => setModalType('setup')}
							/>
						</div>
					</div>
				)}
			</Modal>
		</>
	)
}
