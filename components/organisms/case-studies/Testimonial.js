export default function Testimonial({ data }) {

  const { testimonial, author } = data

  return (
    <section className="relative px-12 lg:px-32 py-16 overflow-hidden">
      <h2 className="lg:pr-24 leading-tight sm:text-[35px] sm:leading-snug lg:text-[48px] xl:text-5xl xl:leading-tight text-[31px]">{testimonial}</h2>
      <h5 className="text-lightest-grey font-light lg:text-2xl md:text-[22px] text-[14px] mt-12">{author}</h5>
    </section>
  )
}
