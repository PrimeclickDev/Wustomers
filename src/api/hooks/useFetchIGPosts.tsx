import axios, { AxiosResponse } from 'axios'
import { useAtom } from 'jotai'
import { IGPosts } from 'models/shared'
import { useEffect, useState } from 'react'
import { igAccessToken } from 'store/atoms'

export const useFetchIGPosts = () => {
	const [token] = useAtom(igAccessToken)
	const [posts, setPosts] = useState<IGPosts>({} as IGPosts)

	const fetchUserIGPost = async () => {
		const posts: AxiosResponse<IGPosts> = await axios.get(
			`https://graph.instagram.com/me/media?limit=50&fields=id,username,media_type,media_url,caption,timestamp,permalink&access_token=${token?.access_token}`
		)
		setPosts(posts.data)
	}

	useEffect(() => {
		if (token) {
			fetchUserIGPost()
		}
	}, [token])

	return { posts }
}
