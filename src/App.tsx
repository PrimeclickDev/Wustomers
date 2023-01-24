import { WebsiteLayout } from 'layouts/WebsiteLayout'
import Home from 'pages/website/Home'
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Contact = lazy(() => import('./pages/website/Contact'))
const Pricing = lazy(() => import('./pages/website/Pricing'))
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const NotFound = lazy(() => import('./pages/NotFound'))

const App = () => {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<Routes>
				{/* website routes */}
				<Route element={<WebsiteLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='contact' element={<Contact />} />
					<Route path='pricing' element={<Pricing />} />
				</Route>

				{/* dashboard routes */}
				<Route path='/dashboard' element={<Dashboard />} />

				<Route path='*' element={<NotFound />} />
			</Routes>
		</Suspense>
	)
}

export default App
