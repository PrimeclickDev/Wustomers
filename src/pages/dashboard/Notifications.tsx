import { useDeleteAllNotifications } from 'api/hooks/notifications/useDeleteAllNotifications'
import { useDeleteNotification } from 'api/hooks/notifications/useDeleteNotification'
import { useFetchNotifications } from 'api/hooks/notifications/useFetchNotifications'
import { useReadAllNotifications } from 'api/hooks/notifications/useReadAllNotifications'
import { useReadNotification } from 'api/hooks/notifications/useReadNotification'
import { ReactComponent as DoubleCheckIcon } from 'assets/icons/double-check.svg'
import { ReactComponent as LeftChevron } from 'assets/icons/left-chevron.svg'
import { ReactComponent as RightChevron } from 'assets/icons/right-chevron.svg'
import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg'
import { Spinner } from 'components/Spinner'
import { intlFormatDistance } from 'date-fns'
// import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg'
import { usePageTitle } from 'hooks/usePageTitle'
import { useState } from 'react'

const Notifications = () => {
	usePageTitle('Notifications')
	const [loading, setLoading] = useState('')
	const [readLoading, setReadLoading] = useState('')
	const { data: notifications, isLoading } = useFetchNotifications()
	const markAsRead = useReadNotification()
	const markAllAsRead = useReadAllNotifications()
	const deleteNotification = useDeleteNotification()
	const deleteAllNotifications = useDeleteAllNotifications()

	return (
		<>
			<h2 className='text-3xl font-black'>Notifications</h2>

			<section className='mt-10'>
				<header className='flex items-center justify-between rounded-sx bg-wustomers-primary py-4 px-4 lg:px-7'>
					<h3 className='text-lg font-medium'>All notifications</h3>

					<div className='flex items-center gap-5'>
						<button
							type='button'
							onClick={() => deleteAllNotifications.mutate()}
							disabled={
								!notifications?.length ||
								deleteAllNotifications.isLoading
							}
							className='hidden text-sm text-red-600 transition-colors hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50 sm:flex sm:items-center sm:gap-1'
						>
							{deleteAllNotifications.isLoading ? (
								<Spinner />
							) : (
								<>
									<TrashIcon width={16} height={16} />
									<span>Delete all</span>
								</>
							)}
						</button>
						<button
							type='button'
							onClick={() => markAllAsRead.mutate()}
							disabled={
								!notifications?.length || markAllAsRead.isLoading
							}
							className='hidden text-sm text-wustomers-blue transition-colors hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50 sm:flex sm:items-center sm:gap-1'
						>
							{markAllAsRead.isLoading ? (
								<Spinner />
							) : (
								<>
									<DoubleCheckIcon width={16} height={16} />
									<span>Mark all as read</span>
								</>
							)}
						</button>

						{/* <div className='hidden sm:flex sm:items-center sm:gap-7'>
							<p>1 - 2 of 32</p>

							<div className='item-center flex gap-4'>
								<button
									type='button'
									disabled={!notifications?.length}
									className='disabled:cursor-not-allowed disabled:opacity-50'
								>
									<LeftChevron />
									<span className='sr-only'>Previous</span>
								</button>
								<button
									type='button'
									disabled={!notifications?.length}
									className='disabled:cursor-not-allowed disabled:opacity-50'
								>
									<RightChevron />
									<span className='sr-only'>Next</span>
								</button>
							</div>
						</div> */}
					</div>
				</header>

				<ul className='rounded-sx bg-white'>
					{isLoading ? (
						<Spinner className='mt-2' />
					) : notifications?.length ? (
						notifications?.map(notification => (
							<li
								key={notification.id}
								className={`flex flex-col gap-3 border-b border-b-gray-200 px-3 py-3 transition-colors last-of-type:border-0 sm:flex-row sm:items-center sm:justify-between md:px-8`}
							>
								<div className='transition-colors'>
									{!notification.read_at ? (
										<span className='h-10 w-1 rounded bg-wustomers-blue' />
									) : null}

									<div>
										<h4 className='font-medium text-[#444444]'>
											{notification.data?.message}
										</h4>
										<p className='text-xs text-wustomers-gray'>
											{notification.type
												.replace('App\\Notifications\\', '')
												// this add space between words
												.replace(/([a-z])([A-Z])/g, '$1 $2')}
										</p>
									</div>
								</div>

								<div className='flex items-center gap-3'>
									<div className='mt-3 flex justify-between pl-8 text-sm text-wustomers-gray sm:mt-0 sm:flex-col sm:pl-0 sm:text-right'>
										<p>
											{new Date(
												notification.created_at
											).toDateString()}
										</p>
										<p>
											{intlFormatDistance(
												new Date(notification.created_at),
												new Date()
											)}
										</p>
									</div>

									<div>
										{!notification.read_at ? (
											<button
												onClick={() => {
													setReadLoading(notification.id)
													markAsRead.mutate(notification.id, {
														onSettled: () => setReadLoading(''),
													})
												}}
												type='button'
												disabled={
													markAsRead.isLoading ||
													markAllAsRead.isLoading
												}
												title='Mark as read'
												className='bg-gray-600 p-1 text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50'
											>
												{readLoading === notification.id ? (
													<Spinner className='w-[12px]' />
												) : (
													<DoubleCheckIcon
														width={15}
														height={15}
													/>
												)}
											</button>
										) : null}
										<button
											onClick={() => {
												setLoading(notification.id)
												deleteNotification.mutate(
													{
														id: notification.id,
													},
													{
														onSettled: () => setLoading(''),
													}
												)
											}}
											type='button'
											disabled={
												markAsRead.isLoading ||
												deleteNotification.isLoading
											}
											title='Delete notification'
											className='bg-red-600 p-1 text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50'
										>
											{loading === notification.id ? (
												<Spinner className='w-[12px]' />
											) : (
												<TrashIcon width={15} height={15} />
											)}
										</button>
									</div>
								</div>
							</li>
						))
					) : (
						<li className='p-3 text-center text-sm text-wustomers-gray'>
							You have no notification(s)
						</li>
					)}
				</ul>

				{/* for mobile */}
				<div className='flex items-center justify-center gap-3 p-3 text-sm md:hidden'>
					<p>1 - 2 of 32</p>

					<div className='item-center flex gap-3 p-3'>
						<button type='button' className='p-2'>
							<LeftChevron />
							<span className='sr-only'>Previous</span>
						</button>
						<button type='button' className='p-2'>
							<RightChevron />
							<span className='sr-only'>Next</span>
						</button>
					</div>
				</div>
			</section>
		</>
	)
}
export default Notifications
