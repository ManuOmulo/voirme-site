import Image from 'next/image'
import styles from './painting.module.scss'

const PaintingComponent = ({ painting }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src={`${painting.attributes.image.data.attributes.url}`} alt="painting" height={200} width={210}/>
      </div>
      <div className={styles.details}>
        <h2>{painting.attributes.title}</h2>
        <h3>Ksh. {Number(painting.attributes.price).toLocaleString()}</h3>
        <p><span>Artist:</span> {painting.attributes.artistName.replace(/_/g, " ")}</p>
      </div>
    </div>
  )
}

export default PaintingComponent