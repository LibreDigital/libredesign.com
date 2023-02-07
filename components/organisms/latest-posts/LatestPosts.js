import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import classNames from 'classnames'
import Link from 'next/link'
import { format } from 'date-fns'
import 'swiper/css'
import 'swiper/css/navigation'



export default function LatestPosts({ latestPosts }) {

  return (
    <>
      <h4 className={classNames('sm:mb-14 mb-6 sm:text-sm text-[11px] font-medium')}>Latest News</h4>
      <Swiper modules={[Navigation]} navigation={true} className="swiper latest-posts !overflow-visible">
        {latestPosts?.map((post, index) => {
          let link
          if (post?.outboundLink?.link) {
            link = post?.outboundLink?.link
          } else {
            link = post.uri
          }
          return (
            <SwiperSlide key={index}>
              <div>
                <Link href={link}>
                  <a><span className={classNames('sm:text-3xl text-xl font-display text-grey')}>{format(new Date(post.date), 'MM.dd.yy')}</span></a>
                </Link>
              </div>
              <h3 className={classNames('sm:text-3xl text-xl')}>
                <Link href={link}>
                  <a><span>{post.title}</span></a>
                </Link>
              </h3>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}
