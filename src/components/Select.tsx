/* eslint-disable react/display-name */
// import {
// 	CheckIcon,
// 	ChevronDownIcon,
// 	ChevronUpIcon,
// } from '@radix-ui/react-icons'
import * as Select from '@radix-ui/react-select'
import React from 'react'

const SelectDemo = () => (
	<Select.Root>
		<Select.Trigger
			className='inline-flex h-9 max-w-3xl items-center justify-center gap-[5px] rounded bg-white px-[15px] text-sm leading-none shadow-[0_2px_10px] shadow-black/10 outline-none data-[placeholder]:text-gray-400'
			aria-label='Food'
		>
			<Select.Value placeholder='Select a fruit…' />
			<Select.Icon className='text-violet11'>
				{/* <ChevronDownIcon /> */}
			</Select.Icon>
		</Select.Trigger>
		<Select.Portal>
			<Select.Content className='overflow-hidden rounded bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]'>
				<Select.ScrollUpButton className='flex h-[25px] cursor-default items-center justify-center bg-white'>
					{/* <ChevronUpIcon /> */}
				</Select.ScrollUpButton>
				<Select.Viewport className='p-[5px]'>
					<Select.Group>
						<SelectItem value='apple'>Apple</SelectItem>
						<SelectItem value='banana'>Banana</SelectItem>
						<SelectItem value='blueberry'>Blueberry</SelectItem>
						<SelectItem value='grapes'>Grapes</SelectItem>
						<SelectItem value='pineapple'>Pineapple</SelectItem>
					</Select.Group>
				</Select.Viewport>
				<Select.ScrollDownButton className='text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white'>
					{/* <ChevronDownIcon /> */}
				</Select.ScrollDownButton>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
)

const SelectItem: React.ForwardRefExoticComponent<
	Select.SelectItemProps & React.RefAttributes<HTMLDivElement>
> = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
	return (
		<Select.Item
			className={`relative flex h-[32px] select-none items-center rounded pr-[35px] pl-[25px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-wustomers-blue data-[disabled]:text-gray-500 data-[highlighted]:text-white data-[highlighted]:outline-none ${className}`}
			{...props}
			ref={forwardedRef}
		>
			<Select.ItemText>{children}</Select.ItemText>
			<Select.ItemIndicator className='absolute left-0 inline-flex w-[25px] items-center justify-center'>
				{/* <CheckIcon /> */}
			</Select.ItemIndicator>
		</Select.Item>
	)
})

export default SelectDemo
