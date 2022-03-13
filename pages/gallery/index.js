import { useState } from 'react'
import Image from 'next/image'

import Header from '../../components/header/header'
import Modal from "../../components/modal/modal"

import styles from '../../styles/Gallery.module.scss'

const Gallery = ({ images }) => {
  const [showModal, setShowModal] = useState(false)

  const hero = <h2 className={styles.hero}>VoirMe Gallery</h2>

  return (
    <main>
      <Header title={hero}/>

      <div className={styles.main}>
        <div className={styles.gallery}>
          {
            images.map((image, index) => (
                <div key={index} className={styles.image}>
                  <div className={styles.imageContainer} onClick={() => setShowModal(true)}>
                    <Image src={`${image.attributes.image.data.attributes.url}`} layout="fill" alt=" backgroundImage"/>
                  </div>
                  <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <h2>{image.attributes.title}</h2>
                    <h3>{image.attributes.price}</h3>
                  </Modal>
                </div>
              ))
          }
        </div>
      </div>
    </main>
  )
}

export default Gallery

export async function getServerSideProps() {
  const response = await fetch(`${process.env.SERVER_URL}/paintings?populate=image&sort=id:desc`)
  const data = await response.json()

  return {
    props: {
      images: data.data
    }
  }
}