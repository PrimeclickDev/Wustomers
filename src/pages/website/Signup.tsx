import { zodResolver } from '@hookform/resolvers/zod'
import { ReactComponent as Error } from 'assets/icons/danger.svg'
import googleLogo from 'assets/images/google.png'
import instagramLogo from 'assets/images/instagram.png'
import { Button } from 'components/Button'
import { TextField } from 'components/TextField'
import { usePageTitle } from 'hooks/usePageTitle'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

const schema = z
	.object({
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
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Passwords do not match',
	})

type SignupSchema = z.infer<typeof schema>

const Signup = () => {
	usePageTitle('Sign up')

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<SignupSchema>({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
			acceptTerms: undefined,
		},
		resolver: zodResolver(schema),
	})

	const registerUser: SubmitHandler<SignupSchema> = data => {
		console.log('data: ', data)
	}
	return (
		<>
			<header>
				{/* <Link
					to='/login'
					className='transition-opacity hover:opacity-70 active:scale-95'
				>
					<CircleArrow />
					<span className='sr-only'>Go back button</span>
				</Link> */}
				<h2 className='text-4xl font-bold'>Sign up</h2>
			</header>

			<form className='mt-8' onSubmit={handleSubmit(registerUser)}>
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
				<TextField
					register={register}
					control={control}
					label='Confirm password'
					name='confirmPassword'
					type='password'
				/>
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
					<div
						role='alert'
						className='flex items-center gap-2 text-xs font-medium text-red-600'
					>
						<Error width={14} />
						<span>{errors.acceptTerms.message}</span>
					</div>
				) : null}
				<Button
					text='Sign up'
					variant='fill'
					className='mt-6 w-full py-2.5'
					type='submit'
				/>
			</form>

			<p className='pt-6 text-center text-lg font-medium uppercase'>or</p>

			<div className='flex flex-col gap-3 pt-4'>
				<button className='flex w-full items-center justify-center gap-3 border border-[#C1C1C1] bg-white py-2.5 font-normal normal-case text-inherit transition hover:bg-[#C1C1C1]/20 active:scale-[0.98]'>
					<img src={googleLogo} alt='google logo' className='w-7' />
					<span>Log in with Google</span>
				</button>
				<button className='flex w-full items-center justify-center gap-3 border border-[#C1C1C1] bg-white py-2.5 font-normal normal-case text-inherit transition hover:bg-[#C1C1C1]/20 active:scale-[0.98]'>
					<img src={instagramLogo} alt='instagram logo' className='w-5' />
					<span>Log in with Instagram</span>
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
