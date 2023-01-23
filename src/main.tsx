import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { QueryWrapper } from './utils/react-query/QueryWrapper'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryWrapper>
				<App />
			</QueryWrapper>
		</BrowserRouter>
	</React.StrictMode>
)
