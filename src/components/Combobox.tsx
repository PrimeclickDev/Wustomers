import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevron-down.svg'
import React from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import { ErrorMessage } from './ErrorMessage'

type Option = {
	label: string
	value: string
}

interface ComboboxProps<T extends FieldValues>
	extends React.ComponentPropsWithoutRef<typeof CreatableSelect> {
	name: Path<T>
	control: Control<T>
	options: Option[]
}

export const Combobox = <T extends FieldValues>({
	name,
	control,
	options,
	...otherProps
}: ComboboxProps<T>) => {
	const {
		fieldState: { error },
		field: { onChange, value },
	} = useController({
		name,
		control,
	})

	return (
		<>
			<CreatableSelect
				options={options}
				value={options.find(c => c.value === value)}
				// @ts-expect-error val is unknown
				onChange={val => onChange(val.value)}
				unstyled
				components={{
					DropdownIndicator: () => (
						<ChevronDownIcon className='h-4 w-4 text-[#9CAAE9]' />
					),
				}}
				classNames={{
					control: ({ isFocused }) =>
						`w-full py-3 appearance-none rounded-sm border-0 bg-wustomers-primary px-4 text-base text-wustomers-main ring-[1.5px] ring-wustomers-primary-light ${
							isFocused
								? 'ring-wustomers-blue'
								: 'ring-wustomers-primary-light'
						} ${error ? 'ring-red-600' : 'ring-wustomers-primary-light'}`,
					menu: () =>
						'rounded bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] p-2',
					option: ({ isFocused }) =>
						`py-1.5 select-none items-center rounded px-4 !text-sm hover:bg-wustomers-blue hover:text-white transition-colors ${
							isFocused ? 'bg-wustomers-blue text-white' : ''
						}`,
					placeholder: () => 'text-gray-400',
					multiValue: () =>
						'py-[2px] px-2.5 border border-[#C1C1C1] flex items-center gap-2 rounded-sm',
					multiValueLabel: () => 'text-sm text-wustomers-neutral',
					valueContainer: () => 'flex items-center gap-2',
					dropdownIndicator: () => 'text-[#9CAAE9]',
				}}
				{...otherProps}
			/>
			{error ? <ErrorMessage message={error.message} /> : null}
		</>
	)
}
