async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  const res = await fetch('https://libredesignwp.wpengine.com/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function sendMail(subject, body, mutationId = 'contact') {
	const fromAddress = 'noreply@libredesign.com'
	const toAddress = 'info@libredesign.com'
	const data = await fetchAPI(
    `
      mutation SendEmail($input: SendEmailInput!) {
        sendEmail(input: $input) {
          message
          origin
          sent
        }
      }
    `,
    {
      variables: {
        input: {
          clientMutationId: mutationId,
          from: fromAddress,
          to: toAddress,
          body: body,
          subject: subject
        }
      }
    }
  )

  return data?.sendEmail

}

///////////////////////////////

// Site Settings
export async function getSiteSettings() {
  const data = await fetchAPI(`
    {
      siteSettings {
        siteSettings {
          address
          copyright
          logo {
            mediaItemUrl
            altText
          }
          ogImage {
            mediaItemUrl
          }
          phone
          socials {
            instagram
            linkedin
            twitter
            youtube
          }
          title1
          content1
          title2
          content2
          content3
          caseStudiesPageTitle
          caseStudiesMetaDescription
          caseStudiesHeaderTitle
          caseStudiesSummary
          caseStudiesFooterTitle
          blogPageTitle
          blogMetaDescription
          blogHeaderTitle
        }
      }
    }
  `)
  return data?.siteSettings?.siteSettings
}

