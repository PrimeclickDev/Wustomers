import { useFetchMetrics } from 'api/hooks/overview/useFetchMetrics'
import { useFetchProfile } from 'api/hooks/profile/useFetchProfile'
import { ReactComponent as ChartSquareIcon } from 'assets/icons/chartsquare.svg'
import { ReactComponent as MonitorIcon } from 'assets/icons/monitormobile.svg'
import { ReactComponent as ActivityIcon } from 'assets/icons/overview-activity.svg'
import CampaignChart from 'components/CampaignChart'
import { Spinner } from 'components/Spinner'
import { usePageTitle } from 'hooks/usePageTitle'

const Overview = () => {
	usePageTitle('Dashboard')
	const { data: profile } = useFetchProfile()
	const { data, isLoading } = useFetchMetrics()

	if (isLoading) {
		return <Spinner />
	}
	return (
		<>
			<h2 className='flex items-center gap-2 text-3xl font-black'>
				Hi, <span>{profile?.user?.first_name}</span>
			</h2>

			<ul className='mt-10 grid gap-4 lg:grid-cols-3 lg:gap-10'>
				<li className='relative rounded-sx border-l-[10px] border-l-wustomers-blue-other bg-wustomers-blue p-5 text-white'>
					<p className='text-lg font-medium'>
						Total No. of Campaign pages
					</p>
					<h3 className='py-4 text-6xl font-bold'>
						{data?.userCampignmetrics.total_campaign.toLocaleString()}
					</h3>

					<div className='absolute bottom-4 right-7 text-[#B5BFEF]'>
						<MonitorIcon />
					</div>
				</li>
				<li className='relative rounded-sx border-l-[10px] border-l-wustomers-blue-other bg-wustomers-blue p-5 text-white'>
					<p className='text-lg font-medium'>Total No. of Visits</p>
					<h3 className='py-4 text-6xl font-bold'>
						{data?.userCampignmetrics.total_visit.toLocaleString()}
					</h3>

					<div className='absolute bottom-4 right-7 text-[#B5BFEF]'>
						<ActivityIcon width={32} height={32} />
					</div>
				</li>
				<li className='relative rounded-sx border-l-[10px] border-l-wustomers-blue-other bg-wustomers-blue p-5 text-white'>
					<p className='text-lg font-medium'>Total No. of Contacts</p>
					<h3 className='py-4 text-6xl font-bold'>
						{data?.userCampignmetrics.total_contact.toLocaleString()}
					</h3>

					<div className='absolute bottom-4 right-7 text-[#B5BFEF]'>
						<ChartSquareIcon />
					</div>
				</li>
			</ul>

			<div className='mt-10'>
				<h3 className='pb-2 text-xl font-bold'>All Campaign chart</h3>
				<CampaignChart height={400} />
			</div>
		</>
	)
}
export default Overview
