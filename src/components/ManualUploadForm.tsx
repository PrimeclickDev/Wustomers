/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg'
import {
	Control,
	FieldValues,
	UseFormRegister,
	UseFormSetValue,
	useFieldArray,
	useFormState,
	useWatch,
} from 'react-hook-form'
import { ErrorMessage } from './ErrorMessage'
import { StepTwoSchema } from './NewCampaignStepTwo'
import { TextField } from './TextField'

type ManualUploadFormProps<T extends FieldValues> = {
	control: Control<T>
	register: UseFormRegister<T>
	setValue: UseFormSetValue<T>
}

export const ManualUploadForm = ({
	control,
	register,
	setValue,
}: ManualUploadFormProps<StepTwoSchema>) => {
	const { errors } = useFormState({
		control,
	})
	const { fields, append, remove } = useFieldArray({
		control,
		rules: { required: true },
		name: 'social_posts',
	})
	// setValue(``, filterFiles)

	const post = useWatch({
		control,
		name: 'social_posts',
	})
	// const [images, setImages] = useState<Array<{ id: number; image: FileList }>>(
	// 	[]
	// )
	// const [index, setIndex] = useState<null | number>()

	// console.log('images', images)

	// const handleChange = (files: FileList | null, index: number) => {
	// 	if (files) {
	// 		setImages(prev => [...prev, { id: index, image: files }])
	// 		setIndex(index)
	// 	}
	// }

	// useEffect(() => {
	// 	const filterFiles = images
	// 		.filter(img => img.id === index)
	// 		.map(item => item.image)
	// 	// @ts-ignore
	// 	setValue(`social_posts.${index}.image_url`, filterFiles)
	// }, [images])

	// setValue('', )

	return (
		<div className='mx-auto mt-5 bg-wustomers-primary p-6 text-sm'>
			<header className='flex flex-col justify-between gap-2 md:flex-row md:items-center'>
				<div className='flex items-center gap-4'>
					<h4 className='font-bold uppercase'>Add Posts: </h4>
					<button
						type='button'
						onClick={() =>
							append({
								title: '',
								image_url: '',
								posted_date: new Date().toJSON().slice(0, 10),
							})
						}
						className='rounded-sm bg-wustomers-blue py-1 px-4 text-sm text-white transition-opacity hover:opacity-90'
					>
						Add post
					</button>
				</div>

				<p className='text-xs text-wustomers-gray'>
					{fields.length ? `${fields.length} posts` : 'No posts added'}
				</p>
			</header>

			<ul className='grid grid-cols-2 gap-5 pt-5'>
				{fields.map((field, index) => (
					<li
						className='relative space-y-2 rounded-sm bg-white p-3'
						key={field.id}
					>
						<TextField
							control={control}
							name={`social_posts.${index}.title`}
							register={register}
							type='textarea'
							placeholder='Enter post'
						/>

						<div>
							<div className='flex flex-wrap items-center gap-2'>
								{post[index]?.image_url?.length
									? Object.values(post[index]?.image_url).map(
											(item, i) => (
												<div key={i} className='relative'>
													<img
														src={URL.createObjectURL(item)}
														className='h-20 w-max object-cover'
													/>
												</div>
											)
									  )
									: null}
							</div>

							<div className='flex flex-wrap items-center pt-1 text-sm md:gap-1'>
								<label className=' cursor-pointer bg-wustomers-main py-2 px-16 text-white transition-opacity hover:opacity-90'>
									Upload
									<input
										type='file'
										id='product_logo'
										multiple
										className='sr-only'
										accept='.jpg,.jpeg,.png'
										{...register(`social_posts.${index}.image_url`)}
									/>
								</label>
								<span className='text-xs text-wustomers-neutral-dark'>
									Post image format is png, jpeg, jpg. (not more than
									1.5mb). You can select more than one image.
								</span>
							</div>
							{errors?.social_posts && (
								<ErrorMessage
									message={
										// @ts-expect-error TOFIX
										errors?.social_posts?.at(index)?.image_url
											?.message
									}
								/>
							)}
						</div>

						<button
							type='button'
							onClick={() => remove(index)}
							className='absolute -top-2 right-0 rounded-sm bg-red-600 p-1.5 text-white transition-colors hover:bg-red-500'
						>
							<TrashIcon />
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
