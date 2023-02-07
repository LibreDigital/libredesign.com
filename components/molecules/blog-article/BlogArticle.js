import Link from 'next/link'
import { format } from 'date-fns'
import { BlogSummary } from '@utils/helpers'
import withCursor from '@context/withCursor'

function BlogArticle({ post, posts, index, context }) {

  const { onCursor } = context
  const date = format(new Date(post.date), 'MM.dd.yy')
  let link
  if (post?.outboundLink?.link) {
    link = post?.outboundLink?.link
  } else {
    link = post.uri
  }
  return (
    <article>
      <div className="px-8 sm:px-10">
        <hr className="border-lightest-grey" />
      </div>
      <div className="container flex px-12 py-6 sm:py-12 sm:px-0 gap-3 sm:gap-10">
        <div className="basis-1/2 w-1/2 sm:basis-3/12 sm:w-3/12 relative">
          <Link href={link}>
            <a onMouseEnter={() => onCursor('more')} onMouseLeave={onCursor}>
              <img src={post.featuredImage.node.mediaItemUrl} alt={post.featuredImage.node.altText} className="sm:h-auto sm:object-auto object-cover aspect-square sm:aspect-auto" />
            </a>
          </Link>
        </div>
        <div className="basis-1/2 w-1/2 sm:basis-8/12 sm:w-8/12">
          <p className="text-sm sm:text-2xl font-light text-lightest-grey mb-0">{date}</p>
          <div className="text-sm sm:text-2xl font-light">
            <BlogSummary content={post.summary.summary} />
          </div>
        </div>
        <div className="basis-1/12 text-right hidden sm:block">
          <Link href={link}>
            <a className="rounded-full bg-black w-[40px] h-[40px] flex items-center justify-center text-center text-white text-sm font-light inline-flex">→⃝</a>
          </Link>
        </div>
      </div>
      {posts.length === index + 1 &&
        <div className="px-10">
          <hr className="border-lightest-grey" />
        </div>}
    </article>
  )
}

export default withCursor(BlogArticle);