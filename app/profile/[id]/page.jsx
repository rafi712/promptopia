'use client'

import { useEffect, useState } from 'react'
import Profile from '@components/Profile'
import Loading from '../loading'

const OtherProfile = ({ params }) => {
  const [posts, setPosts] = useState([])
  const [name, setName] = useState('')
  const { id } = params

  useEffect(() => {
    const fetchPosts = async () => {
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

  if (name) {
    return (
      <Profile
        name={name}
        desc={`Check out the awesome prompts ${name ? name : '...'} wrote`}
        data={posts}
      />
    )
  } else {
    return <Loading />
  }
}
export default OtherProfile
