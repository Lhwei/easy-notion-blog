import React from 'react'
import Link from 'next/link'

import {
  Post,
  SelectProperty,
} from '../lib/notion/interfaces'
import NotionBlocks, { colorClass } from './notion-block'
import {
  getBeforeLink,
  getBlogLink,
  getDateStr,
  getTagLink,
  getTagBeforeLink,
} from '../lib/blog-helpers'
import styles from '../styles/blog-parts.module.css'
import '../styles/notion-color.css'

export const PostDate = ({ post }) => (
  <div className={styles.postDate}>
    {post.Date ? getDateStr(post.Date) : ''}
  </div>
)

export const PostTitle = ({ post, enableLink = true }) => {
  const postTitle = post.Title ? post.Title : ''

  return (
    <h3 className={styles.postTitle}>
      {enableLink ? (
        <Link href={getBlogLink(post.Slug)}>
          {postTitle}
        </Link>
      ) : (
        postTitle
      )}
    </h3>
  )
}

export const PostTags = ({ post }) => (
  <div className={styles.postTags}>
    {post.Tags &&
      post.Tags.length > 0 &&
      post.Tags.map((tag: SelectProperty) => (
        <Link href={getTagLink(tag.name)} className={`tag ${colorClass(tag.color)}`} key={tag.name}>
          {tag.name}
        </Link>
      ))}
  </div>
)

export const PostExcerpt = ({ post }) => (
  <div className={styles.postExcerpt}>
    <p>{post.Excerpt ? post.Excerpt : ''}</p>
  </div>
)

export const PostGoal = ({ post }) => (
  <div className={styles.postExcerpt}>
    <p>{post.ProjectGoal ? post.ProjectGoal : ''}</p>
  </div>
)
export const PostRoleAndOutput = ({ post }) => (
  <div className={styles.postExcerpt}>
    <p>{post.RoleAndOutput ? post.RoleAndOutput : ''}</p>
  </div>
)
export const PostChallenge = ({ post }) => (
  <div className={styles.postExcerpt}>
    <p>{post.Challenge ? post.Challenge : ''}</p>
  </div>
)
export const PostOutcome = ({ post }) => (
  <div className={styles.postExcerpt}>
    <p>{post.Outcome ? post.Outcome : ''}</p>
  </div>
)

export const PostBody = ({ blocks }) => (
  <div className={styles.postBody}>
    <NotionBlocks blocks={blocks} isRoot={true} />
  </div>
)

export const ReadMoreLink = ({ post }) => (
  <div className={styles.readMoreLink}>
    <Link href={getBlogLink(post.Slug)} className={styles.readMore}>
      Read more
    </Link>
  </div>
)

export const NextPageLink = ({ firstPost, posts, tag = null }) => {
  if (!firstPost) return null
  if (posts.length === 0) return null

  const lastPost = posts[posts.length - 1]

  if (firstPost.Date === lastPost.Date) return null

  return (
    <div className={styles.nextPageLink}>
      <Link
        href={
          tag
            ? getTagBeforeLink(tag, lastPost.Date)
            : getBeforeLink(lastPost.Date)
        }
      >
        Next page ＞
      </Link>
    </div>
  )
}

export const NoContents = ({ contents }) => {
  if (!!contents && contents.length > 0) return null

  return <div className={styles.noContents}>There are no contents yet</div>
}

export const BlogPostLink = ({ heading, posts }) => (
  <div className={styles.blogPostLink}>
    <h3>{heading}</h3>
    <NoContents contents={posts} />
    <PostLinkList posts={posts} />
  </div>
)

export const BlogTagLink = ({ heading, tags }) => (
  <div className={styles.blogTagLink}>
    <h3>{heading}</h3>
    <NoContents contents={tags} />
    <TagLinkList tags={tags} />
  </div>
)

export const PostLinkList = ({ posts }) => {
  if (!posts || posts.length === 0) return null

  return (
    <ul>
      {posts.map((post: Post) => {
        return (
          <li key={post.Slug}>
            <Link href={getBlogLink(post.Slug)}>
              {post.Title}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export const TagLinkList = ({ tags }) => {
  if (!tags || tags.length === 0) return null

  return (
    <ul>
      {tags.map((tag: SelectProperty) => {
        return (
          <li key={tag.name}>
            <Link href={getTagLink(tag.name)} className={`tag ${colorClass(tag.color)}`}>
              {tag.name}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export const PostsNotFound = () => (
  <div className={styles.postsNotFound}>
    Woops! did not find the posts, redirecting you back to the blog index
  </div>
)
