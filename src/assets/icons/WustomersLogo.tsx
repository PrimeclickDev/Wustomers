type WustomersLogoProps = {
	fill?: string
}

export const WustomersLogo = ({ fill }: WustomersLogoProps) => {
	return (
		<svg
			width='32'
			height='32'
			viewBox='0 0 63 59'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g clipPath='url(#clip0_127_138)'>
				<path
					d='M43.0404 0.830444L30.7742 0.935085L57.911 40.3148L62.2942 28.7578L43.0404 0.830444Z'
					fill={fill ?? '#072AC8'}
				/>
				<path
					d='M13.7063 13.0036L44.8078 58.1502L51.156 58.1618H51.1676L53.2837 52.5461L22.0078 7.13208L13.7063 13.0036Z'
					fill={fill ?? '#072AC8'}
				/>
				<path
					d='M35.2968 47.9305H24.7281L4.92774 19.1892L4.91612 19.2008L0.579346 30.7694L19.3681 58.0806L22.9143 58.0922H22.9259H25.0769L31.739 58.1155L31.7274 58.0922L42.2844 58.0806L35.2968 47.9305Z'
					fill={fill ?? '#072AC8'}
				/>
			</g>
			<defs>
				<clipPath id='clip0_127_138'>
					<rect
						width='61.7147'
						height='57.3314'
						fill='white'
						transform='translate(0.57959 0.830444)'
					/>
				</clipPath>
			</defs>
		</svg>
	)
}
