import classNames from 'classnames'
import Link from 'next/link'

export default function OurServices({ data }) {

  const { title, link, servicesList } = data

  return (
   <section className={classNames('bg-black text-white our-services-section')}>
    <div className={classNames('container px-10 sm:px-0 pt-24 sm:pt-32 pb-24 sm:pb-[120px]')}>
      <h2 className={classNames('text-[36px] sm:text-[45px] md:text-[68px] leading-tight mb-5 sm:mb-6')}>{title}</h2>
      {link && <div>
        <Link href={link.url}>
          <a className="relative inline-flex items-center uppercase text-xs sm:text-sm font-medium before:w-[17px] before:h-[17px] before:absolute before:bg-white before:rounded-full" target='_blank'>
            <span className="inline-block pl-[25px]">{link.title} ↗</span>
          </a>
        </Link>
      </div>}
      <div className={classNames('flex flex-wrap gap-x-3 sm:gap-x-5 gap-y-4 sm:gap-y-6 mt-12 sm:mt-16')}>
        {servicesList?.map((service, index) => {
          return (
            <div className={classNames('service w-fit text-xs sm:text-sm border sm:border-2 rounded-[100px] px-5 sm:px-11 py-2 sm:py-5 uppercase')} key={index}>
              {service.title}
            </div>
          )
        })}
      </div>
    </div>
   </section>
  )
}
