import Link from 'next/link'
import { BsInstagram, BsLinkedin, BsTwitter, BsFacebook } from 'react-icons/bs'
import styles from './socials.module.scss'

const instagramBackground = {
  color: "#E845AE",
}

const Socials = () => {
  return (
    <ul className={styles.socials}>
      <li>
        <Link href="/" passHref>
          <a target="_blank" rel="noreferrer">
            <BsInstagram className={styles.socialIcon} style={instagramBackground}/>
          </a>
        </Link>
      </li>

      <li>
        <Link href="/" passHref>
          <a target="_blank" rel="noreferrer">
            <BsFacebook className={styles.socialIcon} style={{ color: "#0080F6"}}/>
          </a>
        </Link>
      </li>

      <li>
        <Link href="/" passHref>
          <a target="_blank" rel="noreferrer">
            <BsTwitter className={styles.socialIcon} style={{color: "#1A83CC"}}/>
          </a>
        </Link>
      </li>

      <li>
        <Link href="https://www.linkedin.com/company/voirme/" passHref>
          <a target="_blank" rel="noreferrer">
            <BsLinkedin className={styles.socialIcon} style={{color: "blue"}}/>
          </a>
        </Link>
      </li>
    </ul>
  )
}

export default Socials