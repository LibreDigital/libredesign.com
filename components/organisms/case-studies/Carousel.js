import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import classNames from 'classnames'

export default function Carousel({ data }) {

  const { gapWidth, slidesPerView, title, titlePosition, images, overflow } = data
  const spaceBetween = gapWidth === 'Small' ? 30 : gapWidth === 'Medium' ? 50 : gapWidth === 'Medium' ? 80 : 0

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className}">${index+1}</span>`
    }
  }

  const paginationOptions = data?.pagination === 'Numbers' ? pagination : false

  return (
    <section className="carousel relative py-10 sm:py-16 overflow-hidden px-6 md:px-20">
      <div className={classNames('mx-auto max-w-7xl relative')}>
        <div className={classNames('absolute z-10 font-light text-sm', {
          '-top-10 right-0': titlePosition === 'Top Right',
          '-top-10 left-0': titlePosition === 'Top Left',
          '-bottom-10 left-0': titlePosition === 'Bottom Left'
        })}>{title}</div>
        <Swiper
          slidesPerView={Number(slidesPerView)}
          spaceBetween={spaceBetween}
          pagination={paginationOptions}
          modules={[Pagination]}
          className={classNames('swiper bullets--below', {
            '!overflow-visible': overflow === 'Visible'
          })}>
          {images?.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={image.mediaItemUrl} alt={image.altText} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}
