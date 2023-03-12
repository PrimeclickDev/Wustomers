import { ReactComponent as CircleArrowIcon } from 'assets/icons/arrowcircle.svg'
import { useNavigate } from 'react-router-dom'

const NewCampaign = () => {
	const navigate = useNavigate()
	return (
		<>
			<header className='flex items-center gap-3'>
				<button
					onClick={() => navigate(-1)}
					aria-label='go back'
					type='button'
					className='transition-opacity hover:opacity-70 active:scale-95'
				>
					<CircleArrowIcon width={32} />
				</button>
				<h2 className='text-2xl font-bold text-wustomers-gray'>
					New Campaign
				</h2>
			</header>
		</>
	)
}
export default NewCampaign
