import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaRegWindowClose } from 'react-icons/fa'

import styles from './navbar.module.scss'
import logo from '../../public/logo_transparent_white_bg.png'
import navImage from '../../public/hero/undraw_profile_pic_ic-5-t.svg'

const Navbar = () => {
  const [isVisible, setVisible] = useState(false)
  const router = useRouter()

  const toggleMenu = (e) => {
    e.preventDefault()
    setVisible(!isVisible)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.voirme}>
        <Image src={logo} alt="logo"/>
      </div>

      <div onClick={toggleMenu} className={styles.hamburger}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      <div className={isVisible ? "navigation visible nav-pink" : "navigation nav-pink"}>
        <div className={isVisible ? "navigation visible nav-lightpink" : "navigation nav-lightpink"}>
          <div className={isVisible ? "navigation visible nav-white" : "navigation nav-white"}>
            <div className="navbarHeaderImage">
              <div className="navbarHeaderImageBlur"></div>
              <div className="navbarImageHeaderContainer">
                <Image className="navbarImage" src={navImage} layout="responsive" alt="navImage" />
              </div>

              <FaRegWindowClose onClick={toggleMenu} className="icon"/>
            </div>

            <ul className={styles.list}>
              <li className={router.pathname == "/" ? styles.active : ""}>
                <Link href="/">Home</Link>
              </li>

              <li className={router.pathname == "/articles" ? styles.active : ""}>
                <Link href="/articles">Blog</Link>
              </li>

              <li className={router.pathname == "/shop"? styles.active : ""}>
                <Link href="/shop">Shop</Link>
              </li>

              <li className={router.pathname == "/gallery" ? styles.active : ""}>
                <Link href="/gallery">Art Gallery</Link>
              </li>

              <li className={router.pathname == "/opportunities" ? styles.active : ""}>
                <Link href="/opportunities">Opportunities</Link>
              </li>
            </ul>

            <div className={styles.profile}>
              <div className={styles.profilePictureContainer}>

              </div>
              <div className={styles.profileDetails}>
                <h3>Username</h3>
                <p>Campus Name</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button>Sign In</button>

    </nav>
  )
}

export default Navbar