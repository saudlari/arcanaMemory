//DEBE contener las funcionalidades del carrito de compras.

import { products } from '../assets/data/data.js';


export let cart = [];


const getCartProducts = () => document.getElementById('cart-products');
const getCartTotal = () => document.getElementById('cart-total');

const calculateItemTotal = (price, quantity) => (price * quantity).toFixed(2);
const formatTotal = (amount) => `Total: €${amount.toFixed(2)}`;


export function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (!existingItem) {
        cart.push({ id: productId, quantity: 1 });
        renderCart();
    }
}

export function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}

export function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        renderCart();
    }
}

function createCartItemElement(item, product) {
    const productElement = document.createElement('div');
    productElement.className = 'cart-container';
    
    productElement.innerHTML = `
        <button class="close-button">
            <img src="./assets/img/close.svg" alt="close">
        </button>
        <div class="text-container">
            <h3>${product.name}</h3>
            <h5>€${calculateItemTotal(product.price, item.quantity)}</h5>
        </div>
        <div class="quantity-container">
            <button class="quantity-plus">+</button>
            <p class="quantity">${item.quantity}</p>
            <button class="quantity-minus">-</button>
        </div>
    `;

    attachEventListeners(productElement, item.id);
    return productElement;
}

function attachEventListeners(element, itemId) {
    const closeButton = element.querySelector('.close-button');
    const plusButton = element.querySelector('.quantity-plus');
    const minusButton = element.querySelector('.quantity-minus');

    closeButton.addEventListener('click', () => removeFromCart(itemId));
    plusButton.addEventListener('click', () => updateQuantity(itemId, 1));
    minusButton.addEventListener('click', () => updateQuantity(itemId, -1));
}

export function renderCart() {
    const cartProducts = getCartProducts();
    const cartTotal = getCartTotal();
    
    cartProducts.innerHTML = '';
    
    if (cart.length === 0) {
        cartProducts.innerHTML = '<h3>Añade un plato a tu menú</h3>';
        cartTotal.textContent = formatTotal(0);
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        const productElement = createCartItemElement(item, product);
        cartProducts.appendChild(productElement);
        total += product.price * item.quantity;
    });

    cartTotal.textContent = formatTotal(total);
}



window.addToCart = addToCart;

window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
