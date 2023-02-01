import googleLogo from 'assets/images/google.png'
import instagramLogo from 'assets/images/instagram.png'
import loginIllustration from 'assets/images/login-illustration.png'
import { Button } from 'components/Button'
import { TextField } from 'components/TextField'
import { AuthLayout } from 'layouts/AuthLayout'
import { Link } from 'react-router-dom'

const Login = () => {
	return (
		<AuthLayout
			imgWidth={660}
			text='Keep track of your campaigns with little or no effort'
			imgSrc={loginIllustration}
		>
			<h2 className='text-4xl font-bold'>Log in</h2>

			<form className='mt-8'>
				<TextField label='email' name='email' type='email' />
				<TextField label='password' name='password' type='password' />

				<Link
					to='/forgot-password'
					className='block pt-2 text-sm capitalize text-wustomers-blue transition-colors hover:text-wustomers-blue-light'
				>
					Forgot password
				</Link>

				<Button
					text='Login'
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
				Don&apos;t have an account?{' '}
				<Link
					to='/signup'
					className='font-medium text-wustomers-blue transition-colors ease-in-out hover:text-wustomers-blue-light'
				>
					Sign up
				</Link>
			</p>
		</AuthLayout>
	)
}
export default Login
