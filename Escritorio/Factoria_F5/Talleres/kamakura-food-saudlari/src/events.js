import { renderCart, addToCart, cart } from './cart.js';
import { renderMenu, renderFilters } from './menu.js';
import { showReceipt } from './receipt.js';
import { products } from '../assets/data/data.js';

document.addEventListener('DOMContentLoaded', () => {
    renderFilters();
    renderMenu(products);
    renderCart();
    

    document.getElementById('cart').addEventListener('click', () => {
        const cartContainer = document.getElementById('cart-container');
        cartContainer.style.display = cartContainer.style.display === 'none' ? 'flex' : 'none';
    });
    
    document.getElementById('proceedPay-button').addEventListener('click', showReceipt);
    

    document.getElementById('close-receipt').addEventListener('click', () => {
        document.getElementById('receipt-container').style.display = 'none';
    });
    

    document.getElementById('pay-button').addEventListener('click', () => {
        cart.length = 0;
        renderCart();
        document.getElementById('receipt-container').style.display = 'none';
        document.getElementById('cart-container').style.display = 'none';
    });
});

