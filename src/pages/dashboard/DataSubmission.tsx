import { useFetchCampaignFormInfo } from 'api/hooks/data-submission/useFetchCampaignFormInfo'
import { useFetchMetrics } from 'api/hooks/overview/useFetchMetrics'
import { ReactComponent as FileIcon } from 'assets/icons/file.svg'
import { ReactComponent as MouseSquareIcon } from 'assets/icons/mousesquare.svg'
import { DataSubmissionTable } from 'components/DataSubmissionTable'
import { Spinner } from 'components/Spinner'

const DataSubmission = () => {
	const { data, isLoading } = useFetchCampaignFormInfo({ page: 1 })
	const { data: metrics } = useFetchMetrics()

	return (
		<>
			<h2 className='text-3xl font-black'>Data Submissions</h2>

			{isLoading ? (
				<Spinner />
			) : (
				<>
					<ul className='mt-10 grid gap-4 lg:grid-cols-3 lg:gap-10'>
						<li className='relative rounded-sx border-l-[12px] border-l-wustomers-blue-other bg-wustomers-blue p-5 text-white'>
							<p className='text-lg font-medium'>Total submissions</p>
							<h3 className='py-4 text-6xl font-bold'>
								{data?.total_forms.toLocaleString()}
							</h3>

							<div className='absolute bottom-4 right-7 text-[#B5BFEF]'>
								<FileIcon width={32} height={32} />
							</div>
						</li>
						<li className='relative rounded-sx border-l-[12px] border-l-wustomers-blue-other bg-wustomers-blue p-5 text-white'>
							<p className='text-lg font-medium'>Total No. of Clicks</p>
							<h3 className='py-4 text-6xl font-bold'>
								{metrics?.userCampignmetrics.total_visit.toLocaleString() ??
									0}
							</h3>

							<div className='absolute bottom-4 right-7 text-[#B5BFEF]'>
								<MouseSquareIcon width={32} height={32} />
							</div>
						</li>
					</ul>

					<DataSubmissionTable />
				</>
			)}
		</>
	)
}
export default DataSubmission
