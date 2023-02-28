import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import App from './App'
import './index.css'
import { QueryWrapper } from './utils/react-query/QueryWrapper'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryWrapper>
				<GoogleOAuthProvider
					clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
				>
					<App />
				</GoogleOAuthProvider>
			</QueryWrapper>

			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
		</BrowserRouter>
	</React.StrictMode>
)
