import classNames from 'classnames'
import { HTMLContent, animateNumber, isInViewport } from '@utils/helpers'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Statistics({ data }) {

  const router = useRouter()
  const slug = router.query.slug

  useEffect(() => {
    const el = document.querySelectorAll('.animate-number')
    window.addEventListener('scroll', () => {
      if (el !== undefined && isInViewport(el))
        animateNumber(el, 'data-num', 500)
    })
  }, [])

  
  
  return (
   <section className={classNames('bg-black text-white overflow-hidden statistic-section')}>
    <div className={classNames('container py-24 px-10 sm:px-0 sm:py-40')}>
      <h2 className={classNames('text-[26px] sm:text-[45px] md:text-[68px] leading-tight mb-16 sm:mb-24', {
        'normal sm:uppercase': !slug
      })}><HTMLContent content={data?.title} /></h2>
      <div className={classNames('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8')}>
        {data?.statistic?.map((statistic, index) => {
          const splitTitle = statistic.title.split('')
          return (
            <div className={classNames('statistic relative z-10')} key={index}>
              <h2 data-num={statistic.title.replace('+','')} className={classNames('animate-number mb-6 text-[60px] md:text-[45px] 2xl:text-[78px]', {
                'before:content-["+"]': splitTitle[0] === '+',
                'after:content-["+"]': splitTitle[splitTitle.length - 1] === '+',
              })}>0</h2>
              <h4 className={classNames('font-light text-sm text-lightest-grey mb-1')}>{statistic.subheading}</h4>
              <div className={classNames('font-light text-sm')}>
                <HTMLContent content={statistic.description} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
   </section>
  )
}
