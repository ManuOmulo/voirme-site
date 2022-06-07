import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import ReactPaginate from 'react-paginate'
import dateFormat from 'dateformat';
import { FaRegCalendar } from 'react-icons/fa'

import Navbar from '../../components/navbar/navbar'
import ArticlePreview from '../../components/article/articlePreview';
import Socials from '../../components/socials/socials'
import voirme from '../../public/voirme.png'

import styles from '../../styles/Articles.module.scss'

const limit = 16

const AllArticles = ({ articles, pageCount }) => {
  const [displayedArticles, setDisplayedArticles] = useState(articles)
  const [currentPageCount, setCurrentPageCount] = useState(pageCount)
  const [search, setSearch] = useState(undefined)

  const fetchArticles = async (currentPage, searchTerm=search) => {
    if (searchTerm !== undefined) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/articles?populate[image][fields][0]=url&populate[writer][fields][0]=name&populate[writer][populate][profile_picture][fields][0]=url&sort=id:desc&pagination[pageSize]=${limit}&pagination[page]=${currentPage}&filters[type][$eq]=${searchTerm}`)
      const data = await response.json()
      return data.data
    } else {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/articles?populate[image][fields][0]=url&populate[writer][fields][0]=name&populate[writer][populate][profile_picture][fields][0]=url&sort=id:desc&pagination[page]=${currentPage}&pagination[pageSize]=${limit}`)
      const data = await response.json()
      return data.data
    }
  }

  const handleClick = async (data) => {
    let displayedPage = data.selected + 1

    if (search !== undefined) {
      const getSearchedArticle = await fetchArticles(displayedPage, search)
      return setDisplayedArticles(getSearchedArticle)
    } else {
      const getNewArticles = await fetchArticles(displayedPage)
      return setDisplayedArticles(getNewArticles)
    }
  }

  const handleChange = async (value) => {
    const searchTerms = ["sports", "education", "art", "culture", "lifestyle", "creative writing", "features", "VNews", "masentrepreneur"]

    setSearch(value)

    if (value === "all") {
      setCurrentPageCount(pageCount)
      return setDisplayedArticles(articles)
    }

    if (searchTerms.includes(value)) {
      const searchResponse = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/articles?populate[image][fields][0]=url&populate[writer][fields][0]=name&populate[writer][populate][profile_picture][fields][0]=url&sort=id:desc&pagination[pageSize]=${limit}&filters[type][$eq]=${value}`)
      const data = await searchResponse.json()
      setCurrentPageCount(data.meta.pagination.pageCount)
      return setDisplayedArticles(data.data)
    }
  }

  const categories = ["all", "sports", "education", "art", "culture", "lifestyle", "creative writing", "features", "VNews", "masentrepreneur"]

  const headerArticle = articles[0]
  const otherArticles = displayedArticles.filter(article => article.id !== headerArticle.id)

  return (
    <main>
      <Navbar />

      <header className={styles.header}>
        <ul className={styles.categories}>
          {
            categories.map((term, index) => (
              <li onClick={() => handleChange(term)} key={index}>{term}</li>
            ))
          }
        </ul>
        <div className={styles.others}>
          <div className={styles.imageContainer}>
            <Image className={styles.image} src={`${headerArticle.attributes.image.data.attributes.url}`} layout="fill" alt="firstImage"/>
          </div>
          <div className={styles.headerDetails}>
            <h3>{headerArticle.attributes.title}</h3>
            <p className={styles.description}>{headerArticle.attributes.description}</p>
            <div className={styles.metaData}>
              <div className={styles.author}>
                <div className={styles.authorImageContainer}>
                  <Image className={styles.authorImage} src={`${headerArticle.attributes.writer.data.attributes.profile_picture.data.attributes.url}`} alt="author pic" layout="fill"/>
                </div>
                <p className={styles.authorName}>
                  {headerArticle.attributes.writer.data.attributes.name}
                </p>
              </div>
              <div className={styles.calendar}>
                <FaRegCalendar className={styles.icon}/>
                <p>{dateFormat(headerArticle.attributes.publishedAt, "dS mmmm, yyyy")}</p>
              </div>
              <p className={styles.category}>{headerArticle.attributes.type}</p>
            </div>
            <Link href={`/articles/${headerArticle.id}`} passHref>
              <button className={styles.headerButton}>Read More</button>
            </Link>
          </div>
        </div>
      </header>

      <section className={styles.main}>
        <div className={styles.articlesContainer}>
          <div className={styles.articles}>
            {
              otherArticles.map((article, index) => (
                <ArticlePreview article={article} key={index}/>
              ))
            }
          </div>
          <ReactPaginate
            previousLabel=""
            nextLabel="Next >>"
            breakLabel="•••"
            pageCount={currentPageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handleClick}
            containerClassName={styles.paginationContainer}
            pageClassName={styles.pageItem}
            pageLinkClassName={styles.pageLink}
            nextClassName={styles.tags}
            nextLinkClassName={styles.nextLink}
            breakClassName={styles.breakPoints}
            breakLinkClassName={styles.breakPointsClassName}
            activeClassName={styles.active}
          />

          <div className={styles.info}>
            <div className={styles.about}>
              <h3>About Our Blog</h3>
              <div className={styles.aboutImageContainer}>
                <Image className={styles.aboutImage} src={voirme} alt="aboutPicture" width={100} height={100}/>
              </div>
              <p>Lorem ipsum dolor sit amet cons adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum nisi quis eleifend quam. Ante in nibh mauris cursus mattis molestie a iaculis. Sem fringilla ut morbi tincidunt augue interdum. Non sodales tempus urnaDuis convallis convallis tellus id interdum velit. Elementum pulvinar etiam non quam. In quisque sagittis.</p>
            </div>
            <div className={styles.socials}>
              <h3>Follow Us On</h3>
              <Socials />
            </div>
          </div>
        </div>

      </section>
    </main>
  )
}

export default AllArticles

export async function getServerSideProps() {
  const response = await fetch(`${process.env.SERVER_URL}/articles?populate[image][fields][0]=url&populate[writer][fields][0]=name&populate[writer][populate][profile_picture][fields][0]=url&sort=id:desc&pagination[pageSize]=${limit}`)
  const data = await response.json()

  return {
    props: {
      articles: data.data,
      pageCount: data.meta.pagination.pageCount
    }
  }
}