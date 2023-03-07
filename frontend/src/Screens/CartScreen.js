import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../LocalStorage";
import { parseRequestUrl } from "../utils";

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  if (!cartItems) cartItems = [];
  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    cartItems = cartItems.map((x) =>
      x.product === existItem.product ? item : x
    );
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
};

const CartScreen = {
  after_render: () => {},
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
    <div class ="cart">
      <div class = "cart-list">
        <ul class = "cart-list-container">
          <li>
            <h3> Shopping Cart</h3>
            <div> Price </div>
          </li>
          ${
            cartItems.length ===0?
            '<div>Cart Is Empty. <a href = "/#/">Go Shpopping</a>':
            cartItems.map(item =>`
            <li>
              <div class = "cart-image">
              <img src = "${item.image}" alt = "${item.name}"/>
              </div>
              <div class = "cart-name">
                <div>
                  <a href = "/#/product/${item.product}">
                    ${item.name}
                  </a>
                </div>
                <div>
                  Qty: <select class = "qty-select" id = "${item.product}">
                  <option value = "1">1</option>
                  </select>
                  <button type = "button" class = "delete-button" id = "${item.  product}">
                    Delete
                  </button>  
                </div>
                <div class = "cart-price">
                 BDT ${item.price}
                </div>
            </li>          
          `
                    ).join('/n')
          }

        </ul>

    </div>`;
  },
};

export default CartScreen;
