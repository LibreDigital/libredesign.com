import classNames from 'classnames'
import { HTMLContent } from '@utils/helpers'
import Link from 'next/link'

export default function Blurb({ data }) {

  const { title, link } = data

  return (
   <section className={classNames('blurb overflow-hidden pt-20 sm:pt-52 pb-12 sm:pb-20')}>
    <div className={classNames('container sm:px-0 px-12')}>
      {title && <h1 className={classNames('text-2xl sm:text-4xl sm:mb-20 mb-16')}>
        <HTMLContent content={title} />
      </h1>}
      {link && <div className={classNames('mt-[60px]')}>
        <Link href={link.url}>
          <a className="relative inline-flex items-center uppercase text-sm font-medium before:w-[17px] before:h-[17px] before:absolute before:bg-black before:rounded-full">
            <span className="inline-block pl-[25px]">{link.title} ↗</span>
          </a>
        </Link>
      </div>}
    </div>
   </section>
  )
}
