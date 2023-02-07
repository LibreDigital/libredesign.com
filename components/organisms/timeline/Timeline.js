import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper'
import classNames from 'classnames'
import { HTMLContent } from '@utils/helpers'
import 'swiper/css'
import 'swiper/css/scrollbar'
import withCursor from '@context/withCursor'

function Timeline({ data, context }) {

  const { onCursor } = context

  const alignment = data?.alignTitle === 'Left' ? 'text-left' : 'text-right'
  return (
   <section className={classNames('timeline')}>
    {data?.jumboTitle &&
      <>
        <div className={classNames('relative container pt-20 pb-56 pl-6 pr-10 md:pt-40 md:pb-16 md:pr-40 lg:pr-48 xl:pt-60')}>
          <h2 className={classNames('text-[23px] leading-7 sm:text-[26px] sm:leading-8 md:text-[32px] md:leading-9 lg:text-[48px] lg:leading-tight xl:text-[71px] relative z-10 -tracking-[2.84px]')}>{data.jumboTitle}</h2>
          {data?.videoGif.mediaItemUrl && 
            <div className={classNames('h-[188px] w-[188px] absolute bottom-10 right-8 md:top-10 md:right-0 md:h-[220px] md:w-[220px] lg:w-[270px] lg:h-[270px] xl:w-[370px] xl:h-[370px]')}>
              <video className={classNames('w-full h-full')} preload="auto" autoPlay={true} loop={true} muted={true} playsInline>
                <source src={data?.videoGif?.mediaItemUrl} type="video/mp4" />
              </video>
            </div>
          }
        </div>
        <div className={classNames('p-10 relative')}>
          <hr />
        </div>
      </>}
    <div className={classNames('container py-12 relative z-10 overflow-visible px-12')}>
      {data?.preheading && <p className={classNames(`${alignment} mb-2 text-[20px] leading-6 md:mb-10 timeline-subtitle1 tracking-[0.41px]`)}>{data.preheading}</p>}
      <h2 className={classNames(`text-[26px] leading-7 sm:text-[32px] sm:leading-8 md:text-[36px] md:leadinig-9 lg:text-[48px] lg:leading-10 xl:text-[71px] xl:leading-tight -tracking-[1.04px] mb-10 uppercase ${alignment}`)}>
        <HTMLContent content={data?.title} />
      </h2>
      <div onMouseEnter={() => onCursor('drag')} onMouseLeave={onCursor}>
        <Swiper
          slidesPerView={1.2}
          spaceBetween={30}
          breakpoints={{
            900: {
              slidesPerView: '3.2'
            }
          }}
          scrollbar={{ hide: false }}
          modules={[Scrollbar]}
          className={classNames('!overflow-visible')}>
          {data?.milestones.map((milestone, index) => {
            return (
              <SwiperSlide key={index}>
                <div className={classNames('mb-8 h-20 relative pr-10')}>
                  <h4 className={classNames('text-xl font-normal')}><HTMLContent content={milestone?.title} /></h4>
                  <span className={classNames('text-sm font-light text-lightest-grey absolute right-0 top-[5px]')}>(0{index+1})</span>
                </div>
                <div className={classNames('text-sm mb-24 font-light')}>
                  <HTMLContent content={milestone?.description} />
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

export default withCursor(Timeline);