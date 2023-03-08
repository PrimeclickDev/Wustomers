import { useResendOTP } from 'api/hooks/auth/useResendOTP'
import { useVerifyEmail } from 'api/hooks/auth/useVerifyEmail'
import { ReactComponent as CircleArrow } from 'assets/icons/arrowcircle.svg'
import { Button } from 'components/Button'
import { OtpInput } from 'components/OtpInput'
import { Spinner } from 'components/Spinner'
import { usePageTitle } from 'hooks/usePageTitle'
import { useTimer } from 'hooks/useTimer'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const VerifyEmail = () => {
	usePageTitle('Verify Email')
	const userEmail = sessionStorage.getItem('email') as string
	const [otp, setOtp] = useState('')
	const navigate = useNavigate()
	const { min } = useTimer({ seconds: 10 })
	const onChange = (value: string) => setOtp(value)
	const { mutate, isLoading } = useVerifyEmail()

	const { refetch, isFetching } = useResendOTP({ email: userEmail })

	const verifyEmail = () => {
		if (otp.length === 6) {
			const payload = {
				identifier: userEmail,
				otp: +otp,
			}
			mutate(payload, {
				onSuccess: ({ data }) => {
					localStorage.setItem(
						'wustomers-user',
						JSON.stringify(data?.data?.user)
					)
					sessionStorage.removeItem('email')
					navigate('/account-update')
				},
			})
		}
	}

	const resendOtp = () => {
		refetch()
	}

	return (
		<>
			<header>
				<button
					type='button'
					onClick={() => navigate(-1)}
					className='transition-opacity hover:opacity-70 active:scale-95'
				>
					<CircleArrow />
					<span className='sr-only'>Go back button</span>
				</button>
				<h2 className='mt-7 text-4xl font-bold'>Verify Email</h2>
			</header>

			<div className='mt-10'>
				<p className='pt-3'>
					We sent a verification code to{' '}
					<span className='font-medium'>{userEmail}</span>
				</p>

				<div>
					<OtpInput value={otp} valueLength={6} onChange={onChange} />
					{/* {otpError ? <ErrorMessage message={otpError} /> : null} */}
				</div>

				<Button
					text={isLoading ? <Spinner /> : 'Verify Email'}
					variant='fill'
					type='button'
					className='mt-8 flex !w-full justify-center py-2.5'
					onClick={verifyEmail}
					disabled={isLoading}
				/>

				{/* show timer. if timer is completed, show resend otp */}

				<button
					type='button'
					disabled={min !== 0 || isFetching}
					onClick={resendOtp}
					className='mx-auto mt-5 flex w-max items-center p-1 text-sm text-wustomers-blue-light transition-colors hover:bg-wustomers-blue/20 active:scale-95 disabled:pointer-events-none disabled:text-gray-400'
				>
					{isFetching ? (
						<Spinner />
					) : (
						<>Send the code again {min !== 0 ? `(${min}secs)` : null}</>
					)}
				</button>
			</div>
		</>
	)
}
export default VerifyEmail
