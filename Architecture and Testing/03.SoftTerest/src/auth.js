import { buttonsSelectors } from "./router.js";

export function updateAuth() {
    let user = localStorage.getItem('email');

    if (user) {
        buttonsSelectors.loginBtn.style.display = 'none';
        buttonsSelectors.registerBtn.style.display = 'none';
        buttonsSelectors.createBtn.style.display = 'block';
        buttonsSelectors.logoutBtn.style.display = 'block';
    } else {
        buttonsSelectors.createBtn.style.display = 'none';
        buttonsSelectors.logoutBtn.style.display = 'none';
        buttonsSelectors.loginBtn.style.display = 'block';
        buttonsSelectors.registerBtn.style.display = 'block';
    }
}

export function getToken() {
    let accessToken = localStorage.getItem('accessToken');
    return accessToken;
}