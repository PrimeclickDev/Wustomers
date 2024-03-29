import { ReactComponent as CircleArrowIcon } from 'assets/icons/arrowcircle.svg'
import { NewCampaignStepFour } from 'components/NewCampaignStepFour'
import { NewCampaignStepOne } from 'components/NewCampaignStepOne'
import { NewCampaignStepThree } from 'components/NewCampaignStepThree'
import { NewCampaignStepTwo } from 'components/NewCampaignStepTwo'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const steps = [1, 2, 3, 4]

const NewCampaign = () => {
	const [step, setStep] = useState(1)
	const nextStep = () => {
		if (step >= 4) return
		setStep(step + 1)
	}
	const prevStep = () => {
		if (step <= 1) return
		setStep(step - 1)
	}

	const changeStep = () => {
		switch (step) {
			case 1:
				return <NewCampaignStepOne nextStep={nextStep} />
			case 2:
				return (
					<NewCampaignStepTwo prevStep={prevStep} nextStep={nextStep} />
				)
			case 3:
				return (
					<NewCampaignStepThree prevStep={prevStep} nextStep={nextStep} />
				)
			case 4:
				return <NewCampaignStepFour prevStep={prevStep} />
			default:
		}
	}

	return (
		<>
			<header className='flex items-center gap-3'>
				<Link
					to='/campaigns'
					aria-label='go back'
					type='button'
					className='transition-opacity hover:opacity-70 active:scale-95'
				>
					<CircleArrowIcon width={32} />
				</Link>
				<h2 className='text-2xl font-bold text-wustomers-gray'>
					New Campaign
				</h2>
			</header>

			{/* progess bar */}
			<div className='mt-7 flex flex-wrap items-center gap-10'>
				{steps.map(step => (
					<div key={step} className='flex-1'>
						<p className='text-left text-xs uppercase tracking-wider text-wustomers-neutral md:text-sm'>
							Step {step}
						</p>
					</div>
				))}
			</div>
			<div
				className={`relative mt-1 h-3 w-full rounded-sm bg-white after:absolute after:top-0 after:left-0 after:h-full after:bg-wustomers-blue ${
					step === 1
						? 'after:w-1/4'
						: step === 2
						? 'after:w-1/2'
						: step === 3
						? 'after:w-3/4'
						: step === 4
						? 'after:w-full'
						: ''
				}`}
			/>

			{changeStep()}
		</>
	)
}
export default NewCampaign
