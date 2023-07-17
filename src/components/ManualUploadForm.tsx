import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg'
import {
	Control,
	FieldValues,
	UseFormRegister,
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
}

export const ManualUploadForm = ({
	control,
	register,
}: ManualUploadFormProps<StepTwoSchema>) => {
	const { errors } = useFormState({
		control,
	})
	const { fields, append, remove } = useFieldArray({
		control,
		rules: { required: true },
		name: 'social_posts',
	})
	const post = useWatch({
		control,
		name: 'social_posts',
	})

	return (
		<div className='mx-auto mt-5 bg-wustomers-primary p-6 text-sm'>
			<h4 className='font-bold uppercase'>Add Posts:</h4>

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
							// className='md:col-span-4'
						/>

						<div>
							{post[index]?.image_url?.length ? (
								<img
									// @ts-expect-error string is nsot assignable to blob | media source
									src={URL.createObjectURL(post[index].image_url[0])}
									alt='post'
									className='h-32 w-max object-cover'
								/>
							) : null}

							<div className='flex items-center text-sm md:gap-4'>
								<label className=' cursor-pointer bg-wustomers-main py-2 px-16 text-white transition-opacity hover:opacity-90'>
									Upload
									<input
										type='file'
										id='product_logo'
										className='sr-only'
										accept='.jpg,.jpeg,.png'
										{...register(`social_posts.${index}.image_url`)}
									/>
								</label>
								<span className='text-xs text-wustomers-neutral-dark'>
									Post image format is png, jpeg, jpg. (not more than
									1.5mb)
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

			<button
				type='button'
				onClick={() =>
					append({
						title: '',
						image_url: '',
						posted_date: new Date().toJSON().slice(0, 10),
					})
				}
				className='ml-auto mt-5 rounded-sm bg-wustomers-blue py-1 px-4 text-white transition-opacity hover:opacity-90'
			>
				Add post
			</button>
		</div>
	)
}
