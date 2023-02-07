import { HTMLContent } from '@utils/helpers'

export default function DefaultPage({ data }) {
  return (
    <section className="py-52">
      <div className="max-w-7xl mx-auto default-page">
        {data.title && <h1 className="text-center mb-16 md:text-[56px] text-2xl">{data.title}</h1>}
        {data.content && <div>
          <HTMLContent content={data.content} />
        </div>}
      </div>
    </section>
  )
}
