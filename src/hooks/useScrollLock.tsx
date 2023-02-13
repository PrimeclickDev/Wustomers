import { useLayoutEffect } from 'react'

type ScrollLockProps = {
	isOpen: boolean
}

export const useScrollLock = ({ isOpen }: ScrollLockProps) => {
	useLayoutEffect((): (() => void) => {
		// Get original body overflow
		const originalStyle: string = window.getComputedStyle(
			document.body
		).overflow
		if (isOpen) {
			// Prevent scrolling on mount
			document.body.style.overflow = 'hidden'
		}
		// Re-enable scrolling when component unmounts
		return () => (document.body.style.overflow = originalStyle)
	}, [isOpen])
}
