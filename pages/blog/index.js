import { getSiteSettings, getMenuWithSlug, getAllPosts } from '@utils/api'
import classNames from 'classnames'
import { HTMLContent } from '@utils/helpers'
import Header from '@organisms/header/Header'
import Footer from '@organisms/footer/Footer'
import Head from 'next/head'
import BlogArticle from '@molecules/blog-article/BlogArticle'

export default function Blog({ settings, menu, latestPosts, posts }) {

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
      <title>{settings?.blogPageTitle}</title>
      <meta name="description" content={settings?.blogMetaDescription} />
      {settings?.ogImage && <meta property="og:image" content={settings?.ogImage.mediaItemUrl} />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Header
      menu={menu}
      logo={settings?.logo}
      address={settings?.address}
      phone={settings?.phone}
      socials={settings?.socials} />
      <section className={classNames('blog-header px-12 pt-20 pb-12 sm:p-40')}>
        <h1 className={classNames('leading-tight sm:text-3xl md:text-[48px] lg:text-4xl text-[26px]')}>
          <HTMLContent content={settings?.blogHeaderTitle} />
        </h1>
      </section>
      <section className="mb-12">
        <div>
          {posts?.map((post, index) => {
            return (
              <BlogArticle key={index} post={post} posts={posts} index={index} />
            )
          })}
        </div>
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
  const settings = await getSiteSettings()
  const menu = await getMenuWithSlug('main-menu')
  const posts = await getAllPosts()
  
  return {
    props: {
      settings,
      menu,
      latestPosts: posts?.nodes,
      posts: posts?.nodes
    },
  }
}
