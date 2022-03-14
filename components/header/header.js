import Image from "next/image"
import Navbar from '../navbar/navbar'

import styles from './header.module.scss'

const Header = ({ title=undefined, item=undefined, hero=undefined }) => {
  const src = (item === undefined) ? "/" : item
  return (
    <div className={styles.header}>
      <Navbar />
      <div className={(item === undefined) ? styles.undefined : styles.imageContainer}>
        <Image src={`${src}`} width={400} height={350} alt="backgroundImage"/>
      </div>
      <div className={styles.details}>
        <h1>{title}</h1>
      </div>
      <div className={styles.title}>
        <h2 className={(hero === undefined) ? styles.undefined : styles.hero}>{hero}</h2>
      </div>
    </div>
  )
}

export default Header