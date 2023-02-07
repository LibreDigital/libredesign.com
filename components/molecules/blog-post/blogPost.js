import { HTMLContent } from '@utils/helpers'

import Link from 'next/link'
import MorePosts from '../more-posts/MorePosts'

const BlogPost = ({ currentPost, morePost }) => {

  const tags = currentPost?.tags?.nodes
  const imgUrl = currentPost?.featuredImage?.node

  return (
    <>
      <div className="px-12 md:px-16 lg:px-40">
        <div className="block md:flex items-center mb-8 md:mb-16 lg:mb-32">
          <div className="uppercase w-full md:w-1/3 text-sm pb-8 md:pb-0 mb-8 md:mb-0">
            {tags && <span className="text-[12px] md:text-[14px]">Tags</span>}
            <p className="mt-3 mb-0 font-medium text-[12px] md:text-[14px]">
              {tags && tags.map((item, index) => (
                <Link key={index} href={item.uri}>
                  <span className="mr-2" key={index}>{item.name}</span>
                </Link>
              ))}
            </p>
          </div>
          {currentPost.summary.highlight &&
            <div>
              <div className="sm:hidden block">
                <hr className="border-lightest-grey" />
              </div>
              <div className="px-0 md:pl-16 lg:pl-40 w-full my-12">
                <h3 className="text-[15px] md:text-[20px] lg:text-[24px] xl:text-[32px] font-bold leading-snug tracking-tighter">
                  <HTMLContent content={currentPost.summary.highlight} />
                </h3>
              </div>
            </div>
          }
        </div>
      </div>
      <div className="mb-8 md:mb-16 lg:mb-32 px-0 md:px-16 lg:px-40">
        <img
          src={imgUrl.mediaItemUrl}
          alt={imgUrl.altText}
          className="w-full"
        />
      </div>
      <div className="px-12 md:px-16 lg:px-40">
        <div className="md:px-14 lg:px-32 mb-8 md:mb-16 lg:mb-32 blog-article--rte">
          <HTMLContent content={currentPost.content} />
        </div>
      </div>
      <MorePosts data={morePost} />
    </>
  )
}

export default BlogPost
