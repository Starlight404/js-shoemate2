import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../LocalStorage";
import { parseRequestUrl, rerender } from "../utils";

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  if (!cartItems) cartItems = [];
  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((x) =>
        x.product === existItem.product ? item : x
      );
    }
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if (forceUpdate) {
    rerender(CartScreen);
  }
};

const CartScreen = {
  after_render: () => {
    const qtySelects = document.getElementsByClassName("qty-select");
    Array.from(qtySelects).forEach((qtySelect) => {
      qtySelect.addEventListener("change", (e) => {
        const item = getCartItems().find((x) => x.product === qtySelect.id);
        addToCart({ ...item, qty: Number(e.target.value) }, true);
      });
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      const product = await getProduct(request.id);
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
    }
    const cartItems = getCartItems();
    return `
  <div class="content-cart">
    <div class="cart-list">
      <ul class="cart-list-container">
        <li>
          <h3>Shopping Cart</h3>
          <div>Price</div>
        </li>
        ${
          cartItems.length === 0
            ? '<div>Cart Is Empty. <a href="/#/">Go Shopping</a></div>'
            : cartItems
                .map(
                  (item) => `
        <li>
          <div class="cart-image">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="cart-name">
            <div>
              <a href="/#/product/${item.product}">${item.name}</a>
            </div>
            <div>
              Qty:
              <select class="qty-select" id="${item.product}">
              ${
                [...Array(item.countInStock).keys()].map(x =>
                item.qty === x + 1
                  ? `<option selected value = "${x+1}">${x + 1}</option>`
                  : `<option  value = "${x+1}">${x + 1}</option>`
              )}  
              </select>
              <button type="button" class="delete-button" id="${item.product}">
                Delete
              </button>
            </div>
            <div class="cart-price">
              BDT  ${item.price}
            </div>
          </div>
        </li>
      `
                )
                .join("\n")
        }
      </ul>
    </div>
    <div class="cart-action">
      <h3>
        Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0)} items):
        BDT${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
      </h3>
      <button id="checkout-button" class="primary-fws">
        Proceed To Checkout
      </button>
    </div>
  </div>
`;
  },
};

export default CartScreen;
