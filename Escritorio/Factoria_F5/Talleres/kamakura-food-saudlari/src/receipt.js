import { products } from '../assets/data/data.js';
import { cart } from './cart.js';

export function showReceipt() {
    const receiptContainer = document.getElementById('receipt-container');
    const receiptProduct = document.getElementById('receipt-product');
    const receiptTotal = document.getElementById('receipt-total');
    
    receiptContainer.style.display = 'flex';
    
    receiptProduct.innerHTML = '';
    
    let total = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        const subtotal = product.price * item.quantity;
        total += subtotal;

        const productElement = document.createElement('div');
        productElement.className = 'receipt-product';
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <div class="receipt-price">
                <p>Cantidad: ${item.quantity}</p>
                <h5>Subtotal: €${subtotal.toFixed(2)}</h5>
            </div>
        `;
        
        receiptProduct.appendChild(productElement);
    });

    receiptTotal.textContent = `Total: €${total.toFixed(2)}`;
}