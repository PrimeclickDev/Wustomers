import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const NotFound = lazy(() => import('./pages/NotFound'))

const App = () => {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</Suspense>
	)
}

export default App
