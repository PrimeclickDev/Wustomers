import { ReactComponent as Logo } from 'assets/icons/logo.svg'
import 'styles/page-loader.css'

export const PageLoader = () => {
	return (
		<div className='z-10 grid min-h-screen place-content-center'>
			<div className='loader-outer text-wustomers-blue'>
				<Logo width={40} />
				<div className='loader'>
					<div className='loader-inner'></div>
				</div>
			</div>
			<p className='-mt-2 text-center text-sm font-bold uppercase tracking-widest text-gray-500'>
				Loading...
			</p>
		</div>
	)
}
