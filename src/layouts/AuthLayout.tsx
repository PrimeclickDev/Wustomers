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
		<main className='min-h-screen lg:grid lg:grid-cols-5 lg:gap-10'>
			<section className='col-span-3 bg-wustomers-blue-light px-20 pt-16'>
				<WustomersLogo className='text-white' />

				<img
					src={imgSrc}
					alt='illustration'
					width={imgWidth}
					// height={448}
					className='mt-12'
				/>

				<p className='w-96 pt-8 text-2xl font-medium text-white'>{text}</p>
			</section>
			<section className='col-span-2 mt-20 pr-32'>{children}</section>
		</main>
	)
}
