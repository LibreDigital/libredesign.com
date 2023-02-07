import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import classNames from 'classnames'
import { format } from 'date-fns'
import Link from 'next/link'
import withCursor from '@context/withCursor'

function MorePosts({ data, context }) {

  const { onCursor } = context

  return (
    <section className="relative px-12 py-20 overflow-hidden" onMouseEnter={() => onCursor('drag')} onMouseLeave={onCursor}>
      <div className="container">
        <h2 className="text-[26px] sm:text-[32px] md:text-[36px] lg:text-[68px] mb-8 md:mb-16">More Articles</h2>
        <Swiper
          slidesPerView={1.1}
          spaceBetween={30}
          breakpoints={{
            900: {
              slidesPerView: '3.6'
            }
          }}
          className={classNames('swiper !overflow-visible')}>
          {data?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Link href={item.uri}>
                  <img
                    src={item.featuredImage.node.mediaItemUrl}
                    alt=""
                    loading="lazy"
                    className="w-full"
                  />
                </Link>
                <div className="mt-4">
                  <h4 className="text-[12px] sm:text-[16px] md:text-[20px] lg:text-[26px] font-light text-lightest-grey">
                    {format(new Date(item?.date), "MM.dd.yy")}
                  </h4>
                  <Link href={item.uri}><h3 className="cursor-pointer text-[18px] md:text-[22px] lg:text-[26px] font-bold">{item?.title}</h3></Link>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}

export default withCursor(MorePosts);