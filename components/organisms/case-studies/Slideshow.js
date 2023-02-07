import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

export default function Slideshow({ data }) {

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className}">${index+1}</span>`
    }
  }

  return (
    <section className="relative px-6 lg:px-32">
      <Swiper
        slidesPerView={1}
        spaceBetween={100}
        pagination={pagination}
        modules={[Pagination]}
        className="swiper">
        {data?.images.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={image.mediaItemUrl} alt={image.altText} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </section>
  )
}
