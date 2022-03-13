import Image from 'next/image'
import dateFormat from "dateformat"

import styles from './slider.module.scss'

const SliderComponent = ({ post, className }) => {
  return (
    <div className={className}>
      <div className={styles.imageContainer}>
        <Image src={`${post.attributes.image.data.attributes.url}`} layout="fill" alt="sliderImage"/>
        <p>{post.attributes.type}</p>
      </div>

      <div className={styles.details}>
        <h3>{post.attributes.description.slice(0, 220)}...</h3>
        <p>{dateFormat(post.attributes.publishedAt, "dddd, dS mmmm, yyyy")}</p>
      </div>
    </div>
  )
}

export default SliderComponent