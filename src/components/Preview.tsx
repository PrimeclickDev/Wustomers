/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/display-name */
import { CampaignFormData } from 'models/campaigns'
import { forwardRef, useState } from 'react'
import 'styles/campaign-website.css'
import { Modal } from './Modal'

type PreviewProps = {
	activeView: string
	campaign: CampaignFormData
}

type Ref = HTMLIFrameElement

export const Preview = forwardRef<Ref, PreviewProps>(
	({ activeView, campaign }, ref) => {
		const [openModal, setOpenModal] = useState(false)
		const logo =
			typeof campaign?.product_logo === 'string'
				? campaign?.product_logo
				: URL.createObjectURL(campaign?.product_logo[0])
		const bgImg =
			typeof campaign?.background_image === 'string'
				? campaign?.background_image
				: URL.createObjectURL(campaign?.background_image[0])

		const campaignContactForm =
			campaign.form_field?.at(0) ?? campaign.campaignFormRequirement

		return (
			<>
				<div
					ref={ref}
					className='mx-auto font-figtree transition-all'
					style={{
						width: `${activeView === 'mobile' ? '360px' : '100%'}`,
					}}
				>
					<header className='w-full'>
						<div
							className='relative h-[630px] bg-black bg-cover bg-center py-4 after:absolute after:top-0 after:left-0 after:z-10 after:h-full after:w-full after:bg-black/60'
							style={{
								backgroundImage: `url(${bgImg})`,
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
										src={logo}
										alt={`${campaign?.title} logo`}
										width='60'
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
								{campaign.contact_option === 'form' ? (
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
											campaign.contact_option === 'email'
												? `mailto:${
														campaign.contact_option_link ??
														campaign.contact_option_medium
												  }`
												: campaign.contact_option === 'phone'
												? `tel:${
														campaign.contact_option_link ??
														campaign.contact_option_medium
												  }`
												: campaign.contact_option === 'whatsapp'
												? `https://wa.me/${
														campaign.contact_option_link ??
														campaign.contact_option_medium
												  }`
												: `https://www.instagram.com/${
														campaign.contact_option_link ??
														campaign.contact_option_medium
												  }/`
										}
										target='_blank'
										rel='noopener noreferrer'
										className='mx-auto mt-8 block w-max rounded bg-white px-12 py-[10px] transition-opacity hover:opacity-80'
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
												src={
													typeof post.image_url === 'string'
														? post.image_url
														: URL.createObjectURL(
																post.image_url[0]
														  )
												}
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
												{testimonial.name} -{' '}
												{testimonial.designation}
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
					<form>
						<h3 className='text-lg'>Contact:</h3>

						<div className='mt-4 flex flex-col gap-3 text-sm'>
							{campaignContactForm?.full_name ? (
								<div className='flex flex-col gap-1'>
									<label htmlFor='full_name'>Your full name</label>
									<input
										type='text'
										id='full_name'
										className={`w-full appearance-none rounded-sm bg-wustomers-primary px-4 py-2.5 ring-[1.5px] ring-wustomers-primary-light`}
									/>
								</div>
							) : null}

							{campaignContactForm?.email ? (
								<div className='flex flex-col gap-1'>
									<label htmlFor='email'>Your email address</label>
									<input
										type='email'
										id='email'
										className={`w-full appearance-none rounded-sm bg-wustomers-primary px-4 py-2.5 ring-[1.5px] ring-wustomers-primary-light`}
									/>
								</div>
							) : null}

							{campaignContactForm?.phone_number ? (
								<div className='flex flex-col gap-1'>
									<label htmlFor='phone_number'>
										Your phone number
									</label>
									<input
										type='text'
										inputMode='numeric'
										id='phone_number'
										className={`w-full appearance-none rounded-sm bg-wustomers-primary px-4 py-2.5 ring-[1.5px] ring-wustomers-primary-light`}
									/>
								</div>
							) : null}

							{campaignContactForm?.location ? (
								<div className='flex flex-col gap-1'>
									<label htmlFor='location'>Your location</label>
									<input
										type='text'
										required
										id='location'
										className={`w-full appearance-none rounded-sm bg-wustomers-primary px-4 py-2.5 ring-[1.5px] ring-wustomers-primary-light`}
									/>
								</div>
							) : null}

							<button
								type='submit'
								disabled
								className='flex items-center justify-center rounded-sm bg-wustomers-blue px-11 py-2 font-medium uppercase tracking-wider text-white transition-all hover:scale-[1.01] hover:bg-wustomers-blue/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-wustomers-blue/20 disabled:hover:scale-100 disabled:hover:shadow-none lg:hover:shadow-xl lg:hover:shadow-wustomers-blue/20'
							>
								Submit
							</button>
						</div>
					</form>
				</Modal>
			</>
		)
	}
)
