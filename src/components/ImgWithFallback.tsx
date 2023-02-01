interface ImgWithFallbackProps
	extends React.ImgHTMLAttributes<HTMLImageElement> {
	src: string
	fallback: string
	type: 'image/webp' | 'image/png' | 'image/jpg'
}

export const ImgWithFallback = ({
	src,
	fallback,
	type = 'image/webp',
	...delegated
}: ImgWithFallbackProps) => {
	return (
		<picture>
			<source srcSet={src} type={type} />
			<img src={fallback} {...delegated} />
		</picture>
	)
}
