import { updateAuth } from "./auth.js"
import { home } from "./home.js"
import { login } from "./login.js"
import { logout } from "./logout.js"
import { register } from "./register.js"
import { dashboard } from "./dashboard.js"
import { create } from "./create.js"
import { details } from "./details.js"
import { onDelete } from "./delete.js"

export let viewsSelectors = {
    'homepage': document.getElementsByClassName('container home wrapper  my-md-5 pl-md-5')[0],
    'register': document.getElementsByClassName('container home wrapper  my-md-5 pl-md-5')[1],
    'login': document.getElementsByClassName('container home wrapper  my-md-5 pl-md-5')[2],
    'create': document.getElementsByClassName('container home wrapper  my-md-5 pl-md-5')[3],
    'dashboard': document.getElementById('dashboard-holder'),
    'details': document.getElementsByClassName('container home some')[0]
}

export let buttonsSelectors = {
    'homeBtn': document.getElementsByTagName('a')[0],
    'dashboardBtn': document.getElementsByTagName('a')[1],
    'createBtn': document.getElementsByTagName('a')[2],
    'logoutBtn': document.getElementsByTagName('a')[3],
    'loginBtn': document.getElementsByTagName('a')[4],
    'registerBtn': document.getElementsByTagName('a')[5]
}

let routes = {
    '/home': home,
    '/logout': logout,
    '/login': login,
    '/register': register,
    '/dashboard': dashboard,
    '/create': create,
    '/details': details,
    '/delete': onDelete
}

export function router(path) {
    updateAuth();
    hideElements();
    let renderer = routes[path];
    return renderer;
}

function hideElements() {
    for (let element of Object.values(viewsSelectors)) {
        element.style.display = 'none';
    }
}