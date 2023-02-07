import '../styles/index.css'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { CursorProvider } from '@context/cursor'

function MyApp({ Component, pageProps, router }) {

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      const cursor = document.getElementById('cursor')
      cursor.className = 'cursor'
    })
  }, [router])
  
  const variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  }

  return (
    <CursorProvider>
      <motion.div
        key={router.route}
        initial="initial"
        animate="animate"
        variants={variants}
      >
        <Component {...pageProps} />
      </motion.div>
    </CursorProvider>
  )
}

export default MyApp
