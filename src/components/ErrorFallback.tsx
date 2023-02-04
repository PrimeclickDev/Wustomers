import { Button } from './Button'

type ErrorFallbackProps = {
	error: Error
	resetErrorBoundary: () => void
}

export const ErrorFallback = ({
	error,
	resetErrorBoundary,
}: ErrorFallbackProps) => {
	return (
		<div
			role='alert'
			className='absolute top-1/2 left-1/2 flex max-w-[70ch] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-md bg-red-200 py-6 px-10 text-red-800 outline outline-2 outline-offset-[3px] outline-red-300'
		>
			<h2 className='text-4xl font-bold'>Something went wrong</h2>
			<p className='pt-2 text-center text-sm leading-6'>
				We are working on fixing the proble. Please try again
			</p>
			{process.env.NODE_ENV === 'development' ? (
				<pre className='mt-5 bg-red-300 py-3 px-5'>{error.message}</pre>
			) : null}

			{/* <button
				onClick={resetErrorBoundary}
				className='mt-3 rounded border border-red-600 bg-red-300/30 py-3 px-8 text-sm text-red-600 transition hover:opacity-80 active:scale-95'
			>
				Refresh Page
			</button> */}
			<Button
				text='Try again'
				variant='fill'
				type='button'
				onClick={resetErrorBoundary}
				className='mt-4 bg-red-600'
			/>
		</div>
	)
}
