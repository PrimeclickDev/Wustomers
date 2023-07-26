import { ReactComponent as Logo } from 'assets/icons/logo.svg'
import { Link } from 'react-router-dom'

type WustomersLogoProps = {
	className: string
	to?: string
}

export const WustomersLogo = ({ className, to }: WustomersLogoProps) => {
	return (
		<Link
			to={to ?? '/overview'}
			className={`flex items-center justify-center gap-2 text-2xl font-bold md:justify-start ${className}`}
		>
			<Logo width={36} height={32} />
			<h1 className=''>Wustomers</h1>
		</Link>
	)
}
