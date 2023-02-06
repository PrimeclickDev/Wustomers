import { useEffect, useState, useTransition } from 'react'
import { useLocation } from 'react-router-dom'

// this help to solve the flickering problem that comes with lazy loading route
export const useConcurrentTransition = () => {
	const location = useLocation()
	const [oldLocation, setOldLocation] = useState(location)
	const [, startTransition] = useTransition()

	useEffect(() => {
		// if the path or search params change, mark this is a navigational transition
		setOldLocation(oldLocation =>
			oldLocation.pathname !== location.pathname ||
			oldLocation.search !== location.search
				? location
				: oldLocation
		)
	}, [location])

	useEffect(() => {
		// tell concurrent mode to pause UI rendering for a moment
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		startTransition(() => {})
	}, [oldLocation])

	return oldLocation
}
