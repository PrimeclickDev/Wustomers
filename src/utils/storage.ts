import Cookies from 'js-cookie'

export const setAccessCookie = (token: string) =>
	Cookies.set('wustomers', token)
export const getAccessCookie = () => Cookies.get('wustomers')
export const removeAccessCookie = () => Cookies.remove('wustomers')
