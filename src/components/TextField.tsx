import { ReactComponent as Eye } from 'assets/icons/eye.svg'
import { ReactComponent as EyeSlash } from 'assets/icons/eyeslash.svg'
import { useState } from 'react'

type TextFieldProps = {
	label: string
	type: string
	name: string
	className?: string
	// register: UseFormRegister<T extends string>
}

export const TextField = ({ label, name, type, className }: TextFieldProps) => {
	const [togglePassword, setTogglePassword] = useState(false)

	return (
		<div className='mt-6 flex flex-col gap-1'>
			<label htmlFor={name} className='text-lg capitalize'>
				{label}
			</label>
			<div className='relative'>
				<input
					type={togglePassword ? 'text' : type}
					name={name}
					id={name}
					className={`w-full rounded-sm border border-wustomers-primary-light bg-wustomers-primary px-4 py-2.5 ${
						type === 'password' ? 'pr-14' : ''
					} ${className}`}
				/>
				{type === 'password' ? (
					<button
						onClick={() => setTogglePassword(!togglePassword)}
						type='button'
						className='absolute right-0 top-1/2 mr-2 -translate-y-1/2 p-2 transition-transform active:scale-95'
					>
						{togglePassword ? <EyeSlash /> : <Eye />}
						<span className='sr-only'>hide password</span>
					</button>
				) : null}
			</div>
			{/* <div
				role='alert'
				className='flex items-center gap-2 text-sm font-medium text-red-600'
			>
				<Error />
				<span>You have an error!</span>
			</div> */}
		</div>
	)
}
