export const formatCurrency = (amount: string | number) => {
	if (typeof amount === 'string') return +amount

	return new Intl.NumberFormat('en-NG', {
		style: 'currency',
		currency: 'NGN',
	}).format(amount)
}
