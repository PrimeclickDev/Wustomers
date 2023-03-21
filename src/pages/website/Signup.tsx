import { zodResolver } from '@hookform/resolvers/zod'
import { useGoogleLogin } from '@react-oauth/google'
import { useRegister } from 'api/hooks/auth/useRegister'
import { useSignupWithGoogle } from 'api/hooks/auth/useSignupWithGoogle'
import googleLogo from 'assets/images/google.png'
import instagramLogo from 'assets/images/instagram.png'
import axios from 'axios'
import { Button } from 'components/Button'
import { ErrorMessage } from 'components/ErrorMessage'
import { Spinner } from 'components/Spinner'
import { TextField } from 'components/TextField'
import { usePageTitle } from 'hooks/usePageTitle'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const schema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email address is required' })
		.email({ message: 'Please enter a valid email address' })
		.trim(),
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
					'Password must contain a symbol, a number, an uppercase and lowercase character',
			}
		)
		.trim(),
	acceptTerms: z.literal(true, {
		errorMap: () => ({
			message: 'You must accept the terms and conditions',
		}),
	}),
})

export type SignupSchema = z.infer<typeof schema>

const Signup = () => {
	usePageTitle('Sign up')
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		control,
		setError,
		formState: { errors },
	} = useForm<SignupSchema>({
		defaultValues: {
			email: '',
			password: '',
			acceptTerms: undefined,
		},
		resolver: zodResolver(schema),
	})
	const { mutate, isLoading } = useRegister()
	const signUpWithGoogle = useSignupWithGoogle()

	const registerUser: SubmitHandler<SignupSchema> = data => {
		const { email, password } = data
		sessionStorage.setItem('email', email)
		mutate(
			{ email, password },
			{
				onSuccess: () => navigate('/verify-email'),
				onError: error => {
					setError('email', { message: error.response?.data.message })
				},
			}
		)
	}

	const registerWithGoogle = useGoogleLogin({
		onSuccess: async response => {
			const userInfo = await axios.get(
				'https://www.googleapis.com/oauth2/v3/userinfo',
				{
					headers: {
						Authorization: `Bearer ${response.access_token}`,
					},
				}
			)

			signUpWithGoogle.mutate(
				{
					email: userInfo.data?.email,
					first_name: userInfo.data?.given_name ?? 'user',
					provider: 'google',
					last_name: userInfo.data?.family_name ?? 'user',
				},
				{
					onSuccess: () => navigate('/account-update'),
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
			<h2 className='text-4xl font-bold'>Sign up</h2>

			<form
				className='mt-8 flex flex-col gap-5'
				onSubmit={handleSubmit(registerUser)}
			>
				<TextField
					register={register}
					control={control}
					label='email'
					name='email'
					type='email'
				/>
				<TextField
					register={register}
					control={control}
					label='password'
					name='password'
					type='password'
				/>

				<div className='flex flex-col gap-1'>
					<div className='mt-5 flex items-center gap-2 font-[#979797]'>
						<input
							type='checkbox'
							id='acceptTerms'
							className='border-3 h-4 w-4 cursor-pointer rounded-sm accent-wustomers-blue transition-colors hover:bg-gray-300'
							{...register('acceptTerms')}
						/>
						<label htmlFor='acceptTerms' className='text-sm'>
							I agree to{' '}
							<a href='#' className='font-medium text-wustomers-blue'>
								terms
							</a>{' '}
							and{' '}
							<a href='#' className='font-medium text-wustomers-blue'>
								conditions
							</a>
						</label>
					</div>
					{errors.acceptTerms ? (
						<ErrorMessage message={errors.acceptTerms.message} />
					) : null}
				</div>

				<Button
					text={isLoading ? <Spinner /> : 'Sign up'}
					variant='fill'
					className='mt-6 w-full py-2.5'
					type='submit'
					disabled={isLoading}
				/>
			</form>

			<p className='pt-6 text-center text-lg font-medium uppercase'>or</p>

			<div className='flex flex-col gap-3 pt-4'>
				<button
					type='button'
					disabled={isLoading}
					onClick={() => registerWithGoogle()}
					className='flex w-full items-center justify-center gap-3 border border-wustomers-neutral-lighter bg-white py-2.5 font-normal normal-case text-inherit transition hover:bg-wustomers-neutral-lighter/20 active:scale-[0.98] disabled:pointer-events-none disabled:bg-wustomers-neutral-lighter/20'
				>
					{signUpWithGoogle.isLoading ? (
						<Spinner />
					) : (
						<>
							<img src={googleLogo} alt='google logo' className='w-7' />
							<span>Sign up with Google</span>
						</>
					)}
				</button>
				<button className='flex w-full items-center justify-center gap-3 border border-wustomers-neutral-lighter bg-white py-2.5 font-normal normal-case text-inherit transition hover:bg-wustomers-neutral-lighter/20 active:scale-[0.98]'>
					<img src={instagramLogo} alt='instagram logo' className='w-5' />
					<span>Sign up with Instagram</span>
				</button>
			</div>

			<p className='pt-10 text-center'>
				Already have an account?{' '}
				<Link
					to='/login'
					className='font-medium text-wustomers-blue transition-colors ease-in-out hover:text-wustomers-blue-light'
				>
					Login
				</Link>
			</p>
		</>
	)
}
export default Signup
