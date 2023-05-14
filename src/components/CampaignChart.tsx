import { useFetchCampaigns } from 'api/hooks/campaigns/useFetchCampaigns'
import { TooltipProps } from 'recharts'

import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import {
	NameType,
	ValueType,
} from 'recharts/types/component/DefaultTooltipContent'

const CampaignChart = ({ height = 220 }) => {
	const { data } = useFetchCampaigns('all')

	const chartData = data?.campaigns.data.map(item => ({
		name: item.title,
		visits: item.impression,
		contact: item.conversion,
		contact_rate: parseInt(item.conversion_rate),
	}))

	const CustomTooltip = ({
		active,
		payload,
		label,
	}: TooltipProps<ValueType, NameType>) => {
		if (active && payload && payload.length) {
			return (
				<div className='rounded border border-neutral-300 bg-white py-2 px-4 shadow-2xl'>
					<h3 className='font-bold text-neutral-800'>{label}</h3>
					<ul className='pt-1'>
						<li className='text-xs text-neutral-700'>
							Visits: {payload[0].payload.visits}
						</li>
						<li className='text-xs text-neutral-700'>
							Contact: {payload[0].payload.contact}
						</li>
						<li className='text-xs text-neutral-700'>
							Contact rate: {payload[0].payload.contact_rate}%
						</li>
					</ul>
				</div>
			)
		}

		return null
	}

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
				<Tooltip content={<CustomTooltip />} />
				<Bar dataKey='visits' fill='#1E96FC' />
				<Bar dataKey='contact' fill='#203FCD' />
				<Bar dataKey='contact_rate' fill='#FFC600' />
			</BarChart>
		</ResponsiveContainer>
	)
}

export default CampaignChart
