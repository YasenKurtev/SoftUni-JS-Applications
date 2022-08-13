import { router, viewsSelectors } from "./router.js";

export function login() {
    let loginView = viewsSelectors.login;
    loginView.style.display = 'block';
    let formElement = loginView.getElementsByTagName('form')[0];

    formElement.addEventListener('submit', ev => {
        ev.preventDefault();
        let formData = new FormData(formElement);
        let email = formData.get('email');
        let password = formData.get('password');
        fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
            .then(res => {
                if (!res.ok) {
                    formElement.reset();
                    return res.json().then(text => alert(text.message));
                } else {
                    return res.json();
                }
            })
            .then(data => {
                localStorage.setItem('email', data.email);
                localStorage.setItem('id', data._id);
                localStorage.setItem('accessToken', data.accessToken);
                router('/home')();
            })
            .catch(err => console.log(err));
    })
}