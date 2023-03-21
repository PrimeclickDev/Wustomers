import { useFetchProfile } from 'api/hooks/profile/useFetchProfile'
import { useUpdateAvatar } from 'api/hooks/profile/useUpdateAvatar'
import { ReactComponent as CloseIcon } from 'assets/icons/close-square.svg'
import emptyUserImg from 'assets/images/empty.png'
import { useRef, useState } from 'react'
import ReactCrop, {
	centerCrop,
	Crop,
	makeAspectCrop,
	PixelCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { toast } from 'react-toastify'
import { Button } from './Button'
import { Modal } from './Modal'
import { Spinner } from './Spinner'

const centerAspectCrop = (
	mediaWidth: number,
	mediaHeight: number,
	aspect: number
) => {
	return centerCrop(
		makeAspectCrop(
			{
				unit: '%',
				width: 90,
			},
			aspect,
			mediaWidth,
			mediaHeight
		),
		mediaWidth,
		mediaHeight
	)
}

const aspect = 1 / 1

export const UserAvatar = () => {
	const { data, isFetching } = useFetchProfile()
	const mutation = useUpdateAvatar()
	const [imgSrc, setImgSrc] = useState('')
	const imgRef = useRef<HTMLImageElement>(null)
	const [crop, setCrop] = useState<Crop>()
	const [completedCrop, setCompletedCrop] = useState<PixelCrop>()

	const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setCrop(undefined) // Makes crop preview update between images.
			const reader = new FileReader()
			reader.addEventListener('load', () =>
				setImgSrc(reader.result?.toString() || '')
			)
			reader.readAsDataURL(e.target.files[0])
		}
	}

	const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
		if (aspect) {
			const { width, height } = e.currentTarget
			setCrop(centerAspectCrop(width, height, aspect))
		}
	}

	const generateCroppedImage = () => {
		if (completedCrop) {
			// canvas to draw the cropped image
			const canvas = document.createElement('canvas')
			// current image
			const image = imgRef.current

			if (image) {
				const crop = completedCrop
				const scaleX = image.naturalWidth / image.width
				const scaleY = image.naturalHeight / image.height
				const ctx = canvas.getContext('2d')
				const pixelRatio = window.devicePixelRatio
				canvas.width = crop.width * pixelRatio * scaleX
				canvas.height = crop.height * pixelRatio * scaleY

				if (ctx) {
					ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
					ctx.imageSmoothingQuality = 'high'

					ctx.drawImage(
						image,
						crop.x * scaleX,
						crop.y * scaleY,
						crop.width * scaleX,
						crop.height * scaleY,
						0,
						0,
						crop.width * scaleX,
						crop.height * scaleY
					)
				}

				canvas.toBlob(blob => {
					if (blob) {
						uploadCroppedImage(blob)
					}
				}, 'image/png')
			}
		}
	}

	const uploadCroppedImage = (blob: Blob) => {
		if (blob.size > 5000000) {
			return toast.error('Image size cannot be more than 5MB')
		}

		const formdata = new FormData()
		formdata.append('avatar', blob as Blob, 'user-image')

		mutation.mutate(formdata, {
			onSuccess: () => {
				setImgSrc('')
			},
		})
	}

	return (
		<>
			<div className='order-1 flex flex-col items-center md:order-none'>
				<div className='relative'>
					<img
						src={
							data?.data.data?.profile.user.avatar
								? data?.data.data?.profile.user.avatar
								: emptyUserImg
						}
						alt={
							data?.data.data?.profile.user.avatar
								? `${data?.data.data?.profile.user.first_name} avatar`
								: 'empty user data'
						}
						className={`h-64 w-60 rounded-md bg-wustomers-main/20 object-cover shadow-lg ${
							isFetching ? 'opacity-50' : 'opacity-100'
						}`}
					/>
					{isFetching ? (
						<span className='absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2'>
							<Spinner className='bg-main' />
						</span>
					) : null}
				</div>

				<div className='mt-6 flex flex-col items-start gap-3'>
					<label className='w-full cursor-pointer rounded-sm bg-wustomers-blue px-11 py-2 text-sm font-normal tracking-wider text-white transition hover:scale-[1.01] hover:bg-wustomers-blue/80 active:scale-95 md:text-base'>
						<span>Choose Image</span>
						<input
							type='file'
							id='user-avatar'
							accept='image/png, image/jpeg'
							className='sr-only'
							onChange={onSelectFile}
						/>
					</label>
				</div>
			</div>

			<Modal
				modalOpen={!!imgSrc}
				closeModal={() => setImgSrc('')}
				className='p-0'
			>
				<header className='mb-1 flex items-center justify-between overflow-hidden bg-wustomers-dark-gray px-6 py-2 text-sm font-medium'>
					<h3>Crop your new profile picture</h3>
					<button
						onClick={() => setImgSrc('')}
						aria-label='close modal'
						className='transition-opacity hover:opacity-70'
					>
						<CloseIcon />
					</button>
				</header>
				<div className='max-h-[500px] overflow-auto px-4 py-2'>
					{!!imgSrc && (
						<ReactCrop
							crop={crop}
							onChange={(_, percentCrop) => setCrop(percentCrop)}
							onComplete={c => setCompletedCrop(c)}
							aspect={aspect}
							// ruleOfThirds={true}
						>
							<img
								ref={imgRef}
								alt='Crop me'
								src={imgSrc}
								onLoad={onImageLoad}
							/>
						</ReactCrop>
					)}
				</div>
				<footer className='px-6 py-2'>
					<Button
						text={
							mutation.isLoading ? (
								<Spinner />
							) : (
								'Set new profile picture'
							)
						}
						variant='fill'
						type='button'
						className='w-full rounded font-medium normal-case'
						onClick={generateCroppedImage}
						disabled={mutation.isLoading}
					/>
				</footer>
			</Modal>
		</>
	)
}
