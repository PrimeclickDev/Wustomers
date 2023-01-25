import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import { Outlet } from 'react-router-dom'

export const WebsiteLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}
