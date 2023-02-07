import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper'
import classNames from 'classnames'
import { HTMLContent } from '@utils/helpers'
import 'swiper/css'
import 'swiper/css/scrollbar'
import Link from 'next/link'
import withCursor from '@context/withCursor'

function FeaturedCaseStudies({ data, context }) {

  const { onCursor } = context

  return (
   <section className={classNames('featured-case-studies overflow-hidden')}>
    <div className={classNames('container sm:py-40 sm:px-0 py-12 px-12')}>
      <h2 className={classNames('text-2xl sm:text-4xl sm:mb-28 mb-16 uppercase')}>
        <HTMLContent content={data?.title} />
      </h2>
      <div onMouseEnter={() => onCursor('drag')} onMouseLeave={onCursor}>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            768: {
              slidesPerView: '3.1',
              spaceBetween: 60
            }
          }}
          scrollbar={{ hide: false }}
          modules={[Scrollbar]}
          className={classNames('!overflow-visible')}>
          {data?.caseStudy.map((caseStudy, index) => {
            return (
              <SwiperSlide key={index}>
                {caseStudy.image && <div className={classNames('mb-12')}>
                  <Link href={caseStudy?.linkTo?.uri}>
                    <a><img src={caseStudy.image.mediaItemUrl} alt={caseStudy.image.altText} /></a>
                  </Link>
                </div>}
                {caseStudy.logo && <div className={classNames('mb-8')}>
                  <Link href={caseStudy?.linkTo?.uri}>
                    <a className="inline-block"><img src={caseStudy?.logo?.mediaItemUrl} alt={caseStudy?.logo?.altText} className="max-h-[35px]" /></a>
                  </Link>
                </div>}
                <div className="text-sm font-light">
                  <HTMLContent content={caseStudy?.description} />
                </div>
                <div className={classNames('mt-[60px] mb-28')}>
                  <Link href={caseStudy?.linkTo?.uri}>
                    <a className="relative inline-flex items-center uppercase text-sm font-medium before:w-[17px] before:h-[17px] before:absolute before:bg-black before:rounded-full">
                      <span className="inline-block pl-[25px]">View Case Study</span>
                    </a>
                  </Link>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
   </section>
  )
}

export default withCursor(FeaturedCaseStudies);