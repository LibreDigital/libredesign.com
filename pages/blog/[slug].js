import BlogPost from '@components/molecules/blog-post/blogPost'
import Footer from '@organisms/footer/Footer'
import Header from '@organisms/header/Header'
import { getAllPosts, getAllPostsWithSlug, getMenuWithSlug, getPostWithSlug, getSiteSettings } from '@utils/api'
import { HTMLContent } from '@utils/helpers'
import classNames from 'classnames'
import { format } from 'date-fns'
import Head from 'next/head'

export default function Post({ data, menu, latestPosts, settings }) {
  
  const column1 = {
    title: settings?.title1,
    content: settings?.content1
  }
  const column2 = {
    title: settings?.title2,
    content: settings?.content2
  }

  const morePost = latestPosts.filter((item) => item.title !== data.title)
  const date = format(new Date(data?.date), 'MM.dd.yy')

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
       <section className={classNames('blog-header px-12 md:px-16 md:pb-16 lg:px-40 pb-8 lg:pb-40 pt-32')}>
        <h1 className={classNames('leading-tight text-[31px] sm:text-[36px] md:text-[48px] lg:text-5xl lg:leading-none mb-8')}>
          <HTMLContent content={data?.title} />
        </h1>
        <span className='text-[12px] sm:text-[14px] md:text-[18px] text-light-grey font-light'>{`${date} by ${data.author.node.name}`}</span>
      </section>
      <section>
        <div>
           <BlogPost currentPost={data} morePost={morePost} />
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

export async function getStaticProps(ctx) {
  const menu = await getMenuWithSlug('main-menu')
  const data = await getPostWithSlug(ctx.params.slug)
  const settings = await getSiteSettings()
  const posts = await getAllPosts()

  return {
    props: {
      data,
      menu,
      settings,
      latestPosts: posts?.nodes
    },
  }
}

export async function getStaticPaths() {
  const data = await getAllPostsWithSlug()

  return {
    paths: data.map((node) => node.uri) || [],
    fallback: false,
  }
}

