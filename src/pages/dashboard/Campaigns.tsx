import { ReactComponent as MoreIcon } from 'assets/icons/more-horizontal.svg'
import { ReactComponent as PlusCircleIcon } from 'assets/icons/plus-circle.svg'
import campaignOneImg from 'assets/images/campaign-one.png'
import campaignTwoImg from 'assets/images/campaign-two.png'
import { usePageTitle } from 'hooks/usePageTitle'
import { Link } from 'react-router-dom'

const campaigns = [
	{
		id: 1,
		name: 'Eaglevista landing page',
		active: false,
		img: campaignOneImg,
	},
	{
		id: 2,
		name: 'Ghanadeals landing page',
		active: true,
		img: campaignTwoImg,
	},
]

const Campaigns = () => {
	usePageTitle('Campaigns')

	return (
		<>
			<h2 className='text-3xl font-black'>My Campagins</h2>

			<ul className='mt-9 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-7'>
				{campaigns.map(campaign => (
					<li key={campaign.id} className='relative rounded bg-white'>
						<div className='campaign-badge absolute top-3 right-3 flex items-center gap-3 rounded-sm px-3 py-1 backdrop:blur-sm'>
							<span
								className={`h-3 w-3 rounded-full ${
									campaign.active
										? 'bg-[#24C97A]'
										: 'bg-[rgba(255,0,0,0.9)]'
								}`}
							/>
							<p
								className={`text-sm ${
									campaign.active
										? 'text-[#24C97A]'
										: 'text-[rgba(255,0,0,0.9)]'
								}`}
							>
								{campaign.active ? 'Active' : 'Paused'}
							</p>
						</div>
						<img
							src={campaign.img}
							alt={`${campaign.name} banner`}
							className='h-[200px] object-cover p-2'
						/>
						<div
							className={`flex items-center justify-between gap-2 px-4 py-3 text-white ${
								campaign.active ? 'bg-wustomers-blue' : 'bg-[#6A7FDE]'
							}`}
						>
							<p>{campaign.name}</p>
							<button type='button' aria-label='view more'>
								<MoreIcon />
							</button>
						</div>
					</li>
				))}
				<li>
					<Link
						to='new'
						className='group inline-block w-full transition-colors'
					>
						<div className='grid h-[200px] place-items-center bg-white p-2'>
							<PlusCircleIcon />
						</div>
						<p className='bg-wustomers-primary px-4 py-3 text-center text-wustomers-blue group-hover:bg-wustomers-blue group-hover:text-white'>
							Add new campaign
						</p>
					</Link>
				</li>
			</ul>
		</>
	)
}
export default Campaigns
