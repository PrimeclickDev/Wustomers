import { ReactComponent as ActivityIcon } from 'assets/icons/activity-outline.svg'
import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg'
import CampaignChart from 'components/CampaignChart'
import { CampaignMetricsTable } from 'components/CampaignMetricsTable'
import { Select, SelectItem } from 'components/Select'
import { usePageTitle } from 'hooks/usePageTitle'

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

	return (
		<>
			<h2 className='text-3xl font-black'>Campagin Metrics</h2>

			<div className='mt-6 bg-white p-3 md:p-6 '>
				<div className='flex flex-wrap items-center gap-4 lg:gap-9'>
					<Select
						// options={durations}
						icon={<CalendarIcon />}
						placeholder='Select a duration...'
					>
						{durations?.map(option => (
							<SelectItem value={option.name} key={option.id}>
								{option.name}
							</SelectItem>
						))}
					</Select>
					<Select
						icon={<ActivityIcon className='text-wustomers-blue' />}
						placeholder='Select a duration....'
					>
						{durations?.map(option => (
							<SelectItem value={option.name} key={option.id}>
								{option.name}
							</SelectItem>
						))}
					</Select>
				</div>

				<div className='mt-6 grid gap-7 xl:grid-cols-2'>
					{/* campaign data */}
					<div className='rounded bg-wustomers-neutral-light p-3 md:p-6'>
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
					<div className='rounded bg-wustomers-neutral-light p-3 md:p-6'>
						<h3 className='text-center text-lg font-bold text-[#444444] lg:text-left'>
							Campaign Chart
						</h3>

						<CampaignChart />
					</div>
				</div>
			</div>

			<CampaignMetricsTable />
		</>
	)
}
export default CampaignMetrics
