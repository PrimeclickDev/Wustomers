/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ReactComponent as CloseIcon } from 'assets/icons/close-square.svg'
import { Campaign } from 'models/campaigns'
import { Modal } from './Modal'
import { Preview } from './Preview'

type PreviewModalProps = {
	openModal: boolean
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
	campaign: Campaign | null
}

export const PreviewModal = ({
	openModal,
	setOpenModal,
	campaign,
}: PreviewModalProps) => {
	return (
		<Modal
			modalOpen={openModal}
			closeModal={() => setOpenModal(false)}
			className='h-[90%] max-w-[1280px] px-4'
		>
			<button
				className='absolute top-1 right-1 z-50 bg-wustomers-blue p-1 text-white'
				type='button'
				onClick={() => setOpenModal(false)}
			>
				<CloseIcon />
			</button>
			{campaign ? (
				//@ts-ignore
				<Preview activeView='desktop' campaign={campaign} />
			) : null}
		</Modal>
	)
}
