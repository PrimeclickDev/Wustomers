import * as Dialog from '@radix-ui/react-dialog'

type ModalProps = {
	modalOpen: boolean
	closeModal: () => void
	children: React.ReactNode
}

export const Modal = ({ children, modalOpen, closeModal }: ModalProps) => {
	return (
		<Dialog.Root open={modalOpen} onOpenChange={closeModal}>
			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 z-50 animate-overlayShow bg-[rgba(47,47,47,0.8)] backdrop:blur-sm' />
				<Dialog.Content className='fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 animate-contentShow rounded-sx bg-white p-6 shadow-2xl focus:outline-none'>
					{children}

					{/* <Dialog.Close asChild>
						<button className='IconButton' aria-label='Close'>
							<CloseSquare />
						</button>
					</Dialog.Close> */}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
