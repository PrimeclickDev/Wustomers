import { ReactComponent as LeftChevron } from 'assets/icons/left-chevron.svg'
import { ReactComponent as RightChevron } from 'assets/icons/right-chevron.svg'
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg'
import Select from 'components/Select'
import { usePageTitle } from 'hooks/usePageTitle'

const CampaignMetrics = () => {
	usePageTitle('Campaign Metrics')

	return (
		<>
			<h2 className='text-3xl font-black'>Campagin Metrics</h2>

			<Select />

			<div className='mt-6 grid grid-cols-2 gap-7 bg-white p-6'>
				{/* campaign data */}
				<div className='rounded bg-[#F5F5F5] p-6'>
					<h3 className='font-bold text-[#444444]'>Campaign Data</h3>
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
				<div className='rounded bg-[#F5F5F5] p-6'>
					<h3 className='font-bold text-[#444444]'>Campaign Chart</h3>
				</div>
			</div>

			<div>
				<div className='mt-6 flex items-center justify-between bg-white py-3 px-5 text-sm'>
					<h3 className='text-lg font-medium'>Preview Campaign page</h3>
					<form className='relative'>
						<input
							type='search'
							name='search'
							id='search'
							placeholder='Search page'
							className='w-80 border-2 border-[#B5BFEF] bg-wustomers-primary py-[6px] px-4 pr-10'
						/>
						<div className='absolute top-1/2 right-0 grid h-full w-9 -translate-y-1/2 place-items-center bg-[#B5BFEF] text-white'>
							<SearchIcon />
						</div>
					</form>

					<p className='text-wustomers-gray'>
						All (50) | Active (20) | Paused (30)
					</p>

					<div className='hidden sm:flex sm:items-center sm:gap-7'>
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
			</div>
		</>
	)
}
export default CampaignMetrics
