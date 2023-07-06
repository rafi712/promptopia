'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Profile from '@components/Profile'

const OtherProfile = ({ params }) => {
  const [posts, setPosts] = useState([])
  const { id } = params
  const searchParams = useSearchParams()
  const username = searchParams.get('username')
  console.log(params)

  useEffect(() => {
    const fetchPosts = async () => {
      console.log('fetching data...')
      const response = await fetch(`/api/users/${id}/posts`)
      const data = await response.json()
      setPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <Profile
      name={username}
      desc='Welcome to your personalized profile page'
      data={posts}
    />
  )
}
export default OtherProfile
