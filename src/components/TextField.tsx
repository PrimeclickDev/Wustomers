import { ReactComponent as Error } from 'assets/icons/danger.svg'
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

type TextFieldProps<T extends FieldValues> = {
	label: string
	type: string
	name: Path<T>
	className?: string
	register: UseFormRegister<T>
	control: Control<T>
}

export const TextField = <T extends FieldValues>({
	label,
	name,
	type,
	className,
	register,
	control,
}: TextFieldProps<T>) => {
	const [togglePassword, setTogglePassword] = useState(false)
	const {
		fieldState: { error },
	} = useController({
		name,
		control,
	})

	return (
		<div className='mt-6 flex flex-col gap-1'>
			<label htmlFor={name} className='text-lg capitalize'>
				{label}
			</label>
			<div className='relative'>
				<input
					type={togglePassword ? 'text' : type}
					{...register(name)}
					name={name}
					id={name}
					className={`w-full appearance-none rounded-sm bg-wustomers-primary px-4 py-2.5 ring-[1.5px] ${
						type === 'password' ? 'pr-14' : ''
					} ${className} ${
						error ? 'ring-red-600' : 'ring-wustomers-primary-light'
					}`}
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
			{error ? (
				<div
					role='alert'
					className='flex items-center gap-2 text-xs font-medium text-red-600'
				>
					<div className='rounded-sx bg-red-200 px-2 py-1'>
						<Error width={14} />
					</div>
					<span>{error?.message}</span>
				</div>
			) : null}
		</div>
	)
}
