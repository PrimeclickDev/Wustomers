import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { DashboardHeader } from 'components/DashboardHeader'
import { ErrorFallback } from 'components/ErrorFallback'
import { Sidebar } from 'components/Sidebar'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

export const DashboardLayout = () => {
	return (
		<main className='min-h-screen lg:grid lg:grid-cols-[300px_auto]'>
			<Sidebar />

			<QueryErrorResetBoundary>
				{({ reset }) => (
					<ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
						<section className='bg-[#E6EAF9]'>
							<DashboardHeader />

							<div className='max-w-6xl px-4 py-10 lg:px-10'>
								<Outlet />
							</div>
						</section>
					</ErrorBoundary>
				)}
			</QueryErrorResetBoundary>
		</main>
	)
}
