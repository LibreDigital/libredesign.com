import Lottie from 'lottie-react'
import classNames from 'classnames'
import Link from 'next/link'
import { HTMLContent, clock } from '@utils/helpers'
import { useState, useEffect } from 'react'
import circleAnimation from "../../../libre-design-digital-animation.json"
import { useRouter } from 'next/router'

export default function Header({ menu, logo, address, phone, socials }) {

  const [time, setTime] = useState(Date.now())
  const [ menuOpen, setMenuOpen ] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(!menuOpen)
    }
  }, [router.asPath]);

  const t1 = clock('America/Los_Angeles')
  const t2 = clock('Australia/Brisbane')

  return (
    <header className={classNames('relative')}>
      <div className={`fixed z-[10000999] px-4 py-6 sm:p-10 top-0 w-full mix-blend-difference`}>
        <div className={classNames('flex justify-between align-middle')}>
          <div>
            <Link href="/">
              <a className="block sm:w-10 sm:h-10 w-8 h-8"><img src={logo?.mediaItemUrl} alt={logo?.altText} /></a>
            </Link>
          </div>
          <div className={classNames('flex')}>
            <div className={classNames('flex-col uppercase w-[140px] h-[50px] mr-10 text-white hidden sm:flex md:mr-6')}>
              <div className="leading-5 text-right font-normal" suppressHydrationWarning>SD {t1.hours}:{t1.minutes}:{t1.seconds} <span className="text-[10px] font-medium">{t1.session}</span></div>
              <div className="leading-4 text-right font-normal" suppressHydrationWarning>QLD {t2.hours}:{t2.minutes}:{t2.seconds} <span className="text-[10px] font-medium">{t2.session}</span></div>
            </div>
            <button
              className={classNames('relative flex justify-center items-center z-50 sm:w-10 sm:h-10 w-8 h-8 border border-white rounded-full transition-all delay-75', {
                'bg-black rotate-0': menuOpen,
                'bg-white rotate-45': !menuOpen
              })} onClick={() => setMenuOpen(!menuOpen)}>
                <svg width="12" height="12" viewBox="0 0 15.556 15.556">
                  <g transform="translate(-1852.222 -52.555)" opacity="0.998">
                    <line x1="14.142" y2="14.142" transform="translate(1852.929 53.262)" fill="none" stroke={menuOpen ? '#FFF' : '#000'} strokeWidth="2"/>
                    <line x1="14.142" y1="14.142" transform="translate(1852.929 53.262)" fill="none" stroke={menuOpen ? '#FFF' : '#000'} strokeWidth="2"/>
                  </g>
                </svg>
              </button>
          </div>
        </div>
      </div>
      <div className={classNames('fixed top-0 right-0 z-[999999] bg-black mix-blend-normal flex flex-col justify-between items-end transition-all overflow-hidden', {
        'opacity-100 w-full h-full rounded-none': menuOpen,
        'opacity-0 w-0 h-0 rounded-bl-full rounded-tr-3xl z-[-1] p-0': !menuOpen
      })}>
        <div className={classNames('relative min-w-full min-h-screen p-10')}>
          <div>
            <ul className={classNames('sm:mt-24 mt-16 text-right')}>
              {menu?.map((item, index) => {
                return <li key={index}><Link href={item.path}><a className={classNames('lg:text-4xl text-3xl text-white no-underline font-display lg:mb-4 mb-0 inline-block whitespace-nowrap')}>{item.label}</a></Link></li>
              })}
            </ul>
          </div>
          
          <div className={classNames('absolute right-10 bottom-8 flex gap-10 text-right justify-end')}>
            <div>
              <h4 className={classNames('text-white sm:mb-6 mb-4 sm:text-sm text-[12px] font-medium')}>Social Media</h4>
              <ul className={classNames('text-white sm:text-sm text-[12px] font-light')}>
                {socials?.instagram && <li className="mb-2"><a className={classNames('no-underline')} href={socials?.instagram} target="_blank">Instagram ↗</a></li>}
                {socials?.linkedin && <li className="mb-2"><a className={classNames('no-underline')} href={socials?.linkedin} target="_blank">LinkedIn ↗</a></li>}
                {socials?.twitter && <li className="mb-2"><a className={classNames('no-underline')} href={socials?.twitter} target="_blank">Twitter ↗</a></li>}
                {socials?.youtube && <li><a className={classNames('no-underline')} href={socials?.youtube} target="_blank">YouTube ↗</a></li>}
              </ul>
            </div>
            <div className={classNames('ml-6')}>
              <h4 className={classNames('text-white sm:mb-6 mb-4 sm:text-sm text-[12px] font-medium')}>Contact Us</h4>
              <div className={classNames('text-white sm:text-sm text-[12px] font-light')}>
                <div className={classNames('sm:leading-7 leading-6')}>
                  <HTMLContent content={address} />
                </div>
                <div className={classNames('sm:leading-7 leading-6')}>
                  <a className={classNames('no-underline')} href={`tel:${phone.replaceAll(' ','')}`}>{phone}</a>
                </div>
                <div className={classNames('sm:leading-7 leading-6')}>
                  <a className={classNames('no-underline')} href="https://www.google.com/maps/place/Libre+Design+%26+Digital/@33.0414227,-117.2960357,17z/data=!3m1!4b1!4m5!3m4!1s0x80dc0df3c31a9f3d:0xc69bbf3957b3798!8m2!3d33.0414182!4d-117.293847" target="_blank">View in Maps ↗</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className={classNames('md:block hidden lg:h-[432px] lg:w-[432px] h-[332px] w-[332px] absolute -bottom-1/4 lg:left-1/2 lg:-translate-x-1/2 left-1/3 -translate-x-1/3')}>
            <Lottie animationData={circleAnimation} loop={true} />
          </div>
        </div>
      </div>
    </header>
  )
}
