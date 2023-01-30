import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import ScrollToTop from 'helpers/ScrollToTop'
import { Outlet } from 'react-router-dom'

export const WebsiteLayout = () => {
	return (
		<>
			<ScrollToTop />
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}
