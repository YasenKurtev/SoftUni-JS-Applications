import { viewsSelectors } from "./router.js";
import { router } from "./router.js";

export function home() {
    viewsSelectors.homepage.style.display = 'block';
}