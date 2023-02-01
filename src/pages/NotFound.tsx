import { ReactComponent as ArrowLeft } from 'assets/icons/arrow-left.svg'
import { WustomersLogo } from 'components/WustomersLogo'
import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center bg-wustomers-blue/5 px-3 text-center'>
			<WustomersLogo className='text-wustomers-blue-light' />
			<h2 className='mt-4 text-3xl font-bold uppercase tracking-wide text-wustomers-blue lg:text-6xl'>
				Page not found...
			</h2>
			{/* <pre className='mt-1 rounded-sm bg-gray-200 py-1 px-4'>
				http://localhost:5173/reset
			</pre> */}
			<p className='pt-2 lg:text-lg'>
				This page is missing or you assembled the link incorretly.
			</p>

			<Link
				to='/'
				className='mt-5 flex items-center gap-2 text-wustomers-blue transition hover:text-wustomers-blue-light active:scale-95'
			>
				<ArrowLeft />
				<span>Go to Home Page</span>
			</Link>
		</main>
	)
}

export default NotFound
