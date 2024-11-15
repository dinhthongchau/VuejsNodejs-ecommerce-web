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

function makeOrderService() {
  const baseUrl = 'http://localhost:3300/api/v1/orders/filter';
  const baseUrl_2 = 'http://localhost:3300/api/v1/orders';

  // /**
  //  * Fetch orders by filter (e.g., pagination, filtering by fields)
  //  * @param {number} page - Số trang để phân trang
  //  * @param {number} limit - Giới hạn số sản phẩm mỗi trang
  //  */
  async function fetchOrders(page, limit = 10) {
    let url = `${baseUrl}?page=${page}&limit=${limit}`;
    const data = await efetch(url);

    // Nếu có cần xử lý dữ liệu sản phẩm
    data.orders = data.orders.map((order) => {
      return {
        ...order
      };
    });
    return data;
  }

  async function fetchOrder(id) {
    const { order } = await efetch(`${baseUrl_2}/${id}`);
    return {
      ...order
    };
  }

  async function createOrder(order) {
    return efetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async function updateOrder(orderId, formData) {
    try {
      const response = await fetch(`http://localhost:3300/api/v1/orders/${orderId}`, {
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

  async function deleteOrder(id) {
    return efetch(`${baseUrl_2}/${id}`, {
      method: 'DELETE'
    });
  }

  async function deleteAllOrders() {
    return efetch(baseUrl, {
      method: 'DELETE'
    });
  }

  return {
    fetchOrders,
    fetchOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    deleteAllOrders
  };
}

export default makeOrderService();
