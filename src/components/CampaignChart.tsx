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
		clicks: item.impression,
		conversion: item.conversion,
		conversion_rate: parseInt(item.conversion_rate),
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
							Click: {payload[0].payload.clicks}
						</li>
						<li className='text-xs text-neutral-700'>
							Conversion: {payload[0].payload.conversion}
						</li>
						<li className='text-xs text-neutral-700'>
							Conversion rate: {payload[0].payload.conversion_rate}%
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
				<Bar dataKey='clicks' fill='#1E96FC' />
				<Bar dataKey='conversion' fill='#203FCD' />
				<Bar dataKey='conversion_rate' fill='#FFC600' />
			</BarChart>
		</ResponsiveContainer>
	)
}

export default CampaignChart
