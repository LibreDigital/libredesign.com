import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import Link from 'next/link'
import { format } from 'date-fns'
import 'swiper/css'
import 'swiper/css/navigation'

export default function FeaturedPosts({ latestPosts }) {
  return (
    <>
      <h4>Latest News</h4>
      <Swiper navigation={true} modules={[Navigation]} className="latest-posts">
        {latestPosts?.map((post, index) => {
          return (
            <SwiperSlide key={index}>
              <div><Link href={post.uri}>{format(new Date(post.date), 'MM.dd.yy')}</Link></div>
              <h3><Link href={post.uri}>{post.title}</Link></h3>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}
