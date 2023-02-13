import { ReactComponent as DoubleCheckIcon } from 'assets/icons/double-check.svg'
import { ReactComponent as LeftChevron } from 'assets/icons/left-chevron.svg'
import { ReactComponent as RightChevron } from 'assets/icons/right-chevron.svg'
import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg'
import { usePageTitle } from 'hooks/usePageTitle'

const Notifications = () => {
	usePageTitle('Notifications')

	return (
		<>
			<h2 className='text-3xl font-black'>Notifications</h2>

			<section className='mt-10'>
				<header className='flex items-center justify-between rounded-sx bg-wustomers-primary py-4 px-4 lg:px-7'>
					<div className='flex items-center gap-3 lg:gap-7'>
						<input
							type='checkbox'
							name='selectAll'
							id='selectAll'
							className='h-4 w-4'
						/>
						<h3 className='text-lg font-medium'>All notifications</h3>
					</div>

					<div className='flex items-center gap-5'>
						<button
							type='button'
							className='grid h-7 w-7 place-items-center rounded-full bg-wustomers-dark-gray'
						>
							<TrashIcon />
						</button>
						<button
							type='button'
							className='hidden text-wustomers-blue transition-colors hover:opacity-80 sm:flex sm:items-center sm:gap-2'
						>
							<DoubleCheckIcon />
							<span>Mark all as read</span>
						</button>

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
				</header>

				<ul className='rounded-sx bg-white py-3'>
					{[1, 2, 3, 4].map(num => (
						<li
							key={num}
							className='flex flex-col border-b border-b-gray-200 px-3 py-3 last-of-type:border-0 sm:flex-row sm:items-center sm:justify-between md:px-8'
						>
							<div className='flex items-center gap-4 lg:gap-7'>
								<input
									type='checkbox'
									name='select'
									id='select'
									className='h-4 w-4'
								/>
								<div>
									<h4 className='font-medium text-[#444444]'>
										Your campaign setup was successful
									</h4>
									<p className='text-xs text-wustomers-gray'>
										Wustomers support.
									</p>
								</div>
							</div>

							<div className='mt-3 flex justify-between pl-8 text-sm text-wustomers-gray sm:mt-0 sm:flex-col sm:pl-0 sm:text-right'>
								<p>22nd July</p>
								<p>30 mins ago</p>
							</div>
						</li>
					))}
				</ul>

				{/* for mobile */}
				<div className='flex items-center justify-center gap-3 p-3 text-sm md:hidden'>
					<p>1 - 2 of 32</p>

					<div className='item-center flex gap-3 p-3'>
						<button type='button' className='p-2'>
							<LeftChevron />
							<span className='sr-only'>Previous</span>
						</button>
						<button type='button' className='p-2'>
							<RightChevron />
							<span className='sr-only'>Next</span>
						</button>
					</div>
				</div>
			</section>
		</>
	)
}
export default Notifications
