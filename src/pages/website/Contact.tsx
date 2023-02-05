import { ReactComponent as ContactIllustration } from 'assets/icons/contact-us-illustration.svg'
import { ReactComponent as Facebook } from 'assets/icons/facebook.svg'
import { ReactComponent as Instagram } from 'assets/icons/instagram.svg'
import { ReactComponent as Linkedln } from 'assets/icons/linkedln.svg'
import { ReactComponent as Twitter } from 'assets/icons/twitter.svg'
import { Button } from 'components/Button'

const Contact = () => {
	return (
		<main className='py-20 text-center lg:pb-44'>
			<div className='mx-auto max-w-screen-xl px-3 xl:px-0'>
				<h2 className='text-4xl font-bold lg:text-6xl'>Contact</h2>

				<section className='mt-10 flex flex-col lg:mt-16 lg:grid lg:grid-cols-2 lg:gap-0 lg:overflow-hidden xl:gap-32'>
					<div className='rounded-sx bg-wustomers-primary-light p-6 px-3 text-left lg:px-6'>
						<form className='flex flex-col'>
							<h3 className='max-w-sm text-base text-black lg:text-xl'>
								Feel free to let us what you have to tell us and how we
								can be of help:
							</h3>

							<div className='mt-5 flex flex-col gap-5'>
								<div className='flex flex-col gap-2'>
									<label htmlFor='name' className='text-[#6D6D6D]'>
										Name
									</label>
									<input
										type='text'
										name='name'
										id='name'
										className='rounded-sx px-4 py-3'
									/>
								</div>
								<div className='flex flex-col gap-2'>
									<label htmlFor='email' className='text-[#6D6D6D]'>
										Email
									</label>
									<input
										type='email'
										name='email'
										id='email'
										className='rounded-sx px-4 py-3'
									/>
								</div>
								<div className='flex flex-col gap-2'>
									<label htmlFor='message' className='text-[#6D6D6D]'>
										Message
									</label>
									<textarea
										name='message'
										id='message'
										className='h-40 resize-none rounded-sx px-4 py-3'
									></textarea>
								</div>
							</div>

							<div className='mt-7 self-end'>
								<Button text='Send' type='submit' variant='fill' />
							</div>
						</form>

						<div className='mt-7 border-t border-t-wustomers-border-color pt-7'>
							<p className='text-base lg:text-lg'>
								Contact us directly on:
							</p>
							<ul className='flex items-center gap-6 pt-5'>
								<li>
									<a href='#'>
										<Facebook />
									</a>
								</li>
								<li>
									<a href='#'>
										<Linkedln />
									</a>
								</li>
								<li>
									<a href='#'>
										<Twitter />
									</a>
								</li>
								<li>
									<a href='#'>
										<Instagram />
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div className='hidden lg:block'>
						<ContactIllustration />
					</div>
				</section>
			</div>
		</main>
	)
}
export default Contact
