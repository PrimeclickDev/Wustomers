import { ReactComponent as Eye } from 'assets/icons/eye.svg'
import { ReactComponent as EyeSlash } from 'assets/icons/eyeslash.svg'
import { HTMLInputTypeAttribute, useState } from 'react'
import {
	Control,
	FieldValues,
	Path,
	UseFormRegister,
	useController,
} from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { ErrorMessage } from './ErrorMessage'

interface TextFieldProps<T extends FieldValues>
	extends React.ComponentPropsWithoutRef<'input'> {
	label?: React.ReactNode
	type: HTMLInputTypeAttribute | 'textarea'
	name: Path<T>
	className?: string
	register: UseFormRegister<T>
	control: Control<T>
	prefixIcon?: React.ReactNode
}

export const TextField = <T extends FieldValues>({
	label,
	name,
	type,
	className,
	register,
	control,
	prefixIcon,
	...inputProps
}: TextFieldProps<T>) => {
	const location = useLocation()
	const [togglePassword, setTogglePassword] = useState(false)
	const {
		fieldState: { error },
	} = useController({
		name,
		control,
	})

	return (
		<div className={`flex flex-col ${className}`}>
			<label htmlFor={name} className='text-base capitalize md:text-lg'>
				{label}
			</label>
			<div className='relative'>
				{prefixIcon ? (
					<div className='absolute left-0 top-1/2 mr-2 -translate-y-1/2 p-2 text-[#b7b6b6] transition-transform active:scale-95'>
						{prefixIcon}
					</div>
				) : null}

				{type === 'textarea' ? (
					// @ts-expect-error try to include textarea in extends
					<textarea
						id={name}
						{...register(name)}
						className={`h-32 w-full resize-none appearance-none rounded-sm px-4 py-3 ring-[1.5px] ${
							error
								? 'bg-red-50 ring-red-600'
								: 'bg-wustomers-primary ring-wustomers-primary-light'
						}`}
						{...inputProps}
					/>
				) : (
					<input
						type={togglePassword ? 'text' : type}
						{...register(name)}
						name={name}
						id={name}
						className={`w-full appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
							type === 'password' && 'pr-14'
						} ${prefixIcon && 'pl-12'} ${
							error
								? 'bg-red-50 ring-red-600'
								: 'bg-wustomers-primary ring-wustomers-primary-light'
						}`}
						{...inputProps}
					/>
				)}

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

			{type === 'password' && location.pathname !== '/login' && !error ? (
				<span className='text-xs text-gray-500'>
					Password must contain a symbol, a number, an uppercase and
					lowercase character
				</span>
			) : null}
			{error ? <ErrorMessage message={error.message} /> : null}
		</div>
	)
}
