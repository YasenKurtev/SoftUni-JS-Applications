import { router } from "./router.js";
import { buttonsSelectors } from "./router.js";
import { logout } from "./logout.js"
import { getToken } from "./auth.js"

router('/home')()

buttonsSelectors.homeBtn.addEventListener('click', ev => {
    ev.preventDefault();
    let url = new URL(ev.target.parentElement.href);
    router(url.pathname)();
})

buttonsSelectors.logoutBtn.addEventListener('click', ev => {
    ev.preventDefault();
    fetch('http://localhost:3030/users/logout', {
        headers: {
            "X-Authorization": getToken()
        }
    })
        .then(res => {
            localStorage.clear();
            router('/home')();
        })
        .catch(err => console.log(err));
});

for (let i = 1; i < Object.values(buttonsSelectors).length; i++) {
    Object.values(buttonsSelectors)[i].addEventListener('click', ev => {
        ev.preventDefault();
        let url = new URL(ev.target.href);
        router(url.pathname)();
    })
}