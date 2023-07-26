import { ReactComponent as AuthBgBottom } from 'assets/icons/auth-bg-bottom.svg'
import { ReactComponent as AuthBgTop } from 'assets/icons/auth-bg-top.svg'
import forgotPasswordIllustration from 'assets/images/forgot-password-illustration.png'
import loginIllustration from 'assets/images/login-illustration.png'
import signupIllustration from 'assets/images/signup-illustration.png'
import { PageLoader } from 'components/PageLoader'
import { WustomersLogo } from 'components/WustomersLogo'
import ScrollToTop from 'components/scrollToTop'
import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

// wrapper for signup, login and forgot password
export const AuthLayout = () => {
	const location = useLocation()
	const changePageIllustration = () => {
		if (location.pathname.includes('login')) {
			return (
				<img
					alt='illustration'
					src={loginIllustration}
					width={500}
					height='340'
					loading='lazy'
					className='hidden lg:mt-20 lg:block'
				/>
			)
		} else if (location.pathname.includes('signup')) {
			return (
				<img
					alt='illustration'
					src={signupIllustration}
					width={450}
					height='340'
					loading='lazy'
					className='hidden lg:mt-20 lg:block'
				/>
			)
		} else if (
			location.pathname.includes('password') ||
			location.pathname.includes('verify-email')
		) {
			return (
				<img
					alt='illustration'
					src={forgotPasswordIllustration}
					width={450}
					height='340'
					loading='lazy'
					className='hidden lg:mt-20 lg:block'
				/>
			)
		}
	}

	return (
		<>
			<main className='min-h-screen lg:grid lg:grid-cols-5 lg:gap-3 xl:gap-10'>
				<section className='relative col-span-3 flex flex-col bg-wustomers-blue-light px-5 py-7 lg:sticky lg:top-0 lg:right-0 lg:h-screen lg:self-start lg:py-10 lg:px-28 lg:pt-16'>
					<WustomersLogo className='text-white' to='/' />

					<AuthBgTop className='absolute top-0 right-0' />

					{changePageIllustration()}

					<p className='hidden pt-4 font-medium text-white lg:block lg:w-96 lg:pt-12 lg:text-2xl'>
						Keep track of your campaigns with little or no effort
					</p>

					<AuthBgBottom className='absolute bottom-0 left-0' />
				</section>
				<section className='col-span-2 py-10 px-3 md:my-20 md:px-10 lg:px-3 xl:px-0 xl:py-0 xl:pr-32'>
					<Suspense fallback={<PageLoader />}>
						<Outlet />
					</Suspense>
				</section>
			</main>

			<ScrollToTop />
		</>
	)
}
