import { HTMLContent } from "@utils/helpers"

export default function CaseStudyHeader({ categories, title, description }) {
  return (
    <section className="relative text-black px-12 lg:px-32 pt-32 lg:pt-40">
      <h1 className="mb-20 leading-tight sm:text-[35px] sm:leading-snug lg:text-[48px] xl:text-[104px] xl:leading-tight text-[31px]"><HTMLContent content={title} /></h1>
      <div className="flex items-end flex-col lg:flex-row">
        <div className="basis-[44%] w-full lg:w-auto">
          <div className="mb-12 lg:mb-28">
            <h5 className="uppercase font-light text-sm mb-3">Tags</h5>
            <div className="flex gap-4">
              {categories.map((category, index) => {
                return (
                  <div key={index} className="uppercase font-medium text-sm tracking-[.28px]">{category.name}</div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="basis-[56%] w-full lg:w-auto">
          <div className="text-[18px] lg:text-xl font-body font-light xl:pr-24">
            <HTMLContent content={description} />
          </div>
        </div>
      </div>
    </section>
  )
}
