import { useState, createContext, useContext, useEffect } from 'react'
import { initiateCheckout } from '../lib/payment'
import { products } from '../lib/product'

const defaultCart = {
  products: {}
}

export const CartContext = createContext()

export function useCartState() {
  const [cart, updateCart] = useState(defaultCart)

  useEffect(() => {
    const stateFromStorage = window.localStorage.getItem('store_jelly')
    const data = stateFromStorage && JSON.parse(stateFromStorage)
    if (data) {
      updateCart(data)
    }
  }, [])

  useEffect(() => {
    const data = JSON.stringify(cart)
    window.localStorage.setItem('store_jelly', data)
  }, [cart])

  const cartItems = Object.keys(cart.products).map((key) => {
    const product = products.find(({ id }) => `${id}` === `${key}`)
    return {
      ...cart.products[key],
      pricePerUnit: product.price
    }
  })

  const subtotal = cartItems.reduce(
    (accumulator, { pricePerUnit, quantity }) => {
      return accumulator + pricePerUnit * quantity
    },
    0
  )

  const quantity = cartItems.reduce((accumulator, { quantity }) => {
    return accumulator + quantity
  }, 0)

  function addToCart({ id }) {
    updateCart((prev) => {
      let cart = { ...prev }

      if (cart.products[id]) {
        cart.products[id].quantity = cart.products[id].quantity + 1
      } else {
        cart.products[id] = {
          id,
          quantity: 1
        }
      }

      return cart
    })
  }

  function updateItem({ id, quantity }) {
    updateCart((prev) => {
      let cart = { ...prev }

      if (cart.products[id]) {
        cart.products[id].quantity = quantity
      } else {
        cart.products[id] = {
          id,
          quantity: 1
        }
      }

      return cart
    })
  }

  function checkout() {
    initiateCheckout({
      lineItems: cartItems.map(({ id, quantity }) => {
        return {
          price: id,
          quantity
        }
      })
    })
  }

  return {
    cart,
    subtotal,
    quantity,
    addToCart,
    updateItem,
    checkout,
    cartItems
  }
}

export function useCart() {
  const cart = useContext(CartContext)
  return cart
}
