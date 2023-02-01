// https://dominicarrojado.com/posts/how-to-create-your-own-otp-input-in-react-and-typescript-with-tests-part-1/
import { useMemo } from 'react'

type OtpInputProps = {
	value: string
	valueLength: number
	onChange: (value: string) => void
}

// regexp to match a digit. we cant use typeof to check if the value is a number cos NAN will also return true
const RE_DIGIT = new RegExp(/^\d+$/)

export const OtpInput = ({ value, valueLength, onChange }: OtpInputProps) => {
	const valueItems = useMemo(() => {
		const valueArray = value.split('')
		const items: string[] = []

		for (let i = 0; i < valueLength; i++) {
			const char = valueArray[i]

			if (RE_DIGIT.test(char)) {
				items.push(char)
			} else {
				items.push('')
			}
		}

		return items
	}, [value, valueLength])

	const focusToNextInput = (target: HTMLElement) => {
		const nextElementSibling =
			target.nextElementSibling as HTMLInputElement | null

		if (nextElementSibling) {
			nextElementSibling.focus()
		}
	}

	const focusToPrevInput = (target: HTMLElement) => {
		const previousElementSibling =
			target.previousElementSibling as HTMLInputElement | null

		if (previousElementSibling) {
			previousElementSibling.focus()
		}
	}

	const inputOnChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		idx: number
	) => {
		const target = e.target
		let targetValue = target.value.trim()
		// check if value is a number
		const isTargetValueDigit = RE_DIGIT.test(targetValue)

		// keep the selection range position
		// if the same digit was typed
		target.setSelectionRange(0, targetValue.length)

		if (!isTargetValueDigit && targetValue !== '') {
			return
		}

		const nextInputEl = target.nextElementSibling as HTMLInputElement | null

		// only delete digit if next input element has no value
		if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
			return
		}

		targetValue = isTargetValueDigit ? targetValue : ' '

		const targetValueLength = targetValue.length

		// if digit length entered into the input is one, do the magic
		if (targetValueLength === 1) {
			const newValue =
				value.substring(0, idx) + targetValue + value.substring(idx + 1)

			onChange(newValue)

			if (!isTargetValueDigit) {
				return
			}

			focusToNextInput(target)
			// while if its the length of the "valueLength", run the onChange function by spliting each digit into individual input at their index position
		} else if (targetValueLength === valueLength) {
			onChange(targetValue)

			target.blur()
		}
	}

	const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		const { target } = e

		// keep focusing back until previous input
		// element has value
		const prevInputEl =
			target.previousElementSibling as HTMLInputElement | null

		if (prevInputEl && prevInputEl.value === '') {
			return prevInputEl.focus()
		}

		target.setSelectionRange(0, target.value.length)
	}

	// note: if cursor ends on left side instead of right side, replace the value in the input field

	const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const { key } = e
		const target = e.target as HTMLInputElement

		if (key === 'ArrowRight' || key === 'ArrowDown') {
			e.preventDefault()
			return focusToNextInput(target)
		}

		if (key === 'ArrowLeft' || key === 'ArrowUp') {
			e.preventDefault()
			return focusToPrevInput(target)
		}

		target.setSelectionRange(0, target.value.length)

		if (e.key !== 'Backspace' || target.value !== '') {
			return
		}

		focusToPrevInput(target)
	}

	return (
		<div className='mt-2 flex items-center gap-4'>
			{valueItems.map((digit, idx) => (
				<input
					key={idx}
					type='text'
					inputMode='numeric'
					autoComplete='one-time-code'
					pattern='\d{1}' // constrains the OTP to a one digit string
					maxLength={valueLength} // restrict maximum digits per input box but we are not using 1 because we will allow pasting of code and simutaneously allow autocomplete to work
					className='h-14 w-14 rounded-sx border border-[#E6EAF9] bg-[#F3F4FC] p-2 text-center text-xl font-bold focus-visible:outline-offset-0'
					value={digit}
					onChange={e => inputOnChange(e, idx)}
					onFocus={inputOnFocus}
					onKeyDown={inputOnKeyDown}
				/>
			))}
		</div>
	)
}
