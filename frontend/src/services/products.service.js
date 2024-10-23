import { DEFAULT_AVATAR } from '@/constants'; // Nếu có hằng số mặc định nào đó cần thiết

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

function makeProductService() {
  const baseUrl = 'http://localhost:3300/api/v1/products'; // Địa chỉ API cho sản phẩm

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

  async function updateProduct(id, product) {
    return efetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    });
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

export default makeProductService(); // Xuất dịch vụ sản phẩm
