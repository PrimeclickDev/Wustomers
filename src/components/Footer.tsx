import { ReactComponent as Call } from 'assets/icons/call.svg'
import { ReactComponent as Contact } from 'assets/icons/contact.svg'
import { ReactComponent as Facebook } from 'assets/icons/facebook.svg'
import { ReactComponent as Instagram } from 'assets/icons/instagram.svg'
import { ReactComponent as Linkedln } from 'assets/icons/linkedln.svg'
import { ReactComponent as Location } from 'assets/icons/location.svg'
import { ReactComponent as Twitter } from 'assets/icons/twitter.svg'
import { WustomersLogo } from 'assets/icons/WustomersLogo'
import AppleStore from 'assets/images/app-store.png'
import GooglePlay from 'assets/images/google-play.png'
import { Link } from 'react-router-dom'

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
			<div className='mx-auto max-w-screen-xl px-2 pt-12'>
				<div className='flex items-center justify-between border-b border-b-[#9CAAE9] pb-12'>
					<h3 className='max-w-3xl text-4xl font-bold text-white'>
						Look forward to our amazing mobile app that would be used to
						serve you better.
					</h3>

					<div className='flex items-center gap-5'>
						<button type='button'>
							<img
								src={AppleStore}
								alt='download app from app store badge'
								className='w-36'
							/>
						</button>
						<button type='button'>
							<img
								src={GooglePlay}
								alt='download app from google play store badge'
								className='w-36'
							/>
						</button>
					</div>
				</div>

				<div className='flex items-start justify-between py-10 text-white'>
					<div>
						<Link
							to='/'
							className='flex items-center gap-2 text-2xl font-bold text-white'
						>
							<WustomersLogo fill='#fff' />
							<p>Wustomers</p>
						</Link>
						<p className='w-52 py-4 text-sm'>
							Broaden your marketing beyond borders with little budget
						</p>
					</div>

					<ul className='flex items-center gap-8'>
						{navs?.map(nav => (
							<li key={nav.name} className='capitalize'>
								<Link to={nav.link}>{nav.name}</Link>
							</li>
						))}
					</ul>

					<div className='w-72'>
						<ul className='flex items-center gap-6'>
							{socials?.map((social, index) => (
								<li key={index}>
									<a
										href='#'
										className='flex h-10 w-10 items-center justify-center rounded-full bg-[#8394E3]'
									>
										{social.icon}
									</a>
								</li>
							))}
						</ul>

						<ul className='mt-7 flex flex-col gap-5'>
							{contacts?.map(contact => (
								<li
									key={contact.text}
									className='flex items-center gap-3'
								>
									{contact.icon}
									{contact.link ? (
										<a href={contact.link}>{contact.text}</a>
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

			<div className='border-t border-t-wustomers-border-color-two py-5 px-2'>
				<p className='text-center text-white'>
					&copy; Wustomers {new Date().getFullYear()}
				</p>
			</div>
		</footer>
	)
}
