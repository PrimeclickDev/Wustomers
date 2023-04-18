import { UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import React from 'react'
import { Button } from './Button'
import { Modal } from './Modal'

type ConfirmationModalProps = {
	openModal: boolean
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
	mutationAction: UseMutationResult<
		AxiosResponse<any, any>,
		unknown,
		number,
		unknown
	>
	onClick: () => void
	title: string
}

export const ConfirmationModal = ({
	openModal,
	setOpenModal,
	mutationAction,
	onClick,
	title,
}: ConfirmationModalProps) => {
	return (
		<Modal modalOpen={openModal} closeModal={() => setOpenModal(false)}>
			<div className='flex flex-col items-center text-center'>
				<h3 className='max-w-[20ch] pt-2 text-xl font-medium'>{title}</h3>

				<div className='mt-6 flex items-center gap-5 md:mx-8'>
					<Button
						variant='outline'
						onClick={() => setOpenModal(false)}
						text='No, Cancel'
						className='px-8 normal-case hover:shadow-none'
					/>
					<Button
						disabled={mutationAction.isLoading}
						text={
							mutationAction.isLoading ? 'Deleting...' : 'Yes, Delete'
						}
						variant='fill'
						className='py-2 px-8 normal-case hover:shadow-none'
						onClick={onClick}
					/>
				</div>
			</div>
		</Modal>
	)
}
