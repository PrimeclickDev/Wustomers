import { zodResolver } from '@hookform/resolvers/zod'
import { useGoogleLogin } from '@react-oauth/google'
import googleLogo from 'assets/images/google.png'
import instagramLogo from 'assets/images/instagram.png'
import axios from 'axios'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { TextField } from 'components/TextField'
import { useLogin } from 'hooks/api/auth/useLogin'
import { useLoginWithGoogle } from 'hooks/api/auth/useLoginWithGoogle'
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
	const mutation = useLoginWithGoogle()

	const loginUser: SubmitHandler<LoginSchema> = data => {
		mutate(data, {
			onSuccess: () => navigate('/dashboard'),
			onError: error => {
				setError('email', { message: error.response?.data.errors.email[0] })
				setError('password', {
					message: error.response?.data.errors.email[0],
				})
			},
		})
	}

	const loginWithGoogle = useGoogleLogin({
		onSuccess: async response => {
			const userInfo = await axios.get(
				'https://www.googleapis.com/oauth2/v3/userinfo',
				{
					headers: {
						Authorization: `Bearer ${response.access_token}`,
					},
				}
			)

			mutation.mutate(
				{
					email: userInfo.data?.email,
				},
				{
					onSuccess: () => navigate('/dashboard'),
				}
			)
		},
		onError: async error => {
			console.error(error)
			// toast.error(error)
		},
	})

	return (
		<>
			<h2 className='text-4xl font-bold'>Log in</h2>

			<form className='mt-8' onSubmit={handleSubmit(loginUser)}>
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
						Forgot password
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

			<p className='pt-6 text-center text-lg font-medium uppercase'>or</p>

			<div className='flex flex-col gap-3 pt-4'>
				<button
					onClick={() => loginWithGoogle()}
					disabled={mutation.isLoading}
					className='flex w-full items-center justify-center gap-3 border border-[#C1C1C1] bg-white py-2.5 font-normal normal-case text-inherit transition hover:bg-[#C1C1C1]/20 active:scale-[0.98] disabled:pointer-events-none disabled:bg-[#C1C1C1]/20'
				>
					{mutation.isLoading ? (
						<Spinner />
					) : (
						<>
							<img src={googleLogo} alt='google logo' className='w-7' />
							<span>Log in with Google</span>
						</>
					)}
				</button>
				<button className='flex w-full items-center justify-center gap-3 border border-[#C1C1C1] bg-white py-2.5 font-normal normal-case text-inherit transition hover:bg-[#C1C1C1]/20 active:scale-[0.98]'>
					<img src={instagramLogo} alt='instagram logo' className='w-5' />
					<span>Log in with Instagram</span>
				</button>
			</div>

			<p className='pt-10 text-center'>
				Don&apos;t have an account?{' '}
				<Link
					to='/signup'
					className='font-medium text-wustomers-blue transition-colors ease-in-out hover:text-wustomers-blue-light'
				>
					Sign up
				</Link>
			</p>
		</>
	)
}
export default Login
