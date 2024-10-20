import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type GuidePreviewProps = {
  image_url: string,
  redirect_url: string,
  badges: string[],
  title: string,
  description: string,
}

const GuidePreview = ({ image_url, redirect_url, badges, title, description }: GuidePreviewProps) => {
  return (
    <Link href={redirect_url} className='border border-[color:#dbdbdb] rounded-md p-2 py-4 space-y-5'>
      <div className='space-y-3'>
        <div className='aspect-video relative object-cover border border-[color:#dbdbdb] rounded-md overflow-hidden'>
          <Image src={image_url} className='object-cover' fill alt='Thumbnail' />
        </div>
        <div>{badges.map((badge) => <div className='badge badge-success bg-opacity-50'>{badge}</div>)}</div>
      </div>
      <div className='space-y-2'>
        <h2 className='font-medium'>{title}</h2>
        <p className='text-sm'>{description}</p>
      </div>
    </Link>
  )
}

export default GuidePreview
