import axios from "axios";
import { hideLoading, showLoading } from "../../../backend/utils";
import Rating from "../components/Rating";

const HomeScreen = {
  render: async () => {
    showLoading();
    const response = await axios({
      url: "http://localhost:5000/api/products",
      headers: {
        "Content-Type": "application/json",
      },
    });
    hideLoading();
    if (!response || response.statusText !== "OK") {
      return `<div>Error in getting data</div>`;
    }
    const products = response.data;
    return `
      <ul class="products">
        ${products
          .map(
            (product) => `
            <li>
              <div class="product">
                <a href="/#/product/${product._id}">
                  <img src="${product.image}" alt="${product.name}" />
                </a>
                <div class="product-name">
                  <a href="/#/product/${product._id}">${product.name}</a>
                </div>
                <div class = "product-rating">
                  ${Rating.render({
                    value: product.rating,
                    text: `${product.numReviews} reviews`,
                  })}
                </div>  

                <div class="product-brand">${product.brand}</div>
                <div class="product-price">BDT ${product.price}</div>
              </div>
            </li>
          `
          )
          .join("\n")}
      </ul>
    `;
  },
};

export default HomeScreen;
