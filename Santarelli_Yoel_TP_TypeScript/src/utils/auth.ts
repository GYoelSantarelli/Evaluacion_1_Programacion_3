import { getCurrentUser } from './localStorage';
import { navigateTo } from './navigate';

export const checkAccess = (): void => {
  const user = getCurrentUser();
  const currentPath = window.location.pathname;

  if (!user) {
    if (!currentPath.includes('/pages/auth/')) {
      navigateTo('/src/pages/auth/login/login.html');
    }
    return;
  }

  if (user.rol === 'client' && currentPath.includes('/pages/admin/')) {
    navigateTo('/src/pages/client/home/home.html');
  } else if (user.rol === 'admin' && currentPath.includes('/pages/client/')) {
    navigateTo('/src/pages/admin/home.html');
  }
};