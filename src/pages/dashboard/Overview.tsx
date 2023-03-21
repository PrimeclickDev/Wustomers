import { useFetchProfile } from 'api/hooks/profile/useFetchProfile'
import { ReactComponent as ChartSquareIcon } from 'assets/icons/chartsquare.svg'
import { ReactComponent as Instagram } from 'assets/icons/instagram.svg'
import { ReactComponent as Mail } from 'assets/icons/mail.svg'
import { ReactComponent as MonitorIcon } from 'assets/icons/monitormobile.svg'
import { ReactComponent as ActivityIcon } from 'assets/icons/overview-activity.svg'
import { ReactComponent as Twitter } from 'assets/icons/twitter.svg'
import { ReactComponent as Whatsapp } from 'assets/icons/whatsapp.svg'
import testImg from 'assets/images/test-img.jpg'
import { Spinner } from 'components/Spinner'
import { usePageTitle } from 'hooks/usePageTitle'

const summaries = [
	{
		id: 1,
		title: 'Total No. of Campaign pages',
		number: 40,
		icon: <MonitorIcon />,
	},
	{
		id: 2,
		title: 'Total No. of Visits',
		number: 240,
		icon: <ActivityIcon width={32} height={32} />,
	},
	{
		id: 3,
		title: 'Total No. of Contacts',
		number: 200,
		icon: <ChartSquareIcon />,
	},
]

const accounts = [
	{
		icon: <Instagram />,
		name: 'Instagram',
		link: true,
	},
	{
		icon: <Twitter />,
		name: 'Twitter',
		link: true,
	},
	{
		icon: <Whatsapp />,
		name: 'Whatsapp',
		link: true,
	},
	{
		icon: <Mail />,
		name: 'Email',
		link: false,
	},
]
const Overview = () => {
	usePageTitle('Dashboard')
	const { data: profile, isLoading } = useFetchProfile()

	return (
		<>
			<h2 className='flex items-center gap-2 text-3xl font-black'>
				Hi,{' '}
				<span>
					{isLoading ? (
						<Spinner />
					) : (
						profile?.data.data.profile.user.first_name
					)}
				</span>
			</h2>

			<div className='mt-10 grid gap-4 lg:grid-cols-3 lg:gap-10'>
				{summaries.map(summary => (
					<div
						key={summary.id}
						className='relative rounded-sx border-l-[10px] border-l-wustomers-blue-other bg-wustomers-blue p-5 text-white'
					>
						<p className='text-lg font-medium'>{summary.title}</p>
						<h3 className='py-4 text-6xl font-bold'>{summary.number}</h3>

						<div className='absolute bottom-4 right-7 text-[#B5BFEF]'>
							{summary.icon}
						</div>
					</div>
				))}
			</div>

			<div className='mt-10 gap-10 lg:grid lg:grid-cols-5'>
				<div className='col-span-3 rounded-sx'>
					<h3 className='bg-wustomers-primary py-3 px-7 text-lg font-medium text-wustomers-main'>
						Previous campaigns
					</h3>

					<ul>
						<li className='flex flex-wrap items-center gap-x-5 bg-white py-3 px-5 lg:justify-between'>
							<div className='flex items-center gap-4'>
								<img src={testImg} alt='campaign' />
								<p>Campaign page</p>
							</div>

							<p>12, Nov. 2022</p>
							<p className='flex items-center gap-3 text-green-600'>
								<span className='h-3 w-3 rounded-full bg-green-600' />
								<span>Active</span>
							</p>
						</li>
					</ul>
				</div>

				<div className='col-span-2 mt-5 rounded-sx lg:mt-0'>
					<h3 className='bg-wustomers-primary py-3 px-7 text-lg font-medium text-wustomers-main'>
						Linked accounts
					</h3>

					<ul>
						{accounts.map((account, index) => (
							<li
								key={index}
								className='flex items-center justify-between border-b border-b-[#EAEAEA] bg-white py-2.5 px-4 last-of-type:border-0'
							>
								<div className='flex items-center gap-2'>
									{account.icon}
									<p>{account.name}</p>
								</div>
								<p
									className={`py-1 px-4 text-sm font-medium ${
										account.link
											? 'bg-green-100 text-green-600'
											: 'bg-red-100 text-red-600'
									}`}
								>
									{account.link ? 'Linked' : 'Unlinked'}
								</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	)
}
export default Overview
