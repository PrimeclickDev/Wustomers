import { ReactComponent as CircleArrow } from 'assets/icons/arrowcircle.svg'
import forgotPasswordIllustration from 'assets/images/forgot-password-illustration.png'
import { Button } from 'components/Button'
import { TextField } from 'components/TextField'
import { AuthLayout } from 'layouts/AuthLayout'
import { Link } from 'react-router-dom'

export const ForgotPassword = () => {
	return (
		<AuthLayout
			imgSrc={forgotPasswordIllustration}
			imgWidth={550}
			text='Keep track of your campaigns with little or no effort'
		>
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

				<form className='mt-10'>
					<TextField label='email' name='email' type='email' />
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
		</AuthLayout>
	)
}