// Posts Type
export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000, where: {status: PUBLISH}) {
        nodes {
          uri
        }
      }
    }
  `)
  return data?.posts?.nodes
}

export async function getAllPosts() {
  const data = await fetchAPI(`
    {
      posts(first: 100, where: {status: PUBLISH}) {
        nodes {
          date
          title
          slug
          uri
          content
          outboundLink {
            link
          }
          summary {
            summary
          }
          tags {
            nodes {
              uri
              name
            }
          }
          featuredImage {
            node {
              mediaItemUrl
              altText
            }
          }
        }
      }
    }
  `)
  return data?.posts
}

export async function getPostWithSlug(slug) {
  const data = await fetchAPI(
    `
    {
      postBy(uri: "${slug}") {
        id
        date
        title
        slug
        uri
        outboundLink {
          link
        }
        content
        author {
          node {
            name
          }
        }
        summary {
          summary
          highlight
        }
        tags {
          nodes {
            uri
            name
          }
        }
        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
      }
    }
  `
  )
  return data?.postBy
}

// Pages Type
export async function getAllPages() {
  const data = await fetchAPI(`
    {
      pages(first: 10000, where: {status: PUBLISH}) {
        nodes {
          slug
        }
      }
    }
  `)
  return data?.pages?.nodes
}

export async function getPageWithSlug(slug) {
  const data = await fetchAPI(
    `
    {
      pageBy(uri: "${slug}") {
        id
        slug
        sections {
          sections {
            ... on Page_Sections_Sections_Form {
              __typename
              title
              step {
                title
                fields {
                  name
                  type
                  placeholder
                  required
                  value
                  increment
                }
              }
              submitText
            }
            ... on Page_Sections_Sections_Locations {
              __typename
              title
              location {
                title
                address
                hours
                email
                phone
                mapsLink
                timezone
                lat
                long
              }
              images {
                mediaItemUrl
                altText
              }
            }
            ... on Page_Sections_Sections_VideoHero {
              __typename
              video {
                mediaItemUrl
              }
              videoMobile {
                mediaItemUrl
              }
            }
            ... on Page_Sections_Sections_HomeHero {
              __typename
              title
              images {
                title
                image {
                  mediaItemUrl
                  altText
                }
                link {
                  url
                  title
                  target
                }
              }
            }
            ... on Page_Sections_Sections_OurProcess {
              __typename
              title
              process {
                title
                linkTitle
                linkTo
                item {
                  title
                  description
                }
              }
            }
            ... on Page_Sections_Sections_Blurb {
              __typename
              title
              link {
                target
                url
                title
              }
            }
            ... on Page_Sections_Sections_DefaultPage {
              __typename
              title
              content
            }
            ... on Page_Sections_Sections_FeaturedCaseStudies {
              __typename
              title
              caseStudy {
                image {
                  mediaItemUrl
                  altText
                }
                logo {
                  mediaItemUrl
                  altText
                }
                description
                linkTo {
                  ... on CaseStudy {
                    uri
                  }
                }
              }
            }
            ... on Page_Sections_Sections_Statistics {
              __typename
              title
              statistic {
                title
                subheading
                description
              }
            }
            ... on Page_Sections_Sections_AboutHero {
              __typename
              title
              images {
                mediaItemUrl
                altText
              }
              highlights {
                title
                description
              }
            }
            ... on Page_Sections_Sections_Timeline {
              __typename
              jumboTitle
              preheading
              videoGif {
                mediaItemUrl
              }
              title
              alignTitle
              milestones {
                title
                description
              }
            }
            ... on Page_Sections_Sections_FeaturedPosts {
              __typename
              title
              show
            }
            ... on Page_Sections_Sections_Leadership {
              __typename
              title
              subheading
              images {
                mediaItemUrl
                altText
              }
              teamList {
                ... on TeamMember {
                  title
                  memberDetails {
                    jobTitle
                    description
                    email
                  }
                  featuredImage {
                    node {
                      mediaItemUrl
                      altText
                    }
                  }
                }
              }
            }
            ... on Page_Sections_Sections_Services {
              __typename
              title
              pdf {
                mediaItemUrl
              }
              image {
                mediaItemUrl
                altText
              }
              servicesList {
                ... on Service {
                  title
                }
              }
            }
            ... on Page_Sections_Sections_OurServices {
              __typename
              title
              link {
                target
                url
                title
              }
              servicesList {
                ... on Service {
                  title
                }
              }
            }
          }
        }
        seo {
          title
          metaKeywords
          metaDesc
          canonical
        }
      }
    }
  `
  )
  return data?.pageBy
}

export async function getLocationTimes() {
  const data = await fetchAPI(
    `
    {
      pageBy(uri: "contact") {
        sections {
          sections {
            ... on Page_Sections_Sections_Locations {
              __typename
              location {
                timezone
              }
            }
          }
        }
      }
    }
  `
  )
  return data?.pageBy
}

// Menus
export async function getMenuWithSlug(slug) {
  const data = await fetchAPI(
    `
    {
      menus(where: {slug: "${slug}"}) {
        nodes {
          menuItems {
            nodes {
              label
              path
            }
          }
        }
      }
    }
  `
  )
  return data.menus.nodes[0].menuItems.nodes
}

// Case Studies
export async function getAllCaseStudies() {
  const data = await fetchAPI(`
    {
      caseStudies(first: 10000) {
        nodes {
          slug
        }
      }
    }
  `)
  return data?.caseStudies.nodes
}

export async function getAllWork() {
  const data = await fetchAPI(`
      {
        caseStudies(first: 100) {
          nodes {
            title
            slug
            uri
            CaseStudySections {
              color
            }
            categories {
              nodes {
                name
              }
            }
            tagline {
              tagline
            }
            relatedImage {
              image {
                mediaItemUrl
                altText
              }
            }
            featuredImage {
              node {
                mediaItemUrl
                altText
              }
            }
          }
        }
      }
  `)
  return data?.caseStudies.nodes
}

export async function getCaseStudyCategories() {
  const data = await fetchAPI(`
    {
      caseStudies {
        nodes {
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `)
  return data?.caseStudies?.nodes
}

export async function getCaseStudyWithSlug(slug) {
  const data = await fetchAPI(
    `
    {
      caseStudyBy(uri:"${slug}") {
          slug
          CaseStudySections {
              color
              title
              description
              sections {
              ... on CaseStudy_Casestudysections_Sections_TitleDescription {
                  __typename
                  title
                  subtitle
                  description
              }
              ... on CaseStudy_Casestudysections_Sections_Divider {
                  __typename
                  padding
              }
              ... on CaseStudy_Casestudysections_Sections_Testimonial {
                  __typename
                  testimonial
                  author
              }
              ... on CaseStudy_Casestudysections_Sections_Video {
                  __typename
                  autoplay
                  video {
                  mediaItemUrl
                  }
                  placeholder {
                  mediaItemUrl
                  altText
                  }
              }
              ... on CaseStudy_Casestudysections_Sections_ImageGrid {
                  __typename
                  width
                  gapWidth
                  slidesPerRow
                  images {
                  mediaItemUrl
                  altText
                  title
                  }
              }
              ... on CaseStudy_Casestudysections_Sections_Statistics {
                  __typename
                  statistic {
                  title
                  width
                  backgroundColor
                  highlightLine1
                  highlightLine2
                  highlightSubtext
                  image {
                      mediaItemUrl
                      altText
                  }
                  }
              }
              ... on CaseStudy_Casestudysections_Sections_Carousel {
                  __typename
                  title
                  titlePosition
                  gapWidth
                  slidesPerView
                  centerSlides
                  pagination
                  overflow
                  images {
                  mediaItemUrl
                  altText
                  }
              }
              ... on CaseStudy_Casestudysections_Sections_Slideshow {
                  __typename
                  images {
                  mediaItemUrl
                  altText
                  }
              }
              }
          }
          categories {
              nodes {
              name
              }
          }
          seo {
              title
              metaKeywords
              metaDesc
              canonical
          }
      }
  }
  `
  )
  return data?.caseStudyBy
}