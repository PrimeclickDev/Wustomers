import { ReactComponent as ActivityIcon } from 'assets/icons/activity-outline.svg'
import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg'
import { CampaignMetricsTable } from 'components/CampaignMetricsTable'
import { Select } from 'components/Select'
import { usePageTitle } from 'hooks/usePageTitle'
import { lazy, Suspense, useState } from 'react'

const CampaignChart = lazy(() => import('components/CampaignChart'))

const tableHeaders = ['Title', 'Date', 'Status', 'Duration', 'Action']
const tableBody = [
	{
		id: 1,
		title: 'Campaign title number 1',
		date: '12, Nov. 2022',
		status: 'active',
		duration: '2 weeks',
	},
	{
		id: 2,
		title: 'Campaign title number 2',
		date: '12, Nov. 2022',
		status: 'complete',
		duration: '1 week',
	},
	{
		id: 3,
		title: 'Campaign title number 3',
		date: '12, Nov. 2022',
		status: 'pending',
		duration: '1 week',
	},
]

const durations = [
	{
		id: 1,
		name: 'Past one week',
		value: 'one-week',
	},
	{
		id: 2,
		name: 'Past one month',
		value: 'one-month',
	},
	{
		id: 3,
		name: 'Past six months',
		value: 'six-months',
	},
	{
		id: 4,
		name: 'Past one year',
		value: 'one-year',
	},
]

const CampaignMetrics = () => {
	usePageTitle('Campaign Metrics')
	const [openMenu, setOpenMenu] = useState<number | null>(null)

	return (
		<>
			<h2 className='text-3xl font-black'>Campagin Metrics</h2>

			<div className='mt-6 bg-white p-3 md:p-6 '>
				<div className='flex flex-wrap items-center gap-4 lg:gap-9'>
					<Select
						options={durations}
						icon={<CalendarIcon />}
						placeholder='Select a duration...'
					/>
					<Select
						options={durations}
						icon={<ActivityIcon className='text-wustomers-blue' />}
						placeholder='Select a duration....'
					/>
				</div>

				<div className='mt-6 grid gap-7 xl:grid-cols-2'>
					{/* campaign data */}
					<div className='rounded bg-[#F5F5F5] p-3 md:p-6'>
						<h3 className='text-center text-lg font-bold text-[#444444] lg:text-left'>
							Campaign Data
						</h3>
						<ul className='mt-6 flex flex-wrap items-center gap-6'>
							<li className='flex-auto overflow-hidden rounded'>
								<p className='bg-wustomers-blue-other p-3 text-center text-white'>
									No. of Visits
								</p>
								<h4 className='bg-white px-9 py-11 text-center text-5xl font-medium text-wustomers-neutral-dark'>
									30
								</h4>
							</li>
							<li className='flex-auto overflow-hidden rounded'>
								<p className='bg-[#203FCD] p-3 text-center text-white'>
									No. of Contact
								</p>
								<h4 className='bg-white px-9 py-11 text-center text-5xl font-medium text-wustomers-neutral-dark'>
									40
								</h4>
							</li>
							<li className='flex-auto overflow-hidden rounded'>
								<p className='bg-[#FFC600] p-3 text-center text-gray-600'>
									Contact Rate
								</p>
								<h4 className='bg-white px-9 py-11 text-center text-5xl font-medium text-wustomers-neutral-dark'>
									2.5
								</h4>
							</li>
						</ul>
					</div>

					{/* campaign chart */}
					<div className='rounded bg-[#F5F5F5] p-3 md:p-6'>
						<h3 className='text-center text-lg font-bold text-[#444444] lg:text-left'>
							Campaign Chart
						</h3>

						<Suspense fallback={<p>Loading....</p>}>
							<CampaignChart />
						</Suspense>
					</div>
				</div>
			</div>

			<CampaignMetricsTable />
		</>
	)
}
export default CampaignMetrics
