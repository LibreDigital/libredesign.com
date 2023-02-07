import classNames from 'classnames'
import { HTMLContent } from '@utils/helpers'
import { useState } from 'react'
import Link from 'next/link'
import { scroller } from 'react-scroll'

export default function OurProcess({ data }) {

  const [open, setOpen] = useState(0)
 
  const handleOpen = (value) => {
    if (parseInt(value) === parseInt(open)) {
      setOpen(null)
    } else {
      scroller.scrollTo(`accordion-${value}`)
      setTimeout(() => {
        setOpen(parseInt(value))
      }, 1000)
    }
  }

  return (
   <section>
      <div className={classNames('our-process-header sm:px-20 sm:pt-40 sm:pb-24 pl-12 pr-8 pt-32 pb-12 overflow-hidden')}>
        <h1 className={classNames('sm:leading-tight leading-10 md:text-[48px] lg:text-[60px] xl:text-[72px] 2xl:text-[90px] text-3xl -tracking-[4.16px]')}>
          <HTMLContent content={data?.title} />
        </h1>
      </div>
      <div className={classNames('our-process-accordion')}>
        <div className={classNames('sm:p-10 p-0')}>
          {data?.process.map((process, index) => {
            const half = Math.ceil(process?.item.length / 2)
            return (
              <div key={index}>
                <div className={classNames('sm:px-0 px-6')}>
                  <hr />
                </div>
                <div className={classNames('container')}>
                  <button className={classNames(`accordion-${index} w-full flex justify-between items-center text-left relative z-30 sm:py-20 sm:px-0 px-10 py-12`)} onClick={() => handleOpen(parseInt(index))}>
                    <h3 className="sm:text-3xl lg:text-[38px] text-[23px] sm:leading-normal leading-tight -tracking-[1.52px]">{process?.title}</h3>
                    <svg className={classNames('delay-140 transition-all', {
                    '-rotate-45': parseInt(open) !== parseInt(index),
                    'rotate-0': parseInt(open) === parseInt(index)
                  })} width="25" height="25" viewBox="0 0 15.556 15.556">
                      <g transform="translate(-1852.222 -52.555)" opacity="1">
                        <line x1="14.142" y2="14.142" transform="translate(1852.929 53.262)" fill="none" stroke="#000" strokeWidth="1"/>
                        <line x1="14.142" y1="14.142" transform="translate(1852.929 53.262)" fill="none" stroke="#000" strokeWidth="1"/>
                      </g>
                    </svg>
                  </button>
                  <div className={classNames('md:grid hidden grid-cols-4 gap-10 pt-24 overflow-hidden transition-all relative', {
                    'max-h-0 pt-0': parseInt(open) !== parseInt(index),
                    'max-h-full pb-24': parseInt(open) === parseInt(index)
                  })}>
                    {process?.item.length === 4 ? (
                      <>
                        {process?.item.map((item, index) => {
                          return (
                            <div className="mb-6" key={index}>
                              <p className={classNames('text-[60px] lg:text-5xl font-display mb-14')}>0{index+1}</p>
                              <h4 className={classNames('text-xl font-normal mb-6')}>{item.title}</h4>
                              <div className={classNames('text-sm font-light')}>
                                <HTMLContent content={item.description} />
                              </div>
                            </div>
                          )
                        })}
                      </>
                    ) : (
                      <>
                        {process?.item.slice(0, half).map((item, index) => {
                          return (
                            <div className="mb-6" key={index}>
                              <p className={classNames('text-[60px] lg:text-5xl font-display mb-14')}>0{index+1}</p>
                              <h4 className={classNames('text-xl font-normal mb-6')}>{item.title}</h4>
                              <div className={classNames('text-sm font-light')}>
                                <HTMLContent content={item.description} />
                              </div>
                            </div>
                          )
                        })}
                        <div></div>
                        <div className="flex items-end pb-6">
                          <Link href={'/case-studies/'}>
                            <a className="flex items-center pl-6 uppercase text-black text-sm font-light relative before:absolute before:w-[17px] before:h-[17px] before:rounded-full before:bg-black before:left-0">View Branding Work</a>
                          </Link>
                        </div>
                        {process?.item.slice(-half).map((item, index = index - half) => {
                          return (
                            <div className="mb-6" key={index}>
                              <p className={classNames('text-[60px] lg:text-5xl font-display mb-14')}>0{half + (index + 1)}</p>
                              <h4 className={classNames('text-xl font-normal mb-6')}>{item.title}</h4>
                              <div className={classNames('text-sm font-light')}>
                                <HTMLContent content={item.description} />
                              </div>
                            </div>
                          )
                        })}
                      </>
                    )}
                  </div>
                  <div className={classNames('md:hidden flex gap-20 px-10 overflow-auto transition-all relative', {
                    'max-h-0 pt-0': parseInt(open) !== parseInt(index),
                    'max-h-full pb-24': parseInt(open) === parseInt(index)
                  })}>
                    <>
                      {process?.item.map((item, index) => {
                        return (
                          <div className="mb-6 basis-[75%] shrink-0" key={index}>
                            <p className={classNames('text-[60px] lg:text-5xl font-display mb-14')}>0{index+1}</p>
                            <h4 className={classNames('text-xl font-normal mb-6')}>{item.title}</h4>
                            <div className={classNames('text-sm font-light')}>
                              <HTMLContent content={item.description} />
                            </div>
                          </div>
                        )
                      })}
                    </>
                    <div className="md:hidden w-full absolute bottom-12 left-10">
                      <Link href={'/case-studies/'}>
                        <a className="flex items-center pl-6 uppercase text-black text-sm font-light relative before:absolute before:w-[17px] before:h-[17px] before:rounded-full before:bg-black before:left-0">View Branding Work</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          <div className={classNames('sm:px-0 px-6')}>
            <hr />
          </div>
        </div>
      </div>
   </section>
  )
}


