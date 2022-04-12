import Link from 'next/link'
import Image from 'next/image'
import dateFormat from 'dateformat'
import { FaRegCalendar } from 'react-icons/fa'

import styles from './articlePreview.module.scss'

const ArticlePreview = ({ article }) => {
  const description = article.attributes.description
  const shownPreview = (description.length < 250) ? description : description.slice(0, 250)

  return (
    <div className={styles.article}>
      <div className={styles.imageContainer}>
        <Image className={styles.image} src={`${article.attributes.image.data.attributes.url}`} width={230} height={200} alt="articleImage" />
      </div>

      <div className={styles.details}>
        <h3>{article.attributes.title}</h3>
        <p>{shownPreview}</p>
        <h4><FaRegCalendar className={styles.calendar} /> <span>{dateFormat(article.attributes.publishedAt, "dS mmmm, yyyy")}</span></h4>
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