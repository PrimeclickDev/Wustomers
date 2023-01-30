import googleLogo from 'assets/images/google.png'
import instagramLogo from 'assets/images/instagram.png'
import signUpIllustration from 'assets/images/signup-illustration.png'
import { Button } from 'components/Button'
import { TextField } from 'components/TextField'
import { AuthLayout } from 'layouts/AuthLayout'
import { Link } from 'react-router-dom'

const Signup = () => {
	return (
		<AuthLayout
			imgWidth={560}
			text='Keep track of your campaigns with little or no effort'
			imgSrc={signUpIllustration}
		>
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

			<form className='mt-8'>
				<TextField label='email' name='email' type='email' />
				<TextField label='password' name='password' type='password' />

				<div className='mt-3 flex items-center gap-2 font-[#979797]'>
					<input
						type='checkbox'
						name='acceptTerms'
						id='acceptTerms'
						className='border-3 h-4 w-4 cursor-pointer rounded-sm accent-wustomers-blue transition-colors hover:bg-gray-300'
						// className='peer sr-only'
					/>
					{/* <div className='relative h-4 w-4 rounded-sm border-2 border-[#979797] after:absolute after:h-2 after:w-2 after:translate-x-1/2 after:bg-wustomers-blue' /> */}
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
		</AuthLayout>
	)
}
export default Signup
