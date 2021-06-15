import React from 'react'
import styles from '../styles/Home.module.css'

import { initiateCheckout } from '../lib/payment'

function Product({
  product: { id, title, description, image, alt, price },
  addToCart
}) {
  return (
    <li className={styles.card}>
      <a href='https://nextjs.org/docs'>
        <img src={image} alt={alt} />
        <h2>{title}</h2>
        <p>${price}</p>
        <p>{description}</p>
      </a>
      <p>
        <button className={styles.button} onClick={() => addToCart({ id })}>
          Add To Cart
        </button>
      </p>
    </li>
  )
}

function ProductList({ products, addToCart }) {
  return products.map((product) => (
    <Product key={product.id} product={product} addToCart={addToCart} />
  ))
}

export { ProductList }
