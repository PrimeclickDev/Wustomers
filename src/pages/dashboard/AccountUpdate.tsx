import { useFetchProfile } from 'api/hooks/profile/useFetchProfile'
import { ReactComponent as InformationIcon } from 'assets/icons/information.svg'
import { AccountUpdateForm } from 'components/AccountUpdateForm'
import { Spinner } from 'components/Spinner'
import { UserAvatar } from 'components/UserAvatar'
import { usePageTitle } from 'hooks/usePageTitle'

const AccountUpdate = () => {
	usePageTitle('Account Update')
	const { data: profile, isLoading } = useFetchProfile()
	console.log('profile', profile)

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<h2 className='text-3xl'>
						Hi,{' '}
						<span className='font-black'>
							{profile?.data.data?.profile.user.first_name}
						</span>
					</h2>

					{!profile?.data.data?.profile.business_name ? (
						<div
							role='alert'
							className='mt-5 flex items-center gap-4 rounded-sx bg-white py-1 text-sm font-medium lg:text-base'
						>
							<div className='bg-wustomers-blue py-2 px-4 text-white'>
								<InformationIcon />
							</div>
							<span>
								Note: Please fill this form to get your account verified
							</span>
						</div>
					) : null}

					<div className='mt-10 flex flex-col md:flex-row md:gap-10 xl:gap-20'>
						{profile ? (
							<AccountUpdateForm
								profile={profile?.data?.data?.profile}
							/>
						) : null}

						<UserAvatar />
					</div>
				</>
			)}
		</>
	)
}

export default AccountUpdate
