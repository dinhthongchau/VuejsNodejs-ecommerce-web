import { DEFAULT_AVATAR } from '@/constants';

/**
 * @param {string} url
 * @param {RequestInit} options
 * @returns Promise<Response>
 */
async function efetch(url, options = {}) {
  let result = {};
  let json = {};
  try {
    result = await fetch(url, options);
    json = await result.json();
  } catch (error) {
    throw new Error(error.message);
  }
  if (!result.ok || json.status !== 'success') {
    throw new Error(json.message);
  }
  return json.data;
}
const apiUrl = import.meta.env.VITE_API_URL;
function makeProductService() {
  const baseUrl = `${apiUrl}/v1/products`;

  // /**
  //  * Fetch products by filter (e.g., pagination, filtering by fields)
  //  * @param {number} page - Số trang để phân trang
  //  * @param {number} limit - Giới hạn số sản phẩm mỗi trang
  //  */
  async function fetchProducts(page, limit = 10) {
    let url = `${baseUrl}?page=${page}&limit=${limit}`;
    const data = await efetch(url);

    // Nếu có cần xử lý dữ liệu sản phẩm
    data.products = data.products.map((product) => {
      return {
        ...product,
        product_image: product.product_image ?? DEFAULT_AVATAR // Gán product_image mặc định nếu không có
      };
    });
    return data;
  }

  async function fetchProduct(id) {
    const { product } = await efetch(`${baseUrl}/${id}`);
    return {
      ...product,
      product_image: product.product_image ?? DEFAULT_AVATAR
    };
  }

  async function createProduct(product) {
    return efetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async function updateProduct(productId, formData) {
    try {
      const response = await fetch(`${apiUrl}/v1/products/${productId}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        throw new Error('No data provided for update');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteProduct(id) {
    return efetch(`${baseUrl}/${id}`, {
      method: 'DELETE'
    });
  }

  async function deleteAllProducts() {
    return efetch(baseUrl, {
      method: 'DELETE'
    });
  }

  return {
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts
  };
}

export default makeProductService();
