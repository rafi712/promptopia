'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession()
  const pathName = usePathname()
  const [copied, setCopied] = useState('')

  const handleCopy = () => {
    setCopied(prompt.prompt)
    navigator.clipboard.writeText(prompt.prompt)
    setTimeout(() => setCopied(''), 3000)
  }

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <Link
          href={
            prompt.creator._id === session?.user.id
              ? '/profile'
              : `profile/${prompt.creator._id}`
          }
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
        >
          <Image
            src={prompt.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold font-gray-900'>
              {prompt.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {prompt.creator.email}
            </p>
          </div>
        </Link>

        <div className='copy_btn' onClick={() => handleCopy()}>
          <Image
            src={
              copied === prompt.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            width={14}
            height={14}
            alt='profile-photo'
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{prompt.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >
        #{prompt.tag}
      </p>

      {session?.user.id === prompt.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}
export default PromptCard
