import { ReactComponent as Eye } from 'assets/icons/eye.svg'
import { ReactComponent as EyeSlash } from 'assets/icons/eyeslash.svg'
import { useState } from 'react'
import {
	Control,
	FieldValues,
	Path,
	useController,
	UseFormRegister,
} from 'react-hook-form'
import { ErrorMessage } from './ErrorMessage'

interface TextFieldProps<T extends FieldValues>
	extends React.ComponentPropsWithoutRef<'input'> {
	label?: React.ReactNode
	type: string
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
	const [togglePassword, setTogglePassword] = useState(false)
	const {
		fieldState: { error },
	} = useController({
		name,
		control,
	})

	return (
		<div className={`mt-6 flex flex-col gap-1 ${className}`}>
			<label htmlFor={name} className='text-base capitalize md:text-lg'>
				{label}
			</label>
			<div className='relative'>
				{prefixIcon ? (
					<div className='absolute left-0 top-1/2 mr-2 -translate-y-1/2 p-2 text-[#b7b6b6] transition-transform active:scale-95'>
						{prefixIcon}
					</div>
				) : null}
				<input
					type={togglePassword ? 'text' : type}
					{...register(name)}
					name={name}
					id={name}
					className={`w-full appearance-none rounded-sm bg-wustomers-primary px-4 py-2.5 ring-[1.5px] ${
						type === 'password' && 'pr-14'
					} ${prefixIcon && 'pl-12'} ${
						error ? 'ring-red-600' : 'ring-wustomers-primary-light'
					}`}
					{...inputProps}
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
			{type === 'password' ? (
				<span className='text-xs text-gray-500'>
					Password must contain a symbol, a number, an uppercase and
					lowercase character
				</span>
			) : null}
			{error ? <ErrorMessage message={error.message} /> : null}
		</div>
	)
}
