import { zodResolver } from '@hookform/resolvers/zod'
import { ReactComponent as CircleArrow } from 'assets/icons/arrowcircle.svg'
import { Button } from 'components/Button'
import { TextField } from 'components/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'
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
	const { register, handleSubmit, control } = useForm<ForgotPasswordSchema>({
		defaultValues: {
			email: '',
		},
		resolver: zodResolver(schema),
	})

	const resetPassword: SubmitHandler<ForgotPasswordSchema> = data => {
		console.log('data: ', data)
	}
	return (
		<>
			<section>
				<header>
					<Link
						to='/login'
						className='transition-opacity hover:opacity-70 active:scale-95'
					>
						<CircleArrow />
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
					{/* <Button
						text='Reset Password'
						variant='fill'
						type='submit'
						className='mt-6 w-full py-2.5'
					/> */}
					<Button
						text='Reset Password'
						variant='fill'
						type='submit'
						className='mt-6 flex !w-full justify-center py-2.5'
						href='/reset-password'
					/>
				</form>
			</section>
		</>
	)
}

export default ForgotPassword
