import { ReactComponent as Call } from 'assets/icons/call.svg'
import { ReactComponent as Close } from 'assets/icons/close-square.svg'
import { ReactComponent as Home } from 'assets/icons/home.svg'
import { ReactComponent as Menu } from 'assets/icons/menu.svg'
import { ReactComponent as Money } from 'assets/icons/money-change.svg'
import { useScrollLock } from 'hooks/useScrollLock'
import useToggle from 'hooks/useToggle'

import { NavLink } from 'react-router-dom'
import { getAccessToken } from 'utils/storage'
import { Button } from './Button'
import { WustomersLogo } from './WustomersLogo'

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

export const Header = () => {
	const [isOpen, toggle] = useToggle(false)
	useScrollLock({ isOpen })
	const token = getAccessToken()

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
					{!token ? (
						<>
							<Button
								text='Login'
								type='button'
								variant='outline'
								href='/login'
								className='text-wustomers-blue'
							/>
							<Button
								text='Sign up'
								type='button'
								variant='fill'
								href='/signup'
							/>
						</>
					) : (
						<Button
							text='dashboard'
							type='button'
							variant='fill'
							href='/dashboard'
						/>
					)}
				</div>

				{/* mobile menu */}
				<button className='lg:hidden' onClick={toggle}>
					<Menu />
					<span className='sr-only'>open menu</span>
				</button>

				{/* overlay */}
				<div
					aria-hidden='true'
					onClick={toggle}
					className={`absolute inset-0 z-50 min-h-screen w-full bg-[rgba(47,47,47,0.9)] transition-all backdrop:blur-sm ${
						isOpen ? 'block' : 'hidden'
					}`}
				/>

				<div
					className={`absolute left-0 top-0 z-50 flex h-screen w-64 flex-col bg-wustomers-blue px-7 pt-28 pb-10 text-white shadow-2xl transition lg:hidden ${
						isOpen ? 'translate-x-0' : '-translate-x-full'
					}`}
				>
					<ul className='flex flex-col items-center gap-8 font-bold'>
						{navs?.map(nav => (
							<li
								key={nav.name}
								className='flex w-full items-center justify-center border-b border-b-wustomers-blue-light pb-2 capitalize'
							>
								<NavLink
									to={nav.link}
									onClick={toggle}
									className='flex items-center gap-4'
								>
									{nav.name}
								</NavLink>
							</li>
						))}
					</ul>

					<div className='mt-20 flex flex-col gap-4'>
						{!token ? (
							<>
								<Button
									text='Login'
									variant='outline'
									href='/login'
									className='border-white py-3 text-center text-white'
								/>
								<Button
									text='Sign up'
									variant='fill'
									href='/signup'
									className='!bg-white py-3 text-center text-wustomers-blue hover:bg-white'
								/>
							</>
						) : (
							<Button
								text='Dashboard'
								variant='fill'
								href='/dashboard'
								className='!bg-white py-3 px-1 text-center text-wustomers-blue hover:bg-white'
							/>
						)}
					</div>

					<button
						onClick={toggle}
						className='absolute top-5 right-3 z-50 rounded-md bg-wustomers-blue-light p-1 text-white'
					>
						<Close />
						<span className='sr-only'>close menu</span>
					</button>
				</div>
			</header>
		</div>
	)
}
