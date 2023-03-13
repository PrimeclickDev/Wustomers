import { ReactComponent as CircleArrowIcon } from 'assets/icons/arrowcircle.svg'
import { NewCampaignStepFour } from 'components/NewCampaignStepFour'
import { NewCampaignStepOne } from 'components/NewCampaignStepOne'
import { NewCampaignStepThree } from 'components/NewCampaignStepThree'
import { NewCampaignStepTwo } from 'components/NewCampaignStepTwo'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const numOfStep = 4
/* generates array that contains 'numOfStep' */
const steps = [...Array(numOfStep).keys()].map(i => i + 1)

const NewCampaign = () => {
	const navigate = useNavigate()
	const [step, setStep] = useState(1)

	const nextStep = () => {
		if (step >= numOfStep) return
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

			{/* progess bar */}
			<div className='mt-7 flex flex-wrap items-center gap-1'>
				{steps.map(num => (
					<div key={num} className='flex-1'>
						<p className='text-xs uppercase tracking-wider text-wustomers-neutral md:text-sm'>
							Step {num}
						</p>
						<div
							className={`mt-1 h-3 w-full rounded-sm ${
								num === step ? 'bg-wustomers-blue' : 'bg-white'
							}`}
						/>
					</div>
				))}
			</div>

			{/* {step === 1 ? (
				<NewCampaignStepOne />
			) : step === 2 ? (
				<NewCampaignStepTwo />
			) : step === 3 ? (
				<NewCampaignStepThree />
			) : step === 4 ? (
				<NewCampaignStepFour />
			) : null} */}
			{changeStep()}
		</>
	)
}
export default NewCampaign
