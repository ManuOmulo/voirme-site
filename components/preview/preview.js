import Link from 'next/link'
import Image from 'next/image'
import dateFormat from "dateformat"

import styles from './preview.module.scss'

const Preview = ({ post, className }) => {
  return (
    <Link href={`/articles/${post.id}`} passHref>
      <section className={className}>
        <div className={styles.imageContainer}>
          <Image src={`${post.attributes.image.data.attributes.url}`} alt="headerImage" layout="fill"/>
        </div>

        <h3>{post.attributes.type}</h3>
        <h2>{post.attributes.title}</h2>
      </section>
    </Link>
  )
}

export default Preview