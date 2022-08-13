import { router, viewsSelectors } from "./router.js";

export function register() {
    let registerView = viewsSelectors.register;
    registerView.style.display = 'block';
    let formElement = registerView.getElementsByTagName('form')[0];

    formElement.addEventListener('submit', ev => {
        ev.preventDefault();
        let formData = new FormData(formElement);
        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPassword = formData.get('repeatPassword');

        if (email.length >= 3 && password.length >= 3 && password === repeatPassword) {
            fetch('http://localhost:3030/users/register', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password })
            })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('email', data.email);
                    localStorage.setItem('id', data._id);
                    localStorage.setItem('accessToken', data.accessToken);
                    router('/home')();
                })
        } else {
            alert('Error!!!');
        }
    })
}