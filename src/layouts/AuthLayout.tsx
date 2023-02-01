import { WustomersLogo } from 'components/WustomersLogo'

type AuthLayoutProps = {
	imgSrc: string
	text: string
	children: React.ReactNode
	imgWidth: number
}

// wrapper for signup, login and forgot password
export const AuthLayout = ({
	children,
	imgSrc,
	text,
	imgWidth,
}: AuthLayoutProps) => {
	return (
		<main className='min-h-screen lg:grid lg:grid-cols-5 lg:gap-3 xl:gap-10'>
			<section className='col-span-3 flex flex-col items-center bg-wustomers-blue-light px-5 py-10 lg:items-start lg:px-20 lg:pt-16'>
				<WustomersLogo className='text-white' />

				<img
					src={imgSrc}
					alt='illustration'
					width={imgWidth}
					// height={448}
					className='mt-12'
				/>

				<p className='pt-8 text-center text-lg font-medium text-white lg:w-96 lg:text-left lg:text-2xl'>
					{text}
				</p>
			</section>
			<section className='col-span-2 py-10 px-3 md:mt-20 md:px-10 lg:px-3 xl:px-0 xl:py-0 xl:pr-32'>
				{children}
			</section>
		</main>
	)
}
