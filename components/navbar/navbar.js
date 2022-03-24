import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"

import styles from './navbar.module.scss'
import logo from '../../public/logo_transparent_white_bg.png'

const Navbar = () => {
  const router = useRouter()

  return (
    <nav className={styles.navbar}>
      <div className={styles.voirme}>
        <Image src={logo} alt="logo"/>
      </div>

      <ul className={styles.list}>
        <li className={router.pathname == "/" ? styles.active : ""}>
          <Link href="/">Home</Link>
        </li>

        <li className={router.pathname == "/articles" ? styles.active : ""}>
          <Link href="/articles">Blogs</Link>
        </li>

        <li className={router.pathname == "/shop"? styles.active : ""}>
          <Link href="/shop">Shop</Link>
        </li>

        <li className={router.pathname == "/gallery" ? styles.active : ""}>
          <Link href="/gallery">Art Gallery</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar