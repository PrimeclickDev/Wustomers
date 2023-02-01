import { ReactComponent as CircleArrow } from 'assets/icons/arrowcircle.svg'
import signUpIllustration from 'assets/images/signup-illustration.png'
import { Button } from 'components/Button'
import { OtpInput } from 'components/OtpInput'
import { useTimer } from 'hooks/useTimer'
import { AuthLayout } from 'layouts/AuthLayout'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const VerifyEmail = () => {
	const [otp, setOtp] = useState('')
	const onChange = (value: string) => setOtp(value)
	const { min } = useTimer({ seconds: 10 })

	return (
		<AuthLayout
			imgWidth={560}
			text='Keep track of your campaigns with little or no effort'
			imgSrc={signUpIllustration}
		>
			<header>
				<Link
					to='/login'
					className='transition-opacity hover:opacity-70 active:scale-95'
				>
					<CircleArrow />
					<span className='sr-only'>Go back button</span>
				</Link>
				<h2 className='mt-7 text-4xl font-bold'>Verify Email</h2>
			</header>

			<div className='mt-10'>
				<p className='pt-3'>
					We sent a verification code to{' '}
					<span className='font-medium'>************am@gmail.com</span>
				</p>
				<OtpInput value={otp} valueLength={6} onChange={onChange} />

				<Button
					text='Verify email'
					variant='fill'
					type='button'
					className='mt-8 flex !w-full justify-center py-2.5'
					// href='/reset-password'
				/>

				{/* show timer. if timer is completed, show resend otp */}

				{min === 0 ? (
					<a
						href='#'
						className='mt-4 block text-center font-medium text-wustomers-blue transition-colors hover:text-wustomers-blue-light'
					>
						Send the code again
					</a>
				) : (
					<p className='mx-auto mt-4 w-max rounded-sx bg-wustomers-blue-light/10 py-1 px-3 text-center text-xl font-bold text-wustomers-blue'>
						{min}
					</p>
				)}
			</div>
		</AuthLayout>
	)
}
export default VerifyEmail
