'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Profile from '@components/Profile'

const MyProfile = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState([])
  console.log(status)

  const handleEdit = (post) => {
    router.push(`/update-prompt/${post._id}`)
  }
  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

    try {
      if (hasConfirmed) {
        await fetch(`/api/prompt/${post._id.toString()}`, { method: 'DELETE' })
      }

      const filteredPosts = posts.filter((p) => p._id !== post._id)
      setPosts(filteredPosts)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      console.log('fetching data...')
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()
      setPosts(data)
    }
    console.log(session?.user)

    if (session?.user.id && posts.length === 0) fetchPosts()
  }, [session])

  return (
    <Profile
      name={session?.user.name}
      desc='Welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}
export default MyProfile
