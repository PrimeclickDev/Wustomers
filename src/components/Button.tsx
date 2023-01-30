import { Link, To } from 'react-router-dom'

type ButtonProps = {
	text: string
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
}: ButtonProps) => {
	return (
		<>
			{href ? (
				<Link
					to={href}
					className={`flex w-max rounded-sm px-11 text-sm font-medium uppercase tracking-wider text-white transition active:scale-95 md:text-base ${
						variant === 'fill'
							? 'bg-wustomers-blue py-2 hover:scale-[1.01] hover:bg-wustomers-blue/90 hover:shadow-xl hover:shadow-wustomers-blue/20'
							: variant === 'outline'
							? 'border-2 border-wustomers-blue py-[6px] text-wustomers-blue hover:scale-[1.01] hover:bg-wustomers-blue/5'
							: ''
					} ${className}`}
				>
					{text}
				</Link>
			) : (
				<button
					type={type}
					onClick={onClick}
					className={`rounded-sm px-11 font-medium uppercase tracking-wider text-white transition active:scale-[0.98] ${
						variant === 'fill'
							? 'bg-wustomers-blue py-2 hover:scale-[1.01] hover:bg-wustomers-blue/90 hover:shadow-xl hover:shadow-wustomers-blue/20'
							: variant === 'outline'
							? 'border-2 border-wustomers-blue py-[6px] text-wustomers-blue hover:scale-[1.01] hover:bg-wustomers-blue/5'
							: ''
					} ${className}`}
				>
					{text}
				</button>
			)}
		</>
	)
}
