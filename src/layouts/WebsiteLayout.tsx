import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import { PageLoader } from 'components/PageLoader'
import ScrollToTop from 'components/scrollToTop'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export const WebsiteLayout = () => {
	return (
		<>
			<Header />

			<Suspense fallback={<PageLoader />}>
				<Outlet />
			</Suspense>

			<Footer />
			<ScrollToTop />
		</>
	)
}
