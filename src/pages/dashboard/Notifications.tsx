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
				<header className='flex items-center justify-between rounded-sx bg-wustomers-primary py-4 px-7'>
					<div className='flex items-center gap-7'>
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
							className='flex items-center gap-2 text-wustomers-blue transition-colors hover:opacity-80'
						>
							<DoubleCheckIcon />
							<span>Mark all as read</span>
						</button>

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
				</header>

				<ul className='rounded-sx bg-white py-3'>
					{[1, 2, 3, 4].map(num => (
						<li
							key={num}
							className='flex items-center justify-between px-8 py-3'
						>
							<div className='flex items-center gap-7'>
								<input
									type='checkbox'
									name='select'
									id='select'
									className='h-4 w-4'
								/>
								<div>
									<p className='font-medium text-[#444444]'>
										Your campaign setup was successful
									</p>
									<p className='text-xs text-wustomers-gray'>
										Wustomers support.
									</p>
								</div>
							</div>

							<div className='text-right text-sm text-wustomers-gray'>
								<p>22nd July</p>
								<p>30 mins ago</p>
							</div>
						</li>
					))}
				</ul>
			</section>
		</>
	)
}
export default Notifications
