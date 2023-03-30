import * as Switch from '@radix-ui/react-switch'
import { ReactComponent as Close } from 'assets/icons/close-square.svg'
import { Button } from 'components/Button'
import { useAtom } from 'jotai'
import {
	Controller,
	FieldValues,
	SubmitHandler,
	useForm,
} from 'react-hook-form'
import { toast } from 'react-toastify'
import { campaignAtom } from 'store/atoms'
import { posts } from 'utils/constants'

type InstagramPostsModalProps = {
	closeModal: () => void
	// posts: IGPosts
}

const InstagramPostsModal = ({ closeModal }: InstagramPostsModalProps) => {
	const { handleSubmit, control } = useForm()
	const [, setCampaign] = useAtom(campaignAtom)

	console.log(posts)

	const addPosts: SubmitHandler<FieldValues> = data => {
		// map through data and remove properties with undefiend and false values
		for (const key in data) {
			if (data[key] === undefined || data[key] === false) {
				delete data[key]
			}
		}
		// get selected posts
		const postSelected = Object.keys(data).map(id => {
			return posts?.data.find(post => post.id === id)
		})

		setCampaign(prev => ({ ...prev, socials: [...postSelected] }))
		closeModal()
		toast('Post added successfully!')
	}

	return (
		<div className='grid'>
			<header className='flex items-center justify-between gap-2'>
				<h3 className='text-xl font-semibold'>Instagram posts</h3>
				<button type='button' onClick={closeModal}>
					<Close />
				</button>
			</header>

			<div className='mt-5 text-sm'>
				<div className='grid grid-cols-5 items-center gap-4 border-b border-b-wustomers-dark-gray py-3 px-4 font-medium'>
					<p className='col-span-3'>Posts</p>
					<p className='col-span-1 text-center'>Show on page</p>
					<p className='col-span-1 text-center'>Date</p>
				</div>
				<>
					{posts?.data.length > 0 ? (
						<ul className='h-96 overflow-y-auto'>
							{posts?.data
								?.filter(
									post =>
										post.media_type === 'IMAGE' ||
										post.media_type === 'CAROUSEL_ALBUM'
								)
								.map(post => (
									<li
										className='grid grid-cols-5 items-center gap-4 py-2 px-4'
										key={post.id}
									>
										<div className='col-span-3 flex items-center gap-4'>
											<img
												src={post.media_url}
												alt='woman walkign to a store'
												width={72}
												height={72}
												className='h-20 object-cover'
											/>
											<div>
												{/* <p className='text-base font-semibold'>
										Account user1
									</p> */}
												<p className='pt-1'>{post.caption}</p>
											</div>
										</div>
										<div className='col-span-1 grid place-items-center'>
											<Controller
												name={post.id}
												control={control}
												render={({ field }) => (
													<Switch.Root
														className='h-6 w-12 rounded-sx bg-wustomers-neutral-dark data-[state=checked]:bg-wustomers-blue'
														id={post.id}
														value={post.id}
														checked={field.value}
														onCheckedChange={field.onChange}
													>
														<Switch.Thumb className='data-[state=checked] block h-5 w-5 translate-x-0.5 rounded-sm border border-gray-300 bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[1.6rem]' />
													</Switch.Root>
												)}
											/>
										</div>
										<p className='col-span-1 text-center'>
											{new Date(post.timestamp).toDateString()}
										</p>
									</li>
								))}
						</ul>
					) : (
						<p>You have no post on instagram</p>
					)}

					{/* {posts.paging?.next ? (
						<button className='mt-4'>Next page</button>
					) : null} */}
				</>
			</div>

			<div className='mt-4 flex items-center justify-between gap-2'>
				<p className='text-xs'>Showing: {posts?.data.length} posts</p>
				<div className='flex items-center gap-5'>
					<Button
						text='Cancel'
						variant='outline'
						className='normal-case'
						onClick={closeModal}
					/>
					<Button
						type='submit'
						text='Add posts'
						variant='fill'
						className='normal-case'
						onClick={handleSubmit(addPosts)}
					/>
				</div>
			</div>
		</div>
	)
}
export default InstagramPostsModal
