import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function RelatedWork({ data }) {

  const [ _color, setColor ] = useState(data[0].CaseStudySections.color)
  const router = useRouter()

  useEffect(() => {
    console.log(data[0].CaseStudySections.color)
    setColor(data[0].CaseStudySections.color)
  },[router.asPath])
  
  return (
    <section className="related-work relative" style={{background: `linear-gradient(to top, ${_color}, transparent)` }}>
      <div className="relative px-12 lg:px-32 max-w-7xl mx-auto py-28">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        onSwiper={(swiper) => {
          const idx = swiper.realIndex
          const i = data[idx].CaseStudySections.color
          if (i)
            setColor(i)
          else
            setColor('transparent')
        }}
        onSlideChange={(swiper) => {
          const idx = swiper.realIndex
          const i = data[idx].CaseStudySections.color
          if (i)
            setColor(i)
          else
            setColor('transparent')
        }}
        className={classNames('swiper')}>
        {data?.map((item, index) => {
          const image = item.relatedImage.image
          return (
            <SwiperSlide key={index}>
              <div className="mx-auto max-w-7xl flex flex-col sm:flex-row">
                <div className="basis-full sm:basis-1/2">
                  <p className="lg:text-2xl md:text-[22px] text-[14px] mb-4">You may also like</p>
                  <h2 className="leading-tight sm:text-[48px] text-[32px] mb-8 lg:mb-20"><Link href={item.uri}><a>{item.title}</a></Link></h2>
                  <div>
                    <p className="text-[14px]">Tags</p>
                    <div className="flex gap-4 text-[14px]">
                      {item.categories.nodes.map((category, index2) => {
                        return (
                          <div key={index2} className="uppercase">
                            {category.name}
                          </div>
                        )
                      })}
                    </div>
                    
                  </div>
                </div>
                {image && <div className="basis-full sm:basis-1/2 mt-6 sm:mt-0">
                  <Link href={item.uri}><a><img src={image.mediaItemUrl} alt={image.altText} /></a></Link>
                </div>}
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      </div>
    </section>
  )
}

