import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import Slider from './components/Slider'
import ProductGrid from './components/ProductGrid'
import CartDrawer from './components/CartDrawer'
import "./components/style/App.css"

const CART_STORAGE_KEY = 'yumbox-cart'

function App() {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerWrapperRef = useRef(null)

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : ''
  }, [isCartOpen])

  useEffect(() => {
    const measure = () => {
      if (headerWrapperRef.current) {
        setHeaderHeight(headerWrapperRef.current.offsetHeight)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const increment = (id) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    )
  }

  const decrement = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    )
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const count = cart.reduce((total, item) => total + item.quantity, 0)
  const sum = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <>
      <div ref={headerWrapperRef}>
        <Header
          isHeaderFixed={isHeaderFixed}
          setIsHeaderFixed={setIsHeaderFixed}
          count={count}
          sum={sum}
          onCartClick={() => setIsCartOpen(true)}
        />
      </div>
      <div className={`page-content ${isHeaderFixed ? 'content-shifted' : ''} ${isCartOpen ? 'page-content--blurred' : ''}`}>
        <Slider />
        <ProductGrid cart={cart} addToCart={addToCart} />
      </div>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        sum={sum}
        onIncrement={increment}
        onDecrement={decrement}
        onRemove={removeFromCart}
        headerHeight={headerHeight}
      />
    </>
  )
}

export default App