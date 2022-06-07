import Image from 'next/image'
import { BsInstagram, BsLinkedin, BsTwitter, BsFacebook } from 'react-icons/bs'

import Navbar from '../../components/navbar/navbar'
import Socials from '../../components/socials/socials'
import banner from '../../public/coming_soon.webp'

import styles from '../../styles/Shop.module.scss'

const Shop = () => {
  return (
    <div className={styles.main}>
      <Navbar />

      <section className={styles.container}>
        <div className={styles.banner}>
          <Image src={banner} className={styles.image} alt="coming soon" layout="fill"/>
        </div>
        <div className={styles.details}>
          <div className={styles.headerContainer}>
            <div className={styles.header}>
              <h1>Coming Soon</h1>
            </div>
          </div>
          <div className={styles.socials}>
            <a
              target="_blank"
              rel="noreferrer"
              href=""
            >
              <BsInstagram />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href=""
            >
              <BsFacebook />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href=""
            >
              <BsTwitter />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href=""
            >
              <BsLinkedin />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Shop