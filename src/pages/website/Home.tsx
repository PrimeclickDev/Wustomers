import { ReactComponent as Activity } from 'assets/icons/activity.svg'
import { ReactComponent as Money } from 'assets/icons/money.svg'
import { ReactComponent as Monitor } from 'assets/icons/monitormobbile.svg'
import { ReactComponent as User } from 'assets/icons/useredit.svg'
// this is using 'vite-imagetools' to convert the image to webp and png format
import heroImg from 'assets/images/hero-img.png?format=webp;png'
import { Accordion } from 'components/Accordion'
import { Button } from 'components/Button'
import { HomeSection } from 'components/HomeSection'
import { ImgWithFallback } from 'components/ImgWithFallback'

const Home = () => {
	const howitWorks = [
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
				<div className='relative mx-auto flex max-w-screen-xl flex-col items-center px-2 pt-10 lg:flex-row lg:gap-5 lg:px-2 lg:pt-20'>
					<div className='order-2 mt-6 flex max-w-[70ch] flex-col items-center text-center lg:order-none lg:mt-0 lg:items-start lg:text-left'>
						<h2 className='text-3xl font-bold leading-tight md:text-5xl md:leading-tight lg:text-6xl lg:leading-[72px]'>
							Launch lead generation Google ads campaigns fast with a
							dedicated landing page
						</h2>
						<p className='pt-4 text-base md:text-xl md:leading-8 lg:max-w-[505px] lg:pt-7'>
							We help you bring your product to the outside world from
							your enclosed ecosystem with a click of a button
						</p>

						<Button
							text='Get started'
							type='submit'
							variant='fill'
							href='/signup'
							className='mt-6'
						/>
					</div>

					<ImgWithFallback
						src={heroImg[0]}
						fallback={heroImg[1]}
						type='image/png'
						className='order-1 lg:order-none'
						alt='beautiful african lady holding her phone her chest filled with joy'
					/>
				</div>
			</section>

			{/* what we do */}
			<HomeSection />

			{/* how it works */}
			<section className='mt-20 bg-[#CDD4F4]'>
				<div className='mx-auto flex max-w-screen-xl flex-col items-center gap-10 px-3 py-20 xl:px-0'>
					<h2 className='text-center text-4xl font-bold leading-[43px]'>
						How it works
					</h2>

					<ul className='relative z-10 flex flex-col gap-4 after:absolute after:top-1/2 after:left-0 after:-z-10 after:h-5 after:w-full after:translate-y-1/2 after:bg-[#A2D6F9] md:grid md:grid-cols-2 md:gap-6 xl:grid-cols-4'>
						{howitWorks.map(({ body, icon, title }) => (
							<li
								className='rounded-sx bg-white p-6 transition ease-in-out hover:bg-wustomers-main hover:text-white lg:hover:scale-105'
								key={title}
							>
								<div className='flex h-14 w-14 items-center justify-center rounded-full bg-wustomers-primary-light'>
									{icon}
								</div>
								<h4 className='pt-4 text-xl'>{title}</h4>
								<p className='pt-3 text-sm'>{body}</p>
							</li>
						))}
					</ul>

					<div className='pt-6'>
						<Button
							text='Get started'
							type='submit'
							variant='fill'
							href='/signup'
						/>
					</div>
				</div>
			</section>

			{/* faqs */}
			<section className='mt-60 bg-wustomers-blue'>
				<div className='mx-auto flex max-w-screen-xl flex-col items-center gap-10 px-1'>
					<div className='-mt-44 w-full bg-[#121212] py-5 px-3 lg:w-[900px] lg:py-10 lg:px-12'>
						<h3 className='text-center text-xl font-bold text-white lg:text-[1.75rem]'>
							Frequently Asked Questions (FAQs)
						</h3>

						<Accordion />
					</div>
				</div>
			</section>
		</main>
	)
}

export default Home
