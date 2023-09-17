export const formatCurrency = (amount: string | number) => {
	if (typeof amount === 'string') return +amount

	return `₦${amount?.toLocaleString()}`
}
