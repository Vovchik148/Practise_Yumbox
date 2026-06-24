import "./style/CartDrawer.css"

export default function CartDrawer({ isOpen, onClose, cart, sum, onIncrement, onDecrement, onRemove, headerHeight }) {
    const deliveryFee = 50
    const hasDiscount = sum >= 1000
    const discountAmount = hasDiscount ? Math.round(sum * 0.1) : 0
    const total = sum - discountAmount + (cart.length > 0 ? deliveryFee : 0)
    const offsetStyle = { top: `${headerHeight}px`, height: `calc(100vh - ${headerHeight}px)` }

    const handleCheckout = () => {
        const order = cart.map(item => ({
            id: item.id,
            brand: item.brand,
            name: item.name,
            weight: item.weight,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.price * item.quantity,
        }))
        console.log('=== ЗАМОВЛЕННЯ ===')
        console.log(order)
        console.log(`Сума: ${sum} грн`)
        if (hasDiscount) console.log(`Знижка 10%: -${discountAmount} грн`)
        console.log(`Доставка: ${deliveryFee} грн`)
        console.log(`Разом: ${total} грн`)
    }

    return (
        <>
            <div
                className={`cart-overlay ${isOpen ? 'cart-overlay--open' : ''}`}
                style={offsetStyle}
                onClick={onClose}
            ></div>

            <aside
                className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`}
                style={offsetStyle}
            >
                <div className="cart-drawer__header">
                    <h2>Корзина</h2>
                    <button className="cart-drawer__close" onClick={onClose}><img src='./src/assets/close_cart.svg'></img></button>
                </div>

                <div className="cart-drawer__items">
                    {cart.length === 0 ? (
                        <p className="cart-drawer__empty">Кошик порожній</p>
                    ) : (
                        cart.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <img src={item.image} alt={item.name} className="cart-item__image" />
                                <div className="cart-item__info">
                                    <p className="cart-item__name">{item.brand} {item.name}</p>
                                    <p className="cart-item__weight">{item.weight}</p>
                                    <div className="cart-item__bottom">
                                        <p className="cart-item__price">{item.price * item.quantity} грн</p>
                                        <div className="cart-item__counter">
                                            <button onClick={() => onDecrement(item.id)}>–</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => onIncrement(item.id)}>+</button>
                                        </div>
                                    </div>
                                </div>
                                <button className="cart-item__remove" onClick={() => onRemove(item.id)}><img src='./src/assets/trash_bin.svg'></img></button>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-drawer__footer">
                        <div className="cart-drawer__delivery">
                            <span>Доставка</span>
                            <span>{deliveryFee} грн</span>
                        </div>
                        <div className={`cart-drawer__discount ${hasDiscount ? 'cart-drawer__discount--visible' : ''}`}>
                            <span>Знижка 10%</span>
                            <span>−{discountAmount} грн</span>
                        </div>
                        <button className="cart-drawer__checkout" onClick={handleCheckout}>
                            Оформити за {total} грн
                        </button>
                    </div>
                )}
            </aside>
        </>
    )
}