import { ReactComponent as Logo } from 'assets/icons/logo.svg'
import { ReactComponent as Menu } from 'assets/icons/menu.svg'
import { ReactComponent as NotificationIcon } from 'assets/icons/notification.svg'
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg'
import { Link, NavLink } from 'react-router-dom'

type DashboardHeaderProps = {
	toggle: () => void
}

export const DashboardHeader = ({ toggle }: DashboardHeaderProps) => {
	return (
		<div className='flex items-center justify-between bg-white px-4 py-3 lg:gap-44 lg:px-10'>
			{/* for mobile view */}
			<div className='flex items-center gap-2 lg:hidden'>
				<button
					onClick={toggle}
					type='button'
					className='p-1 text-2xl lg:hidden'
				>
					<Menu />
					<span className='sr-only'>open mobile menu</span>
				</button>
			</div>
			<Link
				to='/overview'
				className='flex items-center gap-2 self-center lg:hidden'
			>
				<Logo width={24} height={22} className='text-wustomers-blue' />
				<h1 className='text-lg font-black text-wustomers-blue'>
					Wustomers
				</h1>
			</Link>

			<form
				className='relative hidden lg:block lg:flex-1'
				onSubmit={e => e.preventDefault()}
			>
				<input
					type='search'
					name='search'
					placeholder='Search for anything'
					className='w-full rounded-sx bg-wustomers-primary py-3 pl-6 pr-14'
				/>
				<SearchIcon className='absolute top-1/2 right-0 mr-6 -translate-y-1/2 text-[#ACACAC]' />
			</form>

			<div className='flex items-center gap-5 text-wustomers-blue'>
				<NavLink
					to='notifications'
					className={({ isActive }) =>
						`grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-wustomers-blue hover:text-white ${
							isActive
								? 'bg-wustomers-blue text-white'
								: 'bg-wustomers-primary'
						}`
					}
				>
					<NotificationIcon />
					<span className='sr-only'>notifications</span>
				</NavLink>
			</div>
		</div>
	)
}
