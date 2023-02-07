import { HTMLContent } from '@utils/helpers'
import classNames from 'classnames'

export default function TitleDescription({ data }) {

  const { title, subtitle, description } = data

  return (
    <section className="title-description px-12 lg:px-32 py-4 sm:py-16 relative z-10">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:basis-1/2">
          {title && <h2 className="leading-tight sm:text-[35px] sm:leading-snug lg:text-[48px] xl:text-5xl xl:leading-tight text-[31px]">{title}</h2>}
        </div>
        <div className="underline-links lg:basis-1/2 font-light lg:text-[1.325rem] md:text-[22px] text-[14px] lg:pr-[40px] pt-4">
          <p className="mb-0 text-lightest-grey">{subtitle}</p>
          <HTMLContent content={description} />
        </div>
      </div>
    </section>
  )
}
