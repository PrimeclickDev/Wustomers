import ReactFrappeChart from 'react-frappe-charts'

const CampaignChart = () => {
	return (
		<ReactFrappeChart
			type='bar'
			colors={['#072AC8']}
			axisOptions={{ xAxisMode: 'tick', yAxisMode: 'tick', xIsSeries: 1 }}
			height={220}
			// truncateLegends={1}
			data={{
				labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				datasets: [{ values: [18, 40, 30, 35, 8, 52, 17, 4] }],
			}}
		/>
	)
}

export default CampaignChart
