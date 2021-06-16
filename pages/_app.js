import Nav from '../component/nav'
import { CartContext, useCartState } from '../context/cart'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const cart = useCartState()
  console.log('APP', cart)

  return (
    <CartContext.Provider value={cart}>
      <Nav />
      <Component {...pageProps} />
    </CartContext.Provider>
  )
}

export default MyApp
