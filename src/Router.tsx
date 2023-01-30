import { WebsiteLayout } from 'layouts/WebsiteLayout'
import NotFound from 'pages/NotFound'
import { ForgotPassword } from 'pages/website/ForgotPassword'
import Login from 'pages/website/Login'
import { ResetPassword } from 'pages/website/ResetPassword'
import { websiteRoute } from 'pages/website/routes'
import Signup from 'pages/website/Signup'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <WebsiteLayout />,
		errorElement: <NotFound />,
		children: websiteRoute,
	},
	{
		path: 'login',
		element: <Login />,
	},
	{
		path: 'signup',
		element: <Signup />,
	},
	{
		path: 'forgot-password',
		element: <ForgotPassword />,
	},
	{
		path: 'reset-password',
		element: <ResetPassword />,
	},
])
