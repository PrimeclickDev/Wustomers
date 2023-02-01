import { Disclosure, Transition } from '@headlessui/react'
import { ReactComponent as Arrow } from 'assets/icons/chevron-left.svg'

export const Accordion = () => {
	const faqs = [
		{
			id: 1,
			question:
				'Do I need to create a google ads account before I can run my campaigns?',
			answer:
				'consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue ',
		},
		{
			id: 2,
			question:
				'Do I need to create a google ads account before I can run my campaigns?',
			answer:
				'consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue ',
		},
		{
			id: 3,
			question:
				'Do I need to create a google ads account before I can run my campaigns?',
			answer:
				'consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue ',
		},
		{
			id: 4,
			question:
				'Do I need to create a google ads account before I can run my campaigns?',
			answer:
				'consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue ',
		},
		{
			id: 5,
			question:
				'Do I need to create a google ads account before I can run my campaigns?',
			answer:
				'consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue ',
		},
	]
	return (
		<div className='mx-auto mt-8 w-full bg-[#1E1E1E] p-1 text-white lg:py-4 lg:px-7'>
			{faqs?.map(faq => (
				<Disclosure key={faq.id}>
					{({ open }) => (
						<div className='border-b border-b-[#585858] py-2 last-of-type:border-b-0 lg:pb-2 lg:pt-1'>
							<Disclosure.Button className='flex w-full items-center justify-between gap-8 p-2 text-left text-sm focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75 lg:px-4 lg:py-2 lg:text-base'>
								<span>{faq.question}</span>
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
									as='p'
									className='rounded-sx bg-[#2A2A2A] p-4 text-sm leading-relaxed text-white'
								>
									{faq.answer}
								</Disclosure.Panel>
							</Transition>
						</div>
					)}
				</Disclosure>
			))}
		</div>
	)
}
