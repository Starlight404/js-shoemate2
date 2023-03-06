import { getProduct } from "../api";
import { parseRequestUrl } from "../utils";

const ProductScreen = {
  render: async () => {
    const request = parseRequestUrl();
    const { id } = request;
    const product = await getProduct(id);
    
    if (product.error) {
      return `<div>Error: ${product.error}</div>`;
    }

    return `
      <div class="loading">Loading...</div>
      <h1>${product.name}</h1>
    `;
  },
};

export default ProductScreen;




