/* eslint-disable react/display-name */
import * as RadixSelect from '@radix-ui/react-select'
import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevron-down.svg'
import React from 'react'

interface SelectProps extends RadixSelect.SelectProps {
	icon?: React.ReactNode
	className?: string
	placeholder: string
	value?: string
	onChange?: () => void
	children: React.ReactNode
	// defaultValue?: string
}

export const Select = ({
	icon,
	className,
	placeholder,
	value,
	onChange,
	children,
}: SelectProps) => {
	return (
		<RadixSelect.Root
			value={value === '' ? undefined : value}
			onValueChange={onChange}
		>
			<RadixSelect.Trigger
				className={`flex h-9 w-72 items-center justify-between gap-[5px] rounded border border-wustomers-blue bg-wustomers-primary-light pl-2 pr-[15px] text-sm leading-none text-wustomers-blue data-[placeholder]:text-wustomers-blue-light/50 ${className}`}
				// aria-label='Food'
			>
				<RadixSelect.Group className='flex items-center gap-3'>
					{icon ? <RadixSelect.Icon>{icon}</RadixSelect.Icon> : null}
					<RadixSelect.Value placeholder={placeholder} />
				</RadixSelect.Group>
				<RadixSelect.Icon>
					<ChevronDownIcon />
				</RadixSelect.Icon>
			</RadixSelect.Trigger>
			<RadixSelect.Portal>
				<RadixSelect.Content className='overflow-hidden rounded bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]'>
					<RadixSelect.Viewport className='p-[5px]'>
						<RadixSelect.Group>{children}</RadixSelect.Group>
					</RadixSelect.Viewport>
				</RadixSelect.Content>
			</RadixSelect.Portal>
		</RadixSelect.Root>
	)
}

export const SelectItem: React.ForwardRefExoticComponent<
	RadixSelect.SelectItemProps & React.RefAttributes<HTMLDivElement>
> = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
	return (
		<RadixSelect.Item
			className={`relative flex h-[32px] select-none items-center rounded pr-[35px] pl-[25px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-wustomers-blue data-[disabled]:text-gray-500 data-[highlighted]:text-white data-[highlighted]:outline-none ${className}`}
			{...props}
			ref={forwardedRef}
		>
			<RadixSelect.ItemText>{children}</RadixSelect.ItemText>
			<RadixSelect.ItemIndicator className='absolute left-0 inline-flex w-[25px] items-center justify-center'>
				{/* <CheckIcon /> */}
			</RadixSelect.ItemIndicator>
		</RadixSelect.Item>
	)
})
