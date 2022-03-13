import Head from 'next/head'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'

import Footer from '../components/footer/footer'

import '../styles/globals.scss'

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>VoirMe</title>
      </Head>
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
