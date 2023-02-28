type SwitchProps = {
	enabled: boolean
	toggle: () => void
}

export const Switch = ({ enabled, toggle }: SwitchProps) => {
	return (
		<label className='relative inline-flex cursor-pointer items-center'>
			<input
				type='checkbox'
				value=''
				className='peer sr-only'
				checked={enabled}
				onChange={toggle}
			/>
			<div className="peer h-6 w-12 rounded-sx bg-wustomers-neutral-dark after:absolute after:top-1/2 after:left-[2px] after:h-5 after:w-5 after:-translate-y-1/2 after:rounded-sm after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-wustomers-blue peer-checked:after:translate-x-[1.43rem] peer-checked:after:border-white peer-focus-visible:outline-none peer-focus-visible:outline-2  peer-focus-visible:outline-offset-2 peer-focus-visible:outline-wustomers-blue"></div>
			<span className='sr-only'>receive notifications?</span>
		</label>
	)
}
