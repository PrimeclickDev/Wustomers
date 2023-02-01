import { useEffect, useState } from 'react'

let interval: NodeJS.Timer

export const useTimer = ({ seconds = 10 }) => {
	const [min, setMin] = useState<number>(seconds)
	const [startTimer, setStartTimer] = useState(false)

	useEffect(() => {
		clearInterval(interval)

		if (startTimer) {
			interval = setInterval(() => {
				seconds--

				if (seconds === 0) {
					clearInterval(interval)
				}
				setMin(seconds)
			}, 1000)
		}

		return () => clearInterval(interval)
	}, [startTimer])

	useEffect(() => {
		setStartTimer(true)
	}, [])

	return { min }
}
