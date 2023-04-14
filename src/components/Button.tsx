import React from 'react'
import { Link, To } from 'react-router-dom'

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
	text: React.ReactNode
	onClick?: () => void
	type?: 'button' | 'submit' | 'reset' | undefined
	variant: 'fill' | 'outline'
	className?: string
	href?: To
}

export const Button = ({
	onClick,
	text,
	type,
	variant,
	className,
	href,
	...buttonProps
}: ButtonProps) => {
	return (
		<>
			{href ? (
				<Link
					to={href}
					className={`rounded-sm px-11 text-sm font-medium uppercase tracking-wider text-white transition active:scale-95 md:text-base ${
						variant === 'fill'
							? 'bg-wustomers-blue py-2 hover:scale-[1.01] hover:bg-wustomers-blue/90 hover:shadow-xl hover:shadow-wustomers-blue/20'
							: variant === 'outline'
							? 'border-2 border-wustomers-blue py-[6.5px] hover:scale-[1.01] hover:bg-wustomers-blue/5'
							: ''
					} ${className}`}
				>
					{text}
				</Link>
			) : (
				<button
					type={type ?? 'button'}
					onClick={onClick}
					className={`flex items-center justify-center rounded-sm px-11 font-medium uppercase tracking-wider text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-wustomers-blue/10 ${
						variant === 'fill'
							? 'bg-wustomers-blue py-2 hover:scale-[1.01] hover:bg-wustomers-blue/90 disabled:hover:scale-100 disabled:hover:shadow-none lg:hover:shadow-xl lg:hover:shadow-wustomers-blue/20'
							: variant === 'outline'
							? 'border-2 border-wustomers-blue py-[6.5px] text-wustomers-blue hover:scale-[1.01] hover:bg-wustomers-blue/5 disabled:hover:scale-100'
							: ''
					} ${className}`}
					{...buttonProps}
				>
					{text}
				</button>
			)}
		</>
	)
}
