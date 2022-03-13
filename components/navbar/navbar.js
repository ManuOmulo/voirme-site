import Link from "next/link"
import Image from "next/image"

import styles from './navbar.module.scss'
import logo from '../../public/logo.png'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.voirme}>
        <Image src={logo} alt="logo"/>
      </div>

      <ul className={styles.list}>
        <li>
          <Link href="/">Home</Link>
        </li>

        <li>
          <Link href="/articles">Blogs</Link>
        </li>

        <li>
          <Link href="/shop">Shop</Link>
        </li>

        <li>
          <Link href="/gallery">Art Gallery</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar