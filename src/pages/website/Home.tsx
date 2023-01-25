import apiConnection from 'assets/images/api-connection.png'
import campaignTracking from 'assets/images/campaign-tracking.png'
import heroImg from 'assets/images/hero-img.jpg'
import productMovement from 'assets/images/product-movement.png'
import { Button } from 'components/Button'

const Home = () => {
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
						<h3 className='pt-7 text-4xl font-bold leading-[43px]'>
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
			<section className='mt-[4.5rem] bg-[#CDD4F4]'>
				<div className='mx-auto flex max-w-screen-xl items-center gap-20 px-2 py-10'>
					<h2 className='text-center text-4xl font-bold leading-[43px]'>
						How it works
					</h2>
				</div>
			</section>
		</main>
	)
}

export default Home
