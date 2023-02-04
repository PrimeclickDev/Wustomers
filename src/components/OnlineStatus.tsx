import { ReactComponent as Error } from 'assets/icons/danger.svg'

export const OnlineStatus = () => {
	// const [isOpen, setIsOpen] = useState(true)

	return (
		<div className='fixed top-0 left-0 z-[999] flex w-full translate-y-0 justify-center gap-16 bg-red-100 py-2 px-4 text-center font-bold text-red-500 transition'>
			<div className='flex items-center justify-center gap-2'>
				<div className='rounded bg-red-200 p-2'>
					<Error />
				</div>
				<p>
					Your are currently offline. Kindly check your network connection
				</p>
			</div>

			{/* <button
				onClick={() => setIsOpen(false)}
				className='transition-opacity hover:opacity-90'
			>
				<Close />
			</button> */}
		</div>
	)
}
