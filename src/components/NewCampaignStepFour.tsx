/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { zodResolver } from '@hookform/resolvers/zod'
import { audienceInterests } from 'constants/audienceInterest'
import { states } from 'constants/state'
import { useAtom } from 'jotai'
import { CampaignProps } from 'models/shared'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { campaignAtom } from 'store/atoms'
import { ageRanges, countries, sexes } from 'utils/constants'
import { z } from 'zod'
import { Button } from './Button'
import { ErrorMessage } from './ErrorMessage'
import { MultiSelect } from './MultiSelect'
import { Select, SelectItem } from './Select'
import { TagsInput } from './TagsInput'

const schema = z.object({
	country: z
		.string({ required_error: 'Country is required' })
		.min(1, { message: 'Country is required' })
		.trim()
		.or(z.literal('')),
	age_range: z
		.array(z.object({ label: z.string(), value: z.string() }))
		.default([]),
	gender: z
		.array(z.object({ label: z.string(), value: z.string() }))
		.default([]),
	locations: z
		.array(z.object({ label: z.string(), value: z.string() }))
		.default([]),
	campaign_keyword: z
		.array(z.object({ label: z.string(), value: z.string() }))
		.default([]),
	audience_interest: z
		.array(z.object({ label: z.string(), value: z.string() }))
		.default([]),
})

export type StepFourSchema = z.infer<typeof schema>

export const NewCampaignStepFour = ({ prevStep, nextStep }: CampaignProps) => {
	const [campaign, setCampaign] = useAtom(campaignAtom)
	const { control, handleSubmit, setValue } = useForm<StepFourSchema>({
		defaultValues: {
			age_range: campaign.age_range ?? '',
			country: campaign.country ?? '',
			locations: campaign.locations ?? [],
			campaign_keyword: campaign.campaign_keyword ?? [],
			audience_interest: campaign.audience_interest ?? [],
			gender: campaign.gender ?? [],
		},
		resolver: zodResolver(schema),
	})

	const onSubmit: SubmitHandler<StepFourSchema> = data => {
		setCampaign(prev => ({ ...prev, ...data }))
		nextStep?.()
	}

	return (
		<>
			<section className='mt-10 flex flex-col'>
				<h3 className='bg-wustomers-neutral-light p-3 font-medium md:px-9'>
					Target Audience
				</h3>

				<form className='flex flex-col gap-5 bg-white px-3 py-6 md:py-12 md:px-9'>
					<div className='grid gap-10 md:grid-cols-2'>
						<div className='flex flex-col gap-2 md:grid md:grid-cols-[100px,1fr]'>
							<label>Sex</label>
							<MultiSelect
								options={sexes}
								control={control}
								name='gender'
								placeholder='Choose option....'
							/>
						</div>

						<div className='flex flex-col gap-2 md:grid md:grid-cols-[100px,1fr]'>
							<label>Age range</label>
							<MultiSelect
								options={ageRanges}
								control={control}
								name='age_range'
								placeholder='Choose option....'
							/>
						</div>
					</div>

					<div className='flex flex-col gap-2 md:grid md:grid-cols-[150px,1fr]'>
						<label htmlFor='office_address' className=''>
							Country
						</label>
						<Controller
							name='country'
							control={control}
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => (
								<>
									<Select
										className={`custom-select ${
											error
												? 'ring-red-600'
												: 'ring-wustomers-primary-light'
										}`}
										placeholder='Select an industry type....'
										onChange={onChange}
										value={value}
									>
										{countries?.map(option => (
											<SelectItem
												value={option.value}
												key={option.value}
											>
												{option.label}
											</SelectItem>
										))}
									</Select>
									{error ? (
										<ErrorMessage message={error.message} />
									) : null}
								</>
							)}
						/>
					</div>

					<div className='flex flex-col gap-2 md:grid md:grid-cols-[150px,1fr]'>
						<label>State</label>
						<MultiSelect
							options={states.map(state => ({
								value: String(state.id),
								label: state.name,
							}))}
							placeholder='Select your target audience....'
							name='locations'
							control={control}
						/>
					</div>

					<div className='grid gap-2 md:grid-cols-[150px,1fr]'>
						<label>Keywords</label>
						<TagsInput setTags={setValue} />
					</div>

					<div className='grid gap-2 md:grid-cols-[150px,1fr]'>
						<label>Audience interest</label>

						<MultiSelect
							options={audienceInterests}
							placeholder='Select your target audience....'
							name='audience_interest'
							control={control}
						/>
					</div>
				</form>

				<div className='mt-3 flex flex-col gap-4 md:flex-row md:items-center md:self-end'>
					<Button
						text='Previous'
						variant='outline'
						onClick={prevStep}
						className='!bg-white px-11 !font-normal capitalize'
					/>
					<Button
						text='Next'
						type='submit'
						variant='fill'
						onClick={handleSubmit(onSubmit)}
						className='px-14 !font-normal capitalize'
					/>
				</div>
			</section>
		</>
	)
}
