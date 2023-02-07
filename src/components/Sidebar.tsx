import { ReactComponent as CampaignMetricIcon } from 'assets/icons/activity-outline.svg'
import { ReactComponent as CampaignMetricFillIcon } from 'assets/icons/activity.svg'
import { ReactComponent as CampaignFillIcon } from 'assets/icons/campaigns-fill.svg'
import { ReactComponent as CampaignIcon } from 'assets/icons/campaigns.svg'
import { ReactComponent as SupportFillIcon } from 'assets/icons/information-fill.svg'
import { ReactComponent as SupportIcon } from 'assets/icons/information.svg'
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg'
import { ReactComponent as OverviewFillIcon } from 'assets/icons/overview-fill.svg'
import { ReactComponent as OverviewIcon } from 'assets/icons/overview.svg'
import { ReactComponent as ProfileOutlineIcon } from 'assets/icons/profile-outline.svg'
import { ReactComponent as SettingsIcon } from 'assets/icons/setting.svg'
import { ReactComponent as SettingsFillIcon } from 'assets/icons/settings-fill.svg'
import { ReactComponent as UserIcon } from 'assets/icons/useredit.svg'

import { NavLink, useLocation } from 'react-router-dom'
import { WustomersLogo } from './WustomersLogo'

export const Sidebar = () => {
	const location = useLocation()
	const dashboardNavs = [
		{
			title: 'user',
			routes: [
				{
					name: 'Overview',
					link: '/dashboard',
					icon: <OverviewIcon />,
					activeIcon: <OverviewFillIcon />,
				},
				{
					name: 'Campaigns',
					link: '/dashboard/campaigns',
					icon: <CampaignIcon />,
					activeIcon: <CampaignFillIcon />,
				},
				{
					name: 'Campaign metrics',
					link: '/dashboard/campaigns-metrics',
					icon: <CampaignMetricIcon />,
					activeIcon: <CampaignMetricFillIcon width={20} height={20} />,
				},
				{
					name: 'Account update',
					link: '/dashboard/account-update',
					icon: <ProfileOutlineIcon />,
					activeIcon: <UserIcon width={20} height={20} />,
				},
			],
		},
		{
			title: 'settings',
			routes: [
				{
					name: 'Settings',
					link: '/dashboard/settings',
					icon: <SettingsIcon />,
					activeIcon: <SettingsFillIcon />,
				},
				{
					name: 'Support',
					link: '/dashboard/support',
					icon: <SupportIcon />,
					activeIcon: <SupportFillIcon />,
				},
			],
		},
	]

	return (
		<aside className='shadow-xl'>
			<header className='bg-wustomers-blue-light/5 px-10 py-5'>
				<WustomersLogo className='text-wustomers-blue' />
			</header>

			<nav className='pt-6 pb-10'>
				{dashboardNavs.map(nav => (
					<div
						key={nav.title}
						className={`px-4 ${
							nav.title === 'settings' &&
							'mt-10 border-t border-t-[#D5D5D5] pt-2'
						}`}
					>
						{/* <h3 key={nav.title}>{nav.title}</h3> */}
						<ul className='flex flex-col gap-2'>
							{nav.routes.map(route => (
								<li key={route.name}>
									<NavLink
										to={route.link}
										className={`flex items-center gap-3 rounded-sx py-3 px-4 capitalize transition-all ${
											location.pathname === route.link
												? 'bg-[#E6EAF9] fill-wustomers-blue font-medium text-wustomers-blue'
												: 'bg-white fill-transparent font-normal text-wustomers-gray hover:text-wustomers-blue-light'
										}`}
									>
										{location.pathname === route.link
											? route.activeIcon
											: route.icon}
										<span>{route.name}</span>
									</NavLink>
								</li>
							))}
						</ul>
					</div>
				))}
				<button className='mt-24 flex w-full items-center gap-3 rounded border-y border-y-[#D5D5D5] py-4 px-5 capitalize text-wustomers-gray transition-all hover:text-wustomers-blue'>
					<LogoutIcon width={20} height={20} />
					<p>Log out</p>
				</button>
			</nav>
		</aside>
	)
}
