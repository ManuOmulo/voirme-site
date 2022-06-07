import Link from 'next/link'
import Image from 'next/image'
import dateFormat from 'dateformat'
import { FaRegCalendar } from 'react-icons/fa'

import styles from './articlePreview.module.scss'

const ArticlePreview = ({ article }) => {
  const description = article.attributes.description
  const shownPreview = (description.length < 250) ? description : description.slice(0, 320)

  return (
    <div className={styles.article}>
      <div className={styles.imageContainer}>
        <Image className={styles.image} src={`${article.attributes.image.data.attributes.url}`} layout="fill" alt="articleImage" />
      </div>

      <div className={styles.details}>
        <h3>{article.attributes.title}</h3>
        <p>{shownPreview}...</p>
        <div className={styles.meta}>
          <div className={styles.author}>
            <div className={styles.authorImageContainer}>
              <Image src={`${article.attributes.writer.data.attributes.profile_picture.data.attributes.url}`} alt="author picture" layout="fill"/>
            </div>
            <p>{article.attributes.writer.data.attributes.name}</p>
          </div>
          <div className={styles.date}>
            <FaRegCalendar className={styles.calendar} />
            <h4>{dateFormat(article.attributes.publishedAt, "dS mmmm, yyyy")}</h4>
          </div>
          <div className={styles.category}>
            <p>{article.attributes.type}</p>
          </div>
        </div>

        <div className={styles.button}>
          <Link href={`/articles/${article.id}`} passHref>
            <button>Read More</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ArticlePreview