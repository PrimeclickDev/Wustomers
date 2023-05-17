import * as Switch from '@radix-ui/react-switch'
import { ReactComponent as Close } from 'assets/icons/close-square.svg'
import { Button } from 'components/Button'
import { format } from 'date-fns'
import useMediaQuery from 'hooks/useMediaQuery'
import { useAtom } from 'jotai'
import { IGPosts } from 'models/shared'
import {
	Controller,
	FieldValues,
	SubmitHandler,
	useForm,
} from 'react-hook-form'
import { toast } from 'react-toastify'
import { campaignAtom } from 'store/atoms'

type InstagramPostsModalProps = {
	closeModal: () => void
	posts: IGPosts
}

const InstagramPostsModal = ({
	closeModal,
	posts,
}: InstagramPostsModalProps) => {
	const { handleSubmit, control } = useForm()
	const [, setCampaign] = useAtom(campaignAtom)
	const matches = useMediaQuery('(min-width: 768px)')

	const addPosts: SubmitHandler<FieldValues> = data => {
		// map through data and remove properties with undefined and false values
		for (const key in data) {
			if (data[key] === undefined || data[key] === false) {
				delete data[key]
			}
		}
		// get selected posts
		const postSelected = Object.keys(data).map(id => {
			return posts.data.find(post => post.id === id)
		})

		const selectedPost = postSelected.map(post => ({
			title: post?.caption ? post.caption : '',
			image_url: post?.media_url ? post.media_url : '',
			posted_date: post?.timestamp
				? format(new Date(post.timestamp), 'yyyy-MM-dd hh:mm:ss')
				: '',
		}))

		setCampaign(prev => ({ ...prev, social_posts: selectedPost }))
		closeModal()
		toast('Post added successfully!')
	}

	return (
		<div className='md:grid'>
			<header className='flex items-center justify-between gap-2'>
				<h3 className='text-xl font-semibold'>Instagram posts</h3>
				<button type='button' onClick={closeModal}>
					<Close />
				</button>
			</header>

			<h2 className='pt-2 text-sm'>
				Instagram username:{' '}
				<span className='font-bold text-wustomers-blue'>
					{posts.data?.at(0)?.username}
				</span>
			</h2>

			<div className='mt-5 text-sm'>
				<div className='hidden items-center gap-4 border-b border-b-wustomers-dark-gray py-3 px-4 font-medium md:grid md:grid-cols-5'>
					<p className='col-span-3'>Posts</p>
					<p className='col-span-1 text-center'>Show on page</p>
					<p className='col-span-1 text-center'>Date</p>
				</div>
				<>
					{posts?.data?.length ? (
						<>
							{matches ? (
								<ul className='flex h-96 flex-col gap-6 overflow-y-auto'>
									{posts?.data
										?.filter(
											post =>
												post.media_type === 'IMAGE' ||
												post.media_type === 'CAROUSEL_ALBUM'
										)
										.map(post => (
											<li
												className='grid grid-cols-5 items-center gap-4 px-4'
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
														<p className='pt-1'>{post.caption}</p>
													</div>
												</div>
												<div className='col-span-1 grid place-items-center items-center'>
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
								<ul className='flex h-96 flex-col gap-4 overflow-y-auto'>
									{posts?.data
										?.filter(
											post =>
												post.media_type === 'IMAGE' ||
												post.media_type === 'CAROUSEL_ALBUM'
										)
										.map(post => (
											<li
												className='border-b border-b-wustomers-neutral-lighter px-2 pb-4'
												key={post.id}
											>
												<div className='flex items-center justify-between gap-4'>
													<img
														src={post.media_url}
														alt='woman walkign to a store'
														width={72}
														height={72}
														className='h-20 object-cover'
													/>

													<div>
														<div className='grid place-items-end items-center'>
															<Controller
																name={post.id}
																control={control}
																render={({ field }) => (
																	<Switch.Root
																		className='h-6 w-12 rounded-sx bg-wustomers-neutral-dark data-[state=checked]:bg-wustomers-blue'
																		id={post.id}
																		value={post.id}
																		checked={field.value}
																		onCheckedChange={
																			field.onChange
																		}
																	>
																		<Switch.Thumb className='data-[state=checked] block h-5 w-5 translate-x-0.5 rounded-sm border border-gray-300 bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[1.6rem]' />
																	</Switch.Root>
																)}
															/>
															<p className='text-center'>
																{new Date(
																	post.timestamp
																).toDateString()}
															</p>
														</div>
													</div>
												</div>

												<p className='pt-1'>{post.caption}</p>
											</li>
										))}
								</ul>
							)}
						</>
					) : (
						<p>You have no post on instagram</p>
					)}

					{/* {posts.paging?.next ? (
						<button className='mt-4'>Next page</button>
					) : null} */}
				</>
			</div>

			<div className='mt-4 flex flex-col items-center justify-between gap-2 md:flex-row'>
				<p className='text-xs'>Showing: {posts?.data?.length} posts</p>
				<div className='flex w-full items-center gap-2 md:max-w-sm md:flex-row md:gap-5'>
					<Button
						text='Cancel'
						variant='outline'
						className='flex-1 px-7 normal-case md:px-10'
						onClick={closeModal}
					/>
					<Button
						type='submit'
						text='Add posts'
						variant='fill'
						className='flex-1 px-7 normal-case md:px-10'
						onClick={handleSubmit(addPosts)}
					/>
				</div>
			</div>
		</div>
	)
}
export default InstagramPostsModal
