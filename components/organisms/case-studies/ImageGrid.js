import classNames from 'classnames'

export default function ImageGrid({ data }) {

  const { width, gapWidth, slidesPerRow, images } = data

  return (
    <section className="image-grid relative overflow-hidden py-10 sm:py-16">
      <div className={classNames('relative', {
        'mx-auto max-w-7xl px-6 md:px-0': width === 'Normal',
        'px-12': width === 'Large',
        'px-0': width === 'Full'
      })}>
        <div
          className={classNames('grid', {
            'grid-cols-1 !gap-0': parseInt(slidesPerRow) === 1,
            'grid-cols-2': parseInt(slidesPerRow) === 2,
            'grid-cols-3': parseInt(slidesPerRow) === 3,
            'gap-6 sm:gap-8': gapWidth === 'Small',
            'gap-6 sm:gap-16': gapWidth === 'Medium',
            'gap-6 sm:gap-24': gapWidth === 'Large',
          })}>
          {images?.map((image, index) => {
            return (
              <figure className="mx-auto" key={index}>
                  <img src={image.mediaItemUrl} alt={image.altText} />
                  {image.title && <figcaption className="font-light text-sm pt-6">{image.title}</figcaption>}
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
