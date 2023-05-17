import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { campaignAtom } from 'store/atoms'
import { z } from 'zod'
import { Button } from './Button'
import { ErrorMessage } from './ErrorMessage'
import { Modal } from './Modal'
import { Spinner } from './Spinner'

const schema = z.object({
	upload_option: z
		.string({
			invalid_type_error: 'To continue, select of the above upload options',
		})
		.min(1, { message: 'To continue, select of the above upload options' })
		.trim(),
})

export type NewCampaignSchema = z.infer<typeof schema>

type NewCampaignModalProps = {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	isOpen: boolean
}

const NewCampaignModal = ({ setIsOpen, isOpen }: NewCampaignModalProps) => {
	const [, setCampaign] = useAtom(campaignAtom)
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitted, isValid },
		reset,
	} = useForm<NewCampaignSchema>({
		defaultValues: {
			upload_option: '',
		},
		resolver: zodResolver(schema),
	})

	const onSubmit: SubmitHandler<NewCampaignSchema> = data => {
		setCampaign(prev => ({ ...prev, ...data }))
		if (data.upload_option === 'manual') {
			navigate('/campaigns/new')
		}

		window.location.href = `https://api.instagram.com/oauth/authorize?client_id=${
			import.meta.env.VITE_IG_CLIENT_ID
		}&redirect_uri=${
			import.meta.env.DEV
				? import.meta.env.VITE_IG_DEV_REDIRECT_URL
				: import.meta.env.VITE_iG_PROD_REDIRECT_URL
		}&scope=user_profile,user_media&response_type=code`
	}

	return (
		<Modal closeModal={() => setIsOpen(false)} modalOpen={isOpen}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<header>
					<h3 className='text-lg font-medium'>
						How would you like to upload your campaign?
					</h3>
					<p className='text-sm italic'>NB: Pls select one</p>
				</header>

				<div className='mt-6 flex flex-col gap-3'>
					{['manual', 'instagram'].map(value => (
						<div key={value} className='flex items-center gap-3'>
							<input
								type='radio'
								className='peer h-4 w-4 accent-wustomers-blue disabled:cursor-not-allowed disabled:opacity-50'
								disabled={value === 'manual'}
								id={value}
								value={value}
								{...register('upload_option')}
							/>
							<label
								htmlFor={value}
								className='peer-disabled:cursor-not-allowed peer-disabled:opacity-50'
							>
								{value === 'manual' ? 'Manual Upload' : 'Connect to IG'}
							</label>
						</div>
					))}
					{errors.upload_option ? (
						<ErrorMessage message={errors.upload_option.message} />
					) : null}
				</div>

				<div className='flex items-center justify-between gap-4'>
					<Button
						text={isSubmitted && isValid ? <Spinner /> : 'Continue'}
						disabled={isSubmitted && isValid}
						variant='fill'
						className='mt-6 w-full normal-case'
						type='submit'
					/>
					<Button
						text='Cancel'
						variant='outline'
						className='mt-6 w-full normal-case'
						onClick={() => {
							setIsOpen(false)
							reset()
						}}
					/>
				</div>
			</form>
		</Modal>
	)
}
export default NewCampaignModal
