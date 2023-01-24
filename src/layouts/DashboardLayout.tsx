import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorFallback } from 'components/ErrorFallback'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

export const DashboardLayout = () => {
	return (
		<>
			<QueryErrorResetBoundary>
				{({ reset }) => (
					<ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
						<Outlet />
					</ErrorBoundary>
				)}
			</QueryErrorResetBoundary>
		</>
	)
}
