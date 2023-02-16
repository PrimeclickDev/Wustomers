import { zodResolver } from '@hookform/resolvers/zod'
import { ReactComponent as CircleArrowIcon } from 'assets/icons/arrowcircle.svg'
import { ReactComponent as TickCircleIcon } from 'assets/icons/tickcircle.svg'
import { Button } from 'components/Button'
import { Modal } from 'components/Modal'
import { Spinner } from 'components/Spinner'
import { TextField } from 'components/TextField'
import { useForgotPassword } from 'hooks/auth/useForgotPassword'
import { usePageTitle } from 'hooks/usePageTitle'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

const schema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email address is required' })
		.email({ message: 'Please enter a valid email address' })
		.trim(),
})

type ForgotPasswordSchema = z.infer<typeof schema>

const ForgotPassword = () => {
	usePageTitle('Forgot Password')
	const [openModal, setOpenModal] = useState(true)
	const { register, handleSubmit, control, watch } =
		useForm<ForgotPasswordSchema>({
			defaultValues: {
				email: '',
			},
			resolver: zodResolver(schema),
		})
	const email = watch('email')

	const { isFetching, refetch, isSuccess } = useForgotPassword({ email })
	const resetPassword = () => refetch()

	return (
		<>
			<section>
				<header>
					<Link
						to='/login'
						className='transition-opacity hover:opacity-70 active:scale-95'
					>
						<CircleArrowIcon />
						<span className='sr-only'>Go back button</span>
					</Link>
					<h2 className='mt-7 text-4xl font-bold'>Forgot Password</h2>
					<p className='max-w-[32ch] pt-3 text-lg'>
						Please enter your account email address to reset your password
					</p>
				</header>

				<form className='mt-10' onSubmit={handleSubmit(resetPassword)}>
					<TextField
						register={register}
						control={control}
						label='email'
						name='email'
						type='email'
					/>
					<Button
						text={isFetching ? <Spinner /> : 'Reset Password'}
						variant='fill'
						type='submit'
						className='mt-6 flex !w-full justify-center py-2.5'
						disabled={isFetching}
					/>
				</form>
			</section>

			{isSuccess ? (
				<Modal closeModal={() => setOpenModal(false)} modalOpen={openModal}>
					<div className='flex flex-col items-center justify-center'>
						<h3 className='text-2xl font-black'>Reset link sent</h3>
						<div className='mt-7 grid h-20 w-20 place-content-center rounded-full bg-wustomers-blue'>
							<TickCircleIcon />
						</div>
						<p className='pt-5 text-center text-lg'>
							We have sent a password reset link to your mail
						</p>

						<Button
							variant='fill'
							text='Go to mail'
							className='mt-5 px-20'
						/>
					</div>
				</Modal>
			) : null}
		</>
	)
}

export default ForgotPassword
