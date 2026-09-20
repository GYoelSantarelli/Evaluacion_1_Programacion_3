import { IUser } from '../../../types/IUser';
import { Rol } from '../../../types/Rol'; // Importa el tipo o enum Rol si lo tenés definido
import { getUsers, saveUser } from '../../../utils/localStorage';
import { navigateTo } from '../../../utils/navigate';

const form = document.querySelector<HTMLFormElement>('#registroForm');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const emailInput = document.querySelector<HTMLInputElement>('#email');
  const passwordInput = document.querySelector<HTMLInputElement>('#password');
  
  const rolSelect = document.querySelector<HTMLSelectElement>('#rol');

  if (!emailInput || !passwordInput || !rolSelect) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  const rol = rolSelect.value as Rol; 

  const users = getUsers();
  if (users.some((u) => u.email === email)) {
    alert('El usuario ya existe');
    return;
  }

  const newUser: IUser = {
    email,
    password,
    rol 
  };

  saveUser(newUser);
  alert('Registro exitoso');
  navigateTo('/src/pages/auth/login/login.html');
});