import classNames from 'classnames'
import { HTMLContent } from '@utils/helpers'
import Link from 'next/link'
export default function HomeHero({ data }) {

  const { title, images } = data

  const positions = [
    {
      width: '600px', top: '380px', left: 'calc(50% - 300px)'
    },
    {
      width: '450px', bottom: '0', right: '4%'
    },
    {
      width: '400px', top: '-115px', right: '350px'
    },
    {
      width: '351px', top: '275px', right: '0'
    },
    {
      width: '355px', bottom: '30px', left: '4%'
    },
    {
      width: '355px', top: '350px', left: '-170px'
    }
  ]

  return (
   <section className={classNames('home-hero bg-black text-white relative overflow-hidden')}>
    <div className={classNames('flex flex-col min-h-auto md:min-h-screen md:px-60 md:py-56 sm:pt-40 md:pt-36 pt-32 lg:pt-40')}>
      <h1 className={classNames('relative text-lg md:text-[24px] 2xl:text-[36px] md:p-0 2xl:px-8 max-w-[940px] leading-[1.3em] px-8 -tracking-[1.44px]')}>
        <HTMLContent content={title} />
      </h1>
      <div className="homehero-slider">
        {images.map((image, index) => {
          return (
            <div style={positions[index]} className={classNames('absolute z-32')} key={index}>
              <Link href={image.link?.url}>
                <a className={classNames('block relative group h-full')}>
                  <div className="absolute top-0 left-0 opacity-50 sm:opacity-0 w-full h-full bg-black sm:group-hover:opacity-20 duration-300"></div>
                  <img data-index={index} className={classNames('h-[200px] sm:h-auto object-cover')} src={image.image.mediaItemUrl} alt={image.image.altText} />
                  <div className={classNames('text-center font-display text-[18px] sm:text-[24px] absolute w-full h-full top-0 left-0 -translate-1/2 flex justify-center items-center opacity-100 sm:opacity-0 group-hover:opacity-100 duration-200 pointer-events-none')}>
                    <HTMLContent content={image.title} />
                  </div>
                </a>
              </Link>
            </div>
          )
        })}
      </div>
      <div className="flex justify-center pb-12 pt-12 md:hidden">
        <Link href="/case-studies/"><a className="bg-white rounded-full text-black font-medium text-sm px-8 py-2">MORE PROJECTS &nbsp;→⃝</a></Link>
      </div>
    </div>
   </section>
  )
}
