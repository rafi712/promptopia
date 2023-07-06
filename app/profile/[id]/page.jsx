'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Profile from '@components/Profile'

const OtherProfile = ({ params }) => {
  const [posts, setPosts] = useState([])
  const [name, setName] = useState('')
  const { id } = params
  // const searchParams = useSearchParams()
  // const username = searchParams.get('username')

  useEffect(() => {
    const fetchPosts = async () => {
      console.log('fetching data...')
      const response = await fetch(`/api/users/${id}/posts`)
      const data = await response.json()
      setPosts(data)
    }

    const fetchUser = async () => {
      const response = await fetch(`/api/users/${id}`)
      const { username } = await response.json()
      setName(username)
    }

    fetchPosts()
    fetchUser()
  }, [])

  return (
    <Profile
      name={name}
      desc={`Check out the awesome prompts ${name} wrote`}
      data={posts}
    />
  )
}
export default OtherProfile
