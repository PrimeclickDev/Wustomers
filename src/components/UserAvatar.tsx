import { ReactComponent as CloseIcon } from 'assets/icons/close-square.svg'
import emptyUserImg from 'assets/images/empty.png?format=webp;png'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from './Button'
import { ImgWithFallback } from './ImgWithFallback'
import { Modal } from './Modal'

// upload avatar flow
/*
  upload avatar flow

  - select image to upload
  - show a modal for user to preview the image before uploading it
  - show a button 'set image as profile image' for user to click if they are satistifed with the image
*/

export const UserAvatar = () => {
	// const { register, handleSubmit } = useForm()
	const [selectedImage, setSelectedImage] = useState<File | undefined>(
		undefined
	)

	console.log(selectedImage)

	const uploadImage = () => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		if (selectedImage!.size > 500000) {
			return toast.error('Image size cannot be more than 5MB')
		}
		console.log('hellooooooooo')
	}

	return (
		<>
			<div className='order-1 flex flex-col items-center md:order-none'>
				<ImgWithFallback
					type='image/png'
					fallback={emptyUserImg[1]}
					src={emptyUserImg[0]}
					alt='user'
					className='h-64 w-60 rounded-sx bg-wustomers-main object-cover'
				/>

				<div
					// onSubmit={handleSubmit(onSubmit)}
					className='mt-4 flex flex-col items-start gap-3'
				>
					<label className='w-full cursor-pointer rounded-sm bg-wustomers-blue px-11 py-2 text-sm font-normal tracking-wider text-white transition hover:scale-[1.01] hover:bg-wustomers-blue/80 active:scale-95 md:text-base'>
						<span>Select Image</span>
						<input
							type='file'
							id='user-avatar'
							accept='image/png, image/jpeg'
							className='sr-only'
							onChange={e => setSelectedImage(e.target.files?.[0])}
							// {...register('user-avatar')}
						/>
					</label>
					{/* <Button
						text='Upload Image'
						variant='fill'
						type='button'
						className='font-medium capitalize'
					/> */}
				</div>
			</div>

			<Modal
				modalOpen={!!selectedImage}
				closeModal={() => setSelectedImage(undefined)}
			>
				<button
					onClick={() => setSelectedImage(undefined)}
					aria-label='close modal'
					className='absolute right-4 top-2 mb-5 transition-opacity hover:opacity-70'
				>
					<CloseIcon />
				</button>
				<div className='mt-5'>
					{selectedImage ? (
						<img
							src={URL.createObjectURL(selectedImage)}
							alt='user avatar'
							className='aspect-square rounded object-cover'
						/>
					) : null}
				</div>
				<Button
					text='Upload Image'
					variant='fill'
					type='button'
					className='mt-6 w-full rounded font-medium capitalize'
					onClick={uploadImage}
				/>
			</Modal>
		</>
	)
}
