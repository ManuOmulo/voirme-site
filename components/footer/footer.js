import Link from 'next/link'
import Image from 'next/image'
import { BsInstagram, BsLinkedin, BsTwitter, BsFacebook } from 'react-icons/bs'

import styles from './footer.module.scss'
import logo from '../../public/logo.png'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <section className={styles.info}>
          <div className={styles.imageWrapper}>
            <Image src={logo} alt="info image" width={180} height={150}/>
          </div>
          <h3>&#8220;Be the Difference&#8221;</h3>
          <div className={styles.details}>
            <p>VoirMe Inc.</p>
            <p>Address: <span>7057-40100, Kisumu</span></p>
            <p>Phone No: <span>+254 799 117668</span></p>
            <p>Email: <span>info.voirme@gmail.com</span></p>
          </div>
        </section>

        <section className={styles.categoryLinks}>
          <div>
            <h2>Categories</h2>
          </div>
          <ul>
            <li><Link href="/categories/art">Art</Link></li>
            <li><Link href="/categories/sports">Sports</Link></li>
            <li><Link href="/categories/education">Education</Link></li>
            <li><Link href="/categories/lifestyle">Lifestyle</Link></li>
          </ul>
        </section>

        <section className={styles.socials}>
          <h2>Socials</h2>
          <ul>
            <li>
              <Link href="/" passHref>
                <div className={styles.socialContainer}>
                  <BsInstagram style={{ color: "#E845AE"}}/>
                  <p>Instagram</p>
                </div>
              </Link>
            </li>

            <li>
              <Link href="/" passHref>
                <div className={styles.socialContainer}>
                  <BsFacebook style={{ color: "#0080F6"}}/>
                  <p>Facebook</p>
                </div>
              </Link>
            </li>

            <li>
              <Link href="/" passHref>
                <div className={styles.socialContainer}>
                  <BsTwitter style={{color: "#1A83CC"}}/>
                  <p>Twitter</p>
                </div>
              </Link>
            </li>

            <li>
              <Link href="/" passHref>
                <div className={styles.socialContainer}>
                  <BsLinkedin style={{color: "blue"}}/>
                  <p>LinkedIn</p>
                </div>
              </Link>
            </li>
          </ul>
        </section>

        <section className={styles.newsLetter}>
          <h2>Dont Miss Anything</h2>
          <p>eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc id cursus </p>
          <form>
            <input type="text" placeholder="Enter your Email"/>
            <button type="submit">Submit</button>
          </form>
        </section>

        <section className={styles.copyright}>
          <p>All Rights Reserved, Copyright ©{new Date().getFullYear()}. Created with 💜 by <span><Link href="http://www.linkedin.com/in/emmanuel-omulo-888b1318b"><a target="_blank" rel="noopener noreferrer">Emmanuel Omulo</a></Link></span></p>
        </section>
      </div>
    </footer>
  )
}

export default Footer