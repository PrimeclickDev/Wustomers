/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useFetchCampaigns } from 'api/hooks/campaigns/useFetchCampaigns'
import { ReactComponent as LeftChevron } from 'assets/icons/left-chevron.svg'
import { ReactComponent as RightChevron } from 'assets/icons/right-chevron.svg'
import { useSearchParamsState } from 'hooks/useSearchParamsState'

const tableHeaders = [
	'Title',
	'Start Date',
	'End Date',
	'Status',
	'Duration',
	'Clicks',
	'Conversion',
	'Conversion rate',
	// 'Action',
]

const statusTagBg = {
	Inactive: 'bg-[#D3CC0E]',
	Active: 'bg-[#24C97A]',
	Paused: 'bg-red-600',
	Complete: 'bg-wustomers-blue-other',
}
const statusTagClr = {
	Inactive: 'text-[#D3CC0E]',
	Active: 'text-[#24C97A]',
	Paused: 'text-red-600',
	Complete: 'text-wustomers-blue-other',
}

export const CampaignMetricsTable = () => {
	const [filterBy, setFilterBy] = useSearchParamsState('filterBy', 'all')
	const { data, isPreviousData } = useFetchCampaigns(filterBy)

	return (
		<div>
			<header className='mt-6 flex flex-wrap items-center justify-center gap-4 bg-white py-3 px-3 text-sm md:justify-between md:px-5 xl:gap-0'>
				<h3 className='text-lg font-medium'>Preview Campaign page</h3>

				{/* filters */}
				<div className='flex flex-wrap items-center justify-center gap-4 text-wustomers-gray md:gap-2'>
					<button
						type='button'
						onClick={() => setFilterBy('all')}
						className={`px-[6px] py-[2px] transition-colors ${
							filterBy === 'all'
								? 'bg-wustomers-blue-light text-white'
								: 'bg-wustomers-neutral-light hover:bg-wustomers-neutral-lighter/50'
						}`}
					>
						All ({data?.metrics.total_campaigns.toLocaleString()})
					</button>
					<button
						type='button'
						onClick={() => setFilterBy('active')}
						className={`px-[6px] py-[2px] transition-colors ${
							filterBy === 'active'
								? 'bg-wustomers-blue-light text-white'
								: 'bg-wustomers-neutral-light hover:bg-wustomers-neutral-lighter/50'
						}`}
					>
						Active ({data?.metrics.active_campaigns.toLocaleString()})
					</button>
					<button
						type='button'
						onClick={() => setFilterBy('inactive')}
						className={`px-[6px] py-[2px] transition-colors ${
							filterBy === 'inactive'
								? 'bg-wustomers-blue-light text-white'
								: 'bg-wustomers-neutral-light hover:bg-wustomers-neutral-lighter/50'
						}`}
					>
						Inactive ({data?.metrics.inactive_campaigns.toLocaleString()})
					</button>
					<button
						type='button'
						onClick={() => setFilterBy('paused')}
						className={`px-[6px] py-[2px] transition-colors ${
							filterBy === 'paused'
								? 'bg-wustomers-blue-light text-white'
								: 'bg-wustomers-neutral-light hover:bg-wustomers-neutral-lighter/50'
						}`}
					>
						Paused ({data?.metrics.paused_campaigns.toLocaleString()})
					</button>
					<button
						type='button'
						onClick={() => setFilterBy('completed')}
						className={`px-[6px] py-[2px] transition-colors ${
							filterBy === 'completed'
								? 'bg-wustomers-blue-light text-white'
								: 'bg-wustomers-neutral-light hover:bg-wustomers-neutral-lighter/50'
						}`}
					>
						Completed (
						{data?.metrics.completed_campaigns.toLocaleString()})
					</button>
				</div>

				{data?.campaigns?.meta ? (
					<div className='flex items-center gap-7'>
						<p>
							{data?.campaigns.meta.from} - {data?.campaigns.meta.to} of{' '}
							{data?.campaigns.meta.last_page}{' '}
							{data?.campaigns.meta.last_page! > 1 ? 'pages' : 'page'}
						</p>

						<div className='item-center flex gap-4 text-[#444444]'>
							{/* not active:  */}
							{/* right chevron:  */}
							<button
								type='button'
								className='p-1 disabled:cursor-not-allowed disabled:text-[#979797]'
								disabled={data?.campaigns.meta.current_page! <= 1}
							>
								<LeftChevron />
								<span className='sr-only'>Previous</span>
							</button>
							<button
								type='button'
								className='p-1 disabled:cursor-not-allowed disabled:text-[#979797]'
								disabled={data?.campaigns.meta.current_page! <= 1}
							>
								<RightChevron />
								<span className='sr-only'>Next</span>
							</button>
						</div>
					</div>
				) : null}
			</header>

			<div className='overflow-x-auto'>
				<table className='table w-full whitespace-nowrap rounded bg-white text-left text-sm text-gray-500'>
					<thead className='bg-wustomers-neutral-light'>
						<tr className='table-row'>
							{tableHeaders?.map(header => (
								<th
									key={header}
									scope='col'
									className='px-6 py-4 font-normal'
								>
									{header}
								</th>
							))}
						</tr>
					</thead>

					<tbody
						className={`relative ${
							isPreviousData
								? 'cursor-not-allowed opacity-50 after:absolute after:top-1/2 after:left-1/2 after:-translate-y-1/2 after:-translate-x-1/2 after:text-xl after:content-["Loading..."]'
								: ''
						}`}
					>
						{data?.campaigns.data.length ? (
							data?.campaigns.data?.map(campaign => (
								<tr key={campaign.id}>
									<td className='px-6 py-5 font-medium text-wustomers-main'>
										{campaign.title}
									</td>
									<td className='px-6 py-4'>
										{campaign.campaign_status === 'Inactive'
											? '-'
											: new Date(
													campaign.start_date as string
											  ).toLocaleDateString('default', {
													dateStyle: 'long',
											  })}
									</td>
									<td className='px-6 py-4'>
										{campaign.campaign_status === 'Inactive'
											? '-'
											: new Date(
													campaign.end_date as string
											  ).toLocaleDateString('default', {
													dateStyle: 'long',
											  })}
									</td>
									<td className='px-6 py-4'>
										<div
											className={`flex items-center gap-2 capitalize ${
												statusTagClr[
													campaign.campaign_status as keyof typeof statusTagClr
												]
											}`}
										>
											<div
												className={`h-[11px] w-[11px] rounded-full ${
													statusTagBg[
														campaign.campaign_status as keyof typeof statusTagBg
													]
												}`}
											/>
											{campaign.campaign_status}
										</div>
									</td>
									<td className='px-6 py-4'>
										{campaign.campaign_status === 'Inactive'
											? '-'
											: `${campaign.budget?.duration} ${
													campaign.budget?.duration > 1
														? 'days'
														: 'day'
											  }`}{' '}
									</td>
									<td className='px-6 py-4 text-center'>
										{campaign.impression}
									</td>
									<td className='px-6 py-4 text-center'>
										{campaign.conversion}
									</td>
									<td className='px-6 py-4 text-center'>
										{campaign.conversion_rate}
									</td>
									{/* <td className='px-6 py-4 text-right'>
										<Popover.Root>
											<Popover.Trigger asChild>
												<button
													aria-label='show more options'
													className='text-primary flex w-max p-1 underline transition-all'
												>
													<MoreIcon />
												</button>
											</Popover.Trigger>
											<Popover.Portal>
												<Popover.Content
													className='flex w-max flex-col rounded border border-gray-200 bg-white p-1 text-xs shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade'
													sideOffset={5}
												>
													<button className='rounded py-[6px] px-4 transition-colors hover:bg-wustomers-blue hover:text-white'>
														Renew
													</button>
													{campaign?.campaign_status !==
													'Active' ? (
														<button className='rounded py-[6px] px-4 transition-colors hover:bg-red-600 hover:text-white'>
															Delete
														</button>
													) : null}
													<Popover.Arrow className='fill-gray-300' />
												</Popover.Content>
											</Popover.Portal>
										</Popover.Root>
									</td> */}
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={8}
									className='px-6 py-4 text-center text-wustomers-gray'
								>
									You don&apos;t have any {filterBy} campaign(s)
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}
