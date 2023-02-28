import { ReactComponent as LeftChevron } from 'assets/icons/left-chevron.svg'
import { ReactComponent as MoreIcon } from 'assets/icons/more.svg'
import { ReactComponent as RightChevron } from 'assets/icons/right-chevron.svg'
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg'
// import Select from 'components/Select'
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

const CampaignMetrics = () => {
	usePageTitle('Campaign Metrics')
	const [openMenu, setOpenMenu] = useState<number | null>(null)

	return (
		<>
			<h2 className='text-3xl font-black'>Campagin Metrics</h2>

			{/* <Select /> */}

			<div className='mt-6 grid gap-7 bg-white p-3 md:p-6 xl:grid-cols-2'>
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

			<div>
				<div className='mt-6 flex flex-wrap items-center justify-center gap-4 bg-white py-3 px-3 text-sm md:justify-between md:px-5 xl:gap-0'>
					<h3 className='text-lg font-medium'>Preview Campaign page</h3>
					<form className='relative w-full md:w-80'>
						<input
							type='search'
							name='search'
							id='search'
							placeholder='Search page'
							className='w-full border-2 border-[#B5BFEF] bg-wustomers-primary py-[6px] px-4 pr-10'
						/>
						<div className='absolute top-1/2 right-0 grid h-full w-9 -translate-y-1/2 place-items-center bg-[#B5BFEF] text-white'>
							<SearchIcon />
						</div>
					</form>

					<p className='text-wustomers-gray'>
						All (50) | Active (20) | Paused (30)
					</p>

					<div className='flex items-center gap-7'>
						<p>1 - 2 of 32</p>

						<div className='item-center flex gap-4'>
							<button type='button'>
								<LeftChevron />
								<span className='sr-only'>Previous</span>
							</button>
							<button type='button'>
								<RightChevron />
								<span className='sr-only'>Next</span>
							</button>
						</div>
					</div>
				</div>

				<table
					className={`flex-no-wrap flex w-full table-auto flex-row rounded text-left text-sm text-gray-500 md:table md:bg-white`}
				>
					<thead className='bg-[#F5F5F5]'>
						{tableBody?.map((_, index) => (
							<tr
								key={index}
								className='flex-no-wrap mt-2 flex flex-col md:mt-0 md:hidden'
							>
								{tableHeaders?.map(header => (
									<th
										key={header}
										scope='col'
										className={`border border-slate-50 px-3 py-4 font-normal md:border-0 md:px-6 ${
											header === 'Title' &&
											'lg:mr-20 lg:flex lg:items-center lg:gap-4'
										}`}
									>
										{header}
									</th>
								))}
							</tr>
						))}
						<tr className='hidden md:table-row'>
							{tableHeaders?.map(header => (
								<th
									key={header}
									scope='col'
									className={`border border-slate-50 px-3 py-4 font-normal md:border-0 md:px-6 ${
										header === 'Title' &&
										'lg:mr-20 lg:flex lg:items-center lg:gap-4'
									}`}
								>
									{header}
								</th>
							))}
						</tr>
					</thead>

					<tbody className='flex-1 overflow-hidden md:flex-none'>
						{tableBody?.map(data => (
							<tr
								key={data.id}
								className='flex-no-wrap mb-2 flex cursor-default flex-col bg-white transition-colors last:mb-0 md:mb-0 md:table-row'
							>
								<td className='text-imsme-text whitespace-nowrap border border-slate-50 px-6 py-5 font-medium text-wustomers-main md:border-0'>
									<h4 className='truncate'>{data.title}</h4>
								</td>
								<td className='text-levare-gray border border-slate-50 px-6 py-4 md:border-0'>
									{data.date}
								</td>
								<td className='text-levare-gray border border-slate-50 px-6 py-4 md:border-0'>
									<div
										className={`flex items-center gap-2 capitalize ${
											data.status === 'complete'
												? 'text-wustomers-blue-other'
												: data.status === 'pending'
												? 'text-[#D3CC0E]'
												: data.status === 'active'
												? 'text-[#24C97A]'
												: ''
										}`}
									>
										<div
											className={`h-[11px] w-[11px] rounded-full ${
												data.status === 'complete'
													? 'bg-wustomers-blue-other'
													: data.status === 'pending'
													? 'bg-[#D3CC0E]'
													: data.status === 'active'
													? 'bg-[#24C97A]'
													: ''
											}`}
										/>
										{data.status}
									</div>
								</td>
								<td className='text-levare-gray border border-slate-50 px-6 py-4 md:border-0'>
									{data.duration}
								</td>
								<td className='border border-slate-50 px-6 py-4 text-right md:border-0'>
									<button
										// onClick={() => setOpenMenu(data.id)}
										aria-label='show more options'
										className='text-primary flex w-max p-1 underline transition-all'
									>
										<MoreIcon />
									</button>

									{/* {openMenu === data.id ? (
										<div className='bg-red-200 p-2'>
											<p>hello</p>
										</div>
									) : null} */}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}
export default CampaignMetrics
