import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { DashboardHeader } from 'components/DashboardHeader'
import { ErrorFallback } from 'components/ErrorFallback'
import { Sidebar } from 'components/Sidebar'
import useToggle from 'hooks/useToggle'
import { ErrorBoundary } from 'react-error-boundary'
import { Navigate, Outlet } from 'react-router-dom'
import { getAccessCookie } from 'utils/storage'

export const DashboardLayout = () => {
	const [isOpen, toggle, setIsOpen] = useToggle(false)
	const token = getAccessCookie()

	return (
		<>
			{token ? (
				<main className='min-h-screen lg:grid lg:grid-cols-[300px_auto]'>
					<Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

					<QueryErrorResetBoundary>
						{({ reset }) => (
							<ErrorBoundary
								onReset={reset}
								FallbackComponent={ErrorFallback}
							>
								<section className='bg-[#E6EAF9]'>
									<DashboardHeader toggle={toggle} />

									<div className='relative max-w-6xl px-4 py-10 lg:px-10'>
										<Outlet />
									</div>
								</section>
							</ErrorBoundary>
						)}
					</QueryErrorResetBoundary>
				</main>
			) : (
				<Navigate to='/login' />
			)}
		</>
	)
}
