// console.log('TODO:// Implement Login functionality');
function login() {

    let classElements = Array.from(document.getElementsByClassName('active'));
    classElements.map(x => x.classList.remove('active'));
    let loginMenu = document.getElementById('login');
    loginMenu.classList.add('active');

    let formElement = document.getElementsByTagName('form')[0];
    let logoutBtn = document.getElementById('logout');
    logoutBtn.style.display = 'none';

    let url = 'http://localhost:3030/users/login';

    formElement.addEventListener('submit', ev => {
        ev.preventDefault();
        let formData = new FormData(formElement);
        let email = formData.get('email');
        let password = formData.get('password');

        if (email !== '' && password !== '') {
            let data = {
                email: email,
                password: password
            }

            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => {
                    if (!res.ok) {
                        formElement.reset();
                        return res.json().then(text => alert(text.message));
                    } else {
                        return res.json();
                    }
                })
                .then(user => {
                    localStorage.setItem('email', user.email);
                    localStorage.setItem('username', user.username);
                    localStorage.setItem('id', user._id);
                    localStorage.setItem('accessToken', user.accessToken);
                    window.location.replace('index.html');
                })
                .catch(err => console.log(err));
        }
    })

}

login()