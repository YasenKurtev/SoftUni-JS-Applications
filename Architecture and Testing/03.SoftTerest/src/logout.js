import { router } from "./router.js";
import { getToken } from "./auth.js";

export function logout(ev) {
    // ev.preventDefault();
    // fetch('http://localhost:3030/users/logout', {
    //     headers: {
    //         "X-Authorization": getToken()
    //     }
    // })
    //     .then(res => {
    //         localStorage.clear();
    //         router('/home');
    //     })
    //     .catch(err => console.log(err));
}