import { useFetchCampaign } from 'api/hooks/campaign-website/useFetchCamapign'
import { useCampaignAction } from 'api/hooks/campaigns/useCampaignAction'
import { Modal } from 'components/Modal'
import { Spinner } from 'components/Spinner'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { useCampaignContact } from 'api/hooks/campaign-website/useCampaignContact'
import { usePageTitle } from 'hooks/usePageTitle'
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
	const [openModal, setOpenModal] = useState(false)
	const { data: campaign, isLoading } = useFetchCampaign(params.id as string)
	const campaignAction = useCampaignAction()
	const contact = useCampaignContact()

	usePageTitle(`${campaign?.title} - Wustomers`)
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({})

	const fetchContact = () => {
		campaignAction.mutate({
			campaignId: campaign?.campaign_code as string,
			action: 'contact',
		})
	}

	if (isLoading) {
		return <Loader />
	}

	const submitForm = (data: any) => {
		contact.mutate(
			{
				...data,
				campaign_code: campaign?.campaign_code as string,
			},
			{
				onSuccess: () => {
					setOpenModal(false)
				},
			}
		)
	}

	return (
		<>
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
							<div
								className={`campaign-website-container relative z-50 flex items-center ${
									campaign?.logo_position === 'left'
										? 'justify-start'
										: campaign?.logo_position === 'right'
										? 'justify-end'
										: 'justify-center'
								} rounded-md bg-white shadow-2xl`}
							>
								<img
									src={campaign?.product_logo}
									alt={`${campaign?.title} logo`}
									width='60'
									className=''
								/>
							</div>
						</section>

						{/* hero */}
						<section className='relative z-50 mx-auto flex h-[90%]  flex-col items-center justify-center px-3 text-center md:px-0'>
							<div className='max-w-[80ch]'>
								<h2 className='text-5xl font-black text-white'>
									{campaign?.header_content}
								</h2>
							</div>
							<p className='max-w-[60ch] pt-3 leading-relaxed text-gray-200'>
								{campaign?.subheading_content}
							</p>
							{campaign?.contact_option === 'form' ? (
								<button
									className='mx-auto mt-8 block w-max rounded bg-white px-12 py-[10px] transition-opacity hover:opacity-80'
									type='button'
									onClick={() => setOpenModal(true)}
								>
									{campaign?.button_text}
								</button>
							) : (
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
									onClick={fetchContact}
								>
									<span>{campaign?.button_text}</span>{' '}
									<span aria-hidden='true'>&rarr;</span>
								</a>
							)}
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
										<div className='mt-2 rounded-lg bg-neutral-200 px-4 py-3'>
											<p>{post.title}</p>
											{post.post_url ? (
												<a
													href={post.post_url}
													target='_blank'
													rel='noopener noreferrer'
													className='inline-block pt-3 text-right text-xs font-medium text-wustomers-blue transition-all hover:underline'
												>
													View on Instagram{' '}
													<span aria-hidden='true'>&rarr;</span>
												</a>
											) : null}
										</div>
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
									Created with Wustomers
								</a>
							</strong>
							. All rights reserved.
						</p>
					</div>
				</footer>
			</div>

			<Modal modalOpen={openModal} closeModal={() => setOpenModal(false)}>
				<form onSubmit={handleSubmit(submitForm)}>
					<h3 className='text-lg'>Contact:</h3>

					<div className='mt-4 flex flex-col gap-3 text-sm'>
						{campaign?.campaignFormRequirement?.full_name ? (
							<div className='flex flex-col gap-1'>
								<label htmlFor='full_name'>Your full name</label>
								<input
									type='text'
									{...register('full_name', {
										required: true,
									})}
									id='full_name'
									className={`w-full appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
										errors.full_name?.type === 'required'
											? 'bg-red-50 ring-red-600'
											: 'bg-wustomers-primary ring-wustomers-primary-light'
									}`}
								/>
								{errors.full_name && (
									<span className='text-xs text-red-600'>
										Please enter your full name
									</span>
								)}
							</div>
						) : null}

						{campaign?.campaignFormRequirement?.email ? (
							<div className='flex flex-col gap-1'>
								<label htmlFor='email'>Your email address</label>
								<input
									type='email'
									{...register('email', {
										required: true,
									})}
									id='email'
									className={`w-full appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
										errors.email?.type === 'required'
											? 'bg-red-50 ring-red-600'
											: 'bg-wustomers-primary ring-wustomers-primary-light'
									}`}
								/>
								{errors.email && (
									<span className='text-xs text-red-600'>
										Please enter your email address
									</span>
								)}
							</div>
						) : null}

						{campaign?.campaignFormRequirement?.phone_number ? (
							<div className='flex flex-col gap-1'>
								<label htmlFor='phone_number'>Your phone number</label>
								<input
									type='text'
									inputMode='numeric'
									{...register('phone_number', {
										required: true,
									})}
									id='phone_number'
									className={`w-full appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
										errors.phone_number?.type === 'required'
											? 'bg-red-50 ring-red-600'
											: 'bg-wustomers-primary ring-wustomers-primary-light'
									}`}
								/>
								{errors.full_name && (
									<span className='text-xs text-red-600'>
										Please enter your phone number
									</span>
								)}
							</div>
						) : null}

						{campaign?.campaignFormRequirement?.location ? (
							<div className='flex flex-col gap-1'>
								<label htmlFor='location'>Your location</label>
								<input
									type='text'
									{...register('location', {
										required: true,
									})}
									required
									id='location'
									className={`w-full appearance-none rounded-sm px-4 py-2.5 ring-[1.5px] ${
										errors.location?.type === 'required'
											? 'bg-red-50 ring-red-600'
											: 'bg-wustomers-primary ring-wustomers-primary-light'
									}`}
								/>
								{errors.location && (
									<span className='text-xs text-red-600'>
										Please enter your location
									</span>
								)}
							</div>
						) : null}

						<button
							type='submit'
							disabled={contact.isLoading}
							className={`flex items-center justify-center rounded-sm bg-wustomers-blue px-11 py-2 font-medium uppercase tracking-wider text-white transition-all hover:scale-[1.01] hover:bg-wustomers-blue/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-wustomers-blue/20 disabled:hover:scale-100 disabled:hover:shadow-none lg:hover:shadow-xl lg:hover:shadow-wustomers-blue/20`}
						>
							{contact.isLoading ? 'Submitting...' : 'Submit'}
						</button>
					</div>
				</form>
			</Modal>
		</>
	)
}

export default CampaignWebsite
