import { useConcurrentTransition } from 'hooks/useConcurrentTransition'
import { AuthLayout } from 'layouts/AuthLayout'
import { DashboardLayout } from 'layouts/DashboardLayout'
import { WebsiteLayout } from 'layouts/WebsiteLayout'
import CampaignWebsite from 'pages/campaign/CampaignWebsite'
import AccountUpdate from 'pages/dashboard/AccountUpdate'
import Auth from 'pages/dashboard/Auth'
import CampaignMetrics from 'pages/dashboard/CampaignMetrics'
import Campaigns from 'pages/dashboard/Campaigns'
import NewCampaign from 'pages/dashboard/NewCampaign'
import Notifications from 'pages/dashboard/Notifications'
import Overview from 'pages/dashboard/Overview'
import Settings from 'pages/dashboard/Settings'
import NotFound from 'pages/NotFound'
import Home from 'pages/website/Home'
import Login from 'pages/website/Login'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { getAccessToken } from 'utils/storage'

const Pricing = React.lazy(() => import('pages/website/Pricing'))
const Contact = React.lazy(() => import('pages/website/Contact'))
const ForgotPassword = React.lazy(() => import('pages/website/ForgotPassword'))
const VerifyEmail = React.lazy(() => import('pages/website/VerifyEmail'))
const ResetPassword = React.lazy(() => import('pages/website/ResetPassword'))
const PrivacyPolicy = React.lazy(() => import('pages/website/PrivacyPolicy'))

const App = () => {
	const location = useConcurrentTransition()
	const token = getAccessToken()

	return (
		<Routes location={location}>
			<Route path='/' element={<WebsiteLayout />}>
				<Route index element={<Home />} />
				<Route path='pricing' element={<Pricing />} />
				<Route path='contact' element={<Contact />} />
				<Route path='privacy-policy' element={<PrivacyPolicy />} />
			</Route>

			<Route element={<DashboardLayout />}>
				<Route path='overview' element={<Overview />} />
				<Route path='campaigns'>
					<Route index element={<Campaigns />} />
					<Route path='new' element={<NewCampaign />} />
				</Route>
				<Route path='campaigns-metrics' element={<CampaignMetrics />} />
				<Route path='account-update' element={<AccountUpdate />} />
				<Route path='settings' element={<Settings />} />
				{/* <Route path='support' element={<Support />} /> */}
				<Route path='notifications' element={<Notifications />} />
				<Route path='auth' element={<Auth />} />
			</Route>

			{/* auth routes */}
			<Route element={<AuthLayout />}>
				<Route
					path='login'
					element={token ? <Navigate to='/overview' /> : <Login />}
				/>
				<Route path='forgot-password' element={<ForgotPassword />} />
				<Route
					path='recover-password/:token/:id'
					element={<ResetPassword />}
				/>
				<Route path='verify-email' element={<VerifyEmail />} />
			</Route>

			<Route path='campaign/:id' element={<CampaignWebsite />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export default App
