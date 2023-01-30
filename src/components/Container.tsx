import { PropsWithChildren } from 'react'

export const Container = ({ children }: PropsWithChildren) => {
	return (
		<div className='mx-auto flex max-w-screen-xl items-center gap-20 px-2 pt-20'>
			{children}
		</div>
	)
}
