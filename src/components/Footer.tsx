import { ReactComponent as Call } from 'assets/icons/call.svg'
import { ReactComponent as Contact } from 'assets/icons/contact.svg'
import { ReactComponent as Facebook } from 'assets/icons/facebook.svg'
import { ReactComponent as Instagram } from 'assets/icons/instagram.svg'
import { ReactComponent as Linkedln } from 'assets/icons/linkedln.svg'
import { ReactComponent as Location } from 'assets/icons/location.svg'
import { ReactComponent as Twitter } from 'assets/icons/twitter.svg'
import AppleStore from 'assets/images/app-store.png'
import GooglePlay from 'assets/images/google-play.png'
import { Link } from 'react-router-dom'
import { WustomersLogo } from './WustomersLogo'

export const Footer = () => {
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

	const contacts = [
		{
			icon: <Contact />,
			text: 'support@wustomers.com',
			link: 'mailto:support@wustomers.com',
		},
		{
			icon: <Call />,
			text: '(+234) 812 014 8527',
			link: 'tel:+2348120148527',
		},
		{
			icon: <Location />,
			text: '55a, Lafiaji way, Dolphin Estate Ikoyi, Lagos state.',
			link: '',
		},
	]

	const socials = [
		{
			icon: <Facebook />,
		},
		{
			icon: <Instagram />,
		},
		{
			icon: <Twitter />,
		},
		{
			icon: <Linkedln />,
		},
	]
	return (
		<footer className='mt-auto bg-wustomers-blue'>
			<div className='mx-auto max-w-screen-xl px-2 pt-10 lg:pt-16'>
				<div className='items-center justify-between border-b border-b-[#9CAAE9] pb-12 md:flex'>
					<h3 className='text-center text-2xl font-bold text-white md:text-left lg:max-w-[30ch] lg:text-4xl'>
						Look forward to our amazing mobile app that would be used to
						serve you better.
					</h3>

					<div className='flex items-center justify-center gap-5 pt-5 lg:justify-start lg:pt-0'>
						<button type='button'>
							<img
								src={AppleStore}
								alt='download app from app store badge'
								className='w-40'
							/>
						</button>
						<button type='button'>
							<img
								src={GooglePlay}
								alt='download app from google play store badge'
								className='w-40'
							/>
						</button>
					</div>
				</div>

				<div className='flex flex-col items-center py-10 text-center text-white md:justify-between md:gap-5 lg:flex-row lg:items-start lg:gap-0 lg:text-left'>
					<div>
						<WustomersLogo className='text-white' />
						<p className='w-52 py-4 text-sm'>
							Broaden your marketing beyond borders with little budget
						</p>
					</div>

					<ul className='mt-5 flex items-center gap-8 lg:mt-0'>
						{navs?.map(nav => (
							<li key={nav.name} className='link-hover capitalize'>
								<Link to={nav.link}>{nav.name}</Link>
							</li>
						))}
					</ul>

					<div className='w-72'>
						<ul className='mt-8 flex items-center justify-center gap-6 lg:mt-0 lg:justify-start'>
							{socials?.map((social, index) => (
								<li key={index}>
									<a
										href='#'
										className='flex h-10 w-10 items-center justify-center rounded-full bg-[#8394E3] transition hover:bg-white hover:text-wustomers-blue'
									>
										{social.icon}
									</a>
								</li>
							))}
						</ul>

						<ul className='mt-10 flex flex-col items-center gap-5 lg:mt-7 lg:items-start'>
							{contacts?.map(contact => (
								<li
									key={contact.text}
									className='flex items-center gap-3'
								>
									{contact.icon}
									{contact.link ? (
										<a href={contact.link} className='link-hover'>
											{contact.text}
										</a>
									) : (
										<span className='max-w-[20ch]'>
											{contact.text}
										</span>
									)}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			<div className='border-t-wustomers-border-color-two border-t py-5 px-2'>
				<p className='text-center text-white'>
					&copy; Wustomers {new Date().getFullYear()}
				</p>
			</div>
		</footer>
	)
}
