type ButtonProps = {
	text: string
	onClick?: () => void
	type: 'button' | 'submit' | 'reset' | undefined
	variant: 'fill' | 'outline'
	className?: string
}
export const Button = ({
	onClick,
	text,
	type,
	variant,
	className,
}: ButtonProps) => {
	return (
		<>
			<button
				type={type}
				onClick={onClick}
				className={`rounded-[3px] px-11 font-medium uppercase tracking-wider text-white transition-all active:scale-95 ${
					variant === 'fill'
						? 'bg-wustomers-blue py-2 hover:bg-wustomers-blue/90'
						: variant === 'outline'
						? 'border-2 border-wustomers-blue py-[6px] text-wustomers-blue hover:bg-wustomers-blue/5'
						: ''
				} ${className}`}
			>
				{text}
			</button>
		</>
	)
}
