import { checkAccess } from '../../utils/auth';
import { removeCurrentUser } from '../../utils/localStorage';
import { navigateTo } from '../../utils/navigate';

checkAccess();

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.querySelector<HTMLButtonElement>('#logoutBtn');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      removeCurrentUser();
      navigateTo('../auth/login/login.html');
    });
  }
});