import "./style/ProductCard.css"

export default function ProductCard({ product, quantity, onAdd }) {
    const isAdded = quantity > 0

    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.brand}<br />{product.name}</h3>
            <p className='product-weight'>{product.weight}</p>
            <div className="price-wrapper">
                <p className={`product-price ${isAdded ? 'product-price--hidden' : ''}`}>
                    {product.price} грн
                </p>
                <div className="add-to-cart">
                    {isAdded ? (
                        <button className='add-button add-button--added' onClick={onAdd}>
                            <img src='/checkmark.svg' className='checkmark' alt="" /> В кошику <strong>{quantity}</strong> шт за <strong>{product.price * quantity} грн</strong>
                        </button>
                    ) : (
                        <button className='add-button' onClick={onAdd}>
                            Додати в кошик
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}