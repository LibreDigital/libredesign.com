import classNames from 'classnames'
import { animateNumber, isInViewport } from '@utils/helpers'
import { useEffect } from 'react'

export default function CaseStudyStatistics({ data }) {

  useEffect(() => {
    const element = document.querySelectorAll('.animate-number')
    window.addEventListener('scroll', () => {
      if (isInViewport(element))
        animateNumber(element, 'data-num', 500)
    })
  }, [])
  
  return (
   <section>
    <div className={classNames('mx-auto max-w-7xl px-12')}>
      <div className={classNames('flex flex-wrap justify-between')}>
        {data?.statistic?.map((statistic, index) => {
          const splitTitle = statistic.highlightLine1
          const first = splitTitle[0]
          const last = splitTitle[splitTitle.length - 1]

          const _sanitize = classNames('animate-number sm:text-[35px] sm:leading-snug lg:text-[48px] xl:text-5xl xl:leading-tight text-[31px]', {
            'before:content-["+"]': first === '+',
            'before:content-["$"]': first === '$',
            'after:content-["+"]': last === '+',
            'after:content-["K"]': last === 'k' || last === 'K',
            'after:content-["M"]': last === 'm' || last === 'M',
            'after:content-["%"]': last === '%',
            'text-white': statistic.image !== null
          })

          const _sanitize2 = classNames('animate-number text-[26px] sm:text-[30px] md:text-[32px] lg:text-[38px]', {
            'before:content-["+"]': first === '+',
            'before:content-["$"]': first === '$',
            'after:content-["+"]': last === '+',
            'after:content-["K"]': last === 'k' || last === 'K',
            'after:content-["M"]': last === 'm' || last === 'M',
            'after:content-["%"]': last === '%',
            'text-white': statistic.image !== null
          })

          if (statistic.image !== null)
            return (
              <div className={classNames('statistic relative overflow-hidden rounded-xl mb-[40px] after:bg-gradient-to-t after:from-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-1/2 after:opacity-75 before:opacity-75 before:bg-gradient-to-b before:from-black before:absolute before:top-0 before:left-0 before:w-full before:h-1/2', {
                'basis-[calc(50%-20px)]': statistic.width === '50%',
                'basis-full': statistic.width === '100%'
              })} key={index}>
                <img src={statistic.image.mediaItemUrl} alt={statistic.image.altText} />
                <div className="flex flex-col justify-between absolute w-full h-full top-0 left-0">
                  <div className="relative z-10 sm:px-10 p-6 md:p-8">
                    <p className={classNames('font-light lg:text-2xl md:text-[22px] text-[14px] text-white')}>{statistic.title}</p>
                  </div>
                  <div className="text-right relative z-10 md:p-8 p-6">
                    <h2 data-num={statistic.highlightLine1.replace(/[^0-9.]/g, '')} className={_sanitize}>0</h2>
                    <h2 className={classNames('sm:text-[35px] sm:leading-snug lg:text-[48px] xl:text-5xl xl:leading-tight text-[31px] text-white')}>{statistic.highlightLine2}</h2>
                    <p className={classNames('font-light lg:text-2xl md:text-[22px] text-[14px] text-white mb-0 mt-4')}>{statistic.highlightSubtext}</p>
                  </div>
                </div>
              </div>
            )
          else
            return (
              <div className={classNames('statistic mb-[20px] overflow-hidden', {
                'w-full sm:w-[calc(50%-10px)]': statistic.width === '50%',
                'w-full sm:w-full': statistic.width === '100%'
              })} key={index}>
                <div className={classNames('flex border-light-grey border-[0.75px] rounded-xl items-center p-4 sm:p-10', {
                  'justify-between': statistic.title
                })}>
                  {statistic.title ? (
                    <>
                      <div>
                        <span className="font-light lg:text-2xl md:text-[22px] text-[14px]">{statistic.title}</span>
                      </div>
                      <div className="flex items-center">
                        <h2 data-num={statistic.highlightLine1.replace(/[^0-9.]/g, '')} className={_sanitize2}>0</h2>
                        <p className={classNames('font-light lg:text-2xl md:text-[22px] text-[14px] mb-0 ml-4 relative top-[2px]')}>{statistic.highlightSubtext}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="basis-2/5">
                        <h2 data-num={statistic.highlightLine1.replace(/[^0-9.]/g, '')} className={_sanitize2}>0</h2>
                      </div>
                      <div>
                        <p className={classNames('font-light lg:text-2xl md:text-[22px] text-[14px] mb-0 ml-4 relative top-[2px]')}>{statistic.highlightSubtext}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
        })}
      </div>
    </div>
   </section>
  )
}
