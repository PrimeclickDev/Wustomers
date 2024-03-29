import { useLogout } from 'api/hooks/auth/useLogout'
import { ReactComponent as CampaignMetricIcon } from 'assets/icons/activity-outline.svg'
import { ReactComponent as CampaignMetricFillIcon } from 'assets/icons/activity.svg'
import { ReactComponent as CampaignFillIcon } from 'assets/icons/campaigns-fill.svg'
import { ReactComponent as CampaignIcon } from 'assets/icons/campaigns.svg'
import { ReactComponent as Close } from 'assets/icons/close-square.svg'
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg'
import { ReactComponent as OverviewFillIcon } from 'assets/icons/overview-fill.svg'
import { ReactComponent as OverviewIcon } from 'assets/icons/overview.svg'
import { ReactComponent as ProfileOutlineIcon } from 'assets/icons/profile-outline.svg'
import { ReactComponent as SettingsIcon } from 'assets/icons/setting.svg'
import { ReactComponent as SettingsFillIcon } from 'assets/icons/settings-fill.svg'
import { ReactComponent as UserIcon } from 'assets/icons/useredit.svg'
import { useScrollLock } from 'hooks/useScrollLock'
import { useState } from 'react'

import { NavLink } from 'react-router-dom'
import { Button } from './Button'
import { Modal } from './Modal'
import { Spinner } from './Spinner'
import { WustomersLogo } from './WustomersLogo'

type SidebarProps = {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	isOpen: boolean
}

const dashboardNavs = [
	{
		title: 'user',
		routes: [
			{
				name: 'Overview',
				link: 'overview',
				icon: <OverviewIcon />,
				activeIcon: <OverviewFillIcon />,
			},
			{
				name: 'Campaigns',
				link: 'campaigns',
				icon: <CampaignIcon />,
				activeIcon: <CampaignFillIcon />,
			},
			{
				name: 'Campaign metrics',
				link: 'campaigns-metrics',
				icon: <CampaignMetricIcon />,
				activeIcon: <CampaignMetricFillIcon width={20} height={20} />,
			},
			{
				name: 'Account update',
				link: 'account-update',
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
				link: 'settings',
				icon: <SettingsIcon />,
				activeIcon: <SettingsFillIcon />,
			},
			// {
			// 	name: 'Support',
			// 	link: 'support',
			// 	icon: <SupportIcon />,
			// 	activeIcon: <SupportFillIcon />,
			// },
		],
	},
]

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
	useScrollLock({ isOpen })
	const [modalOpen, setModalOpen] = useState(false)
	const { mutate, isLoading } = useLogout()

	const openModal = () => setModalOpen(true)
	const closeModal = () => setModalOpen(false)
	const logout = () => mutate()
	return (
		<>
			{/* mobile overlay */}
			<div
				aria-hidden='true'
				onClick={() => setIsOpen(false)}
				className={`absolute inset-0 z-30 min-h-screen w-full bg-[rgba(47,47,47,0.9)] transition-all backdrop:blur-sm lg:hidden ${
					isOpen ? 'block' : 'hidden'
				}`}
			/>
			<aside
				className={`absolute left-0 top-0 z-50 h-screen w-64 flex-col bg-white transition lg:sticky lg:top-0 lg:left-0 lg:flex lg:w-auto lg:self-start ${
					isOpen
						? 'lg:transition-y-0 -translate-x-0'
						: '-translate-x-full lg:translate-x-0'
				}`}
			>
				<header className='hidden bg-wustomers-blue-light/5 py-5 pl-4 pr-8 lg:block lg:px-10'>
					<WustomersLogo className='text-wustomers-blue' />
				</header>

				<nav className='grid h-full pt-6 pb-10'>
					<div className='mt-7 md:mt-0'>
						{dashboardNavs.map(nav => (
							<div
								key={nav.title}
								className={`px-4 ${
									nav.title === 'settings' &&
									'mt-10 border-t border-t-wustomers-dark-gray pt-2'
								}`}
							>
								<ul className='flex flex-col gap-2'>
									{nav.routes.map(route => (
										<li key={route.name}>
											<NavLink
												to={route.link}
												onClick={() => setIsOpen(false)}
												className={({ isActive }) =>
													`flex items-center gap-3 rounded-sx py-3 px-4 capitalize transition-all ${
														isActive
															? 'bg-[#E6EAF9] fill-wustomers-blue font-medium text-wustomers-blue'
															: 'bg-white fill-transparent font-normal text-wustomers-gray hover:text-wustomers-blue-light'
													}`
												}
											>
												{({ isActive }) => (
													<>
														{isActive
															? route.activeIcon
															: route.icon}
														<span>{route.name}</span>
													</>
												)}
											</NavLink>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
					<button
						onClick={openModal}
						type='button'
						className='flex w-full items-center gap-3 self-end rounded border-y border-y-wustomers-dark-gray py-4 px-6 capitalize text-wustomers-gray transition-all hover:text-red-600'
					>
						<LogoutIcon width={20} height={20} />
						<p>Log out</p>
					</button>
				</nav>

				<button
					type='button'
					onClick={() => setIsOpen(false)}
					className='absolute right-2 top-2 rounded bg-wustomers-blue text-lg text-white lg:hidden'
				>
					<Close />
					<span className='sr-only'>close mobile menu</span>
				</button>
			</aside>

			<Modal modalOpen={modalOpen} closeModal={closeModal}>
				<div className='flex flex-col items-center text-center'>
					<h3 className='max-w-[20ch] pt-2 text-xl font-medium'>
						Are you sure you want to log out of your account?
					</h3>

					<div className='mt-6 flex flex-col items-center gap-3 md:mx-8 md:flex-row md:gap-5'>
						<Button
							variant='outline'
							onClick={closeModal}
							text='No, Cancel'
							className='px-8 normal-case hover:shadow-none'
						/>
						<Button
							disabled={isLoading}
							text={
								isLoading ? (
									<Spinner className='text-white' />
								) : (
									'Yes, Logout'
								)
							}
							variant='fill'
							className='py-2 px-8 normal-case'
							onClick={logout}
						/>
					</div>
				</div>
			</Modal>
		</>
	)
}
