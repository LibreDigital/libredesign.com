import { useRouter } from 'next/router'
import { ZendeskAPI } from 'react-zendesk'

export function structureEmail(content) {
  return JSON.stringify(content).replaceAll('"','').replaceAll(',','<br/>').replaceAll(':',': ').replace('{','<br/>').replace('}','')
}

export function formatMoney(val) {
  const money = new Intl.NumberFormat('en-US')
  return `$${money.format(val)}`
}

export function HTMLContent({ content, zendesk = null }) {

  const router = useRouter()

  const contentClickHandler = (e) => {
    const targetLink = e.target.closest('a')
    if(!targetLink) return
    e.preventDefault()

    if (targetLink.href.includes('#live-chat')) {
      ZendeskAPI("webWidget", "toggle")
    }

    if (e.target.hostname !== window.location.hostname) {
      window.open(e.target.href, '_blank')
    } else {
      router.push(e.target.href)
    }
    
  };
  
  return (
    <div 
      onClick={contentClickHandler}
      dangerouslySetInnerHTML={{__html: content}} 
    />
  );
}


export function BlogSummary({ content }) {

  let output = content
  // const hashRegex = /\B\#\w[\w.-]+\b/g
  // const hashResults = output?.match(hashRegex)

  // if (hashResults) {
  //   hashResults.forEach((result) => {
  //     output = output.replaceAll(result, `<a target="_blank" class="bold" href="https://www.instagram.com/explore/tags/${result.replace('#','')}/">${result}</a>`)
  //   })
  // }

  // const instaRegex = /\B\@\w[\w.-]+\b/g
  // const instaResults = output?.match(instaRegex)

  // if (instaResults) {
  //   instaResults.forEach((result) => {
  //     output = output.replaceAll(result, `<a target="_blank" class="bold" href="https://instagram.com/${result.replace('@','')}">${result}</a>`)
  //   })
  // }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: output }} 
    />
  )
  
  
}

export function slugify(text) {
  return text.toLowerCase().replace(/ /g, '_').replace(/[^\w-]+/g, '');
}

export function clock(timezone) {

  let locale = new Date().toLocaleString("en-US", { timeZone: timezone });
  const date = new Date(locale)

  let h = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()
  let session = 'AM'
  
  if (h == 0) {
      h = 12
  }
  
  if(h > 12){
    h = h - 12
    session = 'PM'
  }
  
  h = (h < 10) ? "0" + h : h
  m = (m < 10) ? "0" + m : m
  s = (s < 10) ? "0" + s : s
  
  return {
    hours: h,
    minutes: m,
    seconds: s,
    session
  }
  
}

export const simplifyArray = (arr = []) => {
  const res = []
  arr.forEach(element => {
     element.forEach(el => {
        res.push(el)
     })
  })
  return res
}

export const animateNumber = (el, attr, _speed) => {
  
  const counters = el
  const speed = parseInt(_speed)

  counters.forEach(counter => {
    const animate = () => {
      const value = +counter.getAttribute(attr)
      const data = +counter.innerText
      const time = value / speed

      if(data < value) {
        counter.innerText = Math.ceil(data + time);
        setTimeout(animate, 20)
      } else {
        counter.innerText = value
      }
    }
    
    animate()

  })
}

export const isInViewport = (element) => {
  var rect = element[0].getBoundingClientRect()
  var html = document.documentElement
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= ((window.innerHeight - 150) || (html.clientHeight - 150)) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  )
}