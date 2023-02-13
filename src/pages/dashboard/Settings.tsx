import { zodResolver } from '@hookform/resolvers/zod'
// import * as Switch from '@radix-ui/react-switch'
import { Button } from 'components/Button'
import { Switch } from 'components/Switch'
import { TextField } from 'components/TextField'
import { usePageTitle } from 'hooks/usePageTitle'
import useToggle from 'hooks/useToggle'
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
	const [value, toggle] = useToggle()
	const { register, control, handleSubmit } = useForm<ChangePasswordSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			confirmNewPassword: '',
			currentPassword: '',
			newPassword: '',
		},
	})

	const changePassword: SubmitHandler<ChangePasswordSchema> = data => {
		console.log(data)
	}

	return (
		<>
			<h2 className='text-3xl font-black'>Settings</h2>

			<div className='mt-10 rounded-sx bg-white'>
				<h3 className='bg-wustomers-primary py-3 px-4 text-lg font-medium text-wustomers-main md:px-7 md:text-xl'>
					Change Password
				</h3>

				<form
					className='px-3 pb-10 md:px-7'
					onSubmit={handleSubmit(changePassword)}
				>
					<TextField
						label='Current Password'
						type='password'
						name='currentPassword'
						register={register}
						control={control}
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
						type='submit'
						text='Submit'
						variant='fill'
						className='mt-10 ml-auto'
					/>
				</form>
			</div>

			<div className='mt-10 flex items-center justify-between rounded-sx bg-white py-4 px-4 lg:px-7'>
				<h4 className='text-lg'>Notifications</h4>
				<Switch enabled={value} toggle={toggle} />
			</div>
		</>
	)
}
export default Settings
