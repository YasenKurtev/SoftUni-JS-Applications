import { router } from "./router.js";
import { getToken } from "./auth.js";

export function onDelete(id) {
    fetch(`http://localhost:3030/data/ideas/${id}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': getToken()
        }
    })
        .then(res => {
            router('/dashboard')();
        })
}