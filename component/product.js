import React from 'react'
import styles from '../styles/Home.module.css'

import { products } from '../lib/product'

function Product({ product: { title, description, image, alt, price } }) {
  return (
    <li className={styles.card}>
      <a href='https://nextjs.org/docs'>
        <img src={image} alt={alt} />
        <h2>{title}</h2>
        <p>${price}</p>
        <p>{description}</p>
      </a>
    </li>
  )
}

function ProductList() {
  return products.map((product) => (
    <Product key={product.id} product={product} />
  ))
}

export { ProductList }
