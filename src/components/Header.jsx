import { useState, useRef } from 'react'
import "./style/Header.css"

export default function Header({ isHeaderFixed, setIsHeaderFixed, count, sum, onCartClick }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const closeTimeoutRef = useRef(null)

    const toggleMenu = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current)
            closeTimeoutRef.current = null
        }

        if (isOpen) {
            setIsOpen(false)
            setIsClosing(true)
            closeTimeoutRef.current = setTimeout(() => {
                setIsClosing(false)
                setIsHeaderFixed(false)
            }, 300)
        } else {
            setIsOpen(true)
            setIsHeaderFixed(true)
        }
    }


    return (
        <>
            <header className={isHeaderFixed ? 'header--fixed' : ''}>
                <img src="/logo.png" alt="Logo" className="logo" />

                <nav className="nav-desktop">
                    <a href="#catalog">Каталог</a>
                    <a href="#services">Кейтеринг</a>
                    <a href="#about">Про нас</a>
                    <a href="#contacts">Контакти</a>
                </nav>

                <button className="cart cart-desktop" onClick={onCartClick}>
                    <span className="cart-count">{count}</span>
                    <span className="cart-sum">{sum} грн</span>
                </button>

                <button className="burger" onClick={toggleMenu}>
                    <span className="burger-text">Меню</span>
                    <div className={`burger-lines ${isOpen ? 'burger-lines--open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
            </header>

           <div className={`header-burger ${isOpen ? 'header-burger--open' : ''}`}>
                <div className="header-burger__inner">
                    <button className="cart cart-mobile" onClick={onCartClick}>
                        <span className="cart-count">{count}</span>
                        <span className="cart-sum">{sum} грн</span>
                    </button>

                    <nav className="nav-mobile">
                        <a href="#catalog">Каталог</a>
                        <a href="#services">Кейтеринг</a>
                        <a href="#about">Про нас</a>
                        <a href="#contacts">Контакти</a>
                    </nav>
                    <div className="contact-info">
                        <span className="contact-email">yumbox.lutsk@gmail.com</span>
                        <span className="contact-phone">+380 93 823 92 93</span>
                    </div>
                    <div className="social-links">
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <img src="/linkedin-logo.svg" alt="LinkedIn" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <img src="/instagram-logo.svg" alt="Instagram" />
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src="/facebook-logo.svg" alt="Facebook" />
                        </a>
                    </div>
                </div>
            </div>

            <button className="cart cart-mobile-fixed" onClick={onCartClick}>
                <span className="cart-count">{count}</span>
                <span className="cart-sum">{sum} грн</span>
            </button>
        </>
    )
}