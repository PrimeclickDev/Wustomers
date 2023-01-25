import { ReactComponent as ContactIllustration } from 'assets/icons/contact-us-illustration.svg'
import { ReactComponent as Facebook } from 'assets/icons/facebook.svg'
import { ReactComponent as Instagram } from 'assets/icons/instagram.svg'
import { ReactComponent as Linkedln } from 'assets/icons/linkedln.svg'
import { ReactComponent as Twitter } from 'assets/icons/twitter.svg'
import { Button } from 'components/Button'

const Contact = () => {
	return (
		<main className='pt-14 pb-44 text-center'>
			<div className='mx-auto max-w-screen-xl px-2'>
				<h2 className='text-6xl font-bold'>Contact</h2>

				<section className='mt-16 grid grid-cols-2 gap-32'>
					<div className='rounded-wu bg-wustomers-primary-light p-6 text-left'>
						<form className='flex flex-col'>
							<h3 className='max-w-sm text-xl text-black'>
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
										className='rounded-wu px-4 py-3'
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
										className='rounded-wu px-4 py-3'
									/>
								</div>
								<div className='flex flex-col gap-2'>
									<label htmlFor='message' className='text-[#6D6D6D]'>
										Message
									</label>
									<textarea
										name='message'
										id='message'
										className='h-40 resize-none rounded-wu px-4 py-3'
									></textarea>
								</div>
							</div>

							<div className='mt-7 self-end'>
								<Button text='Send' type='submit' variant='fill' />
							</div>
						</form>

						<div className='mt-7 border-t border-t-wustomers-border-color pt-7'>
							<p className='text-lg'>Contact us directly on:</p>
							<ul className='flex items-center gap-6 pt-5 text-red-500'>
								<li>
									<a href='#'>
										<Facebook className='invert' />
									</a>
								</li>
								<li>
									<a href='#'>
										<Linkedln className='invert' />
									</a>
								</li>
								<li>
									<a href='#'>
										<Twitter className='invert' />
									</a>
								</li>
								<li>
									<a href='#'>
										<Instagram className='invert' />
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div className='h-[586px] w-[586px] rounded-full bg-gray-200'>
						<ContactIllustration />
					</div>
				</section>
			</div>
		</main>
	)
}
export default Contact
