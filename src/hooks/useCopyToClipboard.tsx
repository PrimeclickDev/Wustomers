type CopyFn = (text: string) => Promise<boolean>

export const useCopyToClipboard = () => {
	const copy: CopyFn = async text => {
		try {
			if ('clipboard' in navigator) {
				await navigator.clipboard.writeText(text)
			} else {
				document.execCommand('copy', true, text)
			}
			return true
		} catch (error) {
			console.warn('Copy failed', error)
			return false
		}
	}

	return { copy }
}
