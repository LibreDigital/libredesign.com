import classNames from 'classnames'
import { HTMLContent } from '@utils/helpers'
import Rellax from 'react-rellax'
import { useSpring, animated } from '@react-spring/web'

export default function Services({ data }) {

  const newServicesList = data?.servicesList?.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/13)

    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])

  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 }
  })

  return (
   <section className={classNames('services bg-black text-white relative before:absolute after:absolute before:h-full after:h-full before:w-10 after:w-10 before:left-0 before:top-0 after:right-0 after:top-0 before:bg-black after:bg-black before:z-10 after:z-10 px-10')}>
    <div className={classNames('container py-40')}>
      <div className={classNames('block sm:flex justify-between items-end sm:mb-24 mb-8 services-title')}>
        <div>
          <h2 className={classNames('text-[26px] sm:text-[30px] md:text-[40px] lg:text-[50px] xl:text-[68px] uppercase')}>
            <HTMLContent content={data?.title} />
          </h2>
        </div>
        <div>
          <a href="https://docs.google.com/presentation/d/1I22E5UxH05ygkqEPGZHceATlVvhPOrmpPgKLNDpD_4I/edit?usp=sharing" target="_blank" className="border border-white rounded-full py-3 px-5 uppercase text-sm block">Request Agency Capabilities</a>
        </div>
      </div>
      
      <div className={classNames('grid grid-cols-2 md:grid-cols-4 relative after:absolute after:border-b after:border-[#333] after:w-[9999px] after:-bottom-[1px] before:absolute before:border-b before:border-[#333] before:w-[9999px] before:-left-[9999px] before:-bottom-[1px] ')}>
        <div>
          {newServicesList[0]?.map((service, index) => {
            return (
              <animated.div style={styles} key={index}>
                <span className={classNames(
                  'text-sm font-light block py-3 border-t border-[#333] relative before:absolute before:border-b before:border-[#333] before:w-[9999px] before:-left-[9999px] before:-top-[1px] after:absolute after:border-b after:border-[#333] after:w-[9999px] after:-top-[1px]')}>{service.title}</span>
              </animated.div>
            )
          })}
        </div>
        <div>
          {newServicesList[1]?.map((service, index) => {
            return (
              <animated.div style={styles} key={index}>
                <span className={classNames('text-sm font-light block py-3 border-t relative border-[#333] before:absolute before:border-b before:border-[#333] before:w-[9999px] before:-left-[9999px] before:-top-[1px] after:absolute after:border-b after:border-[#333] after:w-[9999px] after:-top-[1px]')}>{service.title}</span>
              </animated.div>
            )
          })}
        </div>
        <div>
          {newServicesList[2]?.map((service, index) => {
            return (
              <animated.div style={styles} key={index} className={classNames('relative')}>
                <span className={classNames('text-sm font-light block py-3 relative border-t border-[#333] before:absolute before:border-b before:border-[#333] before:w-[9999px] before:-left-[9999px] before:-top-[1px] after:absolute after:border-b after:border-[#333] after:w-[9999px] after:-top-[1px]')}>{service.title}</span>
              </animated.div>
            )
          })}
        </div>
        <div>
          {newServicesList[3]?.map((service, index) => {
            return (
              <animated.div style={styles} key={index}>
                <span className={classNames('text-sm font-light block py-3 relative border-t border-[#333] before:absolute before:border-b before:border-[#333] before:w-[9999px] before:-left-[9999px] before:-top-[1px] after:absolute after:border-b after:border-[#333] after:w-[9999px] after:-top-[1px]')}>{service.title}</span>
              </animated.div>
            )
          })}
        </div>
        <Rellax speed={-2} className={classNames('sm:block hidden absolute -bottom-62 right-0 w-[150px] sm:w-[170px] md:w-[275px] lg:w-[370px] z-10')}>
          <img src={data?.image?.mediaItemUrl} alt={data?.image?.altText} loading="lazy" />
        </Rellax>
      </div>
      
    </div>
   </section>
  )
}
