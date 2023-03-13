import { CampaignProps } from 'models/shared'
import { Button } from './Button'

export const NewCampaignStepOne = ({ nextStep }: CampaignProps) => {
	return (
		<section className='mt-10 flex flex-col'>
			<h3 className='bg-wustomers-neutral-light py-3 px-9 font-medium'>
				Above the fold section:
			</h3>
			<div className='bg-white px-9 py-12'>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
					unde inventore nobis voluptas reprehenderit debitis magnam,
					tenetur modi voluptatibus excepturi.
				</p>
			</div>

			<Button
				text='Next'
				variant='fill'
				onClick={nextStep}
				className='mt-3 px-14 !font-normal capitalize md:self-end'
			/>
		</section>
	)
}
