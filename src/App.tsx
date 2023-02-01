import { ErrorFallback } from 'components/ErrorFallback'
import { DashboardLayout } from 'layouts/DashboardLayout'
import { WebsiteLayout } from 'layouts/WebsiteLayout'
import Dashboard from 'pages/dashboard/Dashboard'
import Contact from 'pages/website/Contact'
import { ForgotPassword } from 'pages/website/ForgotPassword'
import Home from 'pages/website/Home'
import Login from 'pages/website/Login'
import Pricing from 'pages/website/Pricing'
import { ResetPassword } from 'pages/website/ResetPassword'
import Signup from 'pages/website/Signup'
import VerifyEmail from 'pages/website/VerifyEmail'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes } from 'react-router-dom'

const App = () => {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<Routes>
				<Route path='/' element={<WebsiteLayout />}>
					<Route index element={<Home />} />
					<Route path='pricing' element={<Pricing />} />
					<Route path='contact' element={<Contact />} />
				</Route>

				<Route path='dashboard' element={<DashboardLayout />}>
					<Route index element={<Dashboard />} />
				</Route>

				{/* auth routes */}
				<Route path='login' element={<Login />} />
				<Route path='signup' element={<Signup />} />
				<Route path='forgot-password' element={<ForgotPassword />} />
				<Route path='reset-password' element={<ResetPassword />} />
				<Route path='verify-email' element={<VerifyEmail />} />
			</Routes>
		</ErrorBoundary>
	)
}

export default App
