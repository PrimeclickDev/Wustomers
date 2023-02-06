import { ErrorFallback } from 'components/ErrorFallback'
import { useConcurrentTransition } from 'hooks/useConcurrentTransition'
import { AuthLayout } from 'layouts/AuthLayout'
import { DashboardLayout } from 'layouts/DashboardLayout'
import { WebsiteLayout } from 'layouts/WebsiteLayout'
import NotFound from 'pages/NotFound'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes } from 'react-router-dom'

const Home = React.lazy(() => import('pages/website/Home'))
const Pricing = React.lazy(() => import('pages/website/Pricing'))
const Contact = React.lazy(() => import('pages/website/Contact'))
const Login = React.lazy(() => import('pages/website/Login'))
const Signup = React.lazy(() => import('pages/website/Signup'))
const ForgotPassword = React.lazy(() => import('pages/website/ForgotPassword'))
const VerifyEmail = React.lazy(() => import('pages/website/VerifyEmail'))
const ResetPassword = React.lazy(() => import('pages/website/ResetPassword'))
const Dashboard = React.lazy(() => import('pages/dashboard/Dashboard'))

const App = () => {
	const location = useConcurrentTransition()

	console.log(location)

	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			{/* {!isOnline ? <OnlineStatus /> : null} */}
			<Routes location={location}>
				<Route path='/' element={<WebsiteLayout />}>
					<Route index element={<Home />} />
					<Route path='pricing' element={<Pricing />} />
					<Route path='contact' element={<Contact />} />
				</Route>

				<Route path='dashboard' element={<DashboardLayout />}>
					<Route index element={<Dashboard />} />
				</Route>

				{/* auth routes */}
				<Route element={<AuthLayout location={location} />}>
					<Route path='login' element={<Login />} />
					<Route path='signup' element={<Signup />} />
					<Route path='forgot-password' element={<ForgotPassword />} />
					<Route path='reset-password' element={<ResetPassword />} />
					<Route path='verify-email' element={<VerifyEmail />} />
				</Route>

				<Route path='*' element={<NotFound />} />
			</Routes>
		</ErrorBoundary>
	)
}

export default App
