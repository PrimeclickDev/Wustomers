import { ReactComponent as Logo } from 'assets/icons/logo.svg'
import { Link } from 'react-router-dom'

type WustomersLogoProps = {
	className: string
}

export const WustomersLogo = ({ className }: WustomersLogoProps) => {
	return (
		<Link
			to='/'
			className={`flex items-center gap-2 text-2xl font-bold ${className}`}
		>
			<Logo width={36} height={32} />
			<h1 className='hidden md:block'>Wustomers</h1>
		</Link>
	)
}
