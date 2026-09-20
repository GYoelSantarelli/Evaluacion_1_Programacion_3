import { checkAccess } from '../../../utils/auth';
import { removeCurrentUser } from '../../../utils/localStorage';
import { navigateTo } from '../../../utils/navigate';
import { PRODUCTS, getCategories } from '../../../data/data';
import { addToCart, getCartItemCount } from '../../../utils/carrito';

checkAccess();

let selectedCategoryId: number | null = null;
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {

  const logoutBtn = document.querySelector<HTMLButtonElement>('#logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      removeCurrentUser();
      navigateTo('../auth/login/login.html');
    });
  }

  const productsContainer = document.getElementById('products-container') as HTMLElement;
  const categoriesContainer = document.getElementById('categories-container') as HTMLElement;
  const searchInput = document.getElementById('search-input') as HTMLInputElement;

  // Función para actualizar el contador de productos en el navbar/header
  function updateCartBadge() {
    const cartLink = document.getElementById('cartLink') || document.querySelector('a[href*="carrito"]');
    if (cartLink) {
      const count = getCartItemCount();
      cartLink.textContent = `🛒 Carrito (${count})`;
    }
  }

  function renderCategories() {
    if (!categoriesContainer) return;
    categoriesContainer.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.textContent = 'Todas';
    if (selectedCategoryId === null) allBtn.classList.add('active');
    allBtn.onclick = () => {
      selectedCategoryId = null;
      renderCategories();
      renderProducts();
    };
    categoriesContainer.appendChild(allBtn);

    getCategories().forEach(cat => {
      const btn = document.createElement('button');
      btn.textContent = cat.nombre;
      if (selectedCategoryId === cat.id) btn.classList.add('active');
      btn.onclick = () => {
        selectedCategoryId = cat.id;
        renderCategories();
        renderProducts();
      };
      categoriesContainer.appendChild(btn);
    });
  }

  function renderProducts() {
    if (!productsContainer) return;
    productsContainer.innerHTML = '';

    const filtered = PRODUCTS.filter(p => {
      const matchesCategory = selectedCategoryId === null || p.categorias.some(c => c.id === selectedCategoryId);
      const matchesSearch = p.nombre.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      productsContainer.innerHTML = '<p class="no-products">No se encontraron productos.</p>';
      return;
    }

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';

      card.innerHTML = `
        <div class="product-info">
          <h4>${p.nombre}</h4>
          <p>${p.descripcion}</p>
        </div>
        <div>
          <p class="price"><strong>$${p.precio}</strong></p>
          <button class="add-btn" ${!p.disponible ? 'disabled' : ''}>
            ${p.disponible ? 'Agregar al carrito' : 'Sin stock'}
          </button>
        </div>
      `;

      if (p.disponible) {
        const btn = card.querySelector('.add-btn') as HTMLButtonElement;
        btn?.addEventListener('click', () => {
          addToCart(p);
          updateCartBadge();

          const originalText = btn.innerText;
          btn.innerText = '¡Agregado! ✓';
          btn.style.backgroundColor = '#10b981';

          setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = '';
          }, 1000);
        });
      }

      productsContainer.appendChild(card);
    });
  }

  searchInput?.addEventListener('input', (e) => {
    searchQuery = (e.target as HTMLInputElement).value;
    renderProducts();
  });

  updateCartBadge();
  renderCategories();
  renderProducts();
});