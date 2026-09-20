import { getUsers, setCurrentUser } from '../../../utils/localStorage';
import { navigateTo } from '../../../utils/navigate';

const form = document.querySelector<HTMLFormElement>('#loginForm');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const emailInput = document.querySelector<HTMLInputElement>('#email');
  const passwordInput = document.querySelector<HTMLInputElement>('#password');

  if (!emailInput || !passwordInput) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    alert('Credenciales incorrectas');
    return;
  }

  const sessionData = { email: user.email, rol: user.rol };
  setCurrentUser(sessionData);

  const userRole = String(user.rol).toLowerCase();

  if (userRole === 'admin') {
    navigateTo('/src/pages/admin/home.html');
  } else {
    navigateTo('/src/pages/client/home/home.html');
  }
});