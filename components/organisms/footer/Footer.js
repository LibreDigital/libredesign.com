import Lottie from 'lottie-react'
import { HTMLContent } from '@utils/helpers'
import classNames from 'classnames'
import LatestPosts from '@organisms/latest-posts/LatestPosts'
import NewsletterForm from '@molecules/newsletter-form/NewsletterForm'
import circleAnimation from "../../../libre-design-digital-animation.json"
import arrowAnimation from "../../../libre-up-arrow.json"
import Zendesk from 'react-zendesk'
const ZENDESK_KEY = 'b797bfbb-869b-441b-9b54-6deb882ab29f'
import withCursor from '@context/withCursor'

function Footer({ copyright, column1, column2, column3, latestPosts, socials, address, phone, context }) {

  const { onCursor } = context
  
  const date = new Date()
  let year = date.getFullYear()

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    })
  }

  const zendeskSettings = {
    color: {
      theme: "#dae0d9"
    }
  }
  
  return (
   <footer className={classNames('bg-black text-white overflow-hidden')}>
    <section className={classNames('min-h-screen flex flex-col justify-between sm:pt-40 pt-20')}>
      <div className={classNames('flex justify-between container sm:px-0 px-10 gap-10 flex-col lg:flex-row')}>
        <div className={classNames('basis-1/2 min-w-0 overflow-hidden')}>
          <LatestPosts latestPosts={latestPosts} />
          <NewsletterForm />
        </div>
        <div className={classNames('basis-1/4 column1')}>
          <h4 className={classNames('sm:mb-14 sm:mt-0 mt-8 mb-6 sm:text-sm text-[11px] font-medium')}>{column1?.title}</h4>
          <div className={classNames('sm:text-[1.325rem] text-[18px] font-light')}>
            <HTMLContent content={column1?.content} />
          </div>
        </div>
        <div className={classNames('basis-1/4 column2')}>
          <h4 className={classNames('sm:mb-14 sm:mt-0 mt-8 mb-6 sm:text-sm text-[11px] font-medium')}>{column2?.title}</h4>
          <div className={classNames('sm:text-[1.325rem] text-[18px] font-light')}>
            <HTMLContent content={column2?.content} />
          </div>
        </div>
      </div>
      <div className={classNames('sm:hidden flex justify-between gap-10 px-10')}>
        <div>
          <h4 className={classNames('text-white mb-4 text-[11px] font-medium')}>Social Media</h4>
          <ul className={classNames('text-white text-[11px] font-light')}>
            {socials?.instagram && <li className="mb-2"><a className={classNames('no-underline')} href={socials?.instagram} target="_blank">Instagram ↗</a></li>}
            {socials?.linkedin && <li className="mb-2"><a className={classNames('no-underline')} href={socials?.linkedin} target="_blank">LinkedIn ↗</a></li>}
            {socials?.twitter && <li className="mb-2"><a className={classNames('no-underline')} href={socials?.twitter} target="_blank">Twitter ↗</a></li>}
            {socials?.youtube && <li><a className={classNames('no-underline')} href={socials?.youtube} target="_blank">YouTube ↗</a></li>}
          </ul>
        </div>
        <div className={classNames('ml-6')}>
          <h4 className={classNames('text-white mb-4 text-[11px] font-medium')}>Contact Us</h4>
          <div className={classNames('text-white text-[11px] font-light')}>
            <div className={classNames('leading-6')}>
              <HTMLContent content={address} />
            </div>
            <div className={classNames('leading-6')}>
              <a className={classNames('no-underline')} href={`tel:${phone.replaceAll(' ','')}`}>{phone}</a>
            </div>
            <div className={classNames('leading-6')}>
              <a className={classNames('no-underline')} href="https://www.google.com/maps/place/Libre+Design+%26+Digital/@33.0414227,-117.2960357,17z/data=!3m1!4b1!4m5!3m4!1s0x80dc0df3c31a9f3d:0xc69bbf3957b3798!8m2!3d33.0414182!4d-117.293847" target="_blank">View in Maps ↗</a>
            </div>
          </div>
        </div>
      </div>
      <div className={classNames('flex sm:justify-between container justify-start sm:p-0 px-10 py-6 sm:py-0 items-end')}>
        <div className={classNames('column3 sm:block hidden')}>
          <HTMLContent content={column3} />
        </div>
        <div className={classNames('text-dark-grey sm:text-sm text-xs sm:font-medium font-normal')}>
          <span>{copyright}</span> &copy; {year} Libre Design
        </div>
      </div>
      
    </section>
    <section className={classNames('sm:min-h-screen min-h-[300px] relative overflow-hidden')}>
      <div onMouseEnter={() => onCursor('back-to-top')} onMouseLeave={onCursor} onClick={scrollToTop} className={classNames('sm:h-26 h-12 sm:w-26 w-12 absolute left-1/2 sm:top-1/2 top-1/4 -translate-x-1/2 cursor-pointer')}>
        <Lottie animationData={arrowAnimation} loop={true} />
      </div>
      <div className={classNames('h-[12rem] w-[12rem] sm:h-[27rem] sm:w-[27rem] absolute -bottom-[6rem] sm:-bottom-1/4 left-1/2 -translate-x-1/2')}>
        <Lottie animationData={circleAnimation} loop={true} />
      </div>
    </section>
    <Zendesk defer zendeskKey={ZENDESK_KEY} {...zendeskSettings} />
   </footer>
  )
}

export default withCursor(Footer);