import { CampaignProps } from 'models/shared'
import { Button } from './Button'

export const NewCampaignStepThree = ({ nextStep, prevStep }: CampaignProps) => {
	return (
		<section className='mt-10 flex flex-col'>
			<h3 className='bg-wustomers-neutral-light py-3 px-9 font-medium'>
				Body section contd:
			</h3>
			<div className='bg-white px-9 py-12'>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
					unde inventore nobis voluptas reprehenderit debitis magnam,
					tenetur modi voluptatibus excepturi.
				</p>
			</div>

			<div className='mt-3 flex flex-col gap-4 md:flex-row md:items-center md:self-end'>
				<Button
					text='Previous'
					variant='outline'
					onClick={prevStep}
					className='!bg-white px-11 !font-normal capitalize'
				/>
				<Button
					text='Next'
					variant='fill'
					onClick={nextStep}
					className='px-14 !font-normal capitalize'
				/>
			</div>
		</section>
	)
}
