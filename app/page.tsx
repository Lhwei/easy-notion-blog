import type { Metadata } from 'next'
import Link from 'next/link'
import {
  NEXT_PUBLIC_URL,
  NEXT_PUBLIC_SITE_TITLE,
  NEXT_PUBLIC_SITE_DESCRIPTION,
  NUMBER_OF_POSTS_PER_PAGE,
} from './server-constants'
import GoogleAnalytics from '../components/google-analytics'
import styles from '../styles/page.module.css'
import {
  getPosts,
} from '../lib/notion/client'
import {
  BlogPostLink,
  BlogTagLink,
  NextPageLink,
  NoContents,
  PostDate,
  PostExcerpt,
  PostTags,
  PostTitle,
  ReadMoreLink,
} from '../components/blog-parts'
import {
  getBlogLink,
} from '../lib/blog-helpers'

export async function generateMetadata(): Promise<Metadata> {
  const title = NEXT_PUBLIC_SITE_TITLE
  const description = NEXT_PUBLIC_SITE_DESCRIPTION
  const url = NEXT_PUBLIC_URL ? new URL(NEXT_PUBLIC_URL) : undefined
  const images = NEXT_PUBLIC_URL ? [{ url: new URL('/default.png', NEXT_PUBLIC_URL) }] : []

  const metadata: Metadata = {
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: title,
      type: 'website',
      images: images,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: images,
    },
    alternates: {
      canonical: url,
    },
  }

  return metadata
}

const RootPage = async () => {
  const [posts] = await Promise.all([
    getPosts(NUMBER_OF_POSTS_PER_PAGE)
  ])
  return (
    <>
      <GoogleAnalytics pageTitle={NEXT_PUBLIC_SITE_TITLE} />
      <div className={`${styles.container} grid grid-cols-1 lg:grid-cols-4 lg:gap-4`}>
        <div className='order-2 lg:order-1 border border-gray-200 rounded-xl p-3 grid gap-y-4 h-fit'>
          <img className='w-[10rem] mx-auto lg:w-full' src="niji_3.png" alt="" />
          <h1 className='font-display text-3xl font-bold text-center'>Winni Lin</h1>
          <p className='px-4 py-2 font-body text-sm text-gray-400 leading-tight'>UI Designer | Event Planner | Taipei</p>
          <a href="https://bento.me/lhwei" target="_blank" rel="noopener noreferrer">
            <div className='flex gap-x-2 rounded-full border border-gray-200 py-2 pl-6 hover:bg-gray-100'>
              <img className='w-6' src="face.svg" alt="" />
              <p className='font-display text-md font-bold'>Profile Hub</p>
            </div>
          </a>
          <a href="https://read.cv/lhwei" target="_blank" rel="noopener noreferrer">
            <div className='flex gap-x-2 rounded-full border border-gray-200 py-2 pl-6 hover:bg-gray-100'>
              <img className='w-6' src="badge.svg" alt="" />
              <p className='font-display text-md font-bold'>Online CV</p>
            </div>
          </a>
          <div className='px-4 py-2'>
            <p className='text-md font-bold font-display'>Contact me</p>
            <p className='font-body text-sm'>lhwei.winni@gmail.com</p>
          </div>
          <a href="https://read.cv/lhwei" download>
            <p className='font-body text-sm decoration-gray-400 underline hover:bg-gray-50 px-4 py-2 rounded-full'>view resume</p>
          </a>
        </div>
        <div className='order-1 lg:order-2 col-span-3'>
          <p className='font-display font-bold text-center text-4xl mt-8'>
            Hi, I am Winni
            <br />
            <span className='font-body text-xl'>UI Designer based in Taipei</span>
          </p>
          <fieldset className="border-t border-gray-200">
            <legend className="mx-auto px-4 text-white text-2xl italic"><img className='w-8 mx-auto my-8' src="niji_5.png" alt="" /></legend>
          </fieldset>
          <div className='px-8 grid xl:grid-cols-2 gap-8'>
          {posts.map(post => {
            return (
              <div className={`${styles.post} flex gap-8 relative`} key={post.Slug}>
                <Link href={getBlogLink(post.Slug)}>
                  <img className='w-full h-full rounded-xl' src={`/api/og-image?slug=${post?.Slug}`} alt="" />
                  <div className='absolute top-6 left-8'>
                    <PostDate post={post} />
                    <PostTags post={post} />
                    {/* <PostTitle post={post} /> */}
                    {/* <PostExcerpt post={post} /> */}
                  </div>
                </Link>
              </div>
            )
          })}
          </div>
          <fieldset className="border-t border-gray-200 lg:hidden">
            <legend className="mx-auto px-4 text-white text-2xl italic"><img className='w-28 mx-auto my-8' src="niji_6.png" alt="" /></legend>
          </fieldset>
        </div>
      </div>
    </>
  )
}

export default RootPage
