import Link from 'next/link'
import axios from 'axios'
import { BsArrowRight } from 'react-icons/bs'

import Navbar from '../components/navbar/navbar'
import Preview from '../components/preview/preview'
import SliderComponent from "../components/slider/slider"
import TopStoriesComponent from "../components/topStories/topStories"
import LatestComponent from "../components/homeLatestArticles/latest"
import LatestBigComponent from "../components/homeLatestArticles/latestBig"
import PaintingComponent from "../components/painting/painting"

import styles from '../styles/Home.module.scss'

const Home = ({
    allArticles,
    art,
    lifestyle,
    education,
    sliderArt,
    sliderEducation,
    sliderLifestyle,
    sliderSports,
    topStory1,
    topStory2,
    topStory3,
    topStory4,
    paintings
  }) => {

  const sliderProperties = [sliderArt, sliderEducation, sliderSports, sliderLifestyle]
  const topStories = [topStory1, topStory2, topStory3, topStory4]
  const articles = []

  const categories = allArticles.map(item => {
    return [...item.attributes.articles.data]
  })

  categories.map(article => {
    return articles.push(...article)
  })

  const latestArticlesFinder = (arr) => {
    const sortedArticles = arr.sort((a, b) => b.id - a.id)
    const topFive = sortedArticles.slice(0, 5)
    return topFive
  }

  const latestArticles = latestArticlesFinder(articles)
  const otherArticles = latestArticles.slice(1, 5)

  return(
    <div>
      <header className={styles.header}>
        <Navbar />
        <div className={styles.links}>
          <Preview post={art} className={styles.previewOne}/>
          <Preview post={lifestyle} className={styles.previewTwo}/>
          <Preview post={education} className={styles.previewThree}/>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.topContent}>
          <h2 className={styles.topContentHeader}>Don&#8216;t  miss</h2>
          <div className={styles.slider}>
            {
              sliderProperties.map((property, index) => (
                <SliderComponent key={index} post={property} className={styles.container}/>
              ))
            }
          </div>
        </section>

        <section className={styles.topStories}>
          <h3 className={styles.storiesHeader}>Top Stories</h3>
          <div className={styles.storiesWrapper}>
            {
              topStories.map((story, index) => (
                <TopStoriesComponent key={index} post={story} className={styles.story}/>
              ))
            }
          </div>
        </section>

        <section className={styles.latestPosts}>
          <div className={styles.latestBig}>
            <LatestBigComponent post={latestArticles[0]} className={styles.latestBigItem} />
          </div>
          <div className={styles.otherLatest}>
            {
              otherArticles.map((article, index) => (
                <LatestComponent key={index} post={article} className={styles.otherLatestItem} />
              ))
            }
          </div>
        </section>

        <section className={styles.gallery}>
          <h3>Art Gallery</h3>
          <Link href="/gallery" passHref>
            <div className={styles.arrow}>
              <p>More</p>
              <BsArrowRight className={styles.arrowRight}/>
            </div>
          </Link>
          <div className={styles.galleryContainer}>
            {
              paintings.map((painting, index) => (
                <PaintingComponent painting={painting} key={index} />
              ))
            }
          </div>
        </section>

        <section className={styles.about}>
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum nisi quis eleifend quam. Ante in nibh mauris cursus mattis molestie a iaculis. Sem fringilla ut morbi tincidunt augue interdum. Non sodales neque sodales ut etiam sit amet. Blandit libero volutpat sed cras ornare. Massa tincidunt dui ut ornare lectus sit amet. Neque gravida in fermentum et sollicitudin ac orci. Est sit amet facilisis magna etiam tempor orci. Duis convallis convallis tellus id interdum velit. Elementum pulvinar etiam non quam. In hac habitasse platea dictumst quisque sagittis. Malesuada fames ac turpis egestas sed tempus urna. Lorem ipsum dolor sit amet consectetur adipiscing elit. Morbi quis commodo odio aenean sed adipiscing. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. entum et sollicitudin ac orci. Est sit amet facilisis magna etiam tempor orci. Duis convallis convallis tellus id interdum velit. Elementum pulvinar etiam non quam. In hac habitasse platea dictumst quisque sagittis. Malesuada fames ac turpis egestas sed tempus urna. Lorem ipsum dolor sit amet consectetur adipiscing elit. Morbi quis commodo odio aenean sed adipiscing.</p>
        </section>
      </main>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const articleCategoriesRequest = `${process.env.SERVER_URL}/categories?populate[articles][populate]=image`
  const allPaintingsRequest = `${process.env.SERVER_URL}/paintings?populate=image&sort=id:desc&pagination[limit]=6`

  const getArticles = axios.get(articleCategoriesRequest)
  const getPaintings = axios.get(allPaintingsRequest)

  const data = await axios.all([
      getArticles,
      getPaintings
    ])
    .then(axios.spread((...allData) => {
      return {
        category: allData[0].data.data,
        paintings: allData[1].data.data
      }
    }))

  return {
    props: {
      allArticles: data.category,
      art: data.category[1].attributes.articles.data[0],
      lifestyle: data.category[2].attributes.articles.data[0],
      education: data.category[3].attributes.articles.data[0],
      sliderArt: data.category[1].attributes.articles.data[1],
      sliderLifestyle: data.category[2].attributes.articles.data[1],
      sliderEducation: data.category[3].attributes.articles.data[1],
      sliderSports: data.category[0].attributes.articles.data[0],
      topStory1: data.category[0].attributes.articles.data[2],
      topStory2: data.category[1].attributes.articles.data[2],
      topStory3: data.category[2].attributes.articles.data[2],
      topStory4: data.category[3].attributes.articles.data[2],
      paintings: data.paintings
    }
  }
}