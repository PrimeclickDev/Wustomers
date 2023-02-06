import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import { PageLoader } from 'components/PageLoader'
import ScrollToTop from 'helpers/ScrollToTop'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export const WebsiteLayout = () => {
	return (
		<>
			<ScrollToTop />
			<Header />

			<Suspense fallback={<PageLoader />}>
				<Outlet />
			</Suspense>

			<Footer />
		</>
	)
}
