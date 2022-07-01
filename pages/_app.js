import { useState } from 'react'
import Head from 'next/head'
import Router from "next/router"
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import NextNProgress from 'nextjs-progressbar'

import LoadingSpinner from '../components/loadingSpinner/loadingSpinner'
import Footer from '../components/footer/footer'

import '../styles/globals.scss'

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)

  Router.events.on("routeChangeStart", (url) => {
    setLoading(true)
  })
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false)
  })

  return (
    <>
      <Head>
        <title>VoirMe</title>
      </Head>
      <NextNProgress
        color="#f56886"
        height={2.3}
        options={{ showSpinner: false }}
      />
      {
        loading ?
        <LoadingSpinner /> :
        <>
          <div className="message">
            <h3>👷 Site is Still Under Construction 🔨 </h3>
          </div>
          <Component {...pageProps} />
          <Footer />
        </>
      }
    </>
  )
}

export default MyApp
