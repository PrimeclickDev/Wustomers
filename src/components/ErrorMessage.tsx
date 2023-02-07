import { ReactComponent as Error } from 'assets/icons/danger.svg'

export const ErrorMessage = ({ message }: { message?: string }) => {
	return (
		<div
			role='alert'
			className='flex items-center gap-2 text-xs font-medium text-red-600'
		>
			<div className='rounded-sx bg-red-200 px-2 py-1'>
				<Error width={14} />
			</div>
			<span>{message}</span>
		</div>
	)
}
