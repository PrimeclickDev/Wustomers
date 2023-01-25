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
		<main className='pt-20 pb-44 text-center'>
			<div className='mx-auto max-w-screen-xl px-2'>
				<h2 className='text-6xl font-bold'>Pricing</h2>

				<section className='mt-8 flex flex-col items-center bg-wustomers-primary-light py-14 px-10'>
					<p className='w-max border border-[#1E96FC] py-2 px-14 text-lg text-[#1E96FC]'>
						This is a commission based plan
					</p>
					<p className='pt-7 text-xl text-black'>
						Enjoy the usage of our platform for free, for as long as you
						like. However;
					</p>
					<p className='pt-6 pb-7 text-4xl font-bold text-black'>
						10% Commission per ads campaign
					</p>

					<Button type='button' variant='fill' text='Get started' />

					<div className='mt-8 flex w-full border-t border-t-wustomers-border-color'>
						<ul className='mx-auto flex flex-col gap-4 pt-10'>
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
