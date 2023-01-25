import { WustomersLogo } from 'assets/icons/WustomersLogo'
import { Link, NavLink } from 'react-router-dom'
import { Button } from './Button'

export const Header = () => {
	const navs = [
		{
			name: 'home',
			link: '/',
		},
		{
			name: 'pricing',
			link: '/pricing',
		},
		{
			name: 'contact',
			link: '/contact',
		},
	]
	return (
		<div className='border-b border-b-wustomers-primary-light'>
			<header className='mx-auto flex max-w-screen-xl items-center justify-between px-2 py-4'>
				<nav className='flex items-center gap-20'>
					<Link
						to='/'
						className='flex items-center gap-2 text-2xl font-bold text-wustomers-blue'
					>
						<WustomersLogo />
						<h1>Wustomers</h1>
					</Link>

					<ul className='flex items-center gap-11'>
						{navs?.map(nav => (
							<li key={nav.name} className='capitalize'>
								<NavLink
									to={nav.link}
									className={({ isActive }) =>
										isActive
											? 'font-bold text-wustomers-blue'
											: 'transition-colors hover:text-wustomers-blue'
									}
								>
									{nav.name}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>

				<div className='flex items-center gap-5'>
					<Button text='Login' type='button' variant='outline' />
					<Button text='Sign up' type='button' variant='fill' />
				</div>
			</header>
		</div>
	)
}
