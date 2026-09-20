import { checkAccess } from '../../../utils/auth';
import { 
  getCart, 
  calculateCartTotal, 
  clearCart, 
  addToCart, 
  removeFromCart, 
  deleteItemFromCart 
} from '../../../utils/carrito';

checkAccess();

document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items') as HTMLElement;
  const subtotalAmount = document.getElementById('subtotalAmount') as HTMLElement;
  const totalAmount = document.getElementById('totalAmount') as HTMLElement;
  const clearCartBtn = document.getElementById('clearCartBtn') as HTMLButtonElement;
  const checkoutBtn = document.getElementById('checkoutBtn') as HTMLButtonElement;

  function renderCart() {
    const items = getCart();

    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';

    if (items.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-cart-msg">El carrito está vacío.</p>';
      if (subtotalAmount) subtotalAmount.innerText = '$0';
      if (totalAmount) totalAmount.innerText = '$0';
      return;
    }

    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <div class="item-info">
          <h4>${item.product.nombre}</h4>
          <p>$${item.product.precio} c/u</p>
        </div>
        
        <div class="item-controls">
          <button class="btn-qty btn-minus" data-id="${item.product.id}">-</button>
          <span class="qty-number">${item.cantidad}</span>
          <button class="btn-qty btn-plus" data-id="${item.product.id}">+</button>
        </div>

        <div class="item-price">
          $${item.product.precio * item.cantidad}
        </div>

        <button class="btn-delete" data-id="${item.product.id}">🗑️</button>
      `;
      cartItemsContainer.appendChild(div);
    });

    
    addCartControlListeners();

    const total = calculateCartTotal();
    if (subtotalAmount) subtotalAmount.innerText = `$${total}`;
    if (totalAmount) totalAmount.innerText = `$${total}`;
  }

  function addCartControlListeners() {
    
    document.querySelectorAll('.btn-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number((e.currentTarget as HTMLElement).dataset.id);
        const items = getCart();
        const found = items.find(i => i.product.id === id);
        if (found) {
          addToCart(found.product);
          renderCart();
        }
      });
    });

    
    document.querySelectorAll('.btn-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number((e.currentTarget as HTMLElement).dataset.id);
        removeFromCart(id);
        renderCart();
      });
    });

    // Botón [Eliminar]
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number((e.currentTarget as HTMLElement).dataset.id);
        deleteItemFromCart(id);
        renderCart();
      });
    });
  }

  // Vaciar carrito
  clearCartBtn?.addEventListener('click', () => {
    clearCart();
    renderCart();
  });

  // Finalizar compra
  checkoutBtn?.addEventListener('click', () => {
    const items = getCart();
    if (items.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    alert('¡Compra realizada con éxito!');
    clearCart();
    renderCart();
  });

  renderCart();
});