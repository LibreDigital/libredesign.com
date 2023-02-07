import classNames from 'classnames'
import { HTMLContent } from '@utils/helpers'

export default function AboutHero({ data }) {

  const handleClick = (ev) => {
    ev.preventDefault()
    document.querySelector('.services').scrollIntoView();
  }

  const image = (index) => data?.images[index].mediaItemUrl
  const alt = (index) => data?.images[index].altText
  const title = data?.title
    .replace(`[IMAGE-1]`,`<img class="w-40 inline align-bottom relative top-6" src="${image(0)}" alt="${alt(0)}" />`)
    .replace(`[IMAGE-2]`,`<img class="w-40 inline align-bottom pl-4" src="${image(1)}" alt="${alt(1)}" />`)
    .replace(`[IMAGE-3]`,`<img class="w-40 inline align-bottom" src="${image(2)}" alt="${alt(2)}" />`)
    .replace(`[IMAGE-4]`,`<img class="w-40 inline align-bottom" src="${image(3)}" alt="${alt(3)}" />`)
    .replace(`[IMAGE-5]`,`<img class="w-40 inline align-bottom relative -left-20" src="${image(4)}" alt="${alt(4)}" />`)
    .replace(`[IMAGE-6]`,`<img class="w-40 inline align-bottom" src="${image(5)}" alt="${alt(5)}" />`)

  return (
   <section className={classNames('about-hero')}>
    <div className={classNames('flex flex-col justify-center min-h-screen px-4 md:px-12 sm:px-16 pt-24 sm:pt-0 relative')}>
      <h1 className={classNames('relative abouthero-title text-[36px] sm:text-[24px] md:text-[26px] lg:text-[36px] xl:text-[48px] 2xl:text-[64px]')}>
        <HTMLContent content={title} />
      </h1>
      <div className={classNames('grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-12 mt-16 sm:mt-28 sm:mb-0 mb-12 px-6 sm:px-0')}>
        {data?.highlights.map((highlight, index) => {
          return (
            <div key={index}>
              <h4 className={classNames('text-sm text-lightest-grey font-light mb-1')}>{highlight.title}</h4>
              <div className={classNames('text-sm font-light')}>
                <HTMLContent content={highlight.description} />
              </div>
            </div>
          )
        })}
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:block hidden">
        <button onClick={handleClick} className="rounded-full h-[40px] w-[40px] bg-black flex items-center justify-center">
          <svg width="9.277" height="10.231" viewBox="0 0 9.277 10.231">
            <g id="down-arrow" transform="translate(-4463.996 -1090.767)">
              <path id="Path_412" data-name="Path 412" d="M4464,1096.359l.885-.894,3.107,3.107v-7.805h1.293v7.805l3.1-3.107.89.894-4.639,4.639Z" fill="#fff"/>
            </g>
          </svg>
        </button>
      </div>
    </div>
   </section>
  )
}
