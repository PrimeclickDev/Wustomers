/* eslint-disable @typescript-eslint/ban-ts-comment */
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
			className='h-[95%] max-w-screen-lg px-1'
		>
			{campaign ? (
				//@ts-ignore
				<Preview activeView='desktop' campaign={campaign} />
			) : null}
		</Modal>
	)
}
