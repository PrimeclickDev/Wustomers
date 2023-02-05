import apiConnection from 'assets/images/api-connection.png?format=webp;png'
import campaignTracking from 'assets/images/campaign-tracking.png?format=webp;png'
import productMovement from 'assets/images/product-movement.png?format=webp;png'
import { Button } from './Button'
import { ImgWithFallback } from './ImgWithFallback'

export const HomeSection = () => {
	const sections = [
		{
			id: 1,
			subheading: 'What we do',
			heading:
				'We offer you financial opportunities outside a closed system',
			body: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.',
			containsButton: false,
			img: productMovement,
		},
		{
			id: 2,
			subheading: 'Api connection',
			heading:
				'Link your products from IG to a custom landing page for easy Google Ads campaign',
			body: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.',
			containsButton: false,
			img: apiConnection,
		},
		{
			id: 3,
			subheading: 'Campaign tracking',
			heading: 'You keep track your ads campaign data with no complexities.',
			body: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.',
			containsButton: true,
			img: campaignTracking,
		},
	]

	return (
		<>
			{sections.map(info => (
				<section key={info.id}>
					<div className='mx-auto flex max-w-screen-xl flex-col items-center gap-10 px-3 pt-28 md:px-10 lg:flex-row lg:gap-20 lg:px-3 xl:px-0'>
						<div
							className={`${
								info.heading.includes('Link your products')
									? 'order-1 lg:order-2'
									: ''
							}`}
						>
							<ImgWithFallback
								type='image/png'
								fallback={info.img[1]}
								src={info.img[0]}
								alt={`${info.heading} illustration`}
							/>
						</div>
						<div
							className={` md:text-center lg:text-left ${
								info.heading.includes('Link your products')
									? 'order-2 lg:order-1'
									: ''
							}`}
						>
							<p className='text-sm font-medium uppercase tracking-wider text-wustomers-blue md:text-lg'>
								{info.subheading}
							</p>
							<h3 className='max-w-[50ch] pt-1 text-2xl font-bold md:text-4xl md:leading-[43px]'>
								{info.heading}
							</h3>
							<p className='pt-7 text-base md:text-lg md:leading-8 lg:max-w-[50ch]'>
								{info.body}
							</p>

							{info.containsButton ? (
								<Button
									text='Get started'
									type='submit'
									variant='outline'
									href='/signup'
									className='mt-10 inline-block py-2.5 text-wustomers-blue md:mx-auto lg:mx-0'
								/>
							) : null}
						</div>
					</div>
				</section>
			))}
		</>
	)
}
