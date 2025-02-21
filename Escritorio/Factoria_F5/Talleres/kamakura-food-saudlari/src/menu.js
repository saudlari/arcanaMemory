//DEBE imprimir en pantalla la información de filtros.

//DEBE imprimir en pantalla los productos, con su Título, descripción y precio en € y botón de añadir.

import { products, filters } from '../assets/data/data.js';
import { addToCart } from './cart.js';

export function renderFilters() {
    const filtersContainer = document.getElementById('filters');
    filtersContainer.innerHTML = '';
    
    filters.forEach(filter => {
        const button = document.createElement('button');
        button.className = 'filter';
        button.textContent = filter;
        button.addEventListener('click', () => filterProducts(filter));
        filtersContainer.appendChild(button);
    });
}

export function filterProducts(category) {
    const filteredProducts = category === 'todos' 
        ? products 
        : products.filter(product => product.category === category);
    renderMenu(filteredProducts);
}

export function renderMenu(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-container';
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price-container">
                <h5>€${product.price.toFixed(2)}</h5>
                <button class="add-button">Añadir</button>
            </div>
        `;
        
        const addButton = productElement.querySelector('.add-button');
        addButton.addEventListener('click', () => addToCart(product.id));
        
        productsContainer.appendChild(productElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderFilters();
    renderMenu(products);
});

