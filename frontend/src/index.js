import HomeScreen from "./Screens/HomeScreen.js";
import ProductScreen from "./Screens/ProductScreen.js";
import Error404Screen from "./Screens/Error404Screen.js";
import { parseRequestUrl } from "./utils.js";
import CartScreen from "./Screens/CartScreen.js";
import SigninScreen from "./Screens/SigninScreen.js";
import Header from "./components/Header.js";
import { hideLoading, showLoading } from "../../backend/utils.js";

const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  "/cart/:id": CartScreen,
  "/cart": CartScreen,
  "/signin":SigninScreen
};

const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  await Header.after_render()

  const main = document.getElementById("main-container");
  main.innerHTML = await screen.render();
  await screen.after_render()
  hideLoading();
};
window.addEventListener("load", router);
window.addEventListener("hashchange", router);
