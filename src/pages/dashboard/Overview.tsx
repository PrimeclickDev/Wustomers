import { useFetchProfile } from 'api/hooks/profile/useFetchProfile'
import { ReactComponent as ChartSquareIcon } from 'assets/icons/chartsquare.svg'
import { ReactComponent as MonitorIcon } from 'assets/icons/monitormobile.svg'
import { ReactComponent as ActivityIcon } from 'assets/icons/overview-activity.svg'
import CampaignChart from 'components/CampaignChart'
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

			<div className='mt-10'>
				<h3 className='pb-2 text-xl font-bold'>All Campaign chart</h3>
				<CampaignChart height={400} />
			</div>
		</>
	)
}
export default Overview
