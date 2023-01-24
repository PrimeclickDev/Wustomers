export const formatCurrency = (amount: string | number) => {
	// convert currency to number
	if (typeof amount === 'string') return +amount

	return amount?.toLocaleString('default', {
		style: 'currency',
		currency: 'NGN',
	})
}
