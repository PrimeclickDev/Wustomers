import { Disclosure, Transition } from '@headlessui/react'
import { ReactComponent as Arrow } from 'assets/icons/chevron-left.svg'

type DetailsProps = {
	heading: string
	children: React.ReactNode
}

export const Details = ({ heading, children }: DetailsProps) => {
	return (
		<Disclosure>
			{({ open }) => (
				<div className='py-2 last-of-type:border-b-0 lg:pb-2 lg:pt-1'>
					<Disclosure.Button
						className={`flex w-full items-center justify-between gap-8 rounded-sx p-2 text-left text-sm text-white transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wustomers-blue lg:px-4 lg:py-2 lg:text-base ${
							open
								? 'bg-wustomers-blue-light'
								: 'bg-[#9CAAE9] hover:bg-wustomers-blue/50'
						}`}
					>
						<h3 className='text-lg'>{heading}</h3>
						<Arrow
							className={`transition-transform ${
								open ? 'transform' : '-rotate-90 transform'
							}`}
						/>
					</Disclosure.Button>
					<Transition
						enter='transition duration-100 ease-out'
						enterFrom='transform scale-95 opacity-0'
						enterTo='transform scale-100 opacity-100'
						leave='transition duration-75 ease-out'
						leaveFrom='transform scale-100 opacity-100'
						leaveTo='transform scale-95 opacity-0'
					>
						<Disclosure.Panel
							as='div'
							className='mt-1 bg-white px-6 pt-1 pb-5'
						>
							{children}
						</Disclosure.Panel>
					</Transition>
				</div>
			)}
		</Disclosure>
	)
}
