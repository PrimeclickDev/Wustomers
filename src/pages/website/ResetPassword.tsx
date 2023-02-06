import { zodResolver } from '@hookform/resolvers/zod'
// import forgotPasswordIllustration from 'assets/images/forgot-password-illustration.png'
import { Button } from 'components/Button'
import { TextField } from 'components/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z
	.object({
		newPassword: z
			.string()
			.min(1, { message: 'Password is required' })
			.min(8, {
				message: 'Password must be at least 8 characters long',
			})
			.regex(
				/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
				{
					message:
						'Password must contain an uppercase, lowercase letter, numeric value and special character.',
				}
			)
			.trim(),
		confirmNewPassword: z
			.string()
			.min(1, { message: 'Password confirmation is required' })
			.min(8, {
				message: 'Password confirmation must be at least 8 characters long',
			})
			.regex(
				/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
				{
					message:
						'Password must contain an uppercase, lowercase letter, numeric value and special character.',
				}
			)
			.trim(),
	})
	.refine(data => data.newPassword === data.confirmNewPassword, {
		path: ['confirmPassword'],
		message: 'Passwords do not match',
	})

type ResetPasswordSchema = z.infer<typeof schema>

const ResetPassword = () => {
	const { register, handleSubmit, control } = useForm<ResetPasswordSchema>({
		defaultValues: {
			newPassword: '',
			confirmNewPassword: '',
		},
		resolver: zodResolver(schema),
	})

	const resetPassword: SubmitHandler<ResetPasswordSchema> = data => {
		console.log('data: ', data)
	}
	return (
		<>
			<section>
				<header>
					{/* <Link
						to='/login'
						className='transition-opacity hover:opacity-70 active:scale-95'
					>
						<CircleArrow />
						<span className='sr-only'>Go back button</span>
					</Link> */}
					<h2 className='mt-7 text-4xl font-bold'>Reset Password</h2>

					<p className='max-w-[32ch] pt-3 text-lg'>
						Kindly update your password
					</p>
				</header>

				<form className='mt-10' onSubmit={handleSubmit(resetPassword)}>
					<TextField
						register={register}
						control={control}
						label='new password'
						name='newPassword'
						type='password'
					/>

					<TextField
						register={register}
						control={control}
						label='confirm new password'
						name='confirmNewPassword'
						type='password'
					/>
					<Button
						text='Reset Password'
						variant='fill'
						type='submit'
						className='mt-6 w-full py-2.5'
					/>
				</form>
			</section>
		</>
	)
}

export default ResetPassword
