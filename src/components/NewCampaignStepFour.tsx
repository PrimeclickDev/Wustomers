import { ReactComponent as MobileIcon } from 'assets/icons/mobile-2.svg'
import { ReactComponent as MonitorIcon } from 'assets/icons/monitor.svg'
import { CampaignProps } from 'models/shared'
import { useState } from 'react'
import { Button } from './Button'

export const NewCampaignStepFour = ({ prevStep }: CampaignProps) => {
	const [activeView, setActiveView] = useState('desktop')
	return (
		<section className='mt-10 flex flex-col'>
			<header className='flex items-center justify-between bg-wustomers-neutral-light p-3 font-medium md:px-9'>
				<h3>Preview Campaign:</h3>

				<div>
					<button
						type='button'
						className={`rounded-l-sm p-2 transition-colors ${
							activeView === 'desktop'
								? 'bg-wustomers-blue'
								: 'bg-[#CDD4F4]'
						}`}
						onClick={() => setActiveView('desktop')}
					>
						<MonitorIcon />
						<span className='sr-only'>desktop view</span>
					</button>
					<button
						type='button'
						className={`rounded-r-sm p-2 transition-colors ${
							activeView === 'mobile'
								? 'bg-wustomers-blue'
								: 'bg-[#CDD4F4]'
						}`}
						onClick={() => setActiveView('mobile')}
					>
						<MobileIcon />
						<span className='sr-only'>mobile view</span>
					</button>
				</div>
			</header>
			<div className='flex flex-col gap-6 bg-white px-3 py-6 md:py-12 md:px-9'>
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
					text='Publish'
					variant='fill'
					className='px-14 !font-normal capitalize'
				/>
			</div>
		</section>
	)
}
