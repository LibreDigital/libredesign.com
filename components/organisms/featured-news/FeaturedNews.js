import BlogArticle from '@components/molecules/blog-article/BlogArticle'
import { HTMLContent } from '@utils/helpers'
import Link from 'next/link'

export default function FeaturedNews({ data, latestPosts }) {
  const limit = parseInt(data?.show) || 3
  return (
    <section className="overflow-hidden pb-24">
      <div className="py-16 px-12 sm:px-0 sm:py-32 container">
        <h2 className="uppercase text-2xl sm:text-4xl"><HTMLContent content={data?.title} /></h2>
      </div>
      {latestPosts?.slice(0, limit).map((post, index) => {
        return (
          <BlogArticle key={index} post={post} posts={latestPosts} index={index + (limit - 4)} />
        )
      })}
      <div className="flex justify-center pb-40 pt-20">
        <Link href="/blog/"><a className="bg-black rounded-full text-white font-medium text-sm px-8 py-2">MORE NEWS &nbsp;→⃝</a></Link>
      </div>
    </section>
  )
}
