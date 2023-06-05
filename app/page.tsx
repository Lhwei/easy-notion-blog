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
  // PostDate,
  PostTags,
  PostTitle,
  PostGoal,
  PostRoleAndOutput,
  // PostChallenge,
  // PostOutcome,
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
      <div className={`${styles.container} `}>
        {/* <div className='order-2 lg:order-1 border border-gray-200 rounded-xl p-3 grid gap-y-4 h-fit'>
          <img className='w-[10rem] mx-auto lg:w-full' src="niji_3.png" alt="" />
          <h1 className='font-display text-3xl font-bold text-center'>Winni Lin</h1>
          <p className='px-4 py-2 font-body text-sm text-gray-400 leading-tight'>UIUX Designer | Event Planner | Taipei</p>
          <a href="https://www.cakeresume.com/lhwei-winni" target="_blank" rel="noopener noreferrer">
            <div className='flex gap-x-2 rounded-full border border-gray-200 py-2 pl-6 hover:bg-gray-100'>
              <img className='w-6' src="badge.svg" alt="" />
              <p className='font-display text-md font-bold'>Online CV</p>
            </div>
          </a>
          <div className='px-4 py-2'>
            <p className='text-md font-bold font-display'>Contact me</p>
            <a href="mailto:lhwei.winni@gmail.com"><p className='font-body text-sm'>lhwei.winni@gmail.com</p></a>
          </div>
          <a href="https://www.cakeresume.com/pdf/s--zso46Tfn-5JVfZ0ds5TFJw--/R10Mj.pdf" download>
            <p className='font-body text-sm decoration-gray-400 underline hover:bg-gray-50 px-4 py-2 rounded-full'>view resume</p>
          </a>
        </div> */}
        <div className=''>
          <p className='font-display font-bold text-center text-4xl mt-8'>
            Hi, I am Winni 
            <br />
            <span className='font-body text-xl'>UIUX Designer based in Taipei</span>
          </p>
          <ul className='flex justify-center gap-x-8 mt-8'>
            <a className='bg-blue-200 px-4 py-2 rounded-3xl hover:bg-blue-100' href="/blog/tag/User%20Experience%20Design">
              <li>UX Design | 使用者體驗設計</li>
            </a>
            <a className='bg-purple-200 px-4 py-2 rounded-3xl hover:bg-purple-100' href="blog/tag/User%20Interface%20Design">
              <li>UI Design | 使用者介面設計</li>
            </a>
            <a className='bg-green-200 px-4 py-2 rounded-3xl hover:bg-green-100' href="/blog/tag/Product%20Design">
              <li>Product Design | 產品設計</li>
            </a>
          </ul>
          <fieldset className="border-t border-gray-200 mt-4 mb-8">
            <legend className="mx-auto px-4 text-white text-2xl italic"><img className='w-8 mx-auto my-8' src="niji_5.png" alt="" /></legend>
          </fieldset>
          <div className='px-8 grid xl:grid-cols-1 gap-8'>
          {posts.map(post => {
            return (
              <div className={`${styles.post} gap-8 relative`} key={post.Slug}>
                <Link href={getBlogLink(post.Slug)}>
                  <img className='w-full h-full rounded-xl hover:opacity-80' src={`/api/og-image?slug=${post?.Slug}`} alt="" />
                  <div className='absolute top-2 left-2 xl:top-6 xl:left-8'>
                    <PostTags post={post} />
                  </div>
                  <div className='hidden xl:block absolute top-12 left-2 xl:top-16 xl:left-8 p-8 bg-gray-50 min-w-[32rem] max-w-[32rem] rounded'>
                    <div><PostTitle post={post} /></div>
                    <p className='mt-4 font-light text-sm text-sky-700 border-l-4 border-sky-500 tracking-[.15em] pl-2'>團隊目標</p>
                    <div><PostGoal post={post} /></div>
                    <p className='mt-4 font-light text-sm text-sky-700 border-l-4 border-sky-500 tracking-[.15em] pl-2'>角色與產出</p>
                    <div><PostRoleAndOutput post={post} /></div>
                    {/* <p className='mt-4 font-light text-sm text-sky-700 border-l-4 border-sky-500 tracking-[.15em] pl-2'>專案遇到的挑戰</p>
                    <div><PostChallenge post={post} /></div> */}
                    {/* <p className='mt-4 font-light text-sm text-sky-700 border-l-4 border-sky-500 tracking-[.15em] pl-2'>專案成果</p>
                    <div><PostOutcome post={post} /></div> */}
                  </div>
                </Link>
              </div>
            )
          })}
          </div>
          <fieldset className="border-t border-gray-200 lg:hidden my-8">
            <legend className="mx-auto px-4 text-white text-2xl italic"><img className='w-28 mx-auto my-8' src="niji_6.png" alt="" /></legend>
          </fieldset>
        </div>
      </div>
    </>
  )
}

export default RootPage
