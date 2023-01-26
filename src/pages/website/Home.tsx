import { ReactComponent as Activity } from 'assets/icons/activity.svg'
import { ReactComponent as Money } from 'assets/icons/money.svg'
import { ReactComponent as Monitor } from 'assets/icons/monitormobbile.svg'
import { ReactComponent as User } from 'assets/icons/useredit.svg'
import apiConnection from 'assets/images/api-connection.png'
import campaignTracking from 'assets/images/campaign-tracking.png'
import heroImg from 'assets/images/hero-img.jpg'
import productMovement from 'assets/images/product-movement.png'
import { Button } from 'components/Button'

const Home = () => {
	const info = [
		{
			title: 'Create Account',
			body: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
			icon: <User />,
		},
		{
			title: 'Build Landing page',
			body: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
			icon: <Monitor />,
		},
		{
			title: 'Pay Google ads budget',
			body: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
			icon: <Money />,
		},
		{
			title: 'Study metrics',
			body: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
			icon: <Activity />,
		},
	]
	return (
		<main>
			{/* hero */}
			<section>
				<div className='mx-auto flex max-w-screen-xl items-center gap-20 px-2 pt-20'>
					<div className='max-w-[70ch]'>
						<h2 className='text-6xl font-black leading-[72px]'>
							Launch lead generation Google ads campaigns fast with a
							dedicated landing page
						</h2>
						<p className='max-w-[505px] pt-7 text-xl leading-8'>
							We help you bring your product to the outside world from
							your enclosed ecosystem with a click of a button
						</p>

						<div className='pt-6'>
							<Button text='Get started' type='submit' variant='fill' />
						</div>
					</div>

					<div>
						<img
							src={heroImg}
							alt='beautiful african lady holding her phone her chest filled with joy'
						/>
					</div>
				</div>
			</section>

			{/* what we do */}
			<section>
				<div className='mx-auto flex max-w-screen-xl items-center gap-20 px-2 pt-20'>
					<div>
						<img
							src={productMovement}
							alt='product movement illustration'
						/>
					</div>

					<div>
						<p className='text-2xl font-medium text-wustomers-blue'>
							What we do
						</p>
						<h3 className='pt-5 text-4xl font-bold leading-[43px]'>
							We offer you financial opportunities outside a closed
							system
						</h3>
						<p className='max-w-[50ch] pt-7 text-lg leading-8'>
							Aliqua id fugiat nostrud irure ex duis ea quis id quis ad
							et. Sunt qui esse pariatur duis deserunt mollit dolore
							cillum minim tempor enim. Elit aute irure tempor cupidatat
							incididunt sint deserunt ut voluptate aute id deserunt
							nisi. Aliqua id fugiat nostrud irure ex duis ea quis id
							quis ad et.
						</p>
					</div>
				</div>
			</section>

			{/* api connection */}
			<section>
				<div className='mx-auto flex max-w-screen-xl items-center gap-20 px-2 pt-20'>
					<div>
						<h3 className='max-w-[50ch] pt-7 text-4xl font-bold leading-[43px]'>
							Link your products from IG to a custom landing page for
							easy Google Ads campaign
						</h3>
						<p className='max-w-[50ch] pt-7 text-lg leading-8'>
							Aliqua id fugiat nostrud irure ex duis ea quis id quis ad
							et. Sunt qui esse pariatur duis deserunt mollit dolore
							cillum minim tempor enim. Elit aute irure tempor cupidatat
							incididunt sint deserunt ut voluptate aute id deserunt
							nisi. Aliqua id fugiat nostrud irure ex duis ea quis id
							quis ad et.
						</p>
					</div>

					<div>
						<img src={apiConnection} alt='api connection illustration' />
					</div>
				</div>
			</section>

			{/* campaign tracking */}
			<section>
				<div className='mx-auto flex max-w-screen-xl items-center gap-20 px-2 pt-20'>
					<div>
						<img
							src={campaignTracking}
							alt='campaign tracking illustration'
						/>
					</div>
					<div>
						<h3 className='pt-7 text-4xl font-bold leading-[43px]'>
							You keep track your ads campaign data with no complexities.
						</h3>
						<p className='max-w-[50ch] pt-7 text-lg leading-8'>
							Aliqua id fugiat nostrud irure ex duis ea quis id quis ad
							et. Sunt qui esse pariatur duis deserunt mollit dolore
							cillum minim tempor enim. Elit aute irure tempor cupidatat
							incididunt sint deserunt ut voluptate aute id deserunt
							nisi. Aliqua id fugiat nostrud irure ex duis ea quis id
							quis ad et.
						</p>
						<div className='pt-6'>
							<Button
								text='Get started'
								type='submit'
								variant='outline'
							/>
						</div>
					</div>
				</div>
			</section>

			{/* how it works */}
			<section className='mt-20 bg-[#CDD4F4]'>
				<div className='mx-auto flex max-w-screen-xl flex-col items-center gap-10 px-2 py-20'>
					<h2 className='text-center text-4xl font-bold leading-[43px]'>
						How it works
					</h2>

					<ul className='relative z-10 grid grid-cols-4 gap-6 after:absolute after:top-1/2 after:left-0 after:-z-10 after:h-5 after:w-full after:translate-y-1/2 after:bg-[#A2D6F9]'>
						{info.map(({ body, icon, title }) => (
							<li className='rounded-sx bg-white p-6' key={title}>
								<div className='flex h-14 w-14 items-center justify-center rounded-full bg-wustomers-primary-light'>
									{icon}
								</div>
								<h4 className='pt-4 text-xl'>{title}</h4>
								<p className='pt-3 text-sm'>{body}</p>
							</li>
						))}
					</ul>

					<div className='pt-6'>
						<Button text='Get started' type='submit' variant='fill' />
					</div>
				</div>
			</section>

			{/* faqs */}
			<section className='mt-28 bg-wustomers-blue'>
				<div className='mx-auto flex max-w-screen-xl flex-col items-center gap-10 px-2'>
					<div className='-mt-10 max-w-[900px] bg-[#121212] py-10 px-12'>
						<h3 className='text-center text-2xl text-white'>
							Frequently Asked Questions (FAQs)
						</h3>
					</div>
				</div>
			</section>
		</main>
	)
}

export default Home
