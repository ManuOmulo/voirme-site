import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import ReactPaginate from 'react-paginate'
import dateFormat from 'dateformat';
import { FaRegCalendar, FaUser, FaUserAlt, FaUserAltSlash } from 'react-icons/fa'

import Navbar from '../../components/navbar/navbar'
import ArticlePreview from '../../components/article/articlePreview';

import styles from '../../styles/Articles.module.scss'

const limit = 17

const AllArticles = ({ articles, pageCount }) => {
  const [displayedArticles, setDisplayedArticles] = useState(articles)
  const [currentPageCount, setCurrentPageCount] = useState(pageCount)
  const [search, setSearch] = useState(undefined)

  const fetchArticles = async (currentPage, searchTerm=search) => {
    if (searchTerm !== undefined) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/articles?populate[image][fields][0]=url&sort=id:desc&pagination[page]=${currentPage}&pagination[pageSize]=${limit}&filters[type][$eq]=${searchTerm}`)
      const data = await response.json()
      return data.data
    } else {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/articles?populate[image][fields][0]=url&sort=id:desc&pagination[page]=${currentPage}&pagination[pageSize]=${limit}`)
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
    const searchTerms = ["sports", "education", "art", "lifestyle"]
    setSearch(value)

    if (value === "all") {
      setCurrentPageCount(pageCount)
      return setDisplayedArticles(articles)
    }

    if (searchTerms.includes(value)) {
      const searchResponse = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/articles?populate[image][fields][0]=url&sort=id:desc&pagination[pageSize]=${limit}&filters[type][$eq]=${value}`)
      const data = await searchResponse.json()
      setCurrentPageCount(data.meta.pagination.pageCount)
      return setDisplayedArticles(data.data)
    }
  }

  const categories = ["all", "sports", "education", "art", "lifestyle"]

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
            <Image className={styles.image} src={`${headerArticle.attributes.image.data.attributes.url}`} width={800} height={415} alt="firstImage"/>
          </div>
          <div className={styles.headerDetails}>
            <h3>{headerArticle.attributes.title}</h3>
            <p className={styles.description}>{headerArticle.attributes.description}</p>
            <div className={styles.metaData}>
              <p><span><FaRegCalendar className={styles.icon}/></span>{dateFormat(headerArticle.attributes.publishedAt, "dS mmmm, yyyy")}</p>
              {/* <p className={styles.category}>{headerArticle.attributes.type}</p> */}
              <p><span><FaUser /></span></p>
            </div>
            <Link href={`/articles/${headerArticle.id}`} passHref>
              <button>Read More</button>
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
        </div>

        <ReactPaginate
          previousLabel="< Prev"
          nextLabel="Next >"
          breakLabel="•••"
          pageCount={currentPageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handleClick}
          containerClassName={styles.paginationContainer}
          pageClassName={styles.pageItem}
          pageLinkClassName={styles.pageLink}
          previousClassName={styles.tags}
          previousLinkClassName={styles.previousLink}
          nextClassName={styles.tags}
          nextLinkClassName={styles.nextLink}
          breakClassName={styles.breakPoints}
          breakLinkClassName={styles.breakPointsClassName}
          activeClassName={styles.active}

        />

      </section>
    </main>
  )
}

export default AllArticles

export async function getServerSideProps() {
  const response = await fetch(`${process.env.SERVER_URL}/articles?populate[image][fields][0]=url&sort=id:desc&pagination[pageSize]=${limit}`)
  const data = await response.json()

  return {
    props: {
      articles: data.data,
      pageCount: data.meta.pagination.pageCount
    }
  }
}