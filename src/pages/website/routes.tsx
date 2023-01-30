import Contact from './Contact'
import Home from './Home'
import Pricing from './Pricing'

export const websiteRoute = [
	{
		index: true,
		element: <Home />,
	},
	{
		path: 'contact',
		element: <Contact />,
	},
	{
		path: 'pricing',
		element: <Pricing />,
	},
]
