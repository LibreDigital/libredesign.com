import { getAllWork, getSiteSettings, getMenuWithSlug, getAllPosts, getCaseStudyCategories } from '@utils/api'
import classNames from 'classnames'
import { HTMLContent, simplifyArray } from '@utils/helpers'
import Header from '@organisms/header/Header'
import Footer from '@organisms/footer/Footer'
import Head from 'next/head'
import Link from 'next/link'
import Shuffle from 'shufflejs'
import { useEffect, useState, useRef } from 'react'

export default function CaseStudies({ data, settings, menu, latestPosts, categories }) {

  const [ shuffle, setShuffle ] = useState({})
  const [ active, setActive ] = useState(-1)
  const allWorkButton = useRef(null)

  const getCategories = categories.map((category) => {
    return category?.categories?.nodes.map((cat) => {
      return cat.name
    })
  })

  const filters = [...new Set(simplifyArray(getCategories))]

  const column1 = {
    title: settings?.title1,
    content: settings?.content1
  }
  const column2 = {
    title: settings?.title2,
    content: settings?.content2
  }


  useEffect(() => {
    const element = document.querySelector('.filter-container')
    const sizer = element.querySelector('.js-shuffle-sizer')

    const shuffleInstance = new Shuffle(element, {
      itemSelector: '.filter-item',
      sizer,
      delimiter: ','
    })

    setShuffle(shuffleInstance)

    setTimeout(() => {
      allWorkButton?.current.click()
    }, 500)
      
  },[])

  

  const handleFilters = (ev) => {
    ev.preventDefault()
    shuffle.filter(ev.target.id)
    setActive(ev.target.dataset.index)
    window.scrollTo(0,0)
  }

  return (
   <>
    <Head>
      <title>{settings?.caseStudiesPageTitle}</title>
      <meta name="description" content={settings?.caseStudiesMetaDescription} />
      {settings?.ogImage && <meta property="og:image" content={settings?.ogImage.mediaItemUrl} />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Header
      menu={menu}
      logo={settings?.logo}
      address={settings?.address}
      phone={settings?.phone}
      socials={settings?.socials} />
      <section className="case-studies-header inline">
        <div className="sm:hidden block text-sm font-light px-12 pt-12">
          {settings?.caseStudiesSummary}
        </div>
        <div className="sticky bg-white top-0 z-[99999]">
          <div className="overflow-auto pb-4 sm:pb-0 remove-scrollbar md:pb-2.5">
            <ul className="case-studies-filters sm:mt-32 mt-28 mb-6 flex gap-8 sm:px-24 px-12">
              <li>
                <button ref={allWorkButton} data-index={-1} className={classNames('whitespace-nowrap text-sm group relative flex items-center before:absolute before:left-0 pl-5 before:w-[12px] before:h-[12px] hover:before:bg-black before:rounded-full before:border before:border-light-grey uppercase text-light-grey hover:text-black hover:before:border-black',{
                  'text-black before:border-black before:bg-black': parseInt(active) === -1
                })} id="" onClick={handleFilters}>
                  All Work
                </button>
              </li>
              {filters.map((filter, index) => {
                return (
                  <li key={index}>
                    <button data-index={index} className={classNames('whitespace-nowrap text-sm group relative flex items-center before:absolute before:left-0 pl-5 before:w-[12px] before:h-[12px] hover:before:bg-black before:rounded-full before:border before:border-light-grey uppercase text-light-grey hover:text-black hover:before:border-black', {
                      'text-black before:border-black before:bg-black': parseInt(active) === parseInt(index)
                    })} id={filter} onClick={handleFilters}>
                      {filter}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>
      <section className={classNames('case-studies-grid overflow-hidden')}>
        <div className={classNames('sm:px-10 px-6 mb-8')}>
          <hr />
        </div>
        <div className={classNames('px-5')}>
          <div className={classNames('flex flex-wrap filter-container')}>
            <article className={classNames('sm:w-1/2 md:w-1/2 lg:w-1/3 w-full min-h-[1px] sm:flex hidden flex-col items-center filter-item')} data-groups={filters}>
              <div className="relative px-4">
                <img src={data[0]?.featuredImage?.node?.mediaItemUrl} alt="" className="opacity-0 select-none" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 max-w-[450px] px-6 w-full text-sm font-light">
                  {settings?.caseStudiesSummary}
                </div>
              </div>
              <h2 className={classNames('font-body font-medium sm:text-[1.325rem] mt-8 opacity-0')}>text</h2>
              <p className={classNames('font-body font-light sm:text-[1.325rem] mb-10 opacity-0')}>text</p>
            </article>
            {data.map((item, index) => {
              const image = item?.featuredImage?.node?.mediaItemUrl
              const alt = item?.featuredImage?.node?.altText
              const tagline = item?.tagline?.tagline
              const cats = item.categories.nodes.map((i) => {
                return (
                  i.name
                )
              })
              
              return (
                <article className={classNames('sm:w-1/2 md:w-1/2 lg:w-1/3 w-full min-h-[1px] flex items-center filter-item')} key={index} data-groups={cats}>
                  <Link href={item?.uri}>
                    <a className="block px-4 max-w-full">
                      <img src={image} alt={alt} />
                      <h2 className={classNames('font-body font-medium sm:text-[1.325rem] text-[20px] sm:mt-8 sm:mb-0 mb-2 mt-4')}>{item.title}</h2>
                      <p className={classNames('font-body font-light sm:text-[1.325rem] text-[14px] sm:mb-10 mb-10 text-ellipsis whitespace-nowrap overflow-hidden')}>{tagline}</p>
                    </a>
                  </Link>
                </article>
              )
            })}
            <article className="sm:w-1/2 md:w-1/2 lg:w-1/3 w-full min-h-[1px] flex items-center js-shuffle-sizer"></article>
          </div>
        </div>
        

      </section>
      <section className={classNames('case-studies-footer sm:p-40 p-12 overflow-hidden')}>
        <h2 className={classNames('leading-tight sm:text-[28px] md:text-[42px] lg:text-[50px] xl:text-[71px] text-[23px] sub-title -tracking-[1px]')}>
          <HTMLContent content={settings?.caseStudiesFooterTitle} />
        </h2>
      </section>
    <Footer
      latestPosts={latestPosts}
      copyright={settings?.copyright}
      column1={column1}
      column2={column2}
      column3={settings?.content3}
      socials={settings?.socials}
      address={settings?.address}
      phone={settings?.phone} />
   </>
  )
}

export async function getStaticProps() {
  const data = await getAllWork()
  const settings = await getSiteSettings()
  const menu = await getMenuWithSlug('main-menu')
  const posts = await getAllPosts()
  const categories = await getCaseStudyCategories()
  
  return {
    props: {
      data,
      settings,
      menu,
      latestPosts: posts?.nodes,
      categories
    },
  }
}
