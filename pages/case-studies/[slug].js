import { getCaseStudyWithSlug, getSiteSettings, getAllCaseStudies, getMenuWithSlug, getAllPosts, getAllWork, getCaseStudyCategories } from '@utils/api'
import Header from '@organisms/header/Header'
import Footer from '@organisms/footer/Footer'
import Section from '@layout/Section'
import Head from 'next/head'
import { useRouter } from 'next/router'
import CaseStudyHeader from '@organisms/case-studies/CaseStudyHeader'
import RelatedWork from '@components/organisms/case-studies/RelatedWork'

export default function CaseStudy({ data, settings, menu, latestPosts, sections, related }) {

  const router = useRouter()
  const page = data?.CaseStudySections
  const colorGradient = `linear-gradient(to bottom, ${page?.color} 60%, transparent 100%)`

  const column1 = {
    title: settings?.title1,
    content: settings?.content1
  }
  const column2 = {
    title: settings?.title2,
    content: settings?.content2
  }

  const relatedWork = related.filter(item => item.slug !== router.query.slug)

  return (
    <>
    <Head>
      <title>{data?.seo?.title}</title>
      <meta name="description" content={data?.seo?.metaDesc} />
      {settings?.ogImage && <meta property="og:image" content={settings?.ogImage.mediaItemUrl} />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Header
      menu={menu}
      logo={settings?.logo}
      address={settings?.address}
      phone={settings?.phone}
      socials={settings?.socials} />
        <main className={`page-${router.query.slug} relative`}>
          {page?.color && <div className={`absolute top-0 left-0 w-full h-[180vh]`} style={{ backgroundImage: colorGradient }}></div>}
          {page?.title && <CaseStudyHeader categories={data?.categories?.nodes} title={page?.title} description={page?.description} />}
          {sections?.map((section, index) => {
            const type = section.__typename;
            return (
              <Section key={index} type={type} section={section} />
            )
          })}
          <RelatedWork data={relatedWork} />
        </main>
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

export async function getStaticProps(ctx) {
  console.log(ctx.params.slug);
  const data = await getCaseStudyWithSlug(ctx.params.slug)
  const settings = await getSiteSettings()
  const menu = await getMenuWithSlug('main-menu')
  const posts = await getAllPosts()
  const related = await getAllWork()
  const categories = await getCaseStudyCategories()

  return {
    props: {
      data,
      settings,
      sections: data?.CaseStudySections?.sections,
      menu,
      latestPosts: posts?.nodes,
      related,
      categories
    },
  }
}

export async function getStaticPaths() {
  const data = await getAllCaseStudies()

  return {
    paths: data.map((node) => `/case-studies/${node?.slug}`) || [],
    fallback: false,
  }
}
