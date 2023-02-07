import classNames from 'classnames'

export default function Divider({ data }) {

  const { padding } = data

  return (
    <section className={classNames('divider px-10', {
      'py-8 lg:py-16': padding === 'Small',
      'py-8 lg:py-24': padding === 'Medium',
      'py-8 lg:py-32': padding === 'Large'
    })}>
      <hr className="border-light-grey" />
    </section>
  )
}
