import Statistics from '@organisms/statistics/Statistics'
import VideoHero from '@organisms/video-hero/VideoHero'
import FeaturedCaseStudies from '@organisms/featured-case-studies/FeaturedCaseStudies'
import Timeline from '@organisms/timeline/Timeline'
import Leadership from '@organisms/leadership/Leadership'
import Services from '@organisms/services/Services'
import AboutHero from '@organisms/about-hero/AboutHero'
import OurProcess from '@organisms/our-process/OurProcess'
import Form from '@organisms/form/Form'
import Locations from '@organisms/locations/Locations'
import HomeHero from '@organisms/home-hero/HomeHero'
import Carousel from '@organisms/case-studies/Carousel'
import Slideshow from '@organisms/case-studies/Slideshow'
import ImageGrid from '@organisms/case-studies/ImageGrid'
import Video from '@organisms/case-studies/Video'
import Testimonial from '@organisms/case-studies/Testimonial'
import Divider from '@organisms/case-studies/Divider'
import TitleDescription from '@organisms/case-studies/TitleDescription'
import FeaturedNews from '@organisms/featured-news/FeaturedNews'
import CaseStudyStatistics from '@organisms/case-studies/Statistics'
import Blurb from '@organisms/blurb/Blurb'
import DefaultPage from '@organisms/default-page/DefaultPage'

export default function Section(props) {
  const { type, section, latestPosts } = props

  const _type = (type) => {
    return `Page_Sections_Sections_${type}`
  }

  const _type2 = (type) => {
    return `CaseStudy_Casestudysections_Sections_${type}`
  }

  if (type === _type('HomeHero')) 
    return (
      <HomeHero data={section} />
    )

  if (type === _type('DefaultPage')) 
    return (
      <DefaultPage data={section} />
    )

  if (type === _type('Statistics')) 
    return (
      <Statistics data={section} />
    )

  if (type === _type('Blurb')) 
    return (
      <Blurb data={section} />
    )

  if (type === _type('VideoHero')) 
    return (
      <VideoHero data={section} />
    )

  if (type === _type('FeaturedCaseStudies')) 
    return (
      <FeaturedCaseStudies data={section} />
    )

  if (type === _type('Timeline')) 
    return (
      <Timeline data={section} />
    )

  if (type === _type('Timeline')) 
    return (
      <Timeline data={section} />
    )

  if (type === _type('Leadership')) 
    return (
      <Leadership data={section} />
    )

  if (type === _type('Services')) 
    return (
      <Services data={section} />
    )
  
  if (type === _type('AboutHero')) 
    return (
      <AboutHero data={section} />
    )

  if (type === _type('OurProcess')) 
    return (
      <OurProcess data={section} />
    )

  if (type === _type('Form')) 
    return (
      <Form data={section} />
    )

  if (type === _type('Locations')) 
    return (
      <Locations data={section} />
    )

  if (type === _type('FeaturedPosts')) 
    return (
      <FeaturedNews data={section} latestPosts={latestPosts} />
    )

  if (type === _type2('Carousel')) 
    return (
      <Carousel data={section} />
    )

  if (type === _type2('Slideshow')) 
    return (
      <Slideshow data={section} />
    )

  if (type === _type2('ImageGrid')) 
    return (
      <ImageGrid data={section} />
    )

  if (type === _type2('Video')) 
    return (
      <Video data={section} />
    )

  if (type === _type2('Testimonial')) 
    return (
      <Testimonial data={section} />
    )

  if (type === _type2('Divider')) 
    return (
      <Divider data={section} />
    )

  if (type === _type2('TitleDescription')) 
    return (
      <TitleDescription data={section} />
    )
  
  if (type === _type2('Statistics')) 
    return (
      <CaseStudyStatistics data={section} />
    )
}
