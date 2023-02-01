import { NavLink } from 'react-router-dom'
import { Button } from './Button'
import { WustomersLogo } from './WustomersLogo'

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
			<header className='mx-auto flex max-w-screen-xl items-center justify-between px-3 py-3 lg:px-2'>
				<nav className='flex items-center gap-20'>
					<WustomersLogo className='text-wustomers-blue' />

					<ul className='hidden items-center gap-11 lg:flex'>
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

				<div className='hidden items-center gap-5 lg:flex'>
					<Button
						text='Login'
						type='button'
						variant='outline'
						href='/login'
					/>
					<Button
						text='Sign up'
						type='button'
						variant='fill'
						href='/signup'
					/>
				</div>
			</header>
		</div>
	)
}
