import classNames from 'classnames'
import { HTMLContent } from '@utils/helpers'
import AnalogClock from 'analog-clock-react'
import GoogleMapReact from 'google-map-react'
import { clock } from '@utils/helpers'
import { useEffect, useState } from 'react'
import { mapJS } from '@utils/map'

export default function Locations({ data }) {

  const [time, setTime] = useState(Date.now())

  const images = data?.images

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const Marker = () => {
    return (
      <div>
        <svg width="31.809" height="31.809" viewBox="0 0 31.809 31.809">
          <g id="libre-icon" transform="translate(-593.599 -1103.614)">
            <circle id="Ellipse_10" data-name="Ellipse 10" cx="15.905" cy="15.905" r="15.905" transform="translate(593.599 1103.614)"/>
            <path id="libre-icon-2" data-name="libre-icon" d="M1261.329,9029.389a10.936,10.936,0,1,0,10.936,10.936,10.935,10.935,0,0,0-10.936-10.936m1.427,12.232h7.887a9.4,9.4,0,1,1-18.475-3.415h11.623a2.565,2.565,0,1,0-2.565-2.565v1.035h-8.565a9.4,9.4,0,0,1,18.068,3.415h-7.972v-.923h-1.531v.923h-2.164a3.694,3.694,0,1,0,3.7,3.7v-1.205h-1.531v1.205a2.164,2.164,0,1,1-2.164-2.166h3.7Zm-1.531.961h0Zm0-3.414h0Zm1.531-2.492v-1.035a1.034,1.034,0,1,1,1.034,1.035Z" transform="translate(-651.827 -7920.805)" fill="#fff"/>
          </g>
        </svg>
      </div>
    )
  }

  const mapOptions = () => {
    return {
      styles: mapJS
    }
  }

  return (
    <section className={classNames('locations overflow-hidden')}>
      <div className={classNames('sm:px-20 px-12 sm:pt-40 pt-24 sm:pb-20 pb-10 lg:px-24 xl:px-32')}>
        <h1 className={classNames('leading-tight sm:text-[35px] sm:leading-snug lg:text-[48px] xl:text-5xl xl:leading-tight text-[31px]')}>
          <HTMLContent content={data?.title} />
        </h1>
      </div>

      <div className={classNames('px-10')}>
        <hr />
      </div>

      <div>
        <div className={classNames('max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 sm:gap-10 gap-0 sm:my-20 my-10 sm:px-24 lg:px-32 px-12')}>
          {data?.location?.map((location, index) => {
            const t = clock(location?.timezone)
            return (
              <div key={index}>
                <div className="sm:h-[750px] h-[500px] w-full">
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyATrdOwp5OVl5RHuwcwnggXVTSUpD0Ii2o" }}
                    defaultCenter={{
                      lat: Number(location.lat),
                      lng: Number(location.long)
                    }}
                    defaultZoom={11}
                    options={mapOptions}
                  >
                    <Marker
                      lat={Number(location?.lat)}
                      lng={Number(location?.long)}
                    />
                  </GoogleMapReact>
                </div>
                <div className="sm:p-6 lg:p-8 px-0 py-8">
                  <div className="sm:mb-20 mb-12">
                    <h2 className="text-[26px] sm:text-[31px] sm:leading-snug lg:text-[36px] xl:text-[60px] xl:leading-tight" suppressHydrationWarning>{location?.title}<br/>{t.hours}:{t.minutes}:{t.seconds}<br/>{t.session}</h2>
                  </div>
                  <div className="sm:text-[20px] lg:text-2xl text-[18px] font-light address mb-10">
                    <HTMLContent content={location.address} />
                    <a href={location.mapsLink} target="_blank">View in Maps</a>
                  </div>
                  {location.phone && <div className="sm:text-[20px] lg:text-2xl text-[18px] font-light">
                    <a href={`tel:${location.phone.replaceAll(' ','').replaceAll('-','')}`}>{location.phone}</a>
                  </div>}
                  <div className="sm:text-[20px] lg:text-2xl text-[18px] font-light mb-10">
                    <a className="underline" href={`mailto:${location.email}`}>{location.email}</a>
                  </div>
                  <div className="sm:text-[20px] lg:text-2xl text-[18px] font-light mb-10">
                    <HTMLContent content={location.hours} />
                  </div>
                  <div className="sm:scale-100 scale-75 origin-top-left">
                    <AnalogClock {...{
                      useCustomTime: true,
                      width: "160px",
                      border: true,
                      borderColor: "#000000",
                      baseColor: "#000000",
                      centerColor: "#000000",
                      centerBorderColor: "#ffffff",
                      handColors: {
                        second: "#FF0000",
                        minute: "#ffffff",
                        hour: "#ffffff"
                      },
                      "seconds": t.seconds,
                      "minutes": t.minutes,
                      "hours": t.hours
                    }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="sm:block hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-2 pb-8">
          <div className="flex items-end">
            <img src={images[0].mediaItemUrl} alt={images[0].altText} className="absolute left-0 w-1/2 pr-4" />
          </div>
          <div className="flex items-end">
            <img src={images[1].mediaItemUrl} alt={images[1].altText} className="pl-4" />
          </div>
        </div>
        <div className="grid grid-cols-2 pb-24">
          <div className="">
            <img src={images[2].mediaItemUrl} alt={images[2].altText} className="pr-4 pb-8 w-3/5 ml-auto" />
            <img src={images[4].mediaItemUrl} alt={images[4].altText} className="pr-4" />
          </div>
          <div className="">
            <img src={images[3].mediaItemUrl} alt={images[3].altText} className="pl-4 pb-8" />
            <img src={images[5].mediaItemUrl} alt={images[5].altText} className="pl-4 w-2/5" />
          </div>
        </div>
      </div>


      <div className="sm:hidden block">
        <div className="">
          <div className="mb-6">
            <img src={images[0].mediaItemUrl} alt={images[0].altText} />
          </div>
          <div className="mb-4 w-1/2 ml-auto">
            <img src={images[2].mediaItemUrl} alt={images[1].altText} />
          </div>
          <div className="mb-8 pl-4">
            <img src={images[4].mediaItemUrl} alt={images[2].altText} />
          </div>
          <div className="mb-6 w-3/4">
            <img src={images[1].mediaItemUrl} alt={images[4].altText} />
          </div>
          <div className="mb-4">
            <img src={images[3].mediaItemUrl} alt={images[3].altText} />
          </div>
          <div className="mb-16 w-4/12">
            <img src={images[5].mediaItemUrl} alt={images[5].altText} />
          </div>
        </div>
      </div>
            

    </section>
  )
}
