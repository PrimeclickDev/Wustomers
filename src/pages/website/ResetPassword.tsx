import { zodResolver } from '@hookform/resolvers/zod'
import { useResetPassword } from 'api/hooks/auth/useResetPassword'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { TextField } from 'components/TextField'
import { usePageTitle } from 'hooks/usePageTitle'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const schema = z
	.object({
		password: z
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
		confirmPassword: z
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
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Passwords do not match',
	})

export type ResetPasswordSchema = z.infer<typeof schema>

const ResetPassword = () => {
	usePageTitle('Reset Password')
	const navigate = useNavigate()

	const { register, handleSubmit, control } = useForm<ResetPasswordSchema>({
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
		resolver: zodResolver(schema),
	})

	const { mutate, isLoading } = useResetPassword()

	const resetPassword: SubmitHandler<ResetPasswordSchema> = data => {
		mutate(data, {
			onSuccess: () => {
				navigate('/login')
			},
		})
	}

	return (
		<>
			<section>
				<header>
					<h2 className='mt-7 text-4xl font-bold'>Reset Password</h2>
					<p className='max-w-[32ch] pt-3 text-lg'>
						Kindly update your password
					</p>
				</header>

				<form
					className='mt-10 flex flex-col gap-8'
					onSubmit={handleSubmit(resetPassword)}
				>
					<TextField
						register={register}
						control={control}
						label='new password'
						name='password'
						type='password'
					/>

					<TextField
						register={register}
						control={control}
						label='confirm password'
						name='confirmPassword'
						type='password'
					/>

					<Button
						text={isLoading ? <Spinner /> : 'Reset Password'}
						variant='fill'
						type='submit'
						className='mt-6 w-full py-2.5'
						disabled={isLoading}
					/>
				</form>
			</section>
		</>
	)
}

export default ResetPassword
