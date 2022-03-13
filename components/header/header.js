import Navbar from '../navbar/navbar'

import styles from './header.module.scss'

const Header = ({ title=undefined, item=undefined }) => {
  return (
    <div className={styles.header}>
      <Navbar />
      <div className={(item === undefined) ? styles.undefined : styles.imageContainer} style={{backgroundImage: `url(${item})`}}>
      </div>
      <h1>{title}</h1>
    </div>
  )
}

export default Header