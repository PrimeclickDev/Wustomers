import { ReactComponent as NotificationIcon } from 'assets/icons/notification.svg'
import { ReactComponent as ProfileIcon } from 'assets/icons/profile.svg'
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg'
import { Link } from 'react-router-dom'

export const DashboardHeader = () => {
	return (
		<div className='flex items-center gap-44 bg-white px-10 py-3'>
			<form className='relative flex-1'>
				<input
					type='search'
					name='search'
					placeholder='Search for anything'
					className='w-full rounded-sx bg-[#F3F4FC] py-3 pl-6 pr-14'
				/>
				<SearchIcon className='absolute top-1/2 right-0 mr-6 -translate-y-1/2' />
			</form>

			<div className='flex items-center gap-5 text-wustomers-blue'>
				<Link
					to='/dashboard/notifications'
					className='grid h-10 w-10 place-items-center rounded-full bg-[#F3F4FC] transition-colors hover:bg-wustomers-blue hover:text-white'
				>
					<NotificationIcon />
					<span className='sr-only'>notifications</span>
				</Link>
				<button className='grid h-10 w-10 place-items-center rounded-full bg-[#F3F4FC] transition-colors hover:bg-wustomers-blue hover:text-white'>
					<ProfileIcon />
					<span className='sr-only'>profile</span>
				</button>
			</div>
		</div>
	)
}
