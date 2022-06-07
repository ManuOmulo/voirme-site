import Navbar from '../navbar/navbar'

import styles from './loadingSpinner.module.scss'

const LoadingSpinner = () => {
  return (
    <>
      <div className={styles.spinnerContainer}>
        <Navbar />
        <div className={styles.spinner}></div>
      </div>
    </>
  )
}

export default LoadingSpinner
