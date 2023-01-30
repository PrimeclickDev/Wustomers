import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import App from './App'
import './index.css'
import { QueryWrapper } from './utils/react-query/QueryWrapper'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryWrapper>
			<App />
		</QueryWrapper>
		<ToastContainer />
	</React.StrictMode>
)
