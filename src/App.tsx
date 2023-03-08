import { useConcurrentTransition } from 'hooks/useConcurrentTransition'
import { AuthLayout } from 'layouts/AuthLayout'
import { DashboardLayout } from 'layouts/DashboardLayout'
import { WebsiteLayout } from 'layouts/WebsiteLayout'
import AccountUpdate from 'pages/dashboard/AccountUpdate'
import CampaignMetrics from 'pages/dashboard/CampaignMetrics'
import Campaigns from 'pages/dashboard/Campaigns'
import NewCampaign from 'pages/dashboard/NewCampaign'
import Notifications from 'pages/dashboard/Notifications'
import Overview from 'pages/dashboard/Overview'
import Settings from 'pages/dashboard/Settings'
import Support from 'pages/dashboard/Support'
import NotFound from 'pages/NotFound'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = React.lazy(() => import('pages/website/Home'))
const Pricing = React.lazy(() => import('pages/website/Pricing'))
const Contact = React.lazy(() => import('pages/website/Contact'))
const Login = React.lazy(() => import('pages/website/Login'))
const Signup = React.lazy(() => import('pages/website/Signup'))
const ForgotPassword = React.lazy(() => import('pages/website/ForgotPassword'))
const VerifyEmail = React.lazy(() => import('pages/website/VerifyEmail'))
const ResetPassword = React.lazy(() => import('pages/website/ResetPassword'))

const App = () => {
	const location = useConcurrentTransition()

	return (
		<Routes location={location}>
			<Route path='/' element={<WebsiteLayout />}>
				<Route index element={<Home />} />
				<Route path='pricing' element={<Pricing />} />
				<Route path='contact' element={<Contact />} />
			</Route>

			<Route element={<DashboardLayout />}>
				<Route path='dashboard' element={<Overview />} />
				<Route path='campaigns'>
					<Route index element={<Campaigns />} />
					<Route path='new' element={<NewCampaign />} />
				</Route>
				<Route path='campaigns-metrics' element={<CampaignMetrics />} />
				<Route path='account-update' element={<AccountUpdate />} />
				<Route path='settings' element={<Settings />} />
				<Route path='support' element={<Support />} />
				<Route path='notifications' element={<Notifications />} />
			</Route>

			{/* auth routes */}
			<Route element={<AuthLayout />}>
				<Route path='login' element={<Login />} />
				<Route path='signup' element={<Signup />} />
				<Route path='forgot-password' element={<ForgotPassword />} />
				<Route
					path='recover-password/:token/:id'
					element={<ResetPassword />}
				/>
				<Route path='verify-email' element={<VerifyEmail />} />
			</Route>

			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export default App
