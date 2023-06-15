import { zodResolver } from '@hookform/resolvers/zod'
import { useLogin } from 'api/hooks/auth/useLogin'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { TextField } from 'components/TextField'
import { usePageTitle } from 'hooks/usePageTitle'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const schema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.min(1, { message: 'Email address is required' })
		.email({ message: 'Please enter a valid email address' })
		.trim(),
	password: z
		.string({ required_error: 'Password is required' })
		.min(1, { message: 'Password is required' })
		.trim(),
})

export type LoginSchema = z.infer<typeof schema>

const Login = () => {
	usePageTitle('Login')
	const navigate = useNavigate()
	const { register, handleSubmit, control, setError } = useForm<LoginSchema>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: zodResolver(schema),
	})
	const { mutate, isLoading, error } = useLogin()

	const loginUser: SubmitHandler<LoginSchema> = data => {
		mutate(data, {
			onSuccess: () => navigate('/overview'),
			onError: error => {
				setError('email', { message: error.response?.data.errors.email[0] })
				setError('password', {
					message: error.response?.data.errors.email[0],
				})
			},
		})
	}

	return (
		<>
			<h2 className='text-4xl font-bold'>Log in</h2>

			<form
				className='mt-8 flex flex-col gap-5'
				onSubmit={handleSubmit(loginUser)}
			>
				<TextField
					register={register}
					label='email'
					name='email'
					type='email'
					control={control}
				/>
				<TextField
					register={register}
					label='password'
					name='password'
					type='password'
					control={control}
				/>

				<div>
					<Link
						to='/forgot-password'
						className='block pt-2 text-sm capitalize text-wustomers-blue transition-colors hover:text-wustomers-blue-light'
					>
						Forgot password?
					</Link>

					{error?.response?.data.message ===
					'Login failed! Account is inactive' ? (
						<Link
							to='/verify-email'
							className='block pt-2 text-sm capitalize text-wustomers-blue transition-colors hover:text-wustomers-blue-light'
						>
							Verify account
						</Link>
					) : null}
				</div>

				<Button
					text={isLoading ? <Spinner /> : 'Login'}
					variant='fill'
					className='mt-6 w-full py-2.5'
					type='submit'
					disabled={isLoading}
				/>
			</form>
		</>
	)
}
export default Login
