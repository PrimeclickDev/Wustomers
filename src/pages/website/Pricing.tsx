import { ReactComponent as Checkmark } from 'assets/icons/checkmark.svg'
import { Button } from 'components/Button'

const Pricing = () => {
	const features = [
		'Unlimited landing page creation',
		'Free data from google analytics',
		'Pause your ads anytime you want',
		'No monthly charge or hidden fees',
	]

	return (
		<main className='py-20 text-center lg:pb-44 lg:pt-20'>
			<div className='mx-auto max-w-screen-xl px-3 lg:px-0'>
				<h2 className='text-4xl font-bold lg:text-6xl'>Pricing</h2>

				<section className='mt-8 flex flex-col items-center bg-wustomers-primary-light py-14 px-3 lg:px-10'>
					<p className='w-max rounded-sx border border-[#1E96FC] py-2 px-6 text-base text-[#1E96FC] lg:px-14 lg:text-lg'>
						This is a commission based plan
					</p>
					<p className='pt-7 text-base text-black lg:text-xl'>
						Enjoy the usage of our platform for free, for as long as you
						like. However;
					</p>
					<p className='pt-6 pb-7 text-3xl font-bold text-black lg:text-4xl'>
						10% Commission per ads campaign
					</p>

					<Button
						type='button'
						variant='fill'
						text='Get started'
						href='/signup'
						className='py-2.5'
					/>

					<div className='mt-8 flex w-full border-t border-t-wustomers-border-color'>
						<ul className='mx-auto flex flex-col items-center gap-4 pt-10 lg:items-start'>
							{features?.map(feature => (
								<li className='flex items-center gap-2' key={feature}>
									<Checkmark />
									<span>{feature}</span>
								</li>
							))}
						</ul>
					</div>
				</section>
			</div>
		</main>
	)
}
export default Pricing
