import classNames from 'classnames'
import { HTMLContent } from '@utils/helpers'
import { sendMail } from '@utils/api'
import FormElement from '@molecules/form-element/FormElement'
import { useState } from 'react'
import { formatMoney } from '@utils/helpers'
import { useRouter } from 'next/router'

export default function Form({ data }) {

  const router = useRouter()
  const [fields, setFields] = useState({})
  const [multi, setMulti] = useState([])

  const handleChange = (evt) => {
    const isMulti = evt.target.name === 'help'
    if (isMulti) {
      setMulti([...multi, evt.target.value])
    }
    setFields({
      ...fields,
      [evt.target.name]: isMulti ? [...multi, evt.target.value] : evt.target.value
    })
    
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const emailContent = `
      Name: ${fields.first_name} ${fields.last_name}<br>
      Company: ${fields.company || 'N/A'}<br>
      Email: ${fields.email}<br>
      Needs help with: ${fields.help.join(', ')}<br>
      Timeframe: ${fields.timeframe === '12' ? fields.timeframe + ' Weeks +' : fields.timeframe + ' Weeks'}<br>
      Budget: ${fields.budget === '100000' ? formatMoney(fields.budget) + ' +' : formatMoney(fields.budget)}<br><br>
      NOTE: This email is automated, do not reply directly.
    `

    const data = await sendMail(
      'New Proposal Request',
      emailContent,
      'proposal'
    )

    if (data.sent) {
      router.push('/thank-you/')
    } else {
      console.log('ERROR: ', data.message)
    }
    
  }

  return (
    <section>
      <div className={classNames('2xl:container 2xl:px-28 xl:p-36 xl:pt-48 px-8 pt-24 pb-12 sm:pt-28 sm:pb-12 sm:px-12 lg:pt-32 lg:pb-18 lg:px-28')}>
        <h1 className="xl:text-4xl text-[31px] sm:leading-normal leading-8 sm:text-[35px] lg:text-[48px] 2xl:text-5xl 2xl:leading-tight"><HTMLContent content={data?.title} /></h1>
      </div>
      <form onSubmit={handleSubmit} className={classNames('proposal-forms')}>
        {data?.step.map((step, index) => {
          return (
            <fieldset key={index}>
              <hr className="sm:mx-10 mx-6" />
              <div className={classNames('container flex md:flex-row flex-col sm:pl-12 sm:pr-0 px-12 py-8')}>
                <div className={classNames('basis-5/12')}>
                  <h3 className="text-[23px] sm:mb-0 mb-10 md:text-[30px] md:leading-9 lg:leading-10">Step 0{index+1}</h3>
                </div>
                <div className={classNames('basis-7/12')}>
                  <h3 className={classNames('text-[23px] leading-7 sm:mb-10 md:text-[30px] md:leading-9 lg:leading-10 mb-6 proposal-short')}>{step?.title}</h3>
                  {step?.fields.map((field, ind) => {
                    return (
                      <div key={ind}>
                        <FormElement setFields={setFields} index={ind} length={step?.fields.length} fields={fields} data={field} value={fields[field.name]} onChange={handleChange} />
                      </div>
                    )
                  })}
                  {data?.step?.length === (index + 1) &&
                    <div className={classNames('py-20')}>
                      <button className="bg-black rounded-full py-2 px-14 text-white uppercase" type="submit">{data?.submitText}&nbsp; →⃝</button>
                    </div>
                  }
                </div>
              </div>
            </fieldset>
          )
        })}
      </form>
    </section>
  )
}
