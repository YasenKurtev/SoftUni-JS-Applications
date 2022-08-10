// console.log('TODO:// Implement Register functionality');
function register() {

    let classElements = Array.from(document.getElementsByClassName('active'));
    classElements.map(x => x.classList.remove('active'));
    let loginMenu = document.getElementById('register');
    loginMenu.classList.add('active');
    let formElement = document.getElementsByTagName('form')[0];
    let logoutBtn = document.getElementById('logout');
    logoutBtn.style.display = 'none';

    let url = 'http://localhost:3030/users/register';

    formElement.addEventListener('submit', ev => {
        ev.preventDefault();
        let formData = new FormData(formElement);
        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPassword = formData.get('rePass')

        if (email !== '' && password !== '' && repeatPassword !== '' && password === repeatPassword) {
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
                .then(res => res.json())
                .then(user => {
                    localStorage.setItem('email', user.email);
                    localStorage.setItem('id', user._id);
                    localStorage.setItem('accessToken', user.accessToken);
                    window.location.replace('index.html');
                })
                .catch(err => console.log(err));
        } else {
            if (password !== repeatPassword) {
                alert('Passwords don\'t match!!!');
            } else if (email === '' || password === '' || repeatPassword === '') {
                alert('Please, fill the empty fields!!!');
            }
        }
    })

}

register()