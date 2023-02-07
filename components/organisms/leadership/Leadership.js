import Lottie from 'lottie-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import classNames from 'classnames'
import { HTMLContent } from '@utils/helpers'
import Rellax from 'react-rellax'
import 'swiper/css'
import { useState } from 'react'
import circleAnimation from "../../../libre-design-digital-animation-black.json"
import withCursor from '@context/withCursor'

function Leadership({ data, context }) {

  const { onCursor } = context

  const [open, setOpen] = useState(-1)

  const handleOpen = (value) => {
    if (parseInt(value) === parseInt(open)) {
      setOpen(null);
    } else {
      setOpen(parseInt(value));
    }
  };
  return (
   <section className={classNames('leadership')}>
    <div className={classNames('container relative pt-40 pb-10 md:pb-20 px-10 md:px-0')}>
      <Rellax speed={-2} className={classNames('absolute -top-[670px] sm:-top-[540px] left-0 w-64 lg:w-96')}>
        <img src={data?.images[0].mediaItemUrl} alt={data?.images[0].altText} loading="lazy" />
      </Rellax>
      <Rellax speed={-2} className={classNames('absolute -top-[280px] right-0 w-64 lg:w-96 hidden md:block')}>
        <img src={data?.images[2].mediaItemUrl} alt={data?.images[2].altText} loading="lazy" />
      </Rellax>
      <div className={classNames('absolute left-1/2 -translate-x-1/2')}>
        <h2 className={classNames('my-24 uppercase text-[26px] leading-none sm:text-[33px] md:text-[48px] xl:text-[68px] xl:leading-tight')}>
          <HTMLContent content={data?.title} />
        </h2>
      </div>
      {data?.subheading && 
        <div className={classNames('mt-48 md:mt-60 xl:mt-80 relative')}>
          <h3 className={classNames('text-[15px] leading-5 sm:text-[20px] sm:leading-6 md:text-[24px] md:leadinig-8 lg:text-[32px] lg:leading-10')}><HTMLContent content={data?.subheading} /></h3>
        </div>}      
    </div>
    <div className={classNames('px-10')}>
      <hr />
    </div>
    <div className={classNames('flex mt-16 md:mt-32 px-10 md:px-0')}>
      <div className={classNames('basis-1/3 min-w-0 relative hidden md:block px-32 pt-4')}>
        <Lottie animationData={circleAnimation} loop={true} />
      </div>
      <div onMouseEnter={() => onCursor('drag')} onMouseLeave={onCursor} className={classNames('md:basis-2/3 min-w-0 overflow-visible')}>
        <Swiper
          slidesPerView={1.3}
          spaceBetween={30}
          breakpoints={{
            1024: {
              slidesPerView: '2.6',
              spaceBetween: 40
            },
            640: {
              slidesPerView: '1.4',
              spaceBetween: 40
            }
          }}
          className={classNames('sm:!overflow-hidden !overflow-visible')}>
          {data?.teamList.map((member, index) => {
            const details = member?.memberDetails
            const newdetails={details,index}
            const headshot = member?.featuredImage?.node?.mediaItemUrl
            const alt = member?.featuredImage?.node?.altText
            return (
              <SwiperSlide key={index}>
                <div className={classNames('mb-14')}>
                  <img src={headshot} alt={alt} />
                </div>
                <div>
                  <h3 className={classNames('text-[17px] leading-7 sm:text-[22px] sm:leading-8 md:text-[28px] md:leadinig-9 lg:text-[32px] lg:leading-10 -tracking-[1.28px]')}>{member?.title}</h3>
                  <h3 className={classNames('text-[17px] leading-6 sm:text-[22px] sm:leading-7 md:text-[28px] md:leadinig-9 lg:text-[32px] lg:leading-10 text-lightest-grey -tracking-[1.28px]')}>{details?.jobTitle}</h3>
                </div>
                <div>
                  <div key={index}>
                    <div className={classNames("container")}>
                      <button
                        className={classNames(
                          `accordion-${index} w-full flex justify-between items-center text-left relative z-30 sm:py-20 sm:px-0 pr-10 pb-12 pt-6 md:hidden`)}
                        onClick={() => handleOpen(parseInt(index))}>
                        Read Bio ↗
                      </button>
                      <div
                        className={classNames(
                          "sm:grid gap-10 overflow-hidden transition-all relative md:!max-h-full",
                          {
                            "max-h-0 pt-0":
                              parseInt(open) !== parseInt(index),
                            "max-h-full pb-24":
                              parseInt(open) === parseInt(index),
                          }
                        )}
                      >
                        <div
                          className={classNames(
                            "text-sm font-light mb-12 md:pt-12"
                          )}
                        >
                            <HTMLContent content={newdetails.details?.description}
                            />
                            <a target="_blank" className="flex items-center pl-6 uppercase text-black text-sm font-light relative before:absolute before:w-[17px] before:h-[17px] before:rounded-full before:bg-black before:left-0" href={`${details?.email}`}>Contact {member?.title.split(' ')[0]}</a>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default withCursor(Leadership);
