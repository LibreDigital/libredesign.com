import classNames from 'classnames'

export default function VideoHero({ data }) {

  return (
   <section className={classNames('video-hero relative min-h-0 sm:min-h-screen w-full overflow-hidden')}>
      <video className={classNames('hidden sm:block top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 absolute z-10 w-auto min-w-full min-h-full max-w-none')} preload="auto" autoPlay={true} loop={true} muted={true} playsInline>
        <source src={data?.video?.mediaItemUrl} type="video/mp4" />
      </video>
      <video className={classNames('block sm:hidden w-full')} preload="auto" autoPlay={true} loop={true} muted={true} playsInline>
        <source src={data?.videoMobile?.mediaItemUrl} type="video/mp4" />
      </video>
   </section>
  )
}
