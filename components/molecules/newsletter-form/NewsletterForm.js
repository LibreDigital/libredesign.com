import classNames from 'classnames'
import MailchimpSubscribe from 'react-mailchimp-subscribe'

export default function NewsletterForm() {
 
  const url = 'https://libredesign.us20.list-manage.com/subscribe/post?u=4c478361bc1ce4655151b028f&id=a14bc0deac'

  const Form = ({ status, message, onValidated }) => {

    let email

    const submit = () =>
      email &&
      email.value.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email.value
      })
  
    return (
      <div className={classNames('mt-28 sm:block hidden')}>
        <h4 className={classNames('mb-6 text-sm font-medium')}>Sign up for News</h4>
        <div className={classNames('flex')}>
          <input ref={node => (email = node)} type="email" placeholder="Your email" className={classNames('bg-dark-grey min-w-[350px] border-none h-[60px] py-0 !outline-none text-black text-[18px] placeholder:font-display placeholder:text-black placeholder:text-[23px] placeholder:relative placeholder:top-1 focus:outline-none focus:ring-0')} required />
          <button className={classNames('bg-dark-grey border-none h-[60px] pl-6 pr-4')} onClick={submit}>
            <svg width="20.231" height="9.277" viewBox="0 0 20.231 9.277">
              <g transform="translate(-1844.96 -5533.735)">
                <path d="M1860.553,5543.012l-.9-.885,3.107-3.107H1844.96v-1.293h17.805l-3.107-3.1.9-.89,4.638,4.638Z"/>
              </g>
            </svg>
          </button>
        </div>
        <div>
          {status === "sending" && <div style={{ color: "blue" }}>Sending...</div>}
          {status === "error" && <div style={{ color: "red" }} dangerouslySetInnerHTML={{ __html: message }} />}
          {status === "success" && <div style={{ color: "green" }} dangerouslySetInnerHTML={{ __html: message }} />}
        </div>
      </div>
    )
  }

  return (
    <MailchimpSubscribe
      url={url}
      render={({ subscribe, status, message }) => (
        <Form
          status={status}
          message={message}
          onValidated={formData => subscribe(formData)}
        />
      )}
    />
  )
  
}
