import { ReactComponent as Error } from 'assets/icons/danger.svg'

export const ErrorMessage = ({ message }: { message?: string }) => {
	return (
		<div
			role='alert'
			className='flex items-center gap-2 text-xs font-medium text-red-600'
		>
			<Error width={14} />
			<span>{message}</span>
		</div>
	)
}
