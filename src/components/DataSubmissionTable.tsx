/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useFetchCampaignFormInfo } from 'api/hooks/data-submission/useFetchCampaignFormInfo'
import { ReactComponent as LeftChevron } from 'assets/icons/left-chevron.svg'
import { ReactComponent as RightChevron } from 'assets/icons/right-chevron.svg'
import { useState } from 'react'

const tableHeaders = [
	'Full name',
	'Email',
	'Phone no.',
	'Location',
	'Campaign code',
]

export const DataSubmissionTable = () => {
	const [page, setPage] = useState(1)
	const { data, isPreviousData } = useFetchCampaignFormInfo({ page: 1 })

	return (
		<div className='mt-20'>
			<header className='mt-6 flex flex-wrap items-center justify-center gap-4 bg-white py-3 px-3 text-sm md:justify-between md:px-5 xl:gap-0'>
				<h3 className='text-lg font-medium'>Submissions</h3>

				{/* search */}

				<div className='flex items-center gap-7'>
					<p>
						{data?.forms.meta.from} - {data?.forms.meta.to} of{' '}
						{data?.forms.meta.total} page
					</p>

					<div className='item-center flex gap-4 text-[#444444]'>
						<button
							type='button'
							onClick={() => {
								if (page <= 1) return
								setPage(page - 1)
							}}
							className='p-1 disabled:cursor-not-allowed disabled:text-[#979797]'
							disabled={data!.forms.meta.current_page <= 1}
						>
							<LeftChevron />
							<span className='sr-only'>Previous</span>
						</button>
						<button
							type='button'
							onClick={() => setPage(page + 1)}
							className='p-1 disabled:cursor-not-allowed disabled:text-[#979797]'
							disabled={data!.forms.meta.current_page <= 1}
						>
							<RightChevron />
							<span className='sr-only'>Next</span>
						</button>
					</div>
				</div>
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
						{data?.forms.data.length ? (
							data?.forms.data?.map(submission => (
								<tr key={submission.id}>
									<td className='px-6 py-5 font-medium text-wustomers-main'>
										{submission.full_name}
									</td>
									<td className='px-6 py-4'>{submission.email}</td>
									<td className='px-6 py-4'>
										{submission.phone_number
											? submission.phone_number
											: '-'}
									</td>
									<td className='px-6 py-4'>
										{submission.location ? submission.location : '-'}
									</td>
									<td className='px-6 py-4'>
										{submission.campaign_code.toLowerCase()}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={8}
									className='px-6 py-4 text-center text-wustomers-gray'
								>
									You don&apos;t have any form submmissions.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}
