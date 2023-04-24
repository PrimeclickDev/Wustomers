import { useFetchCampaigns } from 'api/hooks/campaigns/useFetchCampaigns'
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

const CampaignChart = ({ height = 220 }) => {
	const { data } = useFetchCampaigns('all')

	const chartData = data?.campaigns.data.map(item => ({
		name: item.title,
		visits: item.impression,
		contact: item.conversion,
		contact_rate: item.conversion_rate,
	}))

	return (
		<ResponsiveContainer
			width='100%'
			height={height}
			className='mt-4 text-xs'
		>
			<BarChart data={chartData}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='name' />
				<YAxis />
				<Tooltip />
				<Bar dataKey='visits' fill='#1E96FC' />
				<Bar dataKey='contact' fill='#203FCD' />
				<Bar dataKey='contact_rate' fill='#FFC600' />
			</BarChart>
		</ResponsiveContainer>
	)
}

export default CampaignChart
