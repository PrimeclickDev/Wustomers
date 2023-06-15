import { zodResolver } from '@hookform/resolvers/zod'
import { useFetchProfile } from 'api/hooks/profile/useFetchProfile'
import { useUpdatePassword } from 'api/hooks/profile/useUpdatePassword'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { TextField } from 'components/TextField'
import { usePageTitle } from 'hooks/usePageTitle'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z
	.object({
		currentPassword: z
			.string()
			.min(1, { message: 'Password is required' })
			.min(8, {
				message: 'Password must be at least 8 characters long',
			})
			.trim(),
		newPassword: z
			.string()
			.min(1, { message: 'Password is required' })
			.min(8, {
				message: 'Password must be at least 8 characters long',
			})
			.regex(
				/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
				{
					message:
						'Password must contain a symbol, a number, an uppercase and lowercase character',
				}
			)
			.trim(),
		confirmNewPassword: z
			.string()
			.min(1, { message: 'Password confirmation is required' })
			.min(8, {
				message: 'Password confirmation must be at least 8 characters long',
			})
			.regex(
				/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
				{
					message:
						'Password must contain a symbol, a number, an uppercase and lowercase character',
				}
			)
			.trim(),
	})
	.refine(data => data.newPassword === data.confirmNewPassword, {
		path: ['confirmNewPassword'],
		message: 'Passwords do not match',
	})

type ChangePasswordSchema = z.infer<typeof schema>

const Settings = () => {
	usePageTitle('Settings')
	const { register, control, handleSubmit, reset } =
		useForm<ChangePasswordSchema>({
			resolver: zodResolver(schema),
			defaultValues: {
				confirmNewPassword: '',
				currentPassword: '',
				newPassword: '',
			},
		})
	const { mutate, isLoading } = useUpdatePassword()
	const { data: profile } = useFetchProfile()

	const changePassword: SubmitHandler<ChangePasswordSchema> = data => {
		mutate(
			{
				old_password: data.currentPassword,
				new_password: data.newPassword,
				confirmPassword: data.confirmNewPassword,
			},
			{
				onSuccess: () => reset(),
			}
		)
	}

	return (
		<>
			<h2 className='text-3xl font-black'>Settings</h2>

			{!profile?.user.social_login ? (
				<div className='mt-10 rounded-sx bg-white'>
					<h3 className='bg-wustomers-primary py-3 px-4 text-lg font-medium text-wustomers-main md:px-7 md:text-xl'>
						Change Password
					</h3>

					<form
						className='flex flex-col gap-8 px-3 pb-10 md:px-7'
						onSubmit={handleSubmit(changePassword)}
					>
						<TextField
							label='Current Password'
							type='password'
							name='currentPassword'
							register={register}
							control={control}
							className='mt-8'
						/>
						<TextField
							label='New Password'
							type='password'
							name='newPassword'
							register={register}
							control={control}
						/>
						<TextField
							label='Confirm new password'
							type='password'
							name='confirmNewPassword'
							register={register}
							control={control}
						/>

						<Button
							text={isLoading ? <Spinner /> : 'Submit'}
							type='submit'
							variant='fill'
							className='mt-10 ml-auto'
							disabled={isLoading}
						/>
					</form>
				</div>
			) : null}
		</>
	)
}
export default Settings
