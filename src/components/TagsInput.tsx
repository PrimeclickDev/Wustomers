import { useAtom } from 'jotai'
import React, { KeyboardEventHandler } from 'react'
import CreatableSelect from 'react-select/creatable'
import { campaignAtom } from 'store/atoms'

const components = {
	DropdownIndicator: null,
}

interface Option {
	readonly label: string
	readonly value: string
}

const createOption = (label: string) => ({
	label,
	value: label,
})

type TagsInputProps = {
	setTags: any
}

export const TagsInput = ({ setTags }: TagsInputProps) => {
	const [campaign] = useAtom(campaignAtom)

	const [inputValue, setInputValue] = React.useState('')
	const [value, setValue] = React.useState<readonly Option[]>(
		campaign.campaign_keyword ?? []
	)

	const handleKeyDown: KeyboardEventHandler = event => {
		if (!inputValue) return
		switch (event.key) {
			case 'Enter':
			case 'Tab':
				if (value.find(option => option.label === inputValue)) {
					return
				}
				setValue(prev => [...prev, createOption(inputValue)])
				setInputValue('')
				event.preventDefault()
		}
	}

	React.useEffect(() => {
		setTags('campaign_keyword', value)
	}, [value])

	return (
		<CreatableSelect
			components={components}
			inputValue={inputValue}
			isClearable
			isMulti
			unstyled
			hideSelectedOptions
			menuIsOpen={false}
			onChange={newValue => setValue(newValue)}
			onInputChange={newValue => setInputValue(newValue)}
			onKeyDown={handleKeyDown}
			placeholder='Type something and press enter...'
			value={value}
			classNames={{
				control: ({ isFocused }) =>
					`w-full py-3 appearance-none rounded-sm border-0 bg-wustomers-primary px-4 text-base text-wustomers-main ring-[1.5px] ${
						isFocused
							? 'ring-wustomers-blue'
							: 'ring-wustomers-primary-light'
					}`,
				menu: () =>
					'rounded bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] p-2',
				option: ({ isFocused }) =>
					`py-1.5 select-none items-center rounded px-4 !text-sm hover:bg-wustomers-blue hover:text-white transition-colors ${
						isFocused ? 'bg-wustomers-blue text-white' : ''
					}`,
				placeholder: () => 'text-gray-400',
				multiValue: () =>
					'py-[2px] px-2.5 border border-[#C1C1C1] flex items-center gap-2 rounded-sm',
				multiValueLabel: () => 'text-sm text-wustomers-neutral',
				valueContainer: () => 'flex items-center gap-2',
				dropdownIndicator: () => 'text-[#9CAAE9]',
			}}
		/>
	)
}
