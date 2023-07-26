import { Social } from 'models/campaigns'

type SelectedIGPostsProps = {
	socialPosts: Social[]
}

export const SelectedIGPosts = ({ socialPosts }: SelectedIGPostsProps) => {
	return (
		<>
			<div className='mx-auto mt-5 bg-wustomers-blue/10 px-6 py-4 text-sm'>
				<h4 className='pb-3 font-bold uppercase'>Selected Posts:</h4>
				<ul className='grid gap-4 md:grid-cols-2'>
					{socialPosts.map(post => (
						<li
							className='flex flex-col gap-1 pt-3'
							key={post.posted_date}
						>
							<img
								src={post.image_url as string}
								alt='woman walkign to a store'
								width={72}
								height={72}
								className='h-20 object-cover'
							/>
							<div className='flex flex-col gap-1'>
								<p className='pt-1'>{post.title}</p>
								<p className='text-xs italic'>
									{new Date(post.posted_date).toDateString()}
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</>
	)
}
