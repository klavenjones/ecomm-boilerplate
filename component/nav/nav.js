import { FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'
import styles from './nav.module.css'
import { useCart } from '../../context/cart'

const Nav = () => {
  const { subtotal, checkout } = useCart()

  return (
    <nav className={styles.nav}>
      <Link href={`/`}>
        <a>
          <p className={styles.navTitle}>Space Jelly Shop</p>
        </a>
      </Link>
      <Link href={`/cart`}>
        <a className={styles.navCart}>
          <FaShoppingCart /> ${subtotal.toFixed(2)}
        </a>
      </Link>
    </nav>
  )
}

export default Nav
