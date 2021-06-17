import Head from 'next/head'
import styles from '../../styles/Product.module.css'

import { useCart } from '../../context/cart'

import { products } from '../../lib/product'

console.log('Products', products)

export default function Product({ product }) {
  const { id, title, image, price, description } = product

  const { addToCart } = useCart()

  return (
    <div className={styles.container}>
      <Head>
        <title>{title} - Space Jelly</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div className={styles.productImage}>
          <img src={image} alt={title} />
        </div>

        <div>
          <h1>{title}</h1>

          <p className={styles.description}>{description}</p>

          <p className={styles.description}>${price.toFixed(2)}</p>

          <p>
            <button className={styles.button} onClick={() => addToCart({ id })}>
              Buy
            </button>
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

{
  /**
   * @lesson-13-solution Exercise 4
   * Exporting the getStaticProps function allows us to
   * see our page's parameter, in this case the product
   * ID, and look up the data for that individual product
   * and pass it as props to our page.
   */
}

export async function getStaticProps({ params = {} }) {
  const product = products.find(({ id }) => `${id}` === `${params.productId}`)
  return {
    props: {
      product
    }
  }
}

{
  /**
   * @lesson-13-solution Exercise 3
   * We can export the getStaticPaths function from our
   * page returning an array of paths that define what
   * product pages are available.
   */
}

export async function getStaticPaths() {
  const paths = products.map((product) => {
    const { id } = product
    return {
      params: {
        productId: id
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}
