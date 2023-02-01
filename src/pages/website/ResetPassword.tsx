import forgotPasswordIllustration from 'assets/images/forgot-password-illustration.png'
import { Button } from 'components/Button'
import { TextField } from 'components/TextField'
import { AuthLayout } from 'layouts/AuthLayout'

export const ResetPassword = () => {
	return (
		<AuthLayout
			imgSrc={forgotPasswordIllustration}
			imgWidth={550}
			text='Keep track of your campaigns with little or no effort'
		>
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

				<form className='mt-10'>
					<TextField
						label='update password'
						name='update-password'
						type='password'
					/>
					<TextField
						label='confirm new password'
						name='confirm-password'
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
		</AuthLayout>
	)
}
