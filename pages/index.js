import { getPageWithSlug, getMenuWithSlug, getSiteSettings, getAllPosts } from '@utils/api'
import Section from '@layout/Section'
import Header from '@organisms/header/Header'
import Footer from '@organisms/footer/Footer'
import Head from 'next/head'

export default function Index({ data, menu, sections, settings, latestPosts }) {

  const column1 = {
    title: settings?.title1,
    content: settings?.content1
  }
  const column2 = {
    title: settings?.title2,
    content: settings?.content2
  }
  
  return (
   <>
    <Head>
      <title>{data?.seo.title}</title>
      <meta name="description" content={data?.seo.metaDesc} />
      <meta name="keywords" content={data?.seo.metaKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {settings?.ogImage && <meta property="og:image" content={settings?.ogImage.mediaItemUrl} />}
      {data?.seo.canonical && <link rel="canonical" href={data?.seo.canonical} />}
    </Head>
    <Header
      menu={menu}
      logo={settings?.logo}
      address={settings?.address}
      phone={settings?.phone}
      socials={settings?.socials} />
      {sections?.map((section, index) => {
        const type = section.__typename;
        return (
          <Section key={index} type={type} section={section} latestPosts={latestPosts} />
        )
      })}
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
  const data = await getPageWithSlug('home');
  const menu = await getMenuWithSlug('main-menu')
  const settings = await getSiteSettings()
  const posts = await getAllPosts()

  return {
    props: {
      data,
      menu,
      sections: data?.sections?.sections,
      settings,
      latestPosts: posts?.nodes
    },
  }
}
