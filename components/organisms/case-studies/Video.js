import classNames from 'classnames'
import { useRef, useState } from 'react'

export default function Video({ data }) {

  const [ toggle, setToggle ] = useState(true)
  const brandVideo = useRef()
  const autoplay = data.autoplay === 'Yes' ? true : false

  const handleClick = () => {
    setToggle(!toggle)
    brandVideo.current.play()
    brandVideo.current.controls = true
  }

  return (
    <section className={classNames('case-study-video')}>
      <div className="mx-auto max-w-[113rem] py-5 relative">
        {toggle && data.placeholder &&
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-full z-10">
            <button className="cursor-pointer" onClick={handleClick}>
              <img src={data.placeholder.mediaItemUrl} alt={data.placeholder.altText} />
            </button>
          </div>}
        <video ref={brandVideo} className={classNames('w-full h-full')} preload="auto" autoPlay={autoplay} loop={true} muted={true} playsInline>
          <source src={data?.video?.mediaItemUrl} type="video/mp4" />
        </video>
      </div>
    </section>
  )
}
