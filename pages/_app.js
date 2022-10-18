import { useState } from 'react'
import Head from 'next/head'
import Router from "next/router"
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import NextNProgress from 'nextjs-progressbar'
import { ToastContainer } from 'react-toastify';

import LoadingSpinner from '../components/loadingSpinner/loadingSpinner'
import Footer from '../components/footer/footer'

// custom stylesheet
import '../styles/globals.scss'
// react-toastify styles
import "react-toastify/dist/ReactToastify.css";

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
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="gPKk-JhZMy5L3H7jYXJiUaObORjm-9k1G-vJphKxIIY" />
        <meta name="description" content="VoirMe is a platform for students and alumni from various campuses in Kenya, that serves as an online store for custom commodities while also showcasing their respective cultures and talents. Serves to give exposure, educate and entertain."/>

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
          <ToastContainer
            className="Toastify__toast-container"
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Footer />
        </>
      }
    </>
  )
}

export default MyApp
