/* eslint-disable react/display-name */
import * as RadixAccordion from '@radix-ui/react-accordion'
import { ReactComponent as ArrowIcon } from 'assets/icons/chevron-left.svg'
import React, { PropsWithChildren } from 'react'

// type AccordionProps = PropsWithChildren & RadixAccordion.

export const AccordionItem: React.ForwardRefExoticComponent<
	RadixAccordion.AccordionItemProps & React.RefAttributes<HTMLDivElement>
> = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
	<RadixAccordion.Item
		className={`mt-2 overflow-hidden border-0 border-b border-b-wustomers-neutral-dark pb-2 outline-none first:mt-0  last:border-0 focus-visible:z-10 focus-visible:shadow-[0_2px_10px] ${className}`}
		{...props}
		ref={forwardedRef}
	>
		{children}
	</RadixAccordion.Item>
))

export const AccordionTrigger: React.ForwardRefExoticComponent<
	RadixAccordion.AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>
> = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
	<RadixAccordion.Header className='flex'>
		<RadixAccordion.Trigger
			className={`group flex w-full cursor-pointer items-center justify-between gap-5 p-2 leading-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${className}`}
			{...props}
			ref={forwardedRef}
		>
			{children}
			<ArrowIcon
				className='ease-[cubic-bezier(0.87, 0, 0.13, 1)] transition-transform duration-300 group-data-[state=open]:rotate-90'
				aria-hidden
			/>
		</RadixAccordion.Trigger>
	</RadixAccordion.Header>
))

export const AccordionContent: React.ForwardRefExoticComponent<
	RadixAccordion.AccordionContentProps & React.RefAttributes<HTMLDivElement>
> = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
	<RadixAccordion.Content
		className={`mt-1 overflow-hidden rounded-sx bg-[#2A2A2A] text-sm font-normal data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp ${className}`}
		{...props}
		ref={forwardedRef}
	>
		<div className='py-[15px] px-2 md:px-5'>{children}</div>
	</RadixAccordion.Content>
))

export const Accordion = ({ children }: PropsWithChildren) => {
	return (
		<RadixAccordion.Root
			className='shadow-[0_2px_10px] shadow-black/5'
			type='multiple'
			// defaultValue='item-1'
			// collapsible
		>
			{children}
		</RadixAccordion.Root>
	)
}
