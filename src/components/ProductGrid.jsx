import ProductCard from './ProductCard';
import "./style/ProductGrid.css";

const products = [
    { id: 1, brand: 'Yumbox', name: '21 сет', weight: '1500 гр', price: 799, image: '/product-card.png' },
    { id: 2, brand: 'Yumbox', name: '21 сет', weight: '1500 гр', price: 799, image: '/product-card.png' },
    { id: 3, brand: 'Yumbox', name: '21 сет', weight: '1500 гр', price: 799, image: '/product-card.png' },
    { id: 4, brand: 'Yumbox', name: '21 сет', weight: '1500 гр', price: 799, image: '/product-card.png' },
    { id: 5, brand: 'Yumbox', name: '21 сет', weight: '1500 гр', price: 799, image: '/product-card.png' },
    { id: 6, brand: 'Yumbox', name: '21 сет', weight: '1500 гр', price: 799, image: '/product-card.png' },
    { id: 7, brand: 'Yumbox', name: '21 сет', weight: '1500 гр', price: 799, image: '/product-card.png' },
    { id: 8, brand: 'Yumbox', name: '21 сет', weight: '1500 гр', price: 799, image: '/product-card.png' },
];

export default function ProductGrid({ cart, addToCart }) {
    return (
        <>
            <div className="body-span">Найчастіше замовляють</div>
            <div className="product-grid">
                {products.map((product) => {
                    const cartItem = cart.find((item) => item.id === product.id)
                    return (
                        <ProductCard
                            key={product.id}
                            product={product}
                            quantity={cartItem ? cartItem.quantity : 0}
                            onAdd={() => addToCart(product)}
                        />
                    )
                })}
            </div>
        </>
    );
}