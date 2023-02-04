import { ReactComponent as Call } from 'assets/icons/call.svg'
import { ReactComponent as Close } from 'assets/icons/close-square.svg'
import { ReactComponent as Home } from 'assets/icons/home.svg'
import { ReactComponent as Login } from 'assets/icons/login.svg'
import { ReactComponent as Menu } from 'assets/icons/menu.svg'
import { ReactComponent as Money } from 'assets/icons/money-change.svg'
import { ReactComponent as Register } from 'assets/icons/people.svg'

import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from './Button'
import { WustomersLogo } from './WustomersLogo'

export const Header = () => {
	const [scrolled, setScrolled] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const navs = [
		{
			name: 'home',
			link: '/',
			icon: <Home width={18} height={18} />,
		},
		{
			name: 'pricing',
			link: '/pricing',
			icon: <Money width={18} height={18} />,
		},
		{
			name: 'contact',
			link: '/contact',
			icon: <Call width={18} height={18} />,
		},
	]

	// const handleScroll = () => {
	// 	const offset = window.scrollY
	// 	if (offset > 50) {
	// 		setScrolled(true)
	// 	} else {
	// 		setScrolled(false)
	// 	}
	// }

	// useEffect(() => {
	// 	window.addEventListener('scroll', handleScroll)

	// 	return () => window.removeEventListener('scroll', handleScroll)
	// }, [])

	return (
		<div className='fixed top-0 left-0 z-50 w-full border-b-[1.5px] border-b-wustomers-primary-light bg-white'>
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

				{/* mobile menu */}
				<button className='lg:hidden' onClick={() => setIsOpen(true)}>
					<Menu />
					<span className='sr-only'>menu</span>
				</button>

				{/* overlay */}
				<div
					aria-hidden='true'
					onClick={() => setIsOpen(false)}
					className={`absolute inset-0 z-50 min-h-screen w-full bg-wustomers-blue-light/30 transition-all ${
						isOpen ? 'block' : 'hidden'
					}`}
				/>

				<div
					className={`absolute right-0 top-0 z-50 h-screen w-64 bg-wustomers-blue py-20 px-7 text-white shadow-2xl transition lg:hidden ${
						isOpen ? 'translate-x-0' : 'translate-x-full'
					}`}
				>
					<ul className='flex flex-col items-end gap-8 font-bold'>
						{navs?.map(nav => (
							<li key={nav.name} className='capitalize'>
								<NavLink
									to={nav.link}
									onClick={() => setIsOpen(false)}
									className='flex items-center gap-4'
								>
									{nav.name}
									<span className='rounded-md bg-wustomers-blue-light p-2'>
										{nav.icon}
									</span>
								</NavLink>
							</li>
						))}
						<li className='capitalize'>
							<NavLink to='/login' className='flex items-center gap-4'>
								Login
								<span className='rounded-md bg-wustomers-blue-light p-2'>
									<Login width={18} height={18} />
								</span>
							</NavLink>
						</li>
						<li className='capitalize'>
							<NavLink to='/login' className='flex items-center gap-4'>
								Signup
								<span className='rounded-md bg-wustomers-blue-light p-2'>
									<Register width={18} height={18} />
								</span>
							</NavLink>
						</li>
					</ul>

					<button
						onClick={() => setIsOpen(false)}
						className='absolute top-3 left-3 z-50 rounded-md bg-wustomers-blue-light p-2 text-white'
					>
						<Close />
						<span className='sr-only'>close menu</span>
					</button>
				</div>
			</header>
		</div>
	)
}
