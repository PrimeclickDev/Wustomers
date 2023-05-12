import { useFetchCampaign } from 'api/hooks/campaigns/useFetchCamapign'
import { Spinner } from 'components/Spinner'
import { useParams } from 'react-router-dom'

import 'styles/campaign-website.css'

const Loader = () => {
	return (
		<div className='flex h-screen w-full flex-col items-center justify-center'>
			<Spinner className='text-wustomers-blue' />
			<h2 className='pt-2 text-center font-bold text-neutral-600'>
				Loading...
			</h2>
		</div>
	)
}

const CampaignWebsite = () => {
	const params = useParams()
	const { data: campaign, isLoading } = useFetchCampaign(params.id as string)

	if (isLoading) {
		return <Loader />
	}

	return (
		<div className='font-figtree'>
			<header className='w-full'>
				<div
					className='relative h-[630px] bg-black bg-cover bg-center py-4 after:absolute after:top-0 after:left-0 after:z-10 after:h-full after:w-full after:bg-black/60'
					style={{
						backgroundImage: `url(${campaign?.background_image})`,
					}}
				>
					{/* header */}
					<section className='px-4'>
						<div className='campaign-website-container relative z-50 grid place-items-center rounded-md bg-white shadow-2xl'>
							<img
								src={campaign?.product_logo}
								alt={`${campaign?.title} logo`}
								width='30'
							/>
						</div>
					</section>

					{/* hero */}
					<section className='relative z-50 mx-auto flex h-[90%]  flex-col items-center justify-center px-3 text-center md:px-0'>
						<div className='max-w-[90ch]'>
							<p className='mx-auto w-max rounded bg-neutral-900 py-1 px-10 text-xs uppercase tracking-[3px] text-neutral-300'>
								{campaign?.title}
							</p>
							<h2 className=' pt-1 text-5xl font-black text-white md:text-7xl'>
								{campaign?.header_content}
							</h2>
						</div>
						<p className='max-w-[60ch] pt-7 leading-relaxed text-gray-200'>
							{campaign?.subheading_content}
						</p>
						<a
							href={
								campaign?.contact_option === 'email'
									? `mailto:${campaign?.contact_option_medium}`
									: campaign?.contact_option === 'phone'
									? `tel:${campaign?.contact_option_medium}`
									: campaign?.contact_option === 'whatsapp'
									? `https://wa.me/${campaign?.contact_option_medium}`
									: `https://www.instagram.com/${campaign?.contact_option_medium}/`
							}
							target='_blank'
							rel='noopener noreferrer'
							className='mx-auto mt-8 block w-max rounded bg-white px-12 py-[10px] transition-opacity hover:opacity-80'
						>
							<span>{campaign?.button_text}</span>{' '}
							<span aria-hidden='true'>&rarr;</span>
						</a>
					</section>
				</div>
			</header>

			{campaign?.body_heading && campaign?.body_description ? (
				<section className='mx-auto max-w-[80ch] px-3 pt-24 pb-20 text-center'>
					<h2 className='text-4xl font-black text-neutral-900'>
						{campaign?.body_heading}
					</h2>
					<p className='pt-6 text-neutral-600'>
						{campaign?.body_description}
					</p>
				</section>
			) : null}

			{/* posts */}
			{campaign?.social_posts.length ? (
				<section className='pb-20 pt-10'>
					<div className='campaign-website-container'>
						<h2 className='text-center text-4xl font-black text-neutral-900'>
							Posts
						</h2>
						<ul className='grid grid-cols-fluid gap-6 pt-12'>
							{campaign?.social_posts.map((post, index) => (
								<li
									className='max-w-[400px] justify-self-center'
									key={index}
								>
									<img
										src={post.image_url}
										alt='post picture'
										className='h-96 w-full rounded-lg object-cover'
									/>
									<p className='mt-2 rounded-lg bg-neutral-200 px-4 py-3'>
										{post.title}
									</p>
								</li>
							))}
						</ul>
					</div>
				</section>
			) : null}

			{/* testimonials */}
			{(campaign?.testimonials.length as number) ? (
				<section className='mt-20 bg-neutral-300 py-24'>
					<div className='campaign-website-container'>
						<h2 className='text-center text-4xl font-black text-neutral-900'>
							Testimonials
						</h2>
						<ul className='grid grid-cols-fluid gap-6 pt-12'>
							{campaign?.testimonials.map((testimonial, index) => (
								<li
									className='max-w-[400px] justify-self-center rounded-lg bg-neutral-900 p-6 hover:bg-opacity-90 hover:transition-colors'
									key={index}
								>
									<p className='text-neutral-300'>
										{testimonial.comment}
									</p>
									<h3 className='pt-4 text-sm font-bold text-white'>
										{testimonial.name} - {testimonial.designation}
									</h3>
								</li>
							))}
						</ul>
					</div>
				</section>
			) : null}

			{/* footer */}
			<footer className='bg-neutral-900'>
				<div className='campaign-website-container !py-24'>
					<h2 className='text-center font-bold uppercase tracking-[3px] text-white'>
						Contact Information
					</h2>

					<ul className='flex flex-col items-center gap-10 pt-12 text-center text-gray-200'>
						<li>
							<h4 className='text-xs font-bold uppercase tracking-widest text-neutral-300'>
								Address
							</h4>
							<p className='pt-1'>{campaign?.office_address}</p>
						</li>
						<li>
							<h4 className='text-xs font-bold uppercase tracking-widest text-neutral-300'>
								Phone number
							</h4>
							<a
								href={`tel:${campaign?.phone}`}
								className='inline-block pt-1 hover:underline'
							>
								(+234) {campaign?.phone}
							</a>
						</li>
						<li>
							<h4 className='text-xs font-bold uppercase tracking-widest text-neutral-300'>
								Email address
							</h4>
							<a
								href={`mailto:${campaign?.email}`}
								className='inline-block pt-1 hover:underline'
							>
								{campaign?.email}
							</a>
						</li>
					</ul>
				</div>

				<div className='campaign-website-container'>
					<p className='mb-1 rounded bg-neutral-800 py-3 text-center text-xs text-gray-200'>
						&copy; {new Date().getFullYear()}{' '}
						<strong>
							<a
								href='https://wustomers.netlify.app/'
								className='hover:underline'
							>
								Created by Wustomers
							</a>
						</strong>
						. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	)
}

export default CampaignWebsite
